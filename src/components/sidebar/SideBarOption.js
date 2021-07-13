import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from "styled-components";
import { errorMessage, successMessage } from '../../utils/message';
import { addChannelAsync } from '../../features/ChannelsSlice';
import { enterRoom } from '../../features/RoomSlice';

const SideBarOption = ({ Icon, title, id, addChannelOption }) => {
    const dispatch = useDispatch ();

    const [addChannelState, setAddChannelState] = useState({ //initial state
        name: '',
        user_ids: []
    })
    
    const addChannel = (e) => {
        e.preventDefault();
        const channelName= prompt('Please enter the channel name:');
        // console.log('Add Channel');

        //error validation
        if (channelName==="") {
            return errorMessage ('Error', 'Please enter a channel name.')
        }
        
        if (channelName) {
            if (channelName.length < 3 ) {
                return errorMessage ('Error', 'Channel name is too short! Requires a minimum of 3 characters.')
            } else {
                setAddChannelState (addChannelState.name = channelName);
                dispatch (addChannelAsync(addChannelState)); // binato yung channel data papunta kay redux
            }
            return errorMessage ('Error', 'Channel name has already been taken.')
            // return successMessage ('Success', `Successfully added channel: ${channelName}.`)
        }
    }

    const selectChannel = (e) => {
        e.preventDefault();
        
        if (id) { //once mag-click ng channel, makukuha na yung ID ng channel
            dispatch(enterRoom({
              channelId: id
            }))
            console.log(id);
            // dispatch(fetchRetrieveMessages(id))
            // history.push(`/homepage`)
        }
    }

    return (
        <div>
            <SideBarOptionContainer onClick={ addChannelOption ? addChannel : selectChannel }>
                {/* pag may nabasa na icon, rereturn niya agad yung Icon */}
                {Icon && <Icon fontSize="small" style={{ padding: "10px" }} />}
                {Icon ? ( <h3> {title} </h3> ) : (  //kung walang icon na nabasa, pang-add channel yung display
                <SideBarOptionChannel>
                    <span>#</span> {title}
                </SideBarOptionChannel>
                )}
            </SideBarOptionContainer>
        </div>
    )
}

export default SideBarOption;


const SideBarOptionContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  padding-left: 2px;
  cursor: pointer;

  :hover {
    background: #340e36;
  }

  >h3 {
    font-weight: 500;
  }

  > h3 > span {
    padding: 15px;
  }
`

const SideBarOptionChannel = styled.h3`
  padding: 10px 0;
  font-weight: 300;
`
