import { Handler } from "@netlify/functions"
import fetch from "node-fetch"

const { ESV_API_TOKEN } = process.env
const baseUrl = "https://api.esv.org/v3/passage/text"

// API is limited to the lesser of 500 consecutive verses of half a book, but it just calculates this itself and returns the shorter version instead of throwing errors, so no business logic handling required for this. The AddPassage UI only allows one chapter anyway so issues should be rare
export const handler: Handler = async (event, context) => {
  const { book, chapter, startVerse, endVerse } = event.queryStringParameters
  // configured per docs: https://api.esv.org/docs/passage-text/
  const url = `${baseUrl}/?q=${book} ${chapter}:${startVerse}-${endVerse} &include-passage-references=false&include-verse-numbers=false&include-first-verse-numbers=false&include-footnotes=false&include-headings=false&include-short-copyright=false`

  return fetch(url, {
    headers: { Authorization: `Token ${ESV_API_TOKEN}` },
  })
    .then(res => res.json())
    .then((res: any) => {
      console.log("RESPONSE IS", res)
      // console.log("PASSAGE IS", res.passages[0])
      return res
    })
    .then((res: any) => ({
      statusCode: 200,
      body: JSON.stringify(res.passages[0]),
    }))
    .catch(_err => ({
      statusCode: 500,
      body: "Error fetching passage.",
    }))
}
