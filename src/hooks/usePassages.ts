import { useEffect } from "react"
import { useState } from "@hookstate/core"

import globalState from "state"

export default function usePassages(): Passage[] {
  const passagesProxy = useState(globalState).passages
  const gotPassages = passagesProxy.get()
  const hydratedPassages = useState(gotPassages.map(hydratePassage))

  useEffect(() => {
    passagesProxy.set(passages => passages.map(hydratePassage))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return hydratedPassages.get()
}

function hydratePassage(passage: PassageVersion): Passage {
  // required for type checking; can't just set the property directly or Hookstate throws
  const coercedPassage: PassageVersion = (passage as any).version
    ? passage
    : { ...passage, version: 1 }

  if (coercedPassage.version === 1) {
    return {
      ...coercedPassage,
      version: 2,
      lastAttemptAt: null,
      nextAttemptAt: new Date().toISOString(),
      lastScore: null,
    }
  }

  if (!coercedPassage.lastAttemptAt) {
    // new passages should always have today's date for next attempt (makes default list sort way nicer)
    return { ...coercedPassage, nextAttemptAt: new Date().toISOString() }
  }

  return coercedPassage
}
