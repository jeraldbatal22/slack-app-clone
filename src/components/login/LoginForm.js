import './LoginForm.css'
import { useState } from 'react'
import { errorMessage, successMessage } from '../../utils/message'
import { useDispatch, useSelector } from 'react-redux'
import { loginAsync, clearState } from '../../features/AuthSlice'
import { useEffect } from 'react'
import { useHistory } from 'react-router'
import slackLogo from './../../images/slackLogo.png';
import { UsersListAsync } from '../../features/UsersSlice'

const LoginForm = () => {
  // built-in function ng redux para ma-dispatch yung laman na ipapasa mo galing sa formUser
  const dispatch = useDispatch();
  const history = useHistory()
  //set initial state
  const [formUser, setFormUser] = useState({
    email: '',
    password: '',
  })

  // useSelector para makuha mo yung data sa redux
  const { errors, isAuth, authId, user } = useSelector(({ auth }) => auth);
  const onHandleChange = (e) => {
    const { name, value } = e.target
    formUser[name] = value
    setFormUser({ ...formUser })
  }

  //error validation
  const onHandleSubmit = (e) => {
    e.preventDefault();
    if (formUser.email === "") {
      return errorMessage('error', 'Please input email')
    }
    if (formUser.password === "") {
      return errorMessage('error', 'Please input password')
    }
    dispatch(loginAsync({ //ibabato yung laman ng form users data to redux
      ...formUser
    }))

  }


  // useEffect magttrigger after submit form
  useEffect(() => {
    if (errors.length > 0) {
      dispatch(clearState())
      errorMessage('Error!', errors[0])
    } else {
      if (isAuth !== false && authId !== null) {
        dispatch(UsersListAsync())
        successMessage('Successs!', `Welcome ${user.email}`)
        history.push('/homepage')
      }
    }
  }, [errors, user, authId, dispatch, history, isAuth]) // Ibabato dito para ma triggr

  const getRoute = (route) => { //Function for Back Button to go to Default Route
    if (route === "") {
      history.push(route)
    }
    if (route === "register") {
      history.push(route)
    }
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
