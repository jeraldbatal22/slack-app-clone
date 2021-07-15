import { useSelector } from "react-redux";
import styled from "styled-components";
import Clock from "../Clock/Clock";

const UserProfile = () => {
  const { auth, users } = useSelector(store => store)
  return (
    <ChatContainer>
      <h1>Account Profile</h1>
      {
        users.idSearch ?
          <div>
            <label><strong>User ID: </strong>{users.idSearch.id}</label>
            <label><strong>E-mail: </strong>{users.idSearch.email}</label>
          </div>
          :
          <div>
            <label><strong>User ID: </strong>{auth.user.id} </label>
            <label><strong>E-mail: </strong>{auth.user.email} </label>
          </div>
      }
      <Clock/>
    </ChatContainer>
  )
}

export default UserProfile

const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 60px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;

  > h1 {
    margin-top: 3%;
    color: #E01E5A;
    text-align: center;
  }

  > div {
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align:left;
    margin-top: 3%;
  }

  > div label {
    margin-left: 3%;
  }
`

