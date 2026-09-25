import React, { useEffect, useState } from 'react'

const MinimalistModal = () => {
      const [isOpen, setIsOpen] = useState(false)

       useEffect(() => {
          // Check if user has already acknowledged the beta notice
          const hasSeenNotice = localStorage.getItem("minimalist_knowledge")
          if (!hasSeenNotice) {
            setIsOpen(true)
          }
        }, [])
      
        const handleAcknowledge = () => {
          localStorage.setItem("minimalist_knowledge", "true")
          setIsOpen(false)
        }
      
  return (
    <div>
        <p>minimalist</p>
        <button onClick={handleAcknowledge}>proceed</button>
    </div>
  )
}

export default MinimalistModal