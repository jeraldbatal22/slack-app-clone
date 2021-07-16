import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { fetchRegisterAsync, clearState } from '../../features/RegisterSlice'
import { errorMessage, successMessage } from '../../utils/message'
const Register = () => {

  const history = useHistory()
  const dispatch = useDispatch()

  const { status, errors, data } = useSelector(({ register }) => register)

  //Setting up the state for register
  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })

  const onHandleChange = (e) => {
    const { name, value } = e.target
    newUser[name] = value
    setNewUser(newUser)
  }

  const onHandleSubmit = (e) => {
    e.preventDefault()
    if (newUser.email === "") {
      return errorMessage('Error', 'Please input email')
    }
    if (newUser.password === "") {
      return errorMessage('Error', 'Please input password')
    }
    if (newUser.confirmPassword !== newUser.password) {
      return errorMessage('Error', 'Password Not Match')
    }
    if (newUser.password.length < 8) {
      return errorMessage('Error', 'Password must be greater than 8')
    }
    dispatch(fetchRegisterAsync(newUser))
  }

  // Back to default route "/"
  const backToHome = () => {
    history.push('/')
  }

  //Triggred first when submitting the form
  useEffect(() => {
    if (errors.length > 0 && status !== null) {
      dispatch(clearState())  // reset to default value from redux
      return errorMessage('Error', `${errors}`)
    } else {
      if (data !== null) {
        successMessage('Success!', `Successfully registered`)
        history.push('/login')
      }
    }
  }, [errors, status, dispatch, history, data])

  return (
    <div className="container">
      <div className="register">
        <div className="title">
          <span> Register Form</span>
        </div>

        <form onSubmit={onHandleSubmit}>
          <div className="row">
            <input
              type="text"
              placeholder="Email"
              id="email"
              name="email"
              autoComplete="off"
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
          <div className="row">
            <input
              type="password"
              placeholder="Conifrm Password"
              name="confirmPassword"
              autoComplete="off"
              onChange={onHandleChange}
            />
          </div>
          <div className="row button">
            <button type="submit" className="submit" >
              Submit Form
            </button>
          </div>

          <div className="row button back">
            <button type="button" className="cancel" onClick={backToHome}  >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register