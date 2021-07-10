import './App.css';
import Login from './components/login/Login';
import LoginForm from './components/login/LoginForm';
import styled from 'styled-components';
import Header from './components/header/Header';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const App = () => {

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/login">
          <LoginForm />
        </Route>
        <AppBody>
          <Switch>
              <Route path="/homepage">
              <Header/>
              </Route>
          </Switch>
           
        </AppBody>
      </Switch>
    </Router>
  );
}

export default App;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
 `