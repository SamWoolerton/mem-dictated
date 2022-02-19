const fs = require("fs")

const before = "before"
const after = "after"

const files = fs.readdirSync(before)
if (!fs.existsSync(after)) fs.mkdirSync(after)

const books = [
  "Genesis",
  "Exodus",
  "Leviticus",
  "Numbers",
  "Deuteronomy",
  "Joshua",
  "Judges",
  "Ruth",
  "1 Samuel",
  "2 Samuel",
  "1 Kings",
  "2 Kings",
  "1 Chronicles",
  "2 Chronicles",
  "Ezra",
  "Nehemiah",
  "Esther",
  "Job",
  "Psalms",
  "Proverbs",
  "Ecclesiastes",
  "Song of Solomon",
  "Isaiah",
  "Jeremiah",
  "Lamentations",
  "Ezekiel",
  "Daniel",
  "Hosea",
  "Joel",
  "Amos",
  "Obadiah",
  "Jonah",
  "Micah",
  "Nahum",
  "Habakkuk",
  "Zephaniah",
  "Haggai",
  "Zechariah",
  "Malachi",
  "Matthew",
  "Mark",
  "Luke",
  "John",
  "Acts",
  "Romans",
  "1 Corinthians",
  "2 Corinthians",
  "Galatians",
  "Ephesians",
  "Philippians",
  "Colossians",
  "1 Thessalonians",
  "2 Thessalonians",
  "1 Timothy",
  "2 Timothy",
  "Titus",
  "Philemon",
  "Hebrews",
  "James",
  "1 Peter",
  "2 Peter",
  "1 John",
  "2 John",
  "3 John",
  "Jude",
  "Revelation",
]

const renameLookup = Object.fromEntries(
  books.map(b => [b.toLowerCase().replaceAll(" ", ""), b])
)

for (const file of files) {
  const book = renameLookup[file.replace(".json", "")]
  console.log("Processing file", file)
  let chapter = 1
  const chapters = { 1: [] }
  const contents = JSON.parse(fs.readFileSync(`${before}/${file}`))

  for (let row of contents) {
    if (row.chapterNumber && row.chapterNumber !== chapter) {
      chapter = row.chapterNumber
      if (!chapters[chapter]) chapters[chapter] = []
    }
    chapters[chapter].push(row)
  }

  for (const [chapter, chunks] of Object.entries(chapters)) {
    fs.writeFileSync(`${after}/${book}_${chapter}.json`, JSON.stringify(chunks))
  }
}
