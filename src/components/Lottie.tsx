import { useEffect, useRef } from "react"
import lottie from "lottie-web"

// per https://github.com/chenqingspring/react-lottie/issues/139
const Lottie = ({
  animationData,
  width,
  height,
}: {
  animationData: any
  width: number
  height: number
}) => {
  const element = useRef<HTMLDivElement>(null)
  const lottieInstance = useRef<any>()

  useEffect(() => {
    if (element.current) {
      lottieInstance.current = lottie.loadAnimation({
        animationData,
        container: element.current,
      })
    }
  }, [animationData])

  return <div style={{ width, height }} ref={element}></div>
}

export default Lottie
