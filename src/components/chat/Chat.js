import React from 'react'
import { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import PeopleIcon from '@material-ui/icons/People';
import { StarBorder, InfoOutlined, Add, RoomOutlined } from '@material-ui/icons';

import ChatInput from './ChatInput';
import { errorMessage, successMessage } from '../../utils/message';
import { addMemberToChannelAsync, viewMembersToChannelAsync } from '../../features/ChannelsSlice';

const Chat = () => {
  const chatRef = useRef(null);
  const dispatch = useDispatch();

  const { channels, roomId, users } = useSelector (store => store);
  const channelDetails = channels.list.find(index => index.id === roomId.roomId);

  const addMemberToChannel = () => {
    const addMember = prompt('Enter User ID:');

    //error validation
    if (addMember==='') {
      return errorMessage ('Error', 'Please enter User ID.')
    }

    if (addMember) {
      dispatch(addMemberToChannelAsync({
        member_id: parseFloat(addMember), //User ID of new member
        id: channelDetails.id //Channel ID
      }))
      return successMessage ('Success!', `Successfully added a member in this channel.`)
    }
  }

  let [isShow, setIsShow] = useState (false);

  const viewmMembersToChannel = () => {
    setIsShow(isShow=!isShow)
    dispatch(viewMembersToChannelAsync(roomId.roomId))
  }

  return (
    <ChatContainer>
      {channelDetails &&
        <>
          <Header>
            <HeaderLeft>
              <h4><strong></strong></h4>
              <StarBorder />
            </HeaderLeft>

            <HeaderRight>
              <p>
              <InfoOutlined /> Details
              </p>
            </HeaderRight>
          </Header>

          <ChatMessages>
            <button type="button" onClick={addMemberToChannel}><Add /> Add Member</button>
            <button type="button" onClick={viewmMembersToChannel}><PeopleIcon /> View Members</button>
              {
                isShow &&
                <table>
                  <thead>
                    <tr>
                      <th>List</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      channels.memberList.map((member, index) => {
                        const user = users.list.find((list) => 
                          list.id === member.user_id
                        )
                        return (<tr key={index}>
                          <td>{user.email}</td>
                        </tr>)
                      })
                    }
                  </tbody>
                </table>
              }

          </ChatMessages>
          <ChatBottom ref = {chatRef}/>
          <ChatInput  />
        </>
      }
    </ChatContainer>
  )
}

export default Chat;

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
`

const ChatMessages = styled.div`
  margin-top: 60px;

  >button {
    display: flex;
    align-items: center;
    margin-top: 20px;
    margin-right: 20px;
    float: right;
  }

  >table {
    position: absolute;
    right: 0;
    margin-top: 50px;
    margin-right: 150px;
    float: right;
    text-align:center;
  }
  > table tbody {
    margin: 0px 20px;
  }

`

const ChatBottom = styled.div`
  padding-bottom: 200px;
`
