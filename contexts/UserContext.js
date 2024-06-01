'use client'
import React, { createContext, useState } from 'react'

// Create a Context for the user
const UserContext = createContext()

// Create a Provider component
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  // Function to update user data
  const updateUser = (userData) => {
    setUser(userData)
  }

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }
