import { useState } from "@hookstate/core"
import { Link } from "react-router-dom"

import globalState from "state"
import { LinkText, AddPassageLink } from "components/Links"

export default function ListPassages() {
  const global = useState(globalState)

  return (
    <div>
      <h2>Your passages</h2>
      <AddPassageLink />

      <div>
        {global.passages.get().map(p => (
          <div key={p.id} className="flex">
            <Link to={`/passages/${p.id}`} className="flex">
              <div>{p.book}</div>
              <div>{p.chapter}</div>
              <div>
                {p.startVerse === p.endVerse
                  ? p.startVerse
                  : `${p.startVerse}:${p.endVerse}`}
              </div>
            </Link>

            <LinkText to={`/passages/${p.id}/attempt`}>Attempt</LinkText>
          </div>
        ))}
      </div>
    </div>
  )
}
