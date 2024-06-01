'use client'
import React, { createContext, useState } from 'react'

// Create a Context for the user
const SelectContext = createContext()

// Create a Provider component
const SelectProvider = ({ children }) => {
  const [select, setSelect] = useState(null)

  // Function to update user data
  const updateSelect = (selectData) => {
    setSelect(selectData)
  }

  return (
    <SelectContext.Provider value={{ select, updateSelect }}>
      {children}
    </SelectContext.Provider>
  )
}

export { SelectContext, SelectProvider }
