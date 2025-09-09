import { useState, useCallback } from "react"

/**
 * A custom hook for toggling boolean state
 * 
 * @param initialValue - The initial boolean value
 * @returns [value, toggle, setValue] - The current value, toggle function, and setter function
 */
export function useToggle(initialValue: boolean = false): [boolean, () => void, (value: boolean) => void] {
  const [value, setValue] = useState(initialValue)

  const toggle = useCallback(() => {
    setValue(prev => !prev)
  }, [])

  return [value, toggle, setValue]
}
