import styled from "@emotion/styled";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { signOut } from "next-auth/react";
import { API_ENDPOINT, COLOR } from "../constants";

interface BtnLabel {
  btnLabel: string;
  signUp: { email: string; password: string };
}

export const ProfileForm = ({ btnLabel, signUp }: BtnLabel) => {

  const token = window.localStorage.getItem('token')

  // const { data: session } = useSession();
  // const token = session?.user?.name;

  const [name, setName] = useState("");
  const [myId, setMyId] = useState("");
  const [intro, setIntro] = useState("");

  const [formData, setFormData] = useState<FormData>();
  const [pre, setPre] = useState(`${API_ENDPOINT}Ellipse.png`);

  const [isName, setIsName] = useState(false);
  const [isMyId, setIsMyId] = useState(false);
  const [isIntro, setIsIntro] = useState(false);

  const [nameMessage, setNameMessage] = useState("");
  const [myIdMessage, setMyIdMessage] = useState("");

  const router = useRouter();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "name") {
      setName(value);
      if (value.length < 2 || value.length > 10) {
        setNameMessage("2자~10자 이내여야 합니다.");
        setIsName(false);
      } else {
        setIsName(true);
      }
    } else if (name === "id") {
      setMyId(value);
      const idRegex = /^[a-z0-9_,]{1,10}$/;
      if (!idRegex.test(value)) {
        setMyIdMessage("영문, 숫자, 밑줄 및 마침표만 사용할 수 있습니다.");
        setIsMyId(false);
      } else {
        setIsMyId(true);
      }
    } else if (name === "intro") {
      setIntro(value);
      setIsIntro(true);
    }
  };

  const handleImgInput = ({
    currentTarget: { files },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (files && files.length) {
      const formData = new FormData();
      formData.append("image", files[0]);
      setFormData(formData);
      preview(files[0]);
    }
  };

  const imgUpload = async () => {
    try {
      const res = await axios(`${API_ENDPOINT}image/uploadfile`, {
        method: "POST",
        data: formData,
      });
      return `${API_ENDPOINT}${res.data.filename}`;
    } catch (err) {
      alert("잘못된 접근입니다.");
    }
  };

  const preview = (file: Blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setPre(`${reader.result}`);
  };

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    btnLabel: string
  ) => {
    e.preventDefault();
    let imgUrl = await imgUpload();
    if (imgUrl === `${API_ENDPOINT}undefined`) {
      imgUrl = `${API_ENDPOINT}Ellipse.png`;
    }
    if (btnLabel !== "저장") {
      try {
        await axios(`${API_ENDPOINT}user`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          data: JSON.stringify({
            user: {
              username: name,
              email: signUp.email,
              password: signUp.password,
              accountname: myId,
              intro: intro,
              image: imgUrl,
            },
          }),
        });
        alert("회원가입에 성공했습니다.");
        router.push("/");
      } catch (err) {
        alert("알맞은 정보를 입력해주세요.");
      }
    } else {
      try {
        await axios(`${API_ENDPOINT}user`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
          data: JSON.stringify({
            user: {
              username: name,
              accountname: myId,
              intro: intro,
              image: imgUrl,
            },
          }),
        });
        await signOut({ callbackUrl: `${window.location.origin}` });
        alert("프로필 변경에 성공했습니다. 다시 로그인 해주세요.");
      } catch (err) {
        alert("알맞은 정보를 입력해주세요.");
      }
    }
  };

  return (
    <Form onSubmit={(e) => onSubmit(e, btnLabel)}>
      <ImgContainer>
        <ProfileImg src={pre} alt="프로필 이미지 미리보기" />
        <ImgInput
          type="file"
          id="upload"
          accept="image/*"
          onChange={handleImgInput}
        ></ImgInput>
      </ImgContainer>
      <Label>
        <SubText>사용자 이름</SubText>
        <Input
          type="text"
          id="name"
          name="name"
          placeholder="2~10자 이내여야 합니다."
          value={name}
          onChange={onChange}
        ></Input>
        {name.length > 0 && (
          <Error className={`${isName ? "" : "error"}`}>*{nameMessage}</Error>
        )}
      </Label>
      <Label>
        <SubText>계정 ID</SubText>
        <Input
          type="text"
          id="id"
          name="id"
          placeholder="영문, 숫자, 특수문자(,), (_)만 사용 가능합니다."
          value={myId}
          onChange={onChange}
        ></Input>
        {myId.length > 0 && (
          <Error className={`${isMyId ? "" : "error"}`}>*{myIdMessage}</Error>
        )}
      </Label>
      <Label>
        <SubText>소개</SubText>
        <Input
          type="text"
          id="intro"
          name="intro"
          placeholder="자신과 판매할 상품에 대해 소개해 주세요."
          value={intro}
          onChange={onChange}
        ></Input>
      </Label>
      {btnLabel === "감귤마켓 시작하기" && (
        <Button disabled={!(isName && isMyId && isIntro)}>{btnLabel}</Button>
      )}
      {btnLabel === "저장" && (
        <SaveBtn disabled={!(isName && isMyId && isIntro)}>저장</SaveBtn>
      )}
    </Form>
  );
};

const Form = styled.form`
  padding: 0 24px;
`;

const ImgContainer = styled.label`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  &::after {
    content: "";
    width: 36px;
    height: 36px;
    background: ${COLOR.orange} url("/images/upload-file.svg") no-repeat center;
    border-radius: 25px;
    position: absolute;
    bottom: 0;
    right: 110px;
  }
`;

const ProfileImg = styled.img`
  width: 110px;
  height: 110px;
  border-radius: 50%;
`;

const ImgInput = styled.input`
  display: none;
`;

const Label = styled.label`
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  color: #767676;
  font-size: 12px;
  line-height: 15px;
`;

const SubText = styled.span`
  margin-bottom: 10px;
`;

const Input = styled.input`
  margin-bottom: 10px;
  font-size: 14px;
  padding-bottom: 8px;
  border: none;
  border-bottom: 1px solid #dbdbdb;
  &:focus {
    outline: none;
    border-bottom: 1px solid ${COLOR.orange};
  }
  &::placeholder {
    color: #dbdbdb;
  }
`;

const Button = styled.button`
  width: 100%;
  border: none;
  height: 44px;
  border-radius: 44px;
  color: #fff;
  background-color: ${COLOR.orange};
  &:disabled {
    opacity: 0.5;
  }
`;

const Error = styled.span`
  display: none;
  &.error {
    color: ${COLOR.orange};
    display: block;
  }
`;
const SaveBtn = styled.button`
  position: absolute;
  z-index: 200;
  top: 31px;
  right: 16px;
  width: 90px;
  height: 32px;
  border-radius: 32px;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  background-color: ${COLOR.orange};
  &:disabled {
    opacity: 0.5;
  }
`;
