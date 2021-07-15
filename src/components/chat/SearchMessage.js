import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { fetchDirectMessageToUser } from "../../features/MessagesSlice"
import styled from 'styled-components'
import defaultImage from '../../images/profile.jpg'
import { errorMessage } from '../../utils/message'

const SearchMessage = ({ searchId, setSearchId }) => {
  const [state, setstate] = useState(false)
  const chatRef = useRef(null)
  const dispatch = useDispatch()
  const { messages, users } = useSelector(store => store)
  const onHandleChange = (e) => {
    setSearchId(e.target.value)
  }

  const onHandleSearch = (e) => {
    e.preventDefault()
    const user = users.list.find(user => user.id === parseFloat(searchId))
    console.log(user, searchId)
    if (!user) {
      errorMessage('Error', `Id ${searchId} is not registered as a user`)
    } else {
      dispatch(fetchDirectMessageToUser(parseFloat(searchId)))
      setstate(true)
    }
  }

  chatRef?.current?.scrollIntoView({
    behavior: 'smooth'
  });


  return (
    <FormContainer onSubmit={onHandleSearch}>
      <HeaderSearch>
        <h1>Search Conversation</h1>

        <input
          ref={chatRef}
          className="maker__name"
          type="number"
          placeholder="Input User Id"
          onChange={onHandleChange}
        />

        <button ref={chatRef} type="submit" className="maker__action"  >submit</button>
      </HeaderSearch>

      {
        state &&
          messages.directMsgList &&
          messages.directMsgList.length > 0 ?
          messages.directMsgList.map((message, index) => (
            <MessageContainer key={index}>
              <img src={defaultImage} alt='' />
              <MessageInfo>
                <h4>
                  {message.sender ? message.sender.email : "Me"}
                  <span>{message.created_at}</span>
                </h4>
                <p>{message.body}</p>
              </MessageInfo>
            </MessageContainer>
          ))
          : <h1>No conversation found</h1>
      }
      <ChatBottom ref={chatRef} />

    </FormContainer>
  )
}

export default SearchMessage

const FormContainer = styled.form`
 > h1 {
   margin-left: 20px;
  }
`

const HeaderSearch = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin-top: 77px;
  margin-right: 160px;
  top: 0;
  >h1 {
    font-size: 1.5rem;
  }
  >button {
    margin-bottom: 200px;
    display: none;
  }
  >input {
    margin-top: 10px;
    padding: 5px 10px;
    text-align: center;
  }
  
`

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;

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

`
const ChatBottom = styled.div`
  /* padding-bottom: 200px; */
`