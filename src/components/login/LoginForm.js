import { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import slackLogo from './../../images/slackLogo.png';
import { errorMessage, successMessage } from '../../utils/message'
import { loginAsync, clearState } from '../../features/AuthSlice'
import { UsersListAsync } from '../../features/UsersSlice'

const LoginForm = () => {
  // To triggred state change. With React Redux, your components never access the store directly.
  const dispatch = useDispatch();

  // redirect pathing
  const history = useHistory()

  //set initial state for login
  const [formUser, setFormUser] = useState({ email: '', password: '' })

  // useSelector to get access the data in redux
  const { errors, isAuth, authId, user } = useSelector(({ auth }) => auth);
  
  const onHandleChange = (e) => {
    const { name, value } = e.target
    formUser[name] = value
    setFormUser({ ...formUser })
  }

  const onHandleSubmit = (e) => {
    e.preventDefault();
    if (formUser.email === "") {
      return errorMessage('error', 'Please input email')
    }
    if (formUser.password === "") {
      return errorMessage('error', 'Please input password')
    }

    // send data to redux and compare to api if exist?
    dispatch(loginAsync({ ...formUser }))

  }

  // triggred first when submitting the form
  useEffect(() => {
    if (errors.length > 0) {
      dispatch(clearState())
      errorMessage('Error!', errors[0])
    } else {
      if (isAuth !== false && authId !== null) {
        dispatch(UsersListAsync())
        successMessage('Success!', `Welcome ${user.email}`)
        history.push('/homepage')
      }
    }
  }, [errors, user, authId, dispatch, history, isAuth])

  //Function for Back and register to go to Default Route
  const getRoute = (route) => {
    route === "" && history.push(route)
    route === "register" && history.push(route)
  }

  return (
    <div className="container">
      <div className="login">
        <img src={slackLogo} alt="slack" style={{ width: '100px', marginTop: '-20px', marginBottom: '20px' }} />
        <div className="title">
          <span> Login Form</span>
        </div>

        <form onSubmit={onHandleSubmit}>
          <div className="row">
            <input
              type="text"
              placeholder="Email"
              name="email"
              onChange={onHandleChange} />
          </div>

          <div className="row">
            <input
              type="password"
              placeholder="Password"
              name="password"
              autoComplete="off"
              onChange={onHandleChange} />
          </div>

          <div className="row button">
            <button type="submit" className="submit">
              Login
            </button>
          </div>

          <div className="row button back">
            <button
              type="button"
              className="cancel"
              onClick={() => getRoute('')}
            >
              Back
            </button>
            <div className="signup-link">
              Not registered as a User?{' '}
              <button
                type="button"
                className="not-registered"
                onClick={() => getRoute('register')}
              >
                Signup now
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
