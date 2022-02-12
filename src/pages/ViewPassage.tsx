import { useState } from "@hookstate/core"
import { useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import globalState from "state"

type State =
  | { status: "loading" }
  | { status: "error" }
  | { status: "loaded"; verses: { verse: string; text: string }[] }

export default function ViewPassage() {
  const navigate = useNavigate()
  let params = useParams<"passage">()
  const global = useState(globalState)
  const state = useState({ status: "loading" } as State)
  const s = state.get()

  const passages = global.passages.get()
  const passage = passages.find(p => p.id === params.passage)

  useEffect(() => {
    if (!passage) return

    fetch(`/kjv/${passage.book}_${passage.chapter}.json`)
      .then(res => res.json())
      .then(ls => state.set({ status: "loaded", verses: ls }))
      .catch(err => {
        console.error(err)
        state.set({ status: "error" })
      })
    // eslint-disable-next-line
  }, [])

  const remove = () => {
    global.passages.set(passages.filter(p => p.id !== params.passage))
    navigate("/passages")
  }

  return (
    <div>
      <h2>View passage</h2>
      <Link to="/passages">View all passages</Link>

      {!passage ? (
        <div>No matching passage. </div>
      ) : (
        <>
          <button onClick={remove}>Remove passage</button>

          {s.status === "loading" ? (
            <div>Loading...</div>
          ) : s.status === "error" ? (
            <div>Error loading passage.</div>
          ) : (
            s.verses.map(v => <div key={v.verse}>{v.text}</div>)
          )}
        </>
      )}
    </div>
  )
}
