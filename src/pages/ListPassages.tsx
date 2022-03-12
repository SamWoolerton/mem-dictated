import { useState } from "@hookstate/core"
import { Link } from "react-router-dom"
import { HiChevronDoubleRight } from "react-icons/hi"
import { Detector } from "react-detect-offline"

import globalState from "state"
import { Header, Card, LinkButton, LinkIconButton } from "components/Themed"
import { formatPassage } from "utility/domain"

export default function ListPassages() {
  const global = useState(globalState)

  return (
    <div>
      <Header showBack={false} />

      <Detector
        render={({ online }) => (
          <LinkButton
            label={online ? "Add passage" : "Can't add passage while offline"}
            to="/passages/add"
            disabled={!online}
          />
        )}
      />

      <div>
        {global.passages.get().map(p => (
          <Link key={p.id} to={`/passages/${p.id}`}>
            <Card
              style={{
                marginTop: 20,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ fontSize: 20 }}>{formatPassage(p)}</div>

              <LinkIconButton
                to={`/passages/${p.id}/attempt`}
                Icon={HiChevronDoubleRight}
              />
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
