import './Register.css'
import { useState,useEffect } from 'react'
import { errorMessage, successMessage } from '../../utils/message'
import { useDispatch } from 'react-redux'
import { fetchRegisterAsync,clearState } from '../../features/RegisterSlice'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
const Register = () => {
    const history = useHistory()
    const dispatch = useDispatch()
const [newUser,setNewUser] = useState({       //Setting up the state
    email: '',
    password:'',
    confirmPassword: ''
})
 
const onHandleChange = (e) =>{               //Function for storing the changes in the input field
    const {name, value} = e.target
    newUser[name] = value
    setNewUser(newUser)
}
const { status, errors, data } = useSelector(({ register }) => register)
console.log (status, errors, data)

const onHandleSubmit = (e) =>{               //Function for storing the data when being clicked
e.preventDefault()
if(newUser.email === ""){                      
return errorMessage('Error','Please input email')
}
if(newUser.password === ""){
    return errorMessage('Error','Please input password')
    }
    if(newUser.confirmPassword !== newUser.password){
        return errorMessage('Error','Password Not Match')
        }
        if(newUser.password.length < 8){
            return errorMessage('Error','Password must be greater than 8')
        }
        dispatch(fetchRegisterAsync(newUser))
}

const backToHome = () =>{                   //Function for Back button to go back on the default page
    history.push('/')
}


useEffect(() => {                                // useEffect magttrigger after submit form
   if(errors.length > 0 && status !==null){    
    dispatch(clearState())                       //Para bumalik to normal state which is the default is *null 
    return errorMessage('Error',`${errors}`)
   }else{
       if(data !== null)
       {
        successMessage('Successs!', `Successfully registered`)
        history.push('/login')
       }
   
   }
}, [errors, status, dispatch, history, data])      // Ibabato dito para ma triggr


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