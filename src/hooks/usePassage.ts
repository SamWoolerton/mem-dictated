import { useState } from "@hookstate/core"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

import usePassages from "./usePassages"

export type State =
  | { status: "loading" }
  | { status: "error" }
  | { status: "loaded"; text: string }

export default function usePassage(): { state: State; passage?: Passage } {
  let params = useParams<"passage">()
  const passages = usePassages()
  const state = useState({ status: "loading" } as State)
  const s = state.get()

  const passage = passages.find(p => p.id === params.passage)

  useEffect(() => {
    if (!passage) return

    const queryParams = Object.entries(passage)
      .map(([k, v]) => `${k}=${v}`)
      .join("&")

    fetch(`/.netlify/functions/esv?${queryParams}`)
      .then(res => res.json())
      .then(text => {
        state.set({ status: "loaded", text })
      })
      .catch(err => {
        console.error(err)
        state.set({ status: "error" })
      })
    // eslint-disable-next-line
  }, [])

  return { state: s, passage }
}
