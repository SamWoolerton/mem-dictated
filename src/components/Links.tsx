import { Link, To } from "react-router-dom"
import { Detector } from "react-detect-offline"

export function LinkText({ to, children }: { to: To; children: string }) {
  return (
    <Link to={to} className="text-link">
      {children}
    </Link>
  )
}

export function AddPassageLink() {
  const linkText = "Add passage"

  return (
    <Detector
      render={({ online }) =>
        online ? (
          <LinkText to="/passages/add">{linkText}</LinkText>
        ) : (
          <div onClick={() => alert("Can't add passages while offline")}>
            {linkText}
          </div>
        )
      }
    />
  )
}

export const LinkAllPassages = () => (
  <LinkText to="/passages">Back to all passages</LinkText>
)
