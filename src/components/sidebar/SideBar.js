import React from 'react';
import { useSelector } from 'react-redux';
import styled from "styled-components";
import {    Create, FiberManualRecord, Add, ExpandMore,
            InsertComment, Inbox, Drafts, BookmarkBorder,
            FileCopy, PeopleAlt, Apps, ExpandLess, Message } from "@material-ui/icons";
import SideBarOption from './SideBarOption';

const SideBar = () => {

const {channels} = useSelector(store => store); // useSelector para makuha yung channels data sa redux

  return (
    <SideBarContainer>
      <div className="Channel">
        <SideBarHeader>
        <SideBarInfo>
            <h2>Avion School</h2>
            <h3>
            <FiberManualRecord />
            </h3>
        </SideBarInfo>
        <Create />
        </SideBarHeader>

        {/* Options */}
        <SideBarOption Icon={InsertComment} title="Threads" titleId="threads" />
        <SideBarOption Icon={Inbox} title="Mentions & Reactions" titleId="mention-reaction" />
        <SideBarOption Icon={Drafts} title="Saved Items" titleId="save-items" />
        <SideBarOption Icon={BookmarkBorder} title="Channel Browser" titleId="channel-browser" />
        <SideBarOption Icon={PeopleAlt} title="People & User Groups" titleId="people-user-groups" />
        <SideBarOption Icon={Apps} title="Apps" titleId="apps" />
        <SideBarOption Icon={FileCopy} title="File Browser" titleId="file-browser" />
        <SideBarOption Icon={ExpandLess} title="Show Less" titleId="showless" />
        <hr />
        <SideBarOption Icon={ExpandMore} title="Show More" titleId="showmore" />
        <hr />

        <SideBarOption Icon={Add} addChannelOption title="Add Channel" />
        { channels.list.map((channel, index) => ( //para ma-list lahat ng dinagdag na channel
            <SideBarOption
                key={index}
                id={channel.id}
                title={channel.name}/>
            ))
        }
      </div>
    </SideBarContainer>
    )
  }
  
  export default SideBar;

  const SideBarContainer = styled.div`
  background: var(--slack-color);
  color: #fff;
  flex: 0.3;
  border-top:1px solid #49274b;
  max-width: 260px;
  margin-top: 60px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: white;
  }

  > hr {
    margin: 10px 0;
    border:1px solid #49274b;
  }

  > button { 
    background: none;
    border: none;
    color: #fff;
    width: 100%;
  }

  > button:hover {
    background: none;
  }
`
// const SenderAvatar = styled(Avatar)`
//   height: 25px;
//   width: 25px;
//   margin-left: 5px;
//   cursor: pointer;

// `
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
`

// const Channel = styled.div`
//     overflow-y: scroll;
// `

/* > .MuiSvgIcon-root {
    color:green;
  } */