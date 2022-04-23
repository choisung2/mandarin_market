import { NextPage } from "next";
import React from "react";
import styled from "@emotion/styled";
import { BackButton } from "../../components/BackButton";
import { ProfileForm } from "../../components/ProfileForm";

const Edit: NextPage = () => {
  return (
    <Container>
      <Nav>
        <BackButton />
      </Nav>
      {typeof window !== 'undefined' && (
        <ProContainer>
          <ProfileForm signUp={{ email: "", password: "" }} btnLabel="저장" />
        </ProContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  overflow: hidden;
`;

const Nav = styled.nav`
  position: fixed;
  width: 100%;
  height: 48px;
  border-bottom: 0.5px solid #dbdbdb;
  background-color: #fff;
  z-index: 100;
  display: flex;
  padding: 0 10px;
  justify-content: space-between;
  align-items: center;
  .arrow {
    cursor: pointer;
  }
  .more {
    cursor: pointer;
  }
`;

const ProContainer = styled.div`
  margin-top: 100px;
`;

export default Edit;
