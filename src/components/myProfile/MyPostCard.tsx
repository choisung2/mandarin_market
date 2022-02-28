import styled from "@emotion/styled";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { MyPost } from "../../types/MyPost";
import { PostModal } from "../home/PostModal";
import { DeleteModal } from "../home/DeleteModal";
import { COLOR } from "../../constants";


interface PostProps {
  postData: MyPost
}

export const MyPostCard = ({ postData }: PostProps) => {

  const { author, commentCount, comments, content, createdAt, heartCount, hearted, image, id } = postData

  const imgArr = image.split(',')
  
  const [currentSlide, setCurrentSlide] = useState(0);


  const next = () => {
    if (currentSlide > imgArr.length) {
      setCurrentSlide(0)
    } else {
      setCurrentSlide(currentSlide + 1)
    }
  }
  const prev = () => {
    if (currentSlide === 0) {
      setCurrentSlide(imgArr.length);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  }

  const [likeNum, setLikeNum] = useState(0);
  const [checkClick, setCheckClick] = useState(true);
  const [heartColor, setHeartColor] = useState("icon");

  const [postModal, setPostModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const openPostModal = () => {
    setPostModal(true);
  };
  const closePostModal = () => {
    setPostModal(false);
  };
  const openDeleteModal = () => {
    setDeleteModal(true);
  };
  const closeDeleteModal = () => {
    setDeleteModal(false);
    setPostModal(false);
  };

  const onClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | undefined
  ) => {
    if (checkClick) {
      setLikeNum((current) => current + 1);
      setCheckClick(!checkClick);
    } else {
      setLikeNum((current) => current - 1);
      setCheckClick(!checkClick);
    }

    if (heartColor === "icon") {
      setHeartColor("Like-icon");
    } else setHeartColor("icon");
  };

  const updatedDate = `${createdAt.slice(0, 4)}년 ${createdAt.slice(5, 7,)}월 ${createdAt.slice(8, 10)}일`

  return (
    <Cont>
      <article>
        <h3 className="sr-only">포스트 아이템</h3>
        <AuthorCont>
          <h4 className="sr-only">포스트 글쓴이</h4>
          <AuthorImg src={author.image} alt="작성자 이미지" />
          <AuthorInfo>
            <AuthorNickName>{author.username}</AuthorNickName>
            <AuthorId>{author.accountname}</AuthorId>
          </AuthorInfo>
        </AuthorCont>
        <PostCont>
          <h4 className="sr-only">포스트 내용</h4>
          <PostTxt>{content}</PostTxt>
          {image !== '' && (
            <PostImgCont >
              <PostImgList>
                {imgArr.map((img) => {
                  return (
                    <PostImgItem key={img}>
                      <PostImg src={img} alt="post-img" />
                    </PostImgItem>
                  )
                })}
              </PostImgList>
              <ButtonList>
                <PrevBtn onClick={prev}>앞</PrevBtn>
                <NextBtn onClick={next}>뒤</NextBtn>
              </ButtonList>
            </PostImgCont>
          )}
          <LikeCommentCont>
            <Like aria-label="좋아요 버튼" onClick={onClick}>
              <FavoriteBorderIcon className={heartColor} />
              <span>{likeNum}</span>
            </Like>
            <Link
              key={author._id}
              href={{
                pathname: `/postdetail/${id}`,
                query: {
                  title: content,
                  nickname: author.username
                }
              }}
              as={`/postdetail/${id}`}
            >
              <Comment>
                <ChatBubbleOutlineIcon className="icon" />
                <span className="sr-only">댓글 보기, 남기기</span>
                <span>0</span>
              </Comment>
            </Link>
          </LikeCommentCont>
          <PostDate>{updatedDate}</PostDate>
        </PostCont>
        <MoreBtn onClick={openPostModal}>
          <span className="sr-only">더보기 버튼</span>
          <MoreVertIcon className="More-btn-icon" />
        </MoreBtn>
      </article>
      <Background
        className={`${postModal}`}
        onClick={closePostModal}
      ></Background>
      <PostModal id={id} postModal={postModal} openDeleteModal={openDeleteModal} />
      {deleteModal && <DeleteModal closeDeleteModal={closeDeleteModal} />}
    </Cont>
  );
};

const Cont = styled.article`
  position: relative;
  max-width: 358px;
  width: 100%;
  margin: 0px auto;
  margin-bottom: 20px;
`;

const AuthorCont = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  cursor: pointer;
`;

const AuthorImg = styled.img`
  width: 42px;
  height: 42px;
  border: 1px solid #dbdbdb;
  border-radius: 50%;
  margin-right: 12px;
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuthorNickName = styled.strong`
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  margin-bottom: 2px;
`;

const AuthorId = styled.strong`
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #767676;
  &::before {
    content: "@";
    margin-right: 3px;
  }
`;

const PostCont = styled.section`
  padding-left: 54px;
`;

const PostTxt = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  margin-bottom: 16px;
`;

const PostImgCont = styled.div`
  display: flex;
  position: relative;
  margin-bottom: 16px;
  max-height: 228px;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.5s;
`;

const PostImgList = styled.ul`
  position: relative;
  display: flex;
  border: 0.5px solid #dbdbdb;
`;

const PostImgItem = styled.li`
  width: 300px;
  height: 220px;
  /* border-radius: 10px; */
  position: relative;
  transition: all 1s;
`;

const PostImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  object-fit: cover;
`;

const ButtonList = styled.div`
  position: absolute;
  display: flex;
  gap: 6px;
  left: 50%;
  bottom: 16px;
  transform: translateX(-50%);
`

const PrevBtn = styled.button`
  width: 30px;
  height: 30px;
  border: 0.5px solid #dbdbdb;
  border-radius: 5px;
  background-color: ${COLOR.orange};
  cursor: pointer;
`

const NextBtn = styled.button`
  width: 30px;
  height: 30px;
  border: 0.5px solid #dbdbdb;
  border-radius: 5px;
  background-color: ${COLOR.orange};
  cursor: pointer;
`

const LikeCommentCont = styled.div`
  display: flex;
  font-weight: 400;
  font-size: 12px;
  line-height: 12px;
  margin-bottom: 16px;
  .icon {
    width: 16px;
    height: 14px;
  }
`;

const Like = styled.button`
  border: none;
  cursor: pointer;
  margin-right: 18px;
  background-color: inherit;
  padding: 0;
  display: flex;
  align-items: center;
  color: #767676;
  .Like-icon {
    width: 16px;
    height: 14px;
    color: red;
  }
`;

const Comment = styled.a`
  display: flex;
  align-items: center;
  color: #767676;
  cursor: pointer;
`;

const PostDate = styled.strong`
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  color: #767676;
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
  background-color: white;
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
function countImageNum() {
  throw new Error("Function not implemented.");
}
