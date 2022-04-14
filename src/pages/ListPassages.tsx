import { Link } from "react-router-dom"
import { HiChevronDoubleRight } from "react-icons/hi"
import { Detector } from "react-detect-offline"
import { formatRelative } from "date-fns"

import usePassages from "hooks/usePassages"
import { useTheme } from "hooks/useTheme"
import { Card, LinkButton, LinkIconButton, Page } from "components/Themed"
import { formatPassage } from "utility/domain"

export default function ListPassages() {
  const passages = usePassages()
  const theme = useTheme()

  const sorted = [...passages].sort((a, b) =>
    a.nextAttemptAt > b.nextAttemptAt ? 1 : -1
  )

  return (
    <Page showBackButton={false}>
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
        {sorted.map(p => (
          <Link key={p.id} to={`/passages/${p.id}`}>
            <Card
              style={{
                marginTop: 20,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div className="w-full mr-8" style={{ maxWidth: 280 }}>
                <div style={{ fontSize: 20 }}>{formatPassage(p)}</div>
                <div style={{ fontSize: 12, opacity: 0.7 }} className="-mt-1">
                  {p.lastScore === null
                    ? "New passage"
                    : `Last score ${p.lastScore}%`}
                  , next attempt{" "}
                  {formatRelative(new Date(p.nextAttemptAt), new Date())}
                </div>

                {/* progress bar */}
                <div className="relative w-full pt-3 pb-2">
                  <div
                    className="absolute inset-x-0 inset-bottom-0 rounded-full"
                    style={{
                      height: 6,
                      backgroundColor:
                        theme.mode === "light"
                          ? theme.actionBackground
                          : theme.screen,
                    }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${p.lastScore ?? 0}%`,
                        backgroundColor:
                          theme.mode === "light"
                            ? theme.screen
                            : theme.actionBackground,
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="flex-shrink-0">
                <LinkIconButton
                  to={`/passages/${p.id}/attempt`}
                  Icon={HiChevronDoubleRight}
                />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </Page>
  )
}
