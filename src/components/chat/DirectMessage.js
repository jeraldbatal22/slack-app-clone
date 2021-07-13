import styled from "styled-components"
import { Button } from "@material-ui/core"
import { InfoOutlined, StarBorder } from "@material-ui/icons"
import { useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { fetchSendDirectMessage } from "../../features/MessagesSlice"
import { errorMessage } from "../../utils/message"
import SearchMessage from './SearchMessage'

const DirectMessage = () => {
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

  const onHandleSend = (e) => {
    e.preventDefault()
    if (sendText.messages === '' || sendText.receiver_id === '') {
      return errorMessage('Error', "Invalid Reciever")
    } else {
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
    }

  }

  return (
    <ChatContainer>
      <Header>
        <HeaderLeft>
          <h4><strong></strong></h4>
          <StarBorder />
        </HeaderLeft>

        <HeaderRight>
          <p>
            <InfoOutlined /> Details
          </p>
        </HeaderRight>
      </Header>
      <ChatMessages>
        <SearchMessage />
      </ChatMessages>
      <ChatBottom ref={chatRef} />
      <ChatInputContainer>
        <form onSubmit={onHandleSend}>
          <input type="text" name="message" placeholder="Send a message" value={sendText.message} autoComplete="off" onChange={onHandleChange} />
          <input type="number" name="receiver_id" value={sendText.receiver_id} placeholder="Receiver Id" autoComplete="off" onChange={onHandleChange} />
          <Button type="submit">SEND</Button>
        </form>
      </ChatInputContainer>
    </ChatContainer>
  )
}

export default DirectMessage

const ChatInputContainer = styled.div`
  border-radius: 20px;

  >form {
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: center;
    margin-top: 250px;
    width: 80%;

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
const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 60px;
`
const Header = styled.div`
  background: #fff;
  width: 78%;
  position: fixed;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;

  > h4 {
    display: flex;
    margin-right: 10px;
  }

`
const HeaderRight = styled.div`
  > p {
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  > p > .MuiSvgIcon-root {
    margin-right: 5px;
    font-size: 16px;
  }
`

const ChatMessages = styled.div`
  margin-top: 60px;
  >table {
    margin-top: 20px;
    margin-right: 30px;
    text-align:center;
  }
  > table tbody {
    margin: 0px 20px;
  }

`

const ChatBottom = styled.div`
  padding-bottom: 200px;
`