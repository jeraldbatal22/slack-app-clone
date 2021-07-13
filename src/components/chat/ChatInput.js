import styled from "styled-components"
import { Button } from "@material-ui/core"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { fetchSendMessageToChannel, fetchRetrieveMessages } from "../../features/MessagesSlice"
const ChatInput = ({ channelDetails, user, chatRef }) => {
  const dispatch = useDispatch()
  const [inputMessage, setInputMessage] = useState('')

  const onHandleChange = (e) => {
    const value = e.target.value
    setInputMessage(value)
  }
  const onHandleSend = (e) => {
    e.preventDefault()
    dispatch(fetchSendMessageToChannel({
      receiver_id: channelDetails.id,
      receiver_class: 'Channel',
      body: inputMessage,
    }))
    dispatch(fetchRetrieveMessages())
    setInputMessage('')
  }

  chatRef?.current?.scrollIntoView({
    behavior: 'smooth'
  });
  return (
    <ChatInputContainer>
      <form>
        <input type="text" value={inputMessage} name="body" placeholder={`Message # ${channelDetails && channelDetails.name.toLocaleUpperCase()}`} onChange={onHandleChange} autoComplete="off" />
        <Button onClick={onHandleSend} type="submit">SEND</Button>
      </form>
    </ChatInputContainer>
  )
}

export default ChatInput


const ChatInputContainer = styled.div`
  border-radius: 20px;

  >form {
    position: relative;
    display: flex;
    justify-content: center;
  }
  >form input {
    position: fixed;
    bottom: 30px;
    width: 60%;
    border: 1px solid gray;
    padding: 20px;
    outline: none;
  }

  >form >button {
    display: none ;
  }
`