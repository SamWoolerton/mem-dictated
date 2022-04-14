import { useState } from "@hookstate/core"
import { useNavigate } from "react-router-dom"
import ReactMarkdown from "react-markdown"

import globalState from "state"
import { useTheme } from "hooks/useTheme"
import usePassage from "hooks/usePassage"
import { Button, Card, Page, PageHeading } from "components/Themed"
import { formatPassage } from "utility/domain"
import { add, formatRelative } from "date-fns"

export default function ViewPassage() {
  const navigate = useNavigate()
  const global = useState(globalState)
  const theme = useTheme()
  const { state: s, passage } = usePassage()

  function update(score: number) {
    if (!passage) return

    const now = new Date()
    const next = getNextAttemptAt(
      new Date(passage.lastAttemptAt ?? new Date()),
      score
    )
    const updated = {
      ...passage,
      lastAttemptAt: now.toISOString(),
      nextAttemptAt: next.toISOString(),
      lastScore: score,
    }
    global.passages.set(passages =>
      passages.map(p => (p.id !== passage?.id ? p : updated))
    )
  }

  function remove() {
    global.passages.set(passages => passages.filter(p => p.id !== passage?.id))
    navigate("/passages")
  }

  const SRButton = ({
    score,
    backgroundColor,
  }: {
    score: number
    backgroundColor: string
  }) => {
    if (!passage) return null

    const nextTimestamp = getNextAttemptAt(
      new Date(passage.lastAttemptAt ?? new Date()),
      score
    )
    const subtitle = formatRelative(nextTimestamp, new Date())

    return (
      <button
        onClick={() => {
          update(score)
          navigate("/passages")
        }}
        className="flex flex-col flex-grow justify-center items-center mx-1 py-5 rounded-lg text-white"
        style={{ backgroundColor }}
      >
        <div style={{ fontSize: 24 }}>
          {score}
          <span style={{ fontSize: 16, marginLeft: 2 }}>%</span>
        </div>
        <div style={{ fontSize: 11, opacity: 0.9 }} className="text-center">
          {subtitle}
        </div>
      </button>
    )
  }

  return (
    <Page>
      <Card>
        <PageHeading>
          {passage ? formatPassage(passage) : "View passage"}
          <span className="text-base ml-2 opacity-70 font-bold">ESV</span>
        </PageHeading>

        {!passage ? (
          <div>No matching passage. </div>
        ) : (
          <>
            {/* passages are cached locally so loading animation just causes a screen flicker */}
            {s.status === "loading" ? null : s.status === "error" ? (
              <div>Error loading passage.</div>
            ) : (
              // not actually markdown but has line-breaks and this displays them correctly
              <div className="passage-container">
                <ReactMarkdown children={s.text} />
              </div>
            )}

            <div className="my-8">
              <div className="opacity-70 mb-1">
                How much of this did you remember?
              </div>
              <div className="flex w-full -mx-1 max-w-sm">
                <SRButton
                  score={100}
                  backgroundColor={
                    theme.mode === "light" ? "#5CDB87" : "#6AD78E"
                  }
                />
                <SRButton
                  score={60}
                  backgroundColor={
                    theme.mode === "light" ? "#6FA1EB" : "#79A7EC"
                  }
                />
                <SRButton
                  score={15}
                  backgroundColor={
                    theme.mode === "light" ? "#EB8E66" : "#EDA383"
                  }
                />
              </div>
            </div>

            <Button
              label="Remove passage"
              onClick={remove}
              type="danger"
              style={{ marginTop: "1.5em" }}
            />
          </>
        )}
      </Card>
    </Page>
  )
}

// very basic; lots of room to improve this in future
function getNextAttemptAt(lastAttemptAt: Date, score: number) {
  const now = new Date()

  if (score <= 40) return now

  if (score <= 70) return add(now, { days: 1 })

  const daysSinceLastAttempt =
    (now.valueOf() - lastAttemptAt.valueOf()) / 1000 / 86400

  if (daysSinceLastAttempt >= 1.4)
    return add(now, { hours: daysSinceLastAttempt * 24 * 1.5 })

  return add(now, { days: 2 })
}
