import { createContext, useReducer, useEffect } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload.user, username: action.payload.username}
    case 'LOGOUT':
      return { user: null, username: null }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { 
    user: null,
    username: null
  })

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    const username = JSON.parse(localStorage.getItem('username'))

    if (user) {
      dispatch({ type: 'LOGIN', payload: {user: user, username: username} }) 
    }
  }, [])

  console.log('AuthContext state:', state)
  
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )

}