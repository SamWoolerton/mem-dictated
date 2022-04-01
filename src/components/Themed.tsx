import { ReactNode, CSSProperties } from "react"
import { Link, To } from "react-router-dom"
import { IconType } from "react-icons/lib"
import { HiOutlinePlus, HiArrowLeft } from "react-icons/hi"

import { useTheme } from "hooks/useTheme"
import { ReactComponent as Logo } from "assets/logo.svg"

export function Card({
  children,
  style = {},
}: {
  children: ReactNode
  style?: CSSProperties
}) {
  const theme = useTheme()

  return (
    <div
      style={{
        padding: "1.5em 2em",
        borderRadius: "1em",
        boxShadow: "4px 8px 20px rgba(0,0,0,0.14)",
        backgroundColor: theme.card,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

export function Button({
  onClick,
  label,
  type = "primary",
  disabled = false,
  style = {},
}: {
  onClick: () => void
  label: string
  type?: "primary" | "danger"
  disabled?: boolean
  style?: CSSProperties
}) {
  const theme = useTheme()

  return (
    <button
      onClick={onClick}
      style={{
        padding: "0.75em 1.25em",
        borderRadius: "0.5em",
        backgroundColor:
          type === "primary" ? theme.actionBackground : theme.destructive,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        opacity: disabled ? 0.65 : 1,
        cursor: disabled ? "default" : "pointer",
        color: theme.buttonText,
        ...style,
      }}
    >
      {label}
    </button>
  )
}

export function LinkButton({
  to,
  label,
  disabled = false,
}: {
  to: To
  label: string
  disabled?: boolean
}) {
  const theme = useTheme()

  const styles = {
    padding: "1.25em 2em",
    borderRadius: "1em",
    boxShadow: "4px 8px 20px rgba(0,0,0,0.22)",
    backgroundColor: theme.actionBackground,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
    opacity: disabled ? 0.65 : 1,
  }

  const content = (
    <>
      <HiOutlinePlus color={theme.actionContent} size={34} />

      <div
        style={{
          color: theme.mode === "light" ? "white" : theme.screen,
          marginLeft: "0.75em",
        }}
      >
        {label}
      </div>
    </>
  )

  return disabled ? (
    <div style={{ ...styles, cursor: "default" }}>{content}</div>
  ) : (
    <Link to={to} style={styles}>
      {content}
    </Link>
  )
}

export function LinkIconButton({ to, Icon }: { to: To; Icon: IconType }) {
  const theme = useTheme()

  return (
    <Link
      to={to}
      style={{
        backgroundColor: theme.actionBackground,
        width: "2.5em",
        height: "2.5em",
        borderRadius: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Icon color={theme.actionContent} size={20} />
    </Link>
  )
}

export function LinkBackIcon() {
  const theme = useTheme()

  return (
    <Link
      to="/passages"
      style={{
        backgroundColor: theme.secondaryBackground,
        width: "2.5em",
        height: "2.5em",
        borderRadius: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <HiArrowLeft color={theme.secondaryContent} size={20} />
    </Link>
  )
}

export function HeaderLogo() {
  return (
    <div className="flex justify-center items-baseline py-7 text-white">
      <Logo />
      <div style={{ fontSize: 28 }} className="ml-2">
        Mem
      </div>
    </div>
  )
}

export function Header({ showBack = true }: { showBack?: boolean }) {
  const blockStyle = { width: "2.5em" }

  return (
    <div className="flex justify-between items-center">
      <div style={blockStyle}>{showBack && <LinkBackIcon />}</div>
      <Link to="/">
        <HeaderLogo />
      </Link>
      <div style={blockStyle} />
    </div>
  )
}

export const PageHeading = ({ children }: { children: ReactNode }) => (
  <h2 className="mt-0">{children}</h2>
)

export const Footer = () => (
  <Link to="/copyright" className="mt-auto mx-auto py-4 text-white">
    Copyright
  </Link>
)

export const Page = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />

      <main className="container mx-auto pb-8">{children}</main>

      <Footer />
    </>
  )
}
