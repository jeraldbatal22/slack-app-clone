import styled from 'styled-components';
import { StarBorder, InfoOutlined, Add } from '@material-ui/icons';
import ChatInput from './ChatInput';
import Message from './Message';
import { errorMessage, successMessage } from '../../utils/message';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { viewMembersToChannelAsync, addMemberToChannelAsync } from '../../features/ChannelsSlice';
import PeopleIcon from '@material-ui/icons/People';
import { Avatar } from '@material-ui/core';

const Chat = () => {

  const chatRef = useRef(null)
  const dispatch = useDispatch()
  let [isShow, setIsShow] = useState(false)
  const { roomId, channels, messages, users, auth } = useSelector(store => store)
  const channelDetails = channels.list.find(id => id.id === roomId.roomId)

  const addMemberToChannel = () => {
    const addMember = prompt("Enter User id number");

    const index = channels.memberList.find(index => index.user_id === parseFloat(addMember))
    const user = users.list.find(user => user.id === parseFloat(addMember))
    if (addMember === '') {
      return errorMessage('Error', 'Input channel id')
    }
    if (index) {
      return errorMessage('Error', `User id# ${addMember} is already member of ${channelDetails.name}`)
    }
    if (addMember) {

      if (addMember > users.list.length || isNaN(addMember)) {
        return errorMessage('Error', `Invalid user id`)
      }

      if (!user) {
        return errorMessage('Error', `Id ${addMember} is not registered as a user`)
      }

      if (addMember)
        dispatch(addMemberToChannelAsync({
          member_id: parseFloat(addMember), // User ID of the new member user
          id: channelDetails.id // Channel ID
        }))

      return successMessage('Success', 'Successfully and member in this channel')
    }
  }

  const viewMembersToChannel = () => {
    setIsShow(!isShow)
    dispatch(viewMembersToChannelAsync(channelDetails.id))
  }

  useEffect(() => {
    chatRef?.current?.scrollIntoView();
  }, [roomId]) /// to scroll at the current chat when loading

  return (
    <ChatContainer>
      {channelDetails && (
        <>
          <Header>
            <HeaderLeft>
              <h3>{channelDetails.name}</h3>
            </HeaderLeft>
            <HeaderRight>
              <p>
                <button type="button" onClick={viewMembersToChannel} className="view-members"><PeopleIcon /> View Members</button>
                {(channelDetails.owner_id === auth.authId) && <button type="button" onClick={addMemberToChannel}><Add /> Add Member</button>}

                {/* <InfoOutlined /> Details */}
                {
                  isShow &&
                  <table>
                    <thead>
                      <tr>
                        <th><h2>{channelDetails.name}</h2> <StarBorder /> </th>
                        <h5>Members</h5>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        channels.memberList &&
                        channels.memberList.map((member, index) => {
                          const user = users.list.find((list) =>
                            list.id === member.user_id
                          )
                          return (<tr key={index}>
                            <td><UserAvatar />{user.uid}</td>
                          </tr>)
                        })
                      }
                    </tbody>
                  </table>
                }
              </p>
              <StarBorder />
            </HeaderRight>
          </Header>

          <ChatMessages>
            {
              messages.list ? (
                messages.list !== null && roomId.roomId === channelDetails.id ?
                  messages.list.map((item, index) => (
                    <Message key={index} item={item} senderName={item.sender ? item.sender.email : "Me"} />
                  ))
                  : '') : ''
            }
          </ChatMessages>
          <ChatBottom ref={chatRef} />

          <ChatInput chatRef={chatRef} channelDetails={channelDetails ? channelDetails : ''} />
        </>
      )}
    </ChatContainer>
  )
}

export default Chat

const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 60px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`

const Header = styled.div`
  background: #fff;
  width: 78%;
  position: fixed;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
  
  label {
    margin-top: 10px;
  }
`

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;

  > h4 {
    display: flex;
    margin-right: 10px;
  }

`
const UserAvatar = styled(Avatar)`
  margin: 0;
  width: 10px;
  height: 10px;
`
const HeaderRight = styled.div`
  display: flex;
  justify-content: space-evenly;

  > p {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    font-size: 14px;
  }

  > p > .MuiSvgIcon-root {
    margin-right: 5px;
    font-size: 16px;
  }

  > p > .view-members{
    &:hover{
      background-color: whitesmoke;
    }
  }

  > p > button {
    display: flex;
    align-items: center;
    margin-right: 20px;
    float: right;
    cursor: pointer;
    border-radius: 50px;
  }

  > p > table {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: left;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    width: 23vw;
    height: 65vh;
    margin: auto;
    margin-top: 10vh;
    text-align: center;
    background-color: white;
    box-shadow: 1px 3px 5px 1px rgba(0, 0, 0, 0.2);
    padding: 20px;
    border-radius: 10px;
  }

  > p > table > thead > tr > th {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: left;
    padding: 10px;
  }

  > p > table > thead > tr > h5 {
    text-align: left;
    padding: 10px;
    color: grey;
    border-bottom: 1px solid grey;
    width: 100%;
  }


  > p > table > tbody {
    padding: 10px;
    height: auto;
    background-color: white;
    text-align: left;
    overflow-x: hidden;
    overflow-y: scroll;
    & td{
      display: flex;
      align-items: center;
      margin: 2px 10px;
      width: 120%;
      padding: 5px;
    }
    & td:hover{
      background-color: whitesmoke;
    }
  }
`

const ChatMessages = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto; 
  margin-top: 70px;
`

const ChatBottom = styled.div`
  padding-bottom: 200px;
`