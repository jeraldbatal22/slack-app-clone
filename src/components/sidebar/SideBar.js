import styled from "styled-components"
import { Create, FiberManualRecord, Add, ExpandMore, InsertComment, Inbox, Drafts, BookmarkBorder, FileCopy, PeopleAlt, Apps, ExpandLess, Message } from "@material-ui/icons"
import SideBarOption from './SideBarOption'
import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { channelsListAsync, channelsListOwnedAsync } from "../../features/ChannelsSlice"
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';

const SideBar = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { auth, channels } = useSelector((store) => store)
  const email = auth.user.email
  const newEmail = email.charAt(0).toUpperCase() + email.slice(1)

  let [state, setstate] = useState(false)
  const showDirectMessage = () => {
    history.push('/messages')
    setstate(state = !state)
  }

  const createMessage = () => {
    history.push('/createMessage')
  }

  useEffect(() => {
    dispatch(channelsListAsync())
    dispatch(channelsListOwnedAsync())

  }, [dispatch])
  return (
    <SideBarContainer>
      <SideBarHeader>
        <SideBarInfo>
          <h2>Avion School</h2>
          <h3>
            <FiberManualRecord />
            {newEmail}
          </h3>
        </SideBarInfo>
        <CreateMessage onClick={createMessage} />
      </SideBarHeader>
      <SideBarOption Icon={InsertComment} title="Threads" titleId="threads" />
      <SideBarOption Icon={Inbox} title="Mentions & reactions" titleId="mention-reaction" />
      <SideBarOption Icon={Drafts} title="Saved Items" titleId="save-items" />
      <SideBarOption Icon={BookmarkBorder} title="Channel Browser" titleId="channel-browser" />
      <SideBarOption Icon={PeopleAlt} title="People & user groups" titleId="people-user-groups" />
      <SideBarOption Icon={Apps} title="apps" titleId="apps" />
      <SideBarOption Icon={FileCopy} title="File Browser" titleId="file-browser" />
      <SideBarOption Icon={ExpandLess} title="Show Less" titleId="showless" />
      <hr />
      <SideBarOption Icon={ExpandMore} title="Show More" titleId="showmore" />
      <button onClick={showDirectMessage}> <SideBarOption Icon={Message} title="Direct Message" /></button>
      <hr />
      <SideBarOption Icon={Add} addChannelOption title="Add Channel" />
      <hr />
      <SideBarOption Icon={PeopleAltIcon} title="Channel you owned" />
      <hr />
      {
        (channels.owned.map((item, index) => (
          <SideBarOption
            key={index}
            id={item.id}
            title={item.name}
          />
        )))
      }
      <hr />
      <SideBarOption Icon={PeopleAltIcon} title="Channel you joined" />
      {
        (channels.list.map((item, index) => (
          item.owner_id !== auth.authId &&
          <SideBarOption
            key={index}
            id={item.id}
            title={item.name}
          />
        )))

      }




      {
        // user.directMessage.length ? (<SenderAvatar src={directMessage.senderImage} alt="" style={{ position: 'fixed', width: '30px' }} />) : ''

        // directMessage !== user.id ? (
        //   <>
        //     <SenderAvatar src={directMessage.senderImage} alt="" style={{ position: 'fixed', width: '30px' }} />
        //     <SideBarOption title={`${directMessage.senderName} message you`} /></>)
        //   : 'no'

        // user.directMessage.map((message, index) => (
        //   <div key={index}>
        //     <SenderAvatar src={message.senderImage} alt="" style={{ position: 'fixed', width: '30px' }} />
        //     <SideBarOption title={`${message.senderName} message you`} />
        //   </div>
        // ))
      }


    </SideBarContainer>
  )
}

export default SideBar

const SideBarContainer = styled.div`
  background: var(--slack-color);
  color:#fff;
  flex: 0.3;
  border-top:1px solid #49274b;
  max-width: 260px;
  margin-top: 60px;
  overflow-y: scroll;


  > hr {
    margin: 10px 0;
    border:1px solid #49274b;
  }

  >button { 
    background: none;
    border: none;
    color: #fff;
    width: 100%;
  }
  >button:hover {
    background: none;
  }

  ::-webkit-scrollbar-thumb {
  background: #49274b;
  border-radius: 10px;
  }
  
  ::-webkit-scrollbar-track {
  border-radius: 10px;
  }

  ::-webkit-scrollbar {
  width: 6px;
  } 
`
// const SenderAvatar = styled(Avatar)`
//   height: 25px;
//   width: 25px;
//   margin-left: 5px;
//   cursor: pointer;
// `

const CreateMessage = styled(Create)`
  cursor: pointer;
 `

const SideBarHeader = styled.div`
  display: flex;
  padding: 13px;
  border-bottom: 1px solid #49274b;

 > .MuiSvgIcon-root {
    padding: 8px;
    background: #fff;
    color: #49274b;
    border-radius: 999px;
    font-size: 18px;
  }
`

const SideBarInfo = styled.div`
  flex: 1;

  >h2 {
    font-size: 15px;
    font-weight: 900;
    margin-bottom: 5px;
  }
  >h3 {
    display: flex;
    font-size: 13px;
    font-weight: 400;
    align-items: center;
  }
  >h3 > .MuiSvgIcon-root {
    font-size: 14px;
    margin-top: 1px;
    margin-right: 2px;
    color: green ;
  }
/* > .MuiSvgIcon-root {
    color:green;
  } */

`