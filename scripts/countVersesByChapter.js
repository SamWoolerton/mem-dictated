const fs = require("fs")

const before = "before"

const files = fs.readdirSync(before)

const totals = {}

for (const file of files) {
  const contents = fs.readFileSync(`${before}/${file}`)
  const { book, chapters } = JSON.parse(contents)
  if (!totals[book]) totals[book] = []
  for (const { chapter, verses } of chapters) {
    totals[book][chapter - 1] = verses.length
  }
}

console.log(JSON.stringify(totals))
