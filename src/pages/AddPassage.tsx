import { useState } from "@hookstate/core"
import { useNavigate } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"

import { books, counts } from "constants/bible"
import globalState from "state"
import { isValidPassage } from "utility/guards"
import Tag from "components/Tag"
import { Button, Page, PageHeading } from "components/Themed"

const generateVerses = (n: number) => Array.from(Array(n)).map((_, i) => i + 1)

type PartialPassage = {
  selected: "book" | "chapter" | "startVerse" | "endVerse"
  passage: Omit<Passage, "book" | "chapter" | "startVerse" | "endVerse"> & {
    book: Book | null
    chapter: number | null
    startVerse: number | null
    endVerse: number | null
  }
}

export default function AddPassage() {
  const navigate = useNavigate()
  const global = useState(globalState)

  const state = useState({
    selected: "book",
    passage: {
      version: 2,
      id: uuidv4(),
      book: null as Book | null,
      chapter: null as number | null,
      startVerse: null as number | null,
      endVerse: null as number | null,
      lastAttempted: new Date().toISOString(),
      lastScore: 0,
      secondsSincePreviousAttempt: 0,
    },
  } as PartialPassage)

  const s = state.get()
  const { passage } = s
  const validPassage = isValidPassage(passage)
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
    base: "m-1 px-2 h-8 rounded flex items-center justify-center bg-l_card dark:bg-d_card border-2 ",
    active:
      " border-l_actionBackground dark:border-d_actionBackground cursor-default ",
    inactive: " border-l_card dark:border-d_card cursor-pointer ",
    disabled: " border-l_card dark:border-d_card cursor-default ",
  }

  return (
    <Page>
      <PageHeading>Add passage</PageHeading>

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

      {s.selected === "startVerse" || s.selected === "endVerse" ? (
        <div className="flex flex-wrap my-2 -mx-2">
          {verses
            .filter(v =>
              s.selected === "endVerse"
                ? v >= (s.passage.startVerse ?? 0)
                : true
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
                      startVerse: 1,
                      endVerse: selectedBookCounts[chapter - 1],
                    },
                  })
                }
                key={chapter}
              />
            )
          })}
        </div>
      ) : s.selected === "book" ? (
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
      ) : null}

      {validPassage && (
        <Button
          label="Add passage"
          onClick={addPassage}
          style={{ marginTop: "1.5em" }}
        />
      )}
    </Page>
  )
}
