import styled from "@emotion/styled";
import axios from "axios";
import { useRouter } from "next/router";
import { API_ENDPOINT, COLOR } from "../../constants";

interface closeDelModal {
  closeDelModal: () => void;
  id: string
  token: string | null | undefined
  postId: string | string[] | undefined
}

export const CommentDelModal = ({ postId, id, token, closeDelModal }: closeDelModal) => {

  const router = useRouter()
  
  const deleteComment = async () => {
    try{
      await axios.delete(`${API_ENDPOINT}post/${postId}/comments/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    })
    } catch(err){
      console.log(err);
    }
    router.push('/home')
    router.push(`/postdetail/${postId}`);
    closeDelModal()
    // window.location.reload()
  }

  return (
    <Container>
      <DeleteModalContainer>
        <DeleteText>댓글을 삭제하시겠어요?</DeleteText>
        <DeleteBtnContainer>
          <div onClick={closeDelModal}>
            <DeleteCancel>취소</DeleteCancel>
          </div>
          <div onClick={deleteComment}>
            <Delete>삭제</Delete>
          </div>
        </DeleteBtnContainer>
      </DeleteModalContainer>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
`;
const DeleteModalContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const DeleteText = styled.p`
  text-align: center;
  width: 220px;
  background-color: #fff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  font-size: 14px;
  padding: 23px 0;
`;
const DeleteBtnContainer = styled.div`
  border-top: 0.5px solid #dbdbdb;
  width: 220px;
  display: flex;
`;
const DeleteCancel = styled.p`
  text-align: center;
  padding: 15px 0;
  width: 110px;
  font-size: 13px;
  border-bottom-left-radius: 10px;
  border-right: 0.5px solid #dbdbdb;
  background-color: #fff;
  cursor: pointer;
`;

const Delete = styled.p`
  text-align: center;
  padding: 15px 0;
  width: 110px;
  font-size: 13px;
  border-bottom-right-radius: 10px;
  background-color: #fff;
  color: ${COLOR.orange};
  cursor: pointer;
`;
