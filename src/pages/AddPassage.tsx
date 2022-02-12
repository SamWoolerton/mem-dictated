import { useState } from "@hookstate/core"
import { useNavigate } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"

import { books, counts } from "constants/bible"
import globalState from "state"
import { isPassage } from "utility/guards"
import Tag from "components/Tag"
import { LinkAllPassages } from "components/Links"

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

  const inputClasses = {
    base: "m-1 px-2 h-8 rounded flex items-center justify-center bg-gray-100 dark:bg-gray-800 border-2 ",
    active: " border-blue-600 dark:border-blue-200 cursor-default ",
    inactive: " border-gray-100 dark:border-gray-800 cursor-pointer ",
    disabled: " border-gray-100 dark:border-gray-800 cursor-default ",
  }

  return (
    <div>
      <h2>Add passage</h2>
      <LinkAllPassages />

      <div className="flex flex-wrap my-4 -mx-2">
        <div
          className={
            inputClasses.base +
            (s.selected === "book"
              ? inputClasses.active
              : inputClasses.inactive)
          }
          onClick={() => state.set(s => ({ ...s, selected: "book" }))}
          style={s.passage.book ? {} : { minWidth: "5em" }}
        >
          {s.passage.book}
        </div>
        <div
          className={
            inputClasses.base +
            (s.selected === "chapter"
              ? inputClasses.active
              : s.passage.book
              ? inputClasses.inactive
              : inputClasses.disabled)
          }
          onClick={() =>
            state.set(s => {
              // note explicit null check instead of coercion because 0 is a falsy number
              if (s.passage.book === null) return s

              // only included because of TS limitations
              if (s.passage.chapter === null)
                return { selected: "chapter", passage: s.passage }
              // only have to include this check because of TS limitations, and can't even include with the previous step
              if (s.passage.startVerse === null)
                return { selected: "chapter", passage: s.passage }

              return { selected: "chapter", passage: s.passage }
            })
          }
          style={{ minWidth: "2em" }}
        >
          {s.passage.chapter}
        </div>
        <div
          className={
            inputClasses.base +
            (s.selected === "startVerse"
              ? inputClasses.active
              : s.passage.chapter
              ? inputClasses.inactive
              : inputClasses.disabled)
          }
          onClick={() =>
            state.set(s => {
              if (s.passage.endVerse === null) return s
              return { selected: "startVerse", passage: s.passage }
            })
          }
          style={{ minWidth: "2em" }}
        >
          {s.passage.startVerse}
        </div>
        <div
          className={
            inputClasses.base +
            (s.selected === "endVerse"
              ? inputClasses.active
              : s.passage.endVerse
              ? inputClasses.inactive
              : inputClasses.disabled)
          }
          onClick={() =>
            state.set(s => {
              if (s.passage.endVerse === null) return s
              return { selected: "endVerse", passage: s.passage }
            })
          }
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

      {validPassage && (
        <button onClick={addPassage} className="mt-4">
          Add passage
        </button>
      )}
    </div>
  )
}
