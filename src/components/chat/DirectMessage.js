import styled from "styled-components"
import { Button } from "@material-ui/core"
import { InfoOutlined } from "@material-ui/icons"
import { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchSendDirectMessage } from "../../features/MessagesSlice"
import { errorMessage } from "../../utils/message"
import SearchMessage from './SearchMessage'

const DirectMessage = () => {
  const chatRef = useRef(null)
  const dispatch = useDispatch()
  const [state, setState] = useState(false)
  const [searchId, setSearchId] = useState('')

  const [sendText, setSendText] = useState({
    message: '',
    receiver_id: ''
  })

  const onHandleChange = (e) => {
    const { name, value } = e.target
    sendText[name] = value
    setSendText({ ...sendText })
  }

  const { messages } = useSelector(store => store)

  const onHandleSend = (e) => {
    e.preventDefault()
    if (sendText.messages === '') {
      return errorMessage('Error', "Invalid Receiver")
    } else {
      dispatch(fetchSendDirectMessage({
        receiver_id: parseFloat(searchId) || parseFloat(messages.senderId),
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
          <h1>Recent Messages</h1>
        </HeaderLeft>

        <HeaderRight>
          <p>
            <InfoOutlined /> Details
          </p>
        </HeaderRight>
      </Header>
      <ChatMessages>
        <SearchMessage searchId={searchId} setSearchId={setSearchId} state={state} setState={setState} />
      </ChatMessages>

      <ChatBottom ref={chatRef} />
      <ChatInputContainer>
        <form onSubmit={onHandleSend}>
          {
            state && messages.directMsgList.length > 0 && <> <input ref={chatRef} type="text" name="message" placeholder="Send a message" value={sendText.message} autoComplete="off" onChange={onHandleChange} />
              <Button type="submit">SEND</Button></>
          }
        </form>
      </ChatInputContainer>
    </ChatContainer>
  )
}

export default DirectMessage

const ChatInputContainer = styled.div`
  border-radius: 20px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;

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
  height: 5vh;
  position: fixed;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  width: 83.2%;
  z-index: 2;

`

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;

  > h4 {
    display: flex;
    margin-right: 10px;
  }

`
const HeaderRight = styled.div`
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  margin-right: 5%;
  margin-top: 0.7%;


  > p {
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  > p > .MuiSvgIcon-root {
    margin-right: 5%;
    font-size: 16px;
  }
`

const ChatMessages = styled.div`
  margin-top: 110px;
  > table {
    margin-top: 20px;
    margin-right: 30px;
    text-align:center;
    margin-bottom: 200px;
  }
  > table tbody {
    margin: 0px 20px;
  }

`

const ChatBottom = styled.div`
  padding-bottom: 150px;
`