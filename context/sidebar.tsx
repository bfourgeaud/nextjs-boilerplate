"use client"

import {
  createContext,
  useContext,
  useState,
  SetStateAction,
  useEffect,
} from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const initialState = {
  isOpen: false,
  setOpen: (value: SetStateAction<boolean>) => {},
}

const SidebarContext = createContext(initialState)
export const useSidebar = () => useContext(SidebarContext)

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setOpen] = useState(initialState.isOpen)

  const pathname = usePathname()
  useEffect(() => setOpen(false), [pathname])

  return (
    <SidebarContext.Provider value={{ isOpen, setOpen }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function ToggleSideBarButton({
  className,
  ...props
}: React.SVGAttributes<SVGSVGElement>) {
  const { isOpen, setOpen } = useSidebar()

  return (
    <button
      className="cursor-pointer inline-block"
      onClick={() => setOpen(!isOpen)}
      aria-labelledby="Open Menu"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={cn("w-6 h-6", className)}
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M0 0h24v24H0z" stroke="none" />
        <path d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  )
}
