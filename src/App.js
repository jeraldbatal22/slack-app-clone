import './App.css';
import styled from 'styled-components';
import SideBar from './components/sidebar/SideBar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Header from './components/header/Header.js'
import Chat from './components/chat/Chat';
import Login from './components/login/Login';
import LoginForm from './components/login/LoginForm'
import Register from './components/register/Register'
import { getUser } from './features/AuthSlice'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchRetrieveMessages } from './features/MessagesSlice';
import { UsersListAsync } from './features/UsersSlice'
import DirectMessage from './components/chat/DirectMessage';
import UserProfile from './components/users/UserProfile'
import CreateMessage from './components/chat/CreateMessage';

function App() {

  const dispatch = useDispatch()

  const { isAuth, authId } = useSelector(({ auth }) => auth)
  useEffect(() => {
    dispatch(getUser())
    dispatch(fetchRetrieveMessages())
    dispatch(UsersListAsync())
  }, [dispatch])

  return (
    <div className="App">

      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>

          <Route exact path="/register">
            <Register />
          </Route>

          <Route path="/login">
            <LoginForm />
          </Route>

          {(isAuth && authId !== null) ?
            <AppBody>
              <Header />
              <SideBar />

              <Switch>
                <Route path="/homepage">
                  <Chat />
                </Route>
                <Route path="/messages">
                  <DirectMessage />
                </Route>
                <Route path="/createMessage">
                  <CreateMessage />
                </Route>
                <Route path="/profile">
                  <UserProfile />
                </Route>
              </Switch>

            </AppBody>
            : <Redirect to="/homepage"></Redirect>}

        </Switch>
      </Router>
    </div>
  );
}

export default App;


const AppBody = styled.div`
  display: flex;
  height: 100vh;
 `
