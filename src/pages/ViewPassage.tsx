import { useState } from "@hookstate/core"
import { useNavigate } from "react-router-dom"

import globalState from "state"
import usePassageText from "hooks/usePassageText"
import { Button, Card, Header, PageHeading } from "components/Themed"
import { formatPassage } from "utility/domain"

export default function ViewPassage() {
  const navigate = useNavigate()
  const global = useState(globalState)
  const { state: s, passage } = usePassageText()

  const remove = () => {
    global.passages.set(passages => passages.filter(p => p.id !== passage?.id))
    navigate("/passages")
  }

  return (
    <div>
      <Header />

      <Card>
        <PageHeading>
          {passage ? formatPassage(passage) : "View passage"}
        </PageHeading>

        {!passage ? (
          <div>No matching passage. </div>
        ) : (
          <>
            {/* passages are cached locally so loading animation just causes a screen flicker */}
            {s.status === "loading" ? null : s.status === "error" ? (
              <div>Error loading passage.</div>
            ) : (
              <div>{s.text}</div>
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
    </div>
  )
}
