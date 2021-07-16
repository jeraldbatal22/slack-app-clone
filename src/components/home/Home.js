import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Clock from "../Clock/Clock";
import slackLogo from "../../images/slackLogo.png"
import { Send } from '@material-ui/icons';
import { Add } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { errorMessage, successMessage } from "../../utils/message";
import { addChannelAsync } from "../../features/ChannelsSlice";

const Home = () => {
  const { auth, channels } = useSelector(store => store)
  const dispatch = useDispatch();

  const [addChannelState, setAddChannelState] = useState({
    name: '',
    user_ids: []
  })

  const history = useHistory()
  const sendMessage = () => {
    history.push('createMessage')
  }

  const addChannel = () => {
    const channelName = prompt('Please enter a channel name: ');
    const find = channels.list.find(channelName => channelName.name === channelName);
    if (channelName === "") {
      return errorMessage('Error', "Name can't be blank.");
    }
    if (channelName) {
      if (channelName.length < 3) {
        return errorMessage('Error', "Name is too short! (Minimum of 3 characters required)");
      }
      if (channelName.length > 15) {
        return errorMessage('Error', 'Name is too long (maximum is 15 characters)')
      }
      if (find) {
        return errorMessage('Error', "Channel name has already been taken.");
      }
      else {
        setAddChannelState(addChannelState.name = channelName);
        dispatch(addChannelAsync(addChannelState));
        setAddChannelState({ ...addChannelState, name: '' })
        return successMessage('Success', `Successfully added channel: ${channelName.toLocaleUpperCase()}`);
      }
    }
  }
  return (
    <HomeContainer>
      <HomeTitle>
        <div className="home-logo-container">
          <img src={slackLogo} alt="" />
          <h1>Slack App </h1>
          <h5>*Clone</h5>
        </div>
        <p>A secure space to work with other companies, just like you do with your own team</p>
        <div className="home-welcome-container">
          <div>
            <img src="https://a.slack-edge.com/6c404/marketing/img/homepage/bold-existing-users/waving-hand.gif" srcset="https://a.slack-edge.com/6c404/marketing/img/homepage/bold-existing-users/waving-hand.gif 1x, https://a.slack-edge.com/6c404/marketing/img/homepage/bold-existing-users/waving-hand@2x.gif 2x" alt="" height="56" width="52" />
            <h1>Welcome back </h1>
          </div>
          <div className="welcome-workspace-container">
            <h4> Workspaces for {auth.user.email}</h4>
            <hr />
            <div className="workspace-subcontainer">
              <div>
                <img className="ss-c-workspace-detail__icon" src="https://avatars.slack-edge.com/2021-01-14/1620922289399_34e39fe253a871b90028_88.png" alt="" />
                <h3>Avion School</h3>
              </div>
              <div className="home-button-container">
                <button onClick={sendMessage}> Send a message <Send /></button>
                <button onClick={addChannel}>Create a channel <Add /></button>
              </div>

            </div>
          </div>
        </div>
        <Clock />
      </HomeTitle>

    </HomeContainer>
  )
}

export default Home

const HomeContainer = styled.div`
  margin-top: 60px;
  margin-inline: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  background-color: white;
  width: 50%;
  height: 92vh;
  > .clock{
    align-self: right;
  }
`
const HomeTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 80%;
  background-color: transparent;
  margin: auto;
  width: 45vw;;
  font-family: Larsseit,"Helvetica Neue",Helvetica,"Segoe UI",Tahoma,Arial,sans-serif;;
  > .home-logo-container{
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 5px;
    width: auto;
    & h1{
      color: #4A154B;
    }
    & h5{
      color: #4A154B;
      text-align: bottom;
      align-self: top;
      padding-left: 3px;
    }
  }

  > .home-welcome-container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #4A154B;
    padding: 20px;
    width: 95%;
    & div{
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
    }
    & .welcome-workspace-container{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-content: left;
      text-align: left;
      background-color: white;
      height: 20vh;
      border-radius: 9px;
      margin-bottom: 3rem;
      border: 4px solid #7C3085;
      width: 100%;
      & h4{
        width: 95%;
        height: 20%;
        text-align: left;
        margin-block-start: .5em;
        align-items: center;
        padding-left: 5px;
        color: #4A154B;
        //margin-right: 250px;
      }
      & hr{
        width: 95%;
        height: 5;
        color: #4A154B;
      }
      & .workspace-subcontainer{
        display: flex;
        justify-content: space-between;
        color: black;
        & .home-button-container{
          display: flex;
          flex-direction: column;
          width: 40%;
          & button{
            display: flex;
            align-items: center;
            margin: 3px;
            text-align: center;
            border-radius: 5px;
            &:hover{
              cursor: pointer;
            }
          }
        }
      }
    }
  }
  > p{
    padding: 10px;
    text-align: left;
    color: #000;
    font-size: .75em;
  }
  img {
    width: 65px;
    padding: 5px;
  }
`