import styled from 'styled-components';
import { StarBorder, InfoOutlined, Add } from '@material-ui/icons';
import ChatInput from './ChatInput';
import Message from './Message';
import { errorMessage, successMessage } from '../../utils/message';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { viewMembersToChannelAsync, addMemberToChannelAsync } from '../../features/ChannelsSlice';
import PeopleIcon from '@material-ui/icons/People';
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
              <h4><strong></strong></h4>
              <StarBorder />
            </HeaderLeft>
            <label><strong>ROOM</strong> {channelDetails.name.toUpperCase()}</label>
            <HeaderRight>
              <p>
                <button type="button" onClick={viewMembersToChannel}><PeopleIcon /> View Members</button>
                {(channelDetails.owner_id === auth.authId) && <button type="button" onClick={addMemberToChannel}><Add /> Add Member</button>}

                <InfoOutlined /> Details
              </p>
            </HeaderRight>
          </Header>

          <ChatMessages>

            {
              isShow &&
              <table>
                <thead>
                  <tr>
                    <th>{channelDetails.name.toUpperCase()} MEMBERS</th>
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
                        <td>{user.uid}</td>
                      </tr>)
                    })
                  }
                </tbody>
              </table>
            }

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
const HeaderRight = styled.div`
  > p {
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  > p > .MuiSvgIcon-root {
    margin-right: 5px;
    font-size: 16px;
  }
  > p > button {
    /* position: fixed;
    right: 0; */
    display: flex;
    align-items: center;
    margin-right: 20px;
    float: right;
    cursor: pointer;
    border-radius: 20px;
    border: none;
    padding: 5px;
  }

  button:hover {
    color: #fff;
    background: #3f0f40;
  }

`

const ChatMessages = styled.div`
  margin-top: 60px;
 
  > table {
    position: absolute;
    right: 0;
    margin-top: 50px;
    margin-right: 150px;
    float: right;
    text-align:center;
    border: 1px solid;
  }

  > table tbody {
    margin: 0px 20px;
    
  }

`

const ChatBottom = styled.div`
  padding-bottom: 200px;
`