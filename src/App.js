import './App.css';
import styled from 'styled-components';
import SideBar from './components/sidebar/SideBar';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Header from './components/header/Header.js'
import Chat from './components/chat/channel/Chat';
import Login from './components/login/Login';
import LoginForm from './components/login/LoginForm'
import Register from './components/register/Register'
import { getUser } from './features/AuthSlice'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchRetrieveMessages } from './features/MessagesSlice';
import { UsersListAsync } from './features/UsersSlice'
import DirectMessage from './components/chat/user/MessagesUser';
import UserProfile from './components/users/UserProfile'
import CreateMessage from './components/chat/user/CreateMessage';
import { channelsListOwnedAsync } from './features/ChannelsSlice'
import Home from './components/home/Home';
import HeaderSearch from './components/header/HeaderSearch'

function App() {

  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const { isAuth } = useSelector(({ auth }) => auth)

  useEffect(() => {
    if (dispatch(getUser())) {
      dispatch(getUser())
      setIsLoading(false)
    }
    dispatch(fetchRetrieveMessages())
    dispatch(UsersListAsync())
    dispatch(channelsListOwnedAsync())

  }, [dispatch])


  if (isLoading) {
    return (
      <div>
        <h1>Loading... Please wait...</h1>
      </div>
    )
  }

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

          <Route exact path="/login">
            <LoginForm />
          </Route>

          {isAuth ?
            <AppBody>
              <Header />
              <SideBar />

              <Route path="/home">
                <Home />
              </Route>

              <Route path="/homepage">
                <Chat />
              </Route>

              <Route path="/search-users">
                <HeaderSearch />
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

            </AppBody>
            : <Redirect to="/asdsa" />}

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
