import styled from "@emotion/styled";
import { NavigateBefore } from "@material-ui/icons";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { API_ENDPOINT, COLOR } from "../../constants/index";

interface CloseDeleteModal {
  id: string
  token: string | null | undefined
  closeDeleteModal: () => void;
}

export const DeleteModal = ({ closeDeleteModal, id, token }: CloseDeleteModal) => {

  const [url, setUrl] = useState("")

  const router = useRouter()
  const currentUrl = router.asPath

  console.log(currentUrl);
  
  const deleteModal = async () => {
    await axios.delete(`${API_ENDPOINT}post/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    })

    router.replace('/myprofile');
    closeDeleteModal()
    // window.location.href = '/myprofile'
  }

  return (
    <Container>
      <DeleteModalContainer>
        <DeleteText>게시글을 삭제할까요?</DeleteText>
        <DeleteBtnContainer>
          <div onClick={closeDeleteModal}>
            <DeleteCancel>취소</DeleteCancel>
          </div>
          <div onClick={deleteModal}>
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
