import { useCallback, useState } from 'react'
import useNoInitialEffect from './use-no-initial-effect'

export function debounce (fn, time) {
  let timeoutId
  return wrapper
  function wrapper (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      timeoutId = null
      fn(...args)
    }, time)
    // return a function that clears the timeout for use in useEffect cleanup
    return () => clearTimeout(timeoutId)
  }
}

export default function useDebounceCallback (fn, time, deps = []) {
  const [args, setArgs] = useState([])
  const memoFn = useCallback(fn, deps)
  useNoInitialEffect(debounce(() => memoFn(...args), time), [memoFn, time, args, ...deps])
  return useCallback((...args) => setArgs(args), [])
}
