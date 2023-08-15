import app from "theme/theme1/scripts/app"

const getSection = async (href, id) => {
  app.emit(`section:${id}:loading`)

  const url = new URL(href)
  const params = { section_id: id }
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  )

  const section = await fetch(url).then((res) => res.text())

  app.emit(`section:${id}:loaded`)

  return section
}

export default getSection
