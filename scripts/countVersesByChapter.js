const fs = require("fs")

const before = "before"

const files = fs.readdirSync(before)

const totals = {}

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
  const contents = JSON.parse(fs.readFileSync(`${before}/${file}`))

  if (!totals[book]) totals[book] = []

  for (let row of contents) {
    if (row.chapterNumber && row.verseNumber) {
      // strictly increasing so just update each time and will have the highest number at the end
      totals[book][row.chapterNumber - 1] = row.verseNumber
    }
  }
}

console.log(JSON.stringify(totals))
