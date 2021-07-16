import styled from "styled-components"
import { Button } from "@material-ui/core"
import { InfoOutlined, StarBorder } from "@material-ui/icons"
import { useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { fetchSendDirectMessage } from "../../features/MessagesSlice"
import { errorMessage } from "../../utils/message"
import SearchMessage from './SearchMessage'
import { Send } from "@material-ui/icons"

const DirectMessage = () => {
  const chatRef = useRef(null)
  const dispatch = useDispatch()
  const [searchId, setSearchId] = useState()

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
    if (sendText.messages === '') {
      return errorMessage('Error', "Invalid Reciever")
    } else {
      dispatch(fetchSendDirectMessage({
        receiver_id: parseFloat(searchId),
        receiver_class: 'User',
        body: sendText.message
      }))
      setSendText({
        ...sendText,
        message: '',
      })
    }
  }

  chatRef?.current?.scrollIntoView({
    behavior: 'smooth'
  });

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
        <SearchMessage searchId={searchId} setSearchId={setSearchId} />
      </ChatMessages>
      <ChatBottom ref={chatRef} />
      <ChatInputContainer>
        <form onSubmit={onHandleSend}>
          <input ref={chatRef} type="text" name="message" placeholder="Send a message" value={sendText.message} autoComplete="off" onChange={onHandleChange} />
          <Button type="submit">SEND <Send /></Button>
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

  >form >button {
    width: 5%;
    font: 1rem;
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
  height: 5vh;
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
  margin-top: 110px;
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
  padding-bottom: 150px;
`