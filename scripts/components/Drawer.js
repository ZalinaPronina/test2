import app from "theme/theme1/scripts/app"

export default function drawer(node, id) {
  if (!id) {
    throw new Error("id must be provided")
  }

  const overlay = node.querySelector("[data-drawer-overlay]")
  const close = node.querySelector("[data-drawer-close]")
  const drawerToggles = document.querySelectorAll(
    `[data-drawer-toggle="${id}"]`
  )

  app.hydrate({
    [id]: {
      isOpen: false,
    },
  })

  const handleOpen = (element) => {
    app.emit(
      "drawer:open",
      {
        [id]: {
          ...app.getState()[id],
          isOpen: true,
        },
      },
      {
        id,
        element,
      }
    )

    node.classList.add("isVisible")

    setTimeout(() => {
      node.classList.add("isActive")
    }, 50)
  }

  const handleClose = (element) => {
    app.emit(
      "drawer:close",
      {
        [id]: {
          ...app.getState()[id],
          isOpen: false,
        },
      },
      {
        id,
        element,
      }
    )

    node.classList.remove("isActive")

    setTimeout(() => {
      node.classList.remove("isVisible")
    }, 300)
  }

  drawerToggles.forEach((menuToggle) => {
    menuToggle.addEventListener("click", () => {
      const { isOpen } = app.getState()[id]

      if (isOpen) {
        handleClose(menuToggle)
        menuToggle.focus()
      } else {
        handleOpen(menuToggle)
        close?.focus()
      }
    })
  })

  app.on("drawer:open", (state, data) => {
    const drawerId = data?.id

    if (drawerId !== id) {
      handleClose()
    }
  })

  overlay?.addEventListener("click", handleClose)
  close?.addEventListener("click", handleClose)

  return {
    unmount: () => {
      overlay?.removeEventListener("click", handleClose)
      close?.removeEventListener("click", handleClose)
    },
    close: handleClose,
    open: handleOpen,
  }
}
