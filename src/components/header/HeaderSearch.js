import styled from "styled-components"
import { useRef, useState } from "react"
import { InfoOutlined } from "@material-ui/icons"
import { Button } from "@material-ui/core"
import defaultImage from '../../images/profile.jpg'
import { useDispatch, useSelector } from "react-redux"
import { errorMessage } from "../../utils/message"
import { fetchSendDirectMessage } from "../../features/MessagesSlice"

const HeaderSearch = () => {
  const dispatch = useDispatch()
  const chatRef = useRef(null)
  const [sendText, setSendText] = useState({
    message: '',
    receiver_id: ''
  })
  const { messages } = useSelector(store => store)

  const onHandleChange = (e) => {
    const { name, value } = e.target
    sendText[name] = value
    setSendText({ ...sendText })
  }

  const onHandleSend = (e) => {
    e.preventDefault()
    if (sendText.messages === '') {
      return errorMessage('Error', "Invalid Receiver")
    } else {
      dispatch(fetchSendDirectMessage({
        receiver_id: parseFloat(messages.senderId),
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
      <FormContainer>
        {
          messages.directMsgList.map((message, index) => {
            // const newEmail = message.sender.email.split('@')
            // const username = newEmail[0].toUpperCase()
            const dateString = new Date(message.created_at)
            const date = dateString.toDateString()
            const hours = dateString.toLocaleTimeString()
            return <MessageContainer key={index} ref={chatRef} >
              <img src={defaultImage} alt='' />
              <MessageInfo>
                <h4>
                  {/* {message.sender ? username : "Me"} */}
                  {message.sender.email}
                  <span>{date}<span>{hours}</span></span>
                </h4>
                <p>{message.body}</p>
              </MessageInfo>
            </MessageContainer>
          })
        }
      </FormContainer>
      <ChatBottom ref={chatRef} />
      <ChatInputContainer>
        <form
          onSubmit={onHandleSend}
        >
          {
            // state && messages.directMsgList.length > 0 && <> <input ref={chatRef} type="text" name="message" placeholder="Send a message" value={sendText.message} autoComplete="off" onChange={onHandleChange} />
            <> <input ref={chatRef} type="text" name="message" placeholder="Send a message" value={sendText.message} autoComplete="off" onChange={onHandleChange} />
              <Button type="submit">SEND</Button></>
          }
        </form>
      </ChatInputContainer>
    </ChatContainer>
  )
}

export default HeaderSearch

const ChatInputContainer = styled.div`
  border-radius: 20px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  >form {
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: flex-start;
    margin-top: 50px;
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
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`
const Header = styled.div`
  background: #fff;
  height: 3vh;
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

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  padding-left: 30px;
  width: auto;
  background-color: white;
  height: auto;
  margin-top: 5px;
  &:hover{
    background-color: whitesmoke;
  }

  > img {
    height: 45px;
    border-radius: 999px;
  }
`

const MessageInfo = styled.div`
  padding-left: 10px;

  > h4 > span {
    color:gray;
    font-weight: 300;
    margin-left:4px ;
    font-size: 10px;
  }
  > h4 > span > .MuiSvgIcon-root  {
    color:gray;
    font-weight: 300;
    margin-left:5px;
    font-size: 20px;
    cursor: pointer;
  }

  > h4 > span  >p >form  {
    color:gray;
    font-weight: 300;
    margin-left:5px;
    font-size: 20px;
    cursor: pointer;
    background: red;
  }

  h1 {
    position: fixed;
    top: 0;
    margin-top: 80px;
  }

  h2 {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  h2 p {
    font-size: 1rem;
  }

  img {
    width: 40px;
    border-radius: 999px;
    margin-left: 30px;
  }

  .MuiButtonBase-root  {
    margin-left: 10px;
  }

  .MuiButtonBase-root:hover  {
    background: #3f0f40;
    color: #fff;
  }
`

const ChatBottom = styled.div`
  padding-bottom: 150px;
`
const FormContainer = styled.form`
margin-top: 80px;
 > h1 {
   margin-left: 20px;
   display: flex;
   justify-content: center;
   align-items: center;
   height: 75vh;
   font-size: 3rem;
  }
  .MuiSvgIcon-root {
    margin-left: 30px;
    position: fixed;
    cursor: pointer;
  }
  .MuiSvgIcon-root:hover {
    background: #000;
    color: #fff;
  }
`