import { useEffect, useState } from "react"

interface ScrollPosition {
  x: number;
  y: number;
}

interface UseScrollReturn {
  position: ScrollPosition,
  isScrolled: boolean
}

const useScroll = ( yTrigger=0 ):UseScrollReturn => {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    x: 0,
    y: 0,
  })

  const handleScroll = () => {
    setScrollPosition({
        x: window.scrollX,
        y: window.scrollY,
    });
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, [])

  return {
    position: scrollPosition,
    isScrolled: scrollPosition.y > yTrigger
  }
}

export default useScroll