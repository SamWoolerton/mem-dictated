import { useNavigate } from "react-router-dom"

export default function AddPassage() {
  const navigate = useNavigate()

  const redirect = () => navigate("/passages")

  return (
    <div>
      Add passage. <button onClick={redirect}>Back to passages list</button>
    </div>
  )
}
