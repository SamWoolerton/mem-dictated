import { Detector } from "react-detect-offline"

import LinkText from "./LinkText"

const linkText = "Add passage"

export default function AddPassageLink() {
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
