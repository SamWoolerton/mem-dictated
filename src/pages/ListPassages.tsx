import { Link } from "react-router-dom"

export default function ListPassages() {
  return (
    <div>
      <Link to="/passages/add">Add passage</Link>
      List passages.
    </div>
  )
}
