import { createState } from "@hookstate/core"
import { Persistence } from "@hookstate/persistence"

const globalState = createState({
  selectedBibleVersion: "kjv" as Version,
  passages: [] as Passage[],
})

globalState.attach(Persistence("mem-global"))

export default globalState
