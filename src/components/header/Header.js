import React from 'react'
import { Avatar } from '@material-ui/core'
import {AccessTime, Search, HelpOutline} from '@material-ui/icons'
import styled from 'styled-components'


const Header = () => {
    return (
        <HeaderContainer>
      <HeaderLeft>
        <HeaderAvatar
          alt=""
        />
        <AccessTime />
      </HeaderLeft>

      <HeaderSearch>
        <Search />
        <input type="text" placeholder={Search} />
      </HeaderSearch>

      <HeaderRight>
        <HelpOutline />
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
  }`