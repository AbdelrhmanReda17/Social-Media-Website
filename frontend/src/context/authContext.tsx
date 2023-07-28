import { createContext, useReducer , useEffect} from 'react'

interface AuthContextValue {
  user: any; 
  dispatch: React.Dispatch<any>; 
}

export const AuthContext = createContext< AuthContextValue | null >(null);



export const authReducer = (state : any, action : any) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload }
    case 'LOGOUT':
      return { user: null }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children } : any) => {

  const [state, dispatch] = useReducer(authReducer, { 
    user: null
  })
  
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user') || "null");
    if(user){
      dispatch({type:'LOGIN' , payload: user })
    }
  },[])

  console.log('AuthContext state:', state)
  
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )

}