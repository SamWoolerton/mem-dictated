import { useState } from "@hookstate/core"
import { Link } from "react-router-dom"
import globalState from "state"

export default function ListPassages() {
  const global = useState(globalState)

  return (
    <div>
      <Link to="/passages/add">Add passage</Link>

      <div>
        {global.passages.get().map(p => (
          <Link to={`/passages/${p.id}`} className="flex">
            <div>{p.book}</div>
            <div>{p.chapter}</div>
            <div>
              {p.startVerse === p.endVerse
                ? p.startVerse
                : `${p.startVerse}:${p.endVerse}`}

              <Link to={`/passages/${p.id}/attempt`}>Attempt</Link>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
