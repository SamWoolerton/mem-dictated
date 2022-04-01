import { useState } from "@hookstate/core"
import { useNavigate } from "react-router-dom"
import ReactMarkdown from "react-markdown"

import globalState from "state"
import usePassage from "hooks/usePassage"
import { Button, Card, Page, PageHeading } from "components/Themed"
import { formatPassage } from "utility/domain"

export default function ViewPassage() {
  const navigate = useNavigate()
  const global = useState(globalState)
  const { state: s, passage } = usePassage()

  const remove = () => {
    global.passages.set(passages => passages.filter(p => p.id !== passage?.id))
    navigate("/passages")
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
