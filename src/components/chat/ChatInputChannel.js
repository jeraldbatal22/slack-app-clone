import styled from "styled-components"
import { Button } from "@material-ui/core"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { fetchSendMessageToChannel, fetchRetrieveMessages } from "../../features/MessagesSlice"
import { Send } from "@material-ui/icons"
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
        <Button onClick={onHandleSend} type="submit">SEND <Send/></Button>
      </form>
    </ChatInputContainer>
  )
}

export default ChatInput


const ChatInputContainer = styled.div`

  >form {
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: flex-start;
    margin-top: 250px;
    width: 100%;
    padding: 20px;
    padding-left: 40px;
    background-color: white;
  }
  >form input {
    bottom: 30px;
    width: 70%;
    border: 1px solid gray;
    border-radius: 5px;
    padding: 20px;
    outline: none;
  }
`