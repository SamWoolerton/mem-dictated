const fs = require("fs")

const before = "before"
const after = "after"

const files = fs.readdirSync(before)

for (const file of files) {
  console.log("Processing file", file)
  const contents = fs.readFileSync(`${before}/${file}`)
  const { book, chapters } = JSON.parse(contents)
  for (const { chapter, verses } of chapters) {
    fs.writeFileSync(`${after}/${book}_${chapter}.json`, JSON.stringify(verses))
  }
}
