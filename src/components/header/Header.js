import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import { AccessTime, HelpOutline, Search, FiberManualRecord } from "@material-ui/icons";
import * as storage from '../../utils/storage';
import { successMessage, errorMessage } from "../../utils/message";
import { getUser } from "../../features/AuthSlice";
import { clearStateChannels } from "../../features/ChannelsSlice";
import { clearStateChannelId } from "../../features/RoomSlice";
import { clearStateRetrieveMessages, fetchDirectMessageToUser, senderIdMessage } from "../../features/MessagesSlice";
import { UsersListAsync } from "../../features/UsersSlice";
import { clearIdSearch } from '../../features/UsersSlice';

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { auth, users } = useSelector((store) => store);

  const email = auth.user.email;
  const newEmail = email.split('@');
  const username = newEmail[0].toUpperCase()

  const onHandleLogout = () => {
    storage.remove(storage.AUTH_KEY);
    storage.remove(storage.AUTH_TOKEN);
    dispatch(clearStateChannels());
    dispatch(clearStateChannelId());
    dispatch(clearStateRetrieveMessages());
    dispatch(UsersListAsync());
    dispatch(getUser());
    history.push('/login');
    successMessage('Success!', 'Successfully Logged Out!');
  }

  const viewProfile = (e) => {
    e.preventDefault();
    history.push('/profile');
    dispatch(clearIdSearch());
    return auth.user;
  }
  const [searchId, setSearchId] = useState('');

  const onHandleChange = (e) => {
    setSearchId(e.target.value);
  }

  // const [state, setState] = useState(false)

  const onHandleSearch = (e) => {
    e.preventDefault();
    const userId = users.list.find(index => index.email === searchId);
    if (!userId) {
      return errorMessage('Error', `${searchId} is not registered as a user.`);
    }
    const id = userId.id
    dispatch(fetchDirectMessageToUser(id))
    history.push('/search-users');
    dispatch(senderIdMessage({ senderId: userId.id }))
    setSearchId('');
  }

  return (
    <>
      <HeaderContainer>
        <HeaderLeft>
          <FiberManualRecord /><h5>{username}</h5>
        </HeaderLeft>
        <AccessTime />

        <form onSubmit={onHandleSearch}>
          <HeadersSearch>
            <input type="text" value={searchId} placeholder={`Search users email`} onChange={onHandleChange} />
            <Search />
            <button type="submit">Search</button>
          </HeadersSearch>

        </form>
        <HelpOutline />

        <HeaderRight>
          <button type="submit" onClick={onHandleLogout}>LOGOUT</button>
          <HeaderAvatar onClick={viewProfile} alt="" />
        </HeaderRight>
      </HeaderContainer>

    </>
  )
}

export default Header;

const HeaderContainer = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  padding: 10px 0;
  align-items: center;
  justify-content: space-between;
  background: var(--slack-color);
  color: #fff;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

const HeaderLeft = styled.div`
  flex:0.3;
  display: flex;
  align-items: center;
  margin-left: 2%;
  text-align: left;

  > button {
    background: none;
    border: none;
    color: #fff;
    margin-left: 10px;
    font-weight: 500;
    cursor: pointer;
  }

  > button:hover {
    opacity: 0.5;
  }
  
  >h5 {
    font-weight: 500;
    text-align: left;
  }

  > .MuiSvgIcon-root {
    font-size: 14px;
    margin-top: 2px;
    margin-right: 5%;
    color: green ;
  }
`

const HeaderAvatar = styled(Avatar)`
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }

`
const HeadersSearch = styled.div`
  flex: 0.4;
  display: flex;
  padding: 0 50px;
  opacity: 1;
  border-radius: 6px;
  text-align:center;
  border: none;
  border: 2px white solid;
  border-radius: 6px;

  > .MuiSvgIcon-root {
    margin-left: 3%;
  }

  > input {
    background: transparent;
    border: none;
    text-align:center;
    min-width: 40vw;
    outline:0;
    color:#fff;
  }

  > button {
    display: none;
  }
`
const HeaderRight = styled.div`
  flex: 0.3;
  display: flex;
  justify-content: center;

  > button {
    cursor: pointer;
    color: #fff;
    background: none;
    border: none;
    margin-right: 20px;
  }

  > button:hover {
    opacity: 0.5;
  }
`