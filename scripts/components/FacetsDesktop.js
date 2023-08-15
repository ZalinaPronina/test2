import { component } from "picoapp"

import Facets from "./Facets"

export default component((node, ctx) => {
  const section = node.closest("[data-section-id]")
  const facets = Facets(node, ctx, section)

  node.addEventListener("change", facets.onFilterChanged)
})
