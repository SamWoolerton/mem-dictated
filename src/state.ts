import { createState } from "@hookstate/core"
import { Persistence } from "@hookstate/persistence"

const globalState = createState({
  selectedBibleVersion: "esv" as Version,
  passages: [] as PassageVersion[],
})

globalState.attach(Persistence("mem-global"))

export default globalState
