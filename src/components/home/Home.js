import styled from 'styled-components'
import React from 'react'
import { useSelector } from 'react-redux'

const Home = () => {
  const { auth } = useSelector(store => store)
  return (
    <HomeContainer>
      <HomeTitle>
        <div>
          <h1>SLACK APP CLONE</h1>
          <h2>HELLO WELCOME {auth.user.email}</h2>
          <p>A secure space to work with other companies, just like you do with your own team</p>
        </div>
        <img src="https://images.unsplash.com/photo-1524635962361-d7f8ae9c79b1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c2xhY2t8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80" alt="" />
      </HomeTitle>
      <button>Start a direct message</button>
      <button>Create a channel</button>
    </HomeContainer>
  )
}

export default Home

const HomeContainer = styled.div`
  flex: 0.8;
  margin-top: 100px;
  display: flex;
  align-items: center;
  flex-direction: column;

`
const HomeTitle = styled.div`
  display: flex;
  img {
    width: 100px;
  }
`