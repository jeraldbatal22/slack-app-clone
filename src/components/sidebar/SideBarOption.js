import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
// style
import styled from "styled-components";
import { errorMessage, successMessage } from "../../utils/message";
// API
import { fetchRetrieveMessages } from "../../features/MessagesSlice";
import { addChannelAsync, viewMembersToChannelAsync } from "../../features/ChannelsSlice";
import { enterRoom } from "../../features/RoomSlice";

const SideBarOption = ({ Icon, title, addChannelOption, id, addDirectMessageOption, titleId }) => {

  const history = useHistory();
  const dispatch = useDispatch();

  const [addChannelState, setAddChannelState] = useState({ //initial state
    name: '',
    user_ids: []
  })

  const { channels } = useSelector(store => store);

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
      if (find) {
        return errorMessage('Error', "Channel name has already been taken.");
      }
      else {
        setAddChannelState(addChannelState.name = channelName);
        dispatch(addChannelAsync(addChannelState));
        return successMessage('Success', `Successfully added channel: ${channelName.toLocaleUpperCase()}`);
      }
    }
  }

  const selectChannel = () => {
    if (titleId) {
      if (titleId === "home") {
        history.push(`/${titleId}`)
      } else {
        history.push(`/${titleId}`)
        return errorMessage('Error', "This feature is not available yet.")
      }
    }
    if (id) {
      dispatch(enterRoom({
        channelId: id
      }))
      dispatch(fetchRetrieveMessages(id))
      dispatch(viewMembersToChannelAsync(id))
      history.push(`/homepage`)
      dispatch(fetchRetrieveMessages(id));
      dispatch(viewMembersToChannelAsync(id));
      history.push(`/homepage`);
    }
  }

  return (
    <SideBarOptionContainer onClick={addChannelOption ? addChannel : selectChannel}>
      {Icon && <Icon fontSize="small" style={{ padding: "10px" }} />}
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <SideBarOptionChannel>
          <span>#</span> {title}
        </SideBarOptionChannel>
      )}
    </SideBarOptionContainer>
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