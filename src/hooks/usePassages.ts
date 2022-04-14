import { useState } from "@hookstate/core"

import globalState from "state"

export default function usePassages(): Passage[] {
  const passagesProxy = useState(globalState).passages
  const gotPassages = passagesProxy.get()

  const hydratedPassages = useState(gotPassages.map(hydratePassage))
  return hydratedPassages.get()
}

function hydratePassage(passage: PassageVersion): Passage {
  // required for type checking
  if (!(passage as any).version) passage.version = 1

  if (passage.version === 1) {
    return {
      ...passage,
      version: 2,
      lastAttempted: new Date().toISOString(),
      lastScore: 0,
      secondsSincePreviousAttempt: 0,
    }
  }

  return passage
}
