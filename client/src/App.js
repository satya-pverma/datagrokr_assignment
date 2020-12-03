import React, { useEffect, createContext, useReducer, useContext } from 'react';
import Navbar from './components/Navbar'
import './App.css';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom'
import Home from './components/screens/Home';
import Signin from './components/screens/Signin';
import Signup from './components/screens/Signup';
import CreatePost from './components/screens/CreatePost';
import { reducer, initialState } from './reducers/userReducer'

import { Comment } from './components/screens/Comment';
import { Demohome } from './components/screens/Demohome';
import { Edit } from './components/screens/Edit';


export const UserContext = createContext()

const Routing = () => {

  const history = useHistory()

  const { state, dispatch } = useContext(UserContext)
  useEffect(() => {

    const user = JSON.parse(localStorage.getItem("user"))
    if (user) {
      dispatch({ type: "USER", payload: user })

    }
    else {
      history.push('/home')
    }
  }, [])
  return (
    <Switch>
      <Route exact path="/" component={Home} />

      <Route exact path="/signup" component={Signup} />
      <Route exact path="/signin" component={Signin} />
      <Route exact path="/home" component={Demohome} />
      <Route exact path="/createpost" component={CreatePost} />
      <Route exact path="/comments/:postid" component={Comment} />
      <Route exact path="/edit/:postid" component={Edit} />


    </Switch >


  )
}


function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Navbar />
        <Routing />



      </BrowserRouter>
    </UserContext.Provider>



  );
}

export default App;
