import React, { useRef } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { fetchDirectMessageToUser, senderIdMessage, clearDirectMessage } from "../../features/MessagesSlice"
import styled from 'styled-components'
import defaultImage from '../../images/profile.jpg'
import { errorMessage } from '../../utils/message'
import { Button } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const SearchMessage = ({ searchId, setSearchId, state, setState }) => {
  const chatRef = useRef(null)
  const dispatch = useDispatch()
  const { messages, users } = useSelector(store => store)
  const onHandleChange = (e) => {
    setSearchId(e.target.value)
  }

  const onHandleSearch = (e) => {
    e.preventDefault()
    const user = users.list.find(user => user.id === parseFloat(searchId))
    if (!user) {
      return errorMessage('Error', `Id ${searchId} is not registered as a user`)
    }
    if (messages.directMsgList.length > 0) {
      console.log(messages.directMsgList.length)
      return errorMessage('Error', `No conversation history found with ${user.email}`)
    }
    else {
      dispatch(fetchDirectMessageToUser(searchId))
      setState(true)
    }
  }

  const showMessage = (recent) => {
    dispatch(fetchDirectMessageToUser(parseFloat(recent.id)))
    dispatch(senderIdMessage({ senderId: recent.id }))
    setState(true)
  }

  const back = () => {
    dispatch(clearDirectMessage())
    setState(false)
  }

  chatRef?.current?.scrollIntoView({
    behavior: 'smooth'
  });

  return (
    <FormContainer onSubmit={onHandleSearch}>
      {state &&
        <ArrowBackIcon onClick={back} />
      }
      <HeaderSearch>
        <h1>Search Conversation</h1>

        <input
          ref={chatRef}
          className="maker__name"
          type="number"
          placeholder="Input User Id"
          onChange={onHandleChange}
        />

        <button ref={chatRef} type="submit" className="maker__action"  >SUBMIT</button>
      </HeaderSearch>

      {
        state &&
          messages.directMsgList &&
          messages.directMsgList.length > 0 ?
          messages.directMsgList.map((message, index) => {
            const newEmail = message.sender ? message.sender.email.split('@') : "Me"
            const username = newEmail[0].toUpperCase()
            const dateString = new Date(message.created_at)
            const date = dateString.toDateString()
            const hours = dateString.toLocaleTimeString()

            return <MessageContainer key={index} ref={chatRef} >
              <img src={defaultImage} alt='' />
              <MessageInfo>
                <h4>
                  {message.sender ? username : "Me"}
                  <span>{date}<span>{hours}</span></span>
                </h4>
                <p>{message.body}</p>
              </MessageInfo>
            </MessageContainer>
          })
          :
          <RecentMessageInfo >
            <MessageInfo>
              {
                messages.recentMessageList &&
                messages.recentMessageList.map((recent, index) => {
                  const newEmail = recent.email.split('@');
                  const username = newEmail[0].toUpperCase()
                  return <h2 key={index}>
                    <img src={defaultImage} alt='' />
                    <Button onClick={() => showMessage(recent)} className="button">{username}</Button>
                  </h2>
                })
              }
            </MessageInfo>
          </RecentMessageInfo>
      }

      <ChatBottom ref={chatRef} />

    </FormContainer>
  )
}

export default SearchMessage

const FormContainer = styled.form`
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

const HeaderSearch = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin-top: 62px;
  margin-right: 160px;
  top: 0;
  height: 10vh;

  >h1 {
    font-size: 1.3rem;
  }
  >button {
    margin-bottom: 200px;
    display: none;
  }
  >input {
    margin-top: 10px;
    padding: 8px 10px;
    margin-bottom: 7px;
    text-align: center;
    border: none;
    background: #3f0f40;
    border-radius: 10px;
    color: #fff;
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
  &:hover{
    background-color: whitesmoke;
  }

  > img {
    height: 45px;
    border-radius: 999px;
    margin-left: 30px;
  }
`

const RecentMessageInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  padding-left: 30px;
  width: auto;
  background-color: white;
  height: auto;

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
  padding-bottom: 0px;
`