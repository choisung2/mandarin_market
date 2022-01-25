import styled from "@emotion/styled";

import { COLOR } from "../../constants";

import { PostCommentList } from "./CommentList";

export const PostComment = () => {
  const userData = {
    src: "https://cdn.pixabay.com/photo/2018/05/26/18/06/dog-3431913_960_720.jpg",
    nickname: "영등포 빵주먹 이현호",
    postdate: "방금",
    comment : "리액트는 좀 하시나요?"
  }

  return (
    <Container>
      <h2 className="sr-only">댓글 목록</h2>
      <Comment>
        <PostCommentList userData={userData}/>
      </Comment>
      <CommentWrite>
        <Form>
          <Img src="https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/cnoC/image/bA15rm1zOffsle8EVMPD_ZHtxYU.JPG" />
          <Label>
            <Input
              name="text"
              type="text"
              id="text"
              placeholder="댓글 입력하기"
            ></Input>
          </Label>
          <Btn disabled>게시</Btn>
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