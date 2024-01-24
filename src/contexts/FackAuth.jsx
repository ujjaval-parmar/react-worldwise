import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
    user: null,
    isAuthenticated: false
}

function reducer( state, action){

    switch(action.type){

        case 'login':
            return{
                ...state,
                user: action.payload,
                isAuthenticated: true
            }


        case 'logout':
            return{
                ...state,
                user: null,
                isAuthenticated: false
            }

        default:
            throw new Error('Unknown Action Type!');

    }


}

const FAKE_USER = {
    name: "ujjaval",
    email: "ujjaval@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
  };


function AuthProvider({ children }){

    const [{user, isAuthenticated}, dispatch] = useReducer( reducer, initialState);


    function login(email, password){
        if(FAKE_USER.email === email && FAKE_USER.password === password){
            dispatch({ type:'login', payload: FAKE_USER });
        }
    }



    function logout(){
        dispatch({ type: 'logout'});
    }



    return(
        <AuthContext.Provider value={
            {
               user, isAuthenticated, login, logout 
            }
        }>
            {children}
        </AuthContext.Provider>
    )

}

function useAuth(){
    const context = useContext(AuthContext);

    if (context === undefined)
      throw new Error('PostContext was used outside of AuthProvider!');
  
    return context;
  
}

export { AuthProvider, useAuth };