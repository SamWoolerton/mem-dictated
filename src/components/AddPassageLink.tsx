import { Link } from "react-router-dom"
import { Detector } from "react-detect-offline"

const linkText = "Add passage"

export default function AddPassageLink() {
  return (
    <Detector
      render={({ online }) =>
        online ? (
          <Link to="/passages/add">{linkText}</Link>
        ) : (
          <div onClick={() => alert("Can't add passages while offline")}>
            {linkText}
          </div>
        )
      }
    />
  )
}
