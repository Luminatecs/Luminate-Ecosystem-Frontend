import React from 'react'
import Snowfall from 'react-snowfall'

function Season() {
  // Check if current date is in December (month 11 in JavaScript, 0-indexed)
  const currentDate = new Date()
  const isDecember = currentDate.getMonth() === 11

  // Only render snowfall during December
  if (!isDecember) {
    return null
  }

  return (
    <Snowfall 
      color="white"
      snowflakeCount={200}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 9999,
        pointerEvents: 'none'
      }}
    />
  )
}

export default Season
