import styled from "styled-components"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { fetchRetrieveMessages } from "../../features/MessagesSlice"
import defaultImage from '../../images/profile.jpg'

const Message = ({ item, senderName }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchRetrieveMessages())
  }, [dispatch])
  return (
    <MessageContainer>
      <img src={defaultImage} alt='' />
      <MessageInfo>
        <h4>
          {senderName}
          <span>
            {item.created_at}
          </span>
        </h4>
        <p>{item.body}</p>

      </MessageInfo>

    </MessageContainer>
  )
}

export default Message

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;

  > img {
    height: 45px;
    border-radius: 999px;
  }
`

const MessageInfo = styled.div`
  padding-left: 10px;

  > h4 > span {
    color:gray;
    font-weight: 300;
    margin-left:4px ;
    font-size: 10px;
  }
  > h4 > span > .MuiSvgIcon-root  {
    color:gray;
    font-weight: 300;
    margin-left:5px;
    font-size: 20px;
    cursor: pointer;
  }

  > h4 > span  >p >form  {
    color:gray;
    font-weight: 300;
    margin-left:5px;
    font-size: 20px;
    cursor: pointer;
    background: red;
  }

`