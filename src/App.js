import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import styled from 'styled-components';

import Login from './components/login/Login';
import LoginForm from './components/login/LoginForm';
import Header from './components/header/Header';
import Register from './components/register/Register';
import SideBar from './components/sidebar/SideBar';
import Chat from './components/chat/Chat';
import { getUser } from './features/AuthSlice';
import { channelsListAsync } from './features/ChannelsSlice';
import { UsersListAsync } from './features/UsersSlice';


const App = () => {
  const dispatch = useDispatch(); //
  
  const { isAuth, authId } = useSelector(({ auth }) => auth)

  useEffect(() => {
    dispatch(UsersListAsync());
    dispatch(channelsListAsync());
    dispatch(getUser()); //priority getUser 
  }, [dispatch])
  

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login/>
        </Route>

        <Route path="/login">
          <LoginForm />
        </Route>

        <Route path="/register">
          <Register/>
        </Route>

        { isAuth && authId !== null ? ( //Condition if the User is already Login 
            <AppBody>
              <Header/>
              <SideBar/>
                <Switch>
                  <Route path="/homepage">
                    <Chat/>
                  </Route>
                </Switch>
            </AppBody>
        ) : <Redirect to ="/homepage"/>
        }
      </Switch>
    </Router>
  );
}

export default App;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`