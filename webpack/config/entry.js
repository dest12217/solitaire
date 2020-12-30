const css = [
  'index'
]
const js = [
  'index'
]
const margeEntry = () => {
  const object = {}

  for (const file of css) {
    object[`css/${file}`] = `./src/scss/${file}.scss`
  }

  for (const file of js) {
    object[`js/${file}`] = `./src/ts/${file}.ts`
  }

  return object
}

module.exports = margeEntry()
