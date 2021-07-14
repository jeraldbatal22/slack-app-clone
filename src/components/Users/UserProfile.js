import styled from "styled-components"
import { useSelector } from "react-redux"
const UserProfile = () => {
  const { auth, users } = useSelector(store => store)
  return (
    <ChatContainer>
      <h1>Account Profile</h1>

      {
        users.idSearch ?
          <div>
            <label><strong>Id:</strong>{users.idSearch.id}</label>
            <label><strong>Email:</strong>{users.idSearch.email}</label>
          </div>
          : <div>
            <label><strong>Id:</strong>{auth.user.id}</label>
            <label><strong>Email:</strong>{auth.user.email}</label>
          </div>
      }
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

