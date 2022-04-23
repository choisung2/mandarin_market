import styled from "@emotion/styled";
import Router, { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import { COLOR } from "../../constants";

interface CloseLogoutModal {
  closeLogoutModal: () => void;
}

export const LogOutModal = ({ closeLogoutModal }: CloseLogoutModal) => {

  const router = useRouter()

  const logout = () => {
    window.localStorage.removeItem('account');
    window.localStorage.removeItem('token');
    router.push('/')
  };

  return (
    <Container>
      <LogOutModalContainer>
        <LogoutText>로그아웃하시겠어요?</LogoutText>
        <LogOutBtnContainer>
          <div onClick={closeLogoutModal}>
            <LogoutCancel>취소</LogoutCancel>
          </div>
          <div>
            <Logout
              onClick={() =>
                logout()
                // signOut({ callbackUrl: `${window.location.origin}` })
              }
            >
              로그아웃
            </Logout>
          </div>
        </LogOutBtnContainer>
      </LogOutModalContainer>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
`;
const LogOutModalContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const LogoutText = styled.p`
  text-align: center;
  width: 220px;
  background-color: #fff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  font-size: 14px;
  padding: 23px 0;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 220px;
    height: 103px;
    border-radius: 10px;
    background: #fff;
    z-index: -10;
  }
`;
const LogOutBtnContainer = styled.div`
  border-top: 0.5px solid #dbdbdb;
  width: 220px;
  display: flex;
`;
const LogoutCancel = styled.p`
  text-align: center;
  padding: 15px 0;
  width: 110px;
  font-size: 13px;
  border-bottom-left-radius: 10px;
  border-right: 0.5px solid #dbdbdb;
  background-color: #fff;
  cursor: pointer;
`;

const Logout = styled.button`
  text-align: center;
  padding: 13px 0;
  width: 110px;
  font-size: 13px;
  border-bottom-right-radius: 10px;
  background-color: #fff;
  color: ${COLOR.orange};
  cursor: pointer;
`;
