import React from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Avatar } from '@material-ui/core'
import {AccessTime, Search, HelpOutline} from '@material-ui/icons'
import * as storage from "../../utils/storage"
import { getUser } from '../../features/AuthSlice';
import { successMessage } from '../../utils/message';

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onHandleLogout = (e) => {
    e.preventDefault();
    storage.remove(storage.AUTH_KEY); //removes auth key and token para ma-reset lahat ng data
    storage.remove(storage.AUTH_TOKEN);
    
    dispatch(getUser()); //after remove ng data, pag tinawag yung getUser, wala nang data na mababasa kasi na-reset na
    history.push('./login'); // mapupunta sa login page after logout
    successMessage('Done!', 'Successfully logged out!');
  }

  return (
    <HeaderContainer>
      <HeaderLeft>
        <HeaderAvatar alt="" />
        <AccessTime />
      </HeaderLeft>

      <HeaderSearch>
        <Search />
          <input type="text" />
      </HeaderSearch>

      <HeaderRight>
        <HelpOutline />
        <button onClick={onHandleLogout}> Logout </button>
      </HeaderRight>
  </HeaderContainer>
  )
}

export default Header;

const HeaderContainer = styled.div`
  display:flex;
  position: fixed;
  width: 100%;
  padding: 10px 0;
  align-items: center;
  justify-content: space-between;
  background: var(--slack-color);
  color: #fff;
`

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
  
  > button {
    cursor: pointer;
    color: #fff;
    font-weight: 750;
    background: none;
    border: none;
    margin-right: 20px;
  }

  > button:hover {
    opacity: 0.5;
  }
`