const cache = {}

export default function getProductJson(
  slug = window.location.pathname.split("/").reverse()[0],
  options = {}
) {
  if (cache[slug] && !options.refetch) return Promise.resolve(cache[slug])

  const queue = [
    fetch(`/products/${slug}.js?no-cache=${new Date().getTime()}`),
    fetch(`/products/${slug}?view=data&no-cache=${new Date().getTime()}`),
  ]

  return Promise.all(queue)
    .then((results) => Promise.all(results.map((res) => res.json())))
    .then(([product, extra]) => {
      const variants = product.variants.map((variant) => {
        const match = extra.find(
          (extraVariant) => extraVariant.id === variant.id
        )

        if (!match) {
          return variant
        }

        return {
          ...variant,
          ...match,
        }
      })

      cache[slug] = {
        ...product,
        variants,
      }

      return cache[slug]
    })
    .catch((err) => {
      console.error(err)
    })
}
