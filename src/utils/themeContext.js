import { createContext, useReducer } from 'react'

export const ThemeContext = createContext()

export const themeReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE':
      return state === 'dark' ? 'light' : 'dark'
    default:
      return state
  }
}
