export default function Tag({
  label,
  onClick,
}: {
  label: string
  onClick: () => void
}) {
  return (
    <div
      className="m-1 px-2 py-1 cursor-pointer rounded bg-l_card dark:bg-d_card"
      onClick={onClick}
    >
      {label}
    </div>
  )
}
