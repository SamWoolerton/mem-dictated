import { useState } from "@hookstate/core"
import { useNavigate } from "react-router-dom"

import globalState from "state"
import usePassage from "hooks/usePassage"
import { LinkAllPassages } from "components/Links"

export default function ViewPassage() {
  const navigate = useNavigate()
  const global = useState(globalState)
  const { state: s, passage } = usePassage()

  const remove = () => {
    global.passages.set(passages => passages.filter(p => p.id !== passage?.id))
    navigate("/passages")
  }

  return (
    <div>
      <h2>View passage</h2>
      <LinkAllPassages />

      {!passage ? (
        <div>No matching passage. </div>
      ) : (
        <>
          {s.status === "loading" ? (
            <div>Loading...</div>
          ) : s.status === "error" ? (
            <div>Error loading passage.</div>
          ) : (
            s.verses.map(v => <div key={v.verse}>{v.text}</div>)
          )}

          <button onClick={remove} className="mt-4 warning">
            Remove passage
          </button>
        </>
      )}
    </div>
  )
}
