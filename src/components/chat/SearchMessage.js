import React, { useRef } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { fetchDirectMessageToUser } from "../../features/MessagesSlice"
import styled from 'styled-components'
import defaultImage from '../../images/profile.jpg'
import { useEffect } from 'react'

const SearchMessage = () => {
  const chatRef = useRef(null)
  const dispatch = useDispatch()
  const [searchId, setSearchId] = useState('')
  const { messages } = useSelector(store => store)
  const onHandleChange = (e) => {
    setSearchId(e.target.value)
  }

  const onHandleSearch = (e) => {
    e.preventDefault()
    dispatch(fetchDirectMessageToUser(parseFloat(searchId)))
    setSearchId('')
  }

  useEffect(() => {
    chatRef?.current?.scrollIntoView({
      behavior: 'smooth'
    });
  }, [searchId]) /// to scroll at the current chat when loading
  return (
    <FormContainer onSubmit={onHandleSearch}>
      <HeaderSearch>
        <h1>Search Conversation</h1>

        <input
          className="maker__name"
          type="number"
          placeholder="Input User Id"
          value={searchId}
          onChange={onHandleChange}
        />

        <button type="submit" className="maker__action"  >submit</button>
      </HeaderSearch>
      {
        messages.directMsgList &&
          messages.directMsgList.length > 0 ?
          messages.directMsgList !== null ?
            messages.directMsgList.map((message, index) => (
              <MessageContainer key={index}>
                <img src={defaultImage} alt='' />
                <MessageInfo>
                  <h4>
                    {message.sender.email}
                    <span>
                      {message.created_at}
                    </span>
                  </h4>
                  <p>{message.body}</p>

                </MessageInfo>

              </MessageContainer>
            ))
            : <h1>No conversation found</h1>
          : <h1>No conversation found</h1>
      }
      <ChatBottom ref={chatRef} />

    </FormContainer>
  )
}

export default SearchMessage

const FormContainer = styled.form`
 > h1 {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 75vh;
    font-size: 3rem;
  }
`

const HeaderSearch = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 120%;
  margin: auto;
  
  >button {
    margin-bottom: 200px;
    display: none;
  }
  >input {
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