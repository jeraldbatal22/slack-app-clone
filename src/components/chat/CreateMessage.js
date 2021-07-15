import styled from "styled-components"
import { Button } from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { errorMessage, successMessage } from "../../utils/message"
import { fetchSendDirectMessage } from "../../features/MessagesSlice"
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
    const userId = users.list.find(index => index.id === parseFloat(sendText.receiver_id))
    if (sendText.receiver_id === '') {
      return errorMessage('Error', "Input sender id")
    }
    if (sendText.message === '') {
      return errorMessage('Error', "Input some message")
    }
    if (!userId) {
      errorMessage('Error', `Id ${sendText.receiver_id} is not registered as a user`)
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
      return successMessage('Success', `Successfully send message`)
    }

  }

  return (
    <ChatContainer>
      <h2>New Message</h2>
      <form >
      <div classname="createMessage-to">
        <label>To</label>
        <input type="number" value={sendText.receiver_id} name="receiver_id" placeholder="Receiver Id" autoComplete="off" onChange={onHandleChange} />
      </div>  
      <div className="createMessage-message">
        <input type="text" name="message" value={sendText.message} placeholder="Send a message" autoComplete="off" onChange={onHandleChange} />
        <Button type="submit" onClick={onHandleSend}>SEND</Button>
      </div>
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
    justify-content: space-around;
    align-items: center;
    border: none;
    //border-top: 1px solid black;
    //border-bottom: 1px solid black;
    width: 96.7%;
    padding-left: 20px;
    padding-right: 20px;
  }

  >form >div >input {
    bottom: 30px;
    width: 80%;
    height: 30px
    border: 1px solid transparent;
    outline: none;
    padding: 20px  }

  >form >button {
    /* display: none ; */
  }

`
