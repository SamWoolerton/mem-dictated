import { useState } from "@hookstate/core"
import AddPassageLink from "components/AddPassageLink"
import { Link } from "react-router-dom"
import globalState from "state"

export default function ListPassages() {
  const global = useState(globalState)

  return (
    <div>
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

            <Link to={`/passages/${p.id}/attempt`}>Attempt</Link>
          </div>
        ))}
      </div>
    </div>
  )
}
