import styled from "@emotion/styled";
import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { API_ENDPOINT, COLOR } from "../../constants";
import { Comments } from "../../types/Comments";
import { PostCommentList } from "./CommentList";

interface Comment {
  commentData: Comments[]
  token: string | null | undefined
  loginUser: string | null | undefined
  postId: string | string[] | undefined
}

export const PostComment = ({commentData, token, loginUser, postId}: Comment) => {

  const router = useRouter()
  
  const commentList = [...commentData].reverse()

  const [comment, setComment] = useState("")
  const [isComment, setIsComment] = useState(false)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value)
    if(e.target.value.length > 0) {
      setIsComment(true)
    } else {
      setIsComment(false)
    }
  }

  const [user, setUser] = useState({
    accountname: "",
    follower: [],
    followerCount: 0,
    following: [],
    followingCount: 0,
    image: "/images/ellipse-profile.svg",
    intro: "",
    isfollow: false,
    username: "",
  });

  const getProfile = async () => {
    const res = await axios.get(`${API_ENDPOINT}profile/${loginUser}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    });
    setUser(res.data.profile);
  };
  
  useEffect(() => {
    getProfile();
  }, []);

  const uploadComment = async () => {
    try {
      const commentData = {
        comment:{
          content: comment
        }
      }
      await axios.post(`${API_ENDPOINT}post/${postId}/comments`, commentData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      });
      router.push('/home')
      router.push(`/postdetail/${postId}`)
      setComment('')
    } catch(err) {
      console.log(err);
    }
  };

  const onSubmit = (e: any) => {
    e.preventDefault()
    uploadComment()
  }

  return (
    <Container>
      <h2 className="sr-only">댓글 목록</h2>
      <Comment>
        {commentList.map((comment) => (
          <PostCommentList key={comment.id} comment={comment} token={token} loginUser={loginUser} postId={postId}/>)
        )}
      </Comment>
      <CommentWrite>
        <Form onSubmit={onSubmit}>
          <Img src={user.image} />
          <Label>
            <Input
              name="text"
              type="text"
              id="text"
              placeholder="댓글 입력하기"
              value={comment}
              onChange={onChange}
            ></Input>
          </Label>
          <Btn
            disabled={!isComment}
          >게시</Btn>
        </Form>
      </CommentWrite>
    </Container>
  );
};

const Container = styled.section`
  border-top: 1px solid #dbdbdb;
`;

const Comment = styled.ul`
  display: flex;
  flex-direction: column;
  max-width: 390px;
  margin: 0 auto;
  padding: 20px 16px 0;
`

const CommentWrite = styled.section`
  position: fixed;
  width: 100%;
  bottom: 0;
  border-top: 1px solid #dbdbdb;
`

const Form = styled.form`
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  background-color: #fff;
`;

const Img = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 0.5px solid #dbdbdb;
`

const Label = styled.label`
  width: calc(100% - 112px);
  color: #767676;
  margin: 0 18px;
`;

const Input = styled.input`
  width: 100%;
  font-size: 14px;
  line-height: 18px;
  font-weight: 400;
  border: none;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #dbdbdb;
  }
`;

const Btn = styled.button`
  font-size: 14px;
  line-height: 18px;
  font-weight: 500;
  color: ${COLOR.orange};  
  cursor: pointer;
  &:disabled {
    color: #c4c4c4;
  }
`;
