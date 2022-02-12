export default function Tag({
  label,
  onClick,
}: {
  label: string
  onClick: () => void
}) {
  return (
    <div
      className="m-1 p-1 cursor-pointer rounded bg-gray-100 dark:bg-gray-800 dark:text-gray-300"
      onClick={onClick}
    >
      {label}
    </div>
  )
}
