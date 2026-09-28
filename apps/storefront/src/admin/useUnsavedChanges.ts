import { useEffect } from 'react'

export function useUnsavedChanges(hasUnsavedChanges: boolean) {
  useEffect(() => {
    if (!hasUnsavedChanges) return

    const preventNavigation = (event: BeforeUnloadEvent) => {
      event.preventDefault()
      event.returnValue = ''
    }

    window.addEventListener('beforeunload', preventNavigation)
    return () => window.removeEventListener('beforeunload', preventNavigation)
  }, [hasUnsavedChanges])
}
