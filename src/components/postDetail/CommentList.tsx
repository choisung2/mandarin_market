import styled from "@emotion/styled";
import Link from "next/link";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { CommentModal } from "./CommentModal";
import { CommentDelModal } from "./CommentDelModal";
import { Comments } from "../../types/Comments";
import { ReportModal } from "../home/ReportModal";
import { CancelModal } from "./CoReportCancelModal";

interface Comment {
  comment: Comments
  token: string | null | undefined
  loginUser: string | null | undefined
  postId: string | string[] | undefined
}

export const PostCommentList = ({comment, token, loginUser, postId}: Comment) => {

  const { author, content, id, createdAt } = comment;

  const timeSet = (createdAt : string) => {
    const today = new Date()
    const getPostTime = new Date(createdAt)

    const timeSec = Math.floor((today.getTime() - getPostTime.getTime()) / 1000 / 60)

    if(timeSec < 1) return '방금 전'
    if(timeSec < 60) return `${timeSec}분 전`

    const timeHour = Math.floor(timeSec / 60);
    if (timeHour < 24) return `${timeHour}시간 전`

    const timeDay = Math.floor(timeHour / 24);
    if (timeDay < 7) return `${timeDay}일 전`

    const timeWeek = Math.round(timeDay / 7);
    if (timeWeek < 4) return `${timeWeek}주 전`
    
    const timeMonth = Math.round(timeDay / 30);
    if (timeMonth < 12) return `${timeMonth}개월 전`

    const timeYear = Math.floor(timeMonth / 365);
    return `${Math.floor(timeYear / 365)}년 전`;
  }

  const updatedDate = timeSet(createdAt)

  const [IsModal, setIsModal] = useState(false);
  const [isDelModal, setIsDelModal] = useState(false);

  const [reportModal, setReportModal] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);

  const openModal = () => {
    setIsModal(true);
  };
  const closeModal = () => {
    setIsModal(false);
  };
  const delModal = () => {
    setIsDelModal(true);
  };
  const closeDelModal = () => {
    setIsDelModal(false);
    setIsModal(false);
  };

  const openReportModal = () => {
    setReportModal(true);
  };
  const closeReportModal = () => {
    setReportModal(false);
  };
  const openCancelModal = () => {
    setCancelModal(true);
  };
  const closeCancelModal = () => {
    setCancelModal(false);
    setReportModal(false);
  };

  return (
    <>
    <CommentList>
      <CommentInfo>
        <Link href={`/profile/${author.accountname}`}>
          <a><AuthorImg src={author.image} alt="유저 프로필" /></a>
        </Link>
        <Link href={`/profile/${author.accountname}`}>
          <a><AuthorNickName>{author.username}</AuthorNickName></a>
        </Link>
        <CommentDate>{updatedDate}</CommentDate>
      </CommentInfo>
      <CommentText>{content}</CommentText>
      <MoreBtn onClick={author.accountname === loginUser ? openModal : openReportModal}>
        <span className="sr-only">더보기 버튼</span>
        <MoreVertIcon className="More-btn-icon" />
      </MoreBtn>
    </CommentList>
    {author.accountname === loginUser
      ? (
        <>
          <Background
            className={`${IsModal}`}
            onClick={closeModal}
          ></Background>
          <CommentModal Modal={IsModal} delModal={delModal}/>
          {isDelModal && <CommentDelModal id={id} token={token} closeDelModal={closeDelModal} postId={postId} />}
        </>
      )
      : (
        <>
          <Background   
            className={`${reportModal}`}
            onClick={closeReportModal}
          ></Background>
          <ReportModal reportModal={reportModal} openCancelModal={openCancelModal} />
          {cancelModal  && <CancelModal id={id} token={token} closeCancelModal={closeCancelModal} postId={postId}/>}
        </>
    )}
  </>
  );
};

const CommentList = styled.li`
  margin-bottom: 16px;
  position: relative;
  .more {
    color: #c4c4c4;
    content: "";
    position: absolute;
    top: 5px;
    right: 0;
    width: 20px;
    height: 20px;
  }
`

const CommentInfo = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 4px;
`;

const AuthorImg = styled.img`
  width: 36px;
  height: 36px;
  border: 0.5px solid #dbdbdb;
  border-radius: 50%;
  margin-right: 12px;
  z-index: -100;
`;

const AuthorNickName = styled.strong`
  font-size: 14px;
  line-height: 18px;
  display: block;
  margin: 6px 6px 0 0;
`;

const CommentDate = styled.span`
  font-weight: 400;
  font-size: 10px;
  line-height: 13px;
  color: #767676;
  margin-top: 8.5px;
  &::before {
    content: "·";
    margin-right: 4.5px;
  }
`;

const CommentText = styled.p`
  padding-left: 48px;
  font-size: 14px;
  line-height: 18px;
  color: #333333;
`;

const MoreBtn = styled.button`
  border: none;
  cursor: pointer;
  padding: 0;
  position: absolute;
  top: 5px;
  right: 0;
  width: 18px;
  height: 18px;
  color: #c4c4c4;
  .More-btn-icon {
    width: 20px;
    height: 20px;
  }
`;

const Background = styled.div`
  &.true {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #777;
    opacity: 0.4;
    z-index: 10;
  }
`;

