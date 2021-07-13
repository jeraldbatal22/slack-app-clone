import styled from "styled-components"
import { addChannelAsync, viewMembersToChannelAsync } from "../../features/ChannelsSlice"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { enterRoom } from "../../features/RoomSlice"
import { errorMessage, successMessage } from "../../utils/message"
import { fetchRetrieveMessages } from "../../features/MessagesSlice"
import { useHistory } from "react-router-dom"

const SideBarOption = ({ Icon, title, addChannelOption, id, addDirectMessageOption, titleId }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [addChannelState, setAddChannelState] = useState({
    name: '',
    user_ids: []
  })
  const { channels } = useSelector(store => store)
  const addChannel = () => {
    const channelnName = prompt('please enter the channel name')
    const find = channels.list.find(channelName => channelName.name === channelnName)
    if (channelnName === "") {
      return errorMessage('error', "Name can't be blank")
    }
    if (channelnName) {
      if (channelnName.length < 3) {
        return errorMessage('error', "Name is too short (3 characters minimu required)")
      }
      if (find) {
        return errorMessage('error', "Channel name has already been taken")
      }
      else {
        setAddChannelState(addChannelState.name = channelnName)
        dispatch(addChannelAsync(
          addChannelState
        ))
        return successMessage('success', `Successfully add channel ${channelnName.toLocaleUpperCase()}`)
      }
    }
  }

  const selectChannel = () => {
    if (titleId) {
      history.push(`/createMessage`)
      return errorMessage('error', "This features is not available yet.")
    }
    if (id) {
      dispatch(enterRoom({
        channelId: id
      }))
      dispatch(fetchRetrieveMessages(id))
      dispatch(viewMembersToChannelAsync(id))
      history.push(`/homepage`)
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

export default SideBarOption

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