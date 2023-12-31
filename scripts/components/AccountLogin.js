import { component } from "picoapp"

export default component((node) => {
  const login = node.querySelector(".js-login-dialog")
  const recover = node.querySelector(".js-recover-dialog")
  const recoverLink = node.querySelector(".js-recover-trigger")
  const cancelRecoverLink = node.querySelector(".js-recover-cancel")

  recoverLink.addEventListener("click", (e) => {
    e.preventDefault()
    login.style.display = "none"
    recover.style.display = "block"
  })

  cancelRecoverLink.addEventListener("click", (e) => {
    e.preventDefault()
    recover.style.display = "none"
    login.style.display = "block"
  })
})
