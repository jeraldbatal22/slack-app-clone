import styled from "styled-components"
import { Button } from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { errorMessage } from "../../../utils/message"
import { fetchSendDirectMessage } from "../../../features/MessagesSlice"

const CreateMessage = () => {
  const dispatch = useDispatch()

  const [sendText, setSendText] = useState({
    message: '',
    receiver_id: ''
  })

  const onHandleChange = (e) => {
    const { name, value } = e.target
    sendText[name] = value
    setSendText({ ...sendText })
  }

  const { users } = useSelector(store => store)
  const onHandleSend = (e) => {
    e.preventDefault()

    const user = users.list.find(user => user.email === sendText.receiver_id)

    const getId = user && user.id

    if (sendText.receiver_id === '') {
      return errorMessage('Error', "Please enter user email.")
    }
    if (sendText.message === '') {
      return errorMessage('Error', "Message can't be blank.")
    }
    if (!getId) {
      errorMessage('Error', `ID ${sendText.receiver_id} is not registered as a user`)
    }
    else {
      dispatch(fetchSendDirectMessage({
        receiver_id: getId,
        receiver_class: 'User',
        body: sendText.message
      }))
      setSendText({
        ...sendText,
        message: '',
        receiver_id: ''
      })
      return console.log(`Successfully sent message.`)
    }

  }

  return (
    <ChatContainer>
      <h2>New Message</h2>
      <form >
        <CreateMessageTo>
          <label>To: </label>
          <input type="text" value={sendText.receiver_id} name="receiver_id" placeholder="Receiver ID" autoComplete="off" onChange={onHandleChange} />
        </CreateMessageTo>
        <MessageBody>
          <input type="text" name="message" value={sendText.message} placeholder="Enter a message" autoComplete="off" onChange={onHandleChange} />
          <Button type="submit" onClick={onHandleSend}>SEND</Button>
        </MessageBody>
      </form>
    </ChatContainer>
  )
}

export default CreateMessage

const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 0;
  box-sizing: border-box;
  overflow-x: hidden;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;

  >h2{
    margin-top: 8vh;
    padding: 15px;
    border: none;
  }

  >form {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    width: 100%;
    height: 81vh;
    //border: 1px solid black;  
  }

  >form >div{
    display: flex;
    align-items: center;
    border: none;
    //border-top: 1px solid black;
    //border-bottom: 1px solid black;
    width: 96.7%;
  }


  >form >button {
    /* display: none ; */
  }

`

const CreateMessageTo = styled.div`

  margin-left: 5%;

  label {
    font-weight: 600;
    margin-right: 2%;
  }

  input {
    bottom: 30px;
    width: 25%;
    height: 30px;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 3px solid black;
    outline: none;
    padding: 10px 
  }
`
const MessageBody = styled.div`

justify-content: space-evenly;
margin-bottom: 2%;

  button {
    font-weight: 600;
    margin-left: 2%;
  }

  input {
    margin-left: 3%;
    bottom: 30px;
    width: 90%;
    height: 30px;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 3px solid black;
    outline: none;
    padding: 10px 
  }
`