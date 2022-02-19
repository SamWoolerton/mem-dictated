import { useState } from "react"
import { diffWords } from "diff"

import usePassageText from "hooks/usePassageText"
import { LinkAllPassages } from "components/Links"

type Diff = { type: "correct" | "extra" | "missing"; text: string }

export default function AttemptPassage() {
  const { state: s, passage } = usePassageText()
  const [attempt, setAttempt] = useState("")
  const [diff, setDiff] = useState([] as Diff[])

  const check = () => {
    if (s.status !== "loaded") return

    const actual = s.text
    setDiff(
      diffWords(actual, attempt).map(({ value, added, removed }) => ({
        text: value,
        type: added ? "extra" : removed ? "missing" : "correct",
      }))
    )
  }

  return (
    <div>
      <h2>Attempt passage</h2>
      <LinkAllPassages />

      {!passage ? (
        <div>No matching passage. </div>
      ) : (
        <>
          {s.status === "loading" ? (
            <div>Loading...</div>
          ) : s.status === "error" ? (
            <div>Error loading passage.</div>
          ) : diff.length === 0 ? (
            <div>
              <textarea
                value={attempt}
                onChange={t => setAttempt(t.target.value)}
              />

              <button onClick={check}>Check</button>
            </div>
          ) : (
            <div className="flex flex-wrap">
              {diff.map(({ type, text }) => (
                <span
                  className={
                    type === "correct"
                      ? "bg-green-100 text-green-800"
                      : type === "extra"
                      ? "bg-red-100 text-red-800 line-through"
                      : "bg-red-100 text-red-800"
                  }
                >
                  {text}
                </span>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
