import { useState } from "react"
import { Link } from "react-router-dom"
import { diffWords } from "diff"

import usePassage from "hooks/usePassage"

type Diff = { type: "correct" | "extra" | "missing"; text: string }

export default function AttemptPassage() {
  const { state: s, passage } = usePassage()
  const [attempt, setAttempt] = useState("")
  const [diff, setDiff] = useState([] as Diff[])

  const check = () => {
    if (s.status !== "loaded") return

    const actual = s.verses.map(v => v.text).join(" ")
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
      <Link to="/passages">Back to all passages</Link>

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
