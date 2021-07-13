import React from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';

const ChatInput = () => {

  const onHandleSend = () => {

  }

  return (
    <ChatInputContainer>
      <form>
        <input type="text"/>
        <Button onClick={onHandleSend} type="submit"> SEND </Button>
      </form>
    </ChatInputContainer>
  )
}

export default ChatInput;

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

