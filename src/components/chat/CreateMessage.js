import styled from "styled-components"
import { Button } from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
import { useRef, useState, useEffect } from "react"
import { errorMessage, successMessage } from "../../utils/message"
import { fetchSendDirectMessage, clearStateRetrieveMessages } from "../../features/MessagesSlice"
const CreateMessage = () => {
  const chatRef = useRef(null)
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

  // const { messages } = useSelector(store => store)
  const onHandleSend = (e) => {
    e.preventDefault()
    if (sendText.receiver_id === '') {
      return errorMessage('Error', "Input sender id")
    }
    if (sendText.message === '') {
      return errorMessage('Error', "Input some message")
    }
    else {
      dispatch(fetchSendDirectMessage({
        receiver_id: parseFloat(sendText.receiver_id),
        receiver_class: 'User',
        body: sendText.message
      }))
      setSendText({
        ...sendText,
        message: '',
        receiver_id: ''
      })
      return successMessage('Success', `Success fully send message`)
    }

  }

  return (
    <ChatContainer>
      <form >
        <label>To</label>
        <input type="number" value={sendText.receiver_id} name="receiver_id" placeholder="Receiver Id" autoComplete="off" onChange={onHandleChange} />
        <label>Message</label>
        <input type="text" name="message" value={sendText.message} placeholder="Send a message" autoComplete="off" onChange={onHandleChange} />
        <Button type="submit" onClick={onHandleSend}>SEND</Button>
      </form>
    </ChatContainer>
  )
}

export default CreateMessage

const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 60px;
  
  >form {
    display: flex;
    justify-content: center;
    margin-top: 250px;
    flex-direction: column;
    width: 50%;
    margin: auto;
    height: 70vh;
  }
  >form input {
    bottom: 30px;
    /* width: 100%; */
    margin: 20px;
    border: 1px solid gray;
    padding: 20px;
    outline: none;
  }

  >form >button {
    /* display: none ; */
  }

`
