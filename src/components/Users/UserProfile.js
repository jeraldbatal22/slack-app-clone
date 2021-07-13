import styled from "styled-components"
import { useSelector } from "react-redux"
const UserProfile = () => {
  const { user } = useSelector(store => store.auth)
  return (
    <ChatContainer>
      <h1>Account Profile</h1>
      <div>
        <label><strong>Id:</strong>{user.id}</label>
        <label><strong>Email:</strong>{user.email}</label>
      </div>
    </ChatContainer>
  )
}

export default UserProfile

const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 60px;
  text-align: center;

  >div {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
`

