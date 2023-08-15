import { component } from "picoapp"

import drawer from "./Drawer"

export default component((node, ctx) => {
  const drawerId = "menuDrawer"
  const drawerInstance = drawer(node, drawerId)

  return drawerInstance.unmount
})
