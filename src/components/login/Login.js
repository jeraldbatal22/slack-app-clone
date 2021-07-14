import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core"
import styled from "styled-components"
import slackLogo from './../../images/slackLogo.png';


const Login = () => {
  const history = useHistory();
  const showLoginForm = () => {
    history.push('/login')
  }

  return (
    <LoginContainer>
      <LoginInnerContainer>
        <img src={slackLogo} alt="slack" />
        <h1>Sign in to the Slack App Clone</h1>

        <Button type="button" onClick={showLoginForm}>
          Sign in as User
        </Button>

      </LoginInnerContainer>
    </LoginContainer>
  )
}

export default Login

const LoginContainer = styled.div`
  background: #ffff;
  height: 100vh;
  display: grid;
  place-items: center;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`

const LoginInnerContainer = styled.div`
  padding:100px;
  text-align: center;
  background: #fff;
  border-radius: 10px;
  box-shadow:0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  img {
    object-fit: contain;
    height: 100px;
    margin-bottom: 70px;
  }

  button {
    margin-top:50px;
    text-transform: inherit !important;
    background: #0a8d48;
    color:#fff;
  }

  button:hover {
    background: gray;
  }
`
