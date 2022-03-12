import { useState } from "react"
import { diffWords } from "diff"

import usePassageText from "hooks/usePassageText"
import { Button, Card, Header, PageHeading } from "components/Themed"
import { formatPassage } from "utility/domain"
import { useTheme } from "hooks/useTheme"

type Diff = { type: "correct" | "extra" | "missing"; text: string }

export default function AttemptPassage() {
  const theme = useTheme()
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
      <Header />

      <Card>
        <PageHeading>
          {passage ? formatPassage(passage) : "Attempt passage"}
        </PageHeading>

        {!passage ? (
          <div>No matching passage. </div>
        ) : (
          <>
            {/* passages are cached locally so loading animation just causes a screen flicker */}
            {s.status === "loading" ? null : s.status === "error" ? (
              <div>Error loading passage.</div>
            ) : diff.length === 0 ? (
              <div>
                <textarea
                  value={attempt}
                  onChange={t => setAttempt(t.target.value)}
                  style={{ backgroundColor: theme.input }}
                  className="w-full"
                />

                <Button
                  label="Check"
                  onClick={check}
                  style={{ marginTop: "1.5em" }}
                />
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
      </Card>
    </div>
  )
}
