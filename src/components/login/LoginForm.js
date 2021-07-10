import './LoginForm.css'
import { useState } from 'react'
import { errorMessage, successMessage } from '../../utils/message'
import { useDispatch, useSelector } from 'react-redux'
import { loginAsync, clearState } from '../../features/AuthSlice'
import { useEffect } from 'react'
import { useHistory } from 'react-router'

const LoginForm = () => {

  const dispatch = useDispatch()
  const history = useHistory()

  const [formUser, setFormUser] = useState({
    email: '',
    password: '',
  })

  const { errors, isAuth, authId, user } = useSelector(({ auth }) => auth)

  const onHandleChange = (e) => {
    const { name, value } = e.target
    formUser[name] = value
    setFormUser({ ...formUser })
  }

  const onHandleSubmit = (e) => {
    e.preventDefault()
    if (formUser.email === "") {
      return errorMessage('error', 'Please input email')
    }
    if (formUser.password === "") {
      return errorMessage('error', 'Please input password')
    }
    dispatch(loginAsync({
      ...formUser
    }))
  }

  const getRoute = (route) => {
    if (route === "") {
      history.push(route)
    }
    if (route === "register") {
      history.push(route)
    }
  }

  useEffect(() => {
    if (errors.length > 0) {
      dispatch(clearState())
      errorMessage('Error!', errors[0])
    } else {
      if (isAuth !== false && authId !== null) {
        successMessage(`Well done', 'Successfully Login ${user.email}`, '')
        history.push('/homepage')
      }
    }
  }, [dispatch, errors, isAuth, authId, user, history])

  return (
    <div className="container">
      <div className="login">
        <div className="title">
          <span> Login Form</span>
        </div>

        <form onSubmit={onHandleSubmit}>
          <div className="row">
            <input type="text" placeholder="Email" name="email"
              onChange={onHandleChange}
            />
          </div>
          <div className="row">
            <input
              type="password"
              placeholder="Password"
              name="password"
              autoComplete="off"
              onChange={onHandleChange}
            />
          </div>

          <div className="row button">
            <button type="submit" className="submit" >
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
