import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import { AccessTime, HelpOutline, Search } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import * as storage from '../../utils/storage'
import { getUser } from "../../features/AuthSlice";
import { useHistory } from "react-router";
import { clearStateChannels } from "../../features/ChannelsSlice";
import { clearStateChannelId } from "../../features/RoomSlice";
import { clearStateRetrieveMessages } from "../../features/MessagesSlice";
import { UsersListAsync } from "../../features/UsersSlice";
import { successMessage } from "../../utils/message";
const Header = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { user } = useSelector((store) => store.auth)
  const email = user.email
  const newEmail = email.charAt(0).toUpperCase() + email.slice(1)

  const onHandleLogout = () => {
    storage.remove(storage.AUTH_KEY)
    storage.remove(storage.AUTH_TOKEN)
    dispatch(clearStateChannels())
    dispatch(clearStateChannelId())
    dispatch(clearStateRetrieveMessages())
    dispatch(UsersListAsync())
    dispatch(getUser())
    history.push('/login')
    successMessage('Success', 'Successfully logout')
  }

  const viewProfile = (e) => {
    e.preventDefault()
    history.push('/profile')
  }

  return (
    <HeaderContainer>
      <HeaderLeft>
        <HeaderAvatar onClick={viewProfile} alt="" />
        <AccessTime />
      </HeaderLeft>

      <HeaderSearch>
        <Search />
        <input type="text" placeholder={`Search ${newEmail}`} />
      </HeaderSearch>

      <HeaderRight>
        <HelpOutline />
        <button onClick={onHandleLogout}>LOGOUT</button>
      </HeaderRight>
    </HeaderContainer>
  )
}

export default Header

const HeaderContainer = styled.div`
  display:flex;
  position: fixed;
  width: 100%;
  padding: 10px 0;
  align-items: center;
  justify-content: space-between;
  background: var(--slack-color);
  color: #fff;
`;

const HeaderLeft = styled.div`
  flex:0.3;
  display: flex;
  align-items: center;
  margin-left: 20px;

  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 30px;
  }

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
`

const HeaderAvatar = styled(Avatar)`
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }

`
const HeaderSearch = styled.div`
  flex: 0.4;
  display: flex;
  padding: 0 50px;
  opacity: 1;
  border-radius: 6px;
  background: #421f44;
  text-align:center;
  border:1px gray solid;

  > input {
    background: transparent;
    border: none;
    text-align:center;
    min-width: 30vw;
    outline:0;
    color:#fff;
}
`
const HeaderRight = styled.div`
  flex: 0.3;
  display: flex;
  justify-content: flex-end;

  > .MuiSvgIcon-root {
    margin-left:auto ;
    margin-right:20px;
  }
  >button {
    cursor: pointer;
    color: #fff;
    font-weight: 750;
    background: none;
    border: none;
    margin-right: 20px;
  }
  >button:hover {
    opacity: 0.5;
  }
`