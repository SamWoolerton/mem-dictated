import { useState } from "@hookstate/core"
import { useNavigate } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"

import { books, counts } from "constants/bible"
import globalState from "state"
import { isPassage } from "utility/guards"
import Tag from "components/Tag"
import LinkText from "components/LinkText"

const generateVerses = (n: number) => Array.from(Array(n)).map((_, i) => i + 1)

type PartialPassage =
  | {
      selected: "book"
      passage: {
        id: string
        book: null
        chapter: null
        startVerse: null
        endVerse: null
      }
    }
  | {
      selected: "book" | "chapter"
      passage: {
        id: string
        book: Book
        chapter: null
        startVerse: null
        endVerse: null
      }
    }
  | {
      selected: "book" | "chapter" | "startVerse"
      passage: {
        id: string
        book: Book
        chapter: number
        startVerse: null
        endVerse: null
      }
    }
  | {
      selected: "book" | "chapter" | "startVerse" | "endVerse"
      passage: {
        id: string
        book: Book
        chapter: number
        startVerse: number
        endVerse: number
      }
    }

export default function AddPassage() {
  const navigate = useNavigate()
  const global = useState(globalState)

  const state = useState({
    selected: "book",
    passage: {
      id: uuidv4(),
      book: null as Book | null,
      chapter: null as number | null,
      startVerse: null as number | null,
      endVerse: null as number | null,
    },
  } as PartialPassage)

  const s = state.get()
  const { passage } = s
  const validPassage = isPassage(passage)
  const selectedBookCounts = s.passage.book ? counts[s.passage.book] : []
  const verses =
    selectedBookCounts && s.passage.chapter
      ? generateVerses(selectedBookCounts[s.passage.chapter - 1])
      : []

  const addPassage = () => {
    if (!validPassage) return
    global.passages.set(p => [...p, passage])

    navigate("/passages")
  }

  return (
    <div>
      <h2>Add passage</h2>

      <div className="flex flex-wrap my-2 -mx-2">
        <div
          className="m-1 px-2 h-8 rounded flex items-center justify-center bg-gray-100 dark:bg-gray-800"
          onClick={() => state.set(s => ({ ...s, selected: "book" }))}
          style={s.passage.book ? {} : { minWidth: "5em" }}
        >
          {s.passage.book}
        </div>
        <div
          className="m-1 px-2 h-8 rounded flex items-center justify-center bg-gray-100 dark:bg-gray-800"
          style={{ minWidth: "2em" }}
        >
          {s.passage.chapter}
        </div>
        <div
          className="m-1 px-2 h-8 rounded flex items-center justify-center bg-gray-100 dark:bg-gray-800"
          style={{ minWidth: "2em" }}
        >
          {s.passage.startVerse}
        </div>
        <div
          className="m-1 px-2 h-8 rounded flex items-center justify-center bg-gray-100 dark:bg-gray-800"
          style={{ minWidth: "2em" }}
        >
          {s.passage.endVerse}
        </div>
      </div>

      {s.selected === "book" ? (
        <div className="flex flex-wrap my-2 -mx-2">
          {books.map(book => (
            <Tag
              label={book}
              onClick={() =>
                state.set({
                  selected: "chapter",
                  passage: {
                    ...s.passage,
                    book,
                    chapter: null,
                    startVerse: null,
                    endVerse: null,
                  },
                })
              }
              key={book}
            />
          ))}
        </div>
      ) : s.selected === "chapter" ? (
        <div className="flex flex-wrap my-2 -mx-2">
          {selectedBookCounts.map((_, i) => {
            const chapter = i + 1
            return (
              <Tag
                label={String(chapter)}
                onClick={() =>
                  state.set({
                    selected: "startVerse",
                    passage: {
                      ...s.passage,
                      book: s.passage.book,
                      chapter,
                      startVerse: null,
                      endVerse: null,
                    },
                  })
                }
                key={chapter}
              />
            )
          })}
        </div>
      ) : // shouldn't need this check as these are the only two options left anyway, but TS doesn't type-check without it
      s.selected === "startVerse" || s.selected === "endVerse" ? (
        <div className="flex flex-wrap my-2 -mx-2">
          {verses
            .filter(v =>
              s.selected === "endVerse" ? v >= s.passage.startVerse : true
            )
            .map(verse => (
              <Tag
                label={String(verse)}
                onClick={() =>
                  state.set({
                    selected: "endVerse",
                    passage:
                      s.selected === "endVerse"
                        ? {
                            ...s.passage,
                            endVerse: verse,
                          }
                        : {
                            ...s.passage,
                            startVerse: verse,
                            endVerse: verse,
                          },
                  })
                }
                key={verse}
              />
            ))}
        </div>
      ) : null}

      <div>
        <button onClick={addPassage} disabled={!validPassage}>
          Add passage
        </button>
      </div>

      <LinkText to="/passages">Back to all passages</LinkText>
    </div>
  )
}
