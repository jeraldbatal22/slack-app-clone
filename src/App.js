import './App.css';
import Login from './components/login/Login';
import LoginForm from './components/login/LoginForm';
import styled from 'styled-components';
import Header from './components/header/Header';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Register from './components/register/Register';
import { useSelector } from 'react-redux';
const App = () => {
  const { isAuth, authId } = useSelector(({ auth }) => auth)

  return (
    
    <Router>
      <Switch>

        <Route exact path="/">
          <Login />
        </Route>

        <Route path="/login">
          <LoginForm />
        </Route>

        <Route path="/register">
          <Register />
        </Route>

{ isAuth && authId !== null ?( //Condition if the User is already Login 
    <AppBody>
      <Header/>
        <Switch>
          <Route path="/homepage">
     
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