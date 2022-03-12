import { Link, To } from "react-router-dom"

export function LinkText({ to, children }: { to: To; children: string }) {
  return (
    <Link to={to} className="text-link">
      {children}
    </Link>
  )
}
