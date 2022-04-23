import styled from "@emotion/styled";
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import { useSession } from "next-auth/react";
import Router from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { API_ENDPOINT, COLOR } from "../../constants";
import { FileUpload } from "./FileUpload";

interface id {
  id: string
}

export const PostEdit = ({id}: id) => {
  
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const resizeHeight = () => {
    if (textAreaRef === null || textAreaRef.current === null) {
      return
    }
    textAreaRef.current.style.height = '18px'
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px'
  }
  
  const [text, setText] = useState("")
  const [isText, setIsText] = useState(false)

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
    if(e.target.value.length > 0) {
      setIsText(true)
    } else {
      setIsText(false)
    }
  }

  const token = window.localStorage.getItem('token')
  const loginUser = window.localStorage.getItem('account')

  // const { data: session } = useSession()

  // const token = session?.user?.name
  // const loginUser = session?.user?.email

  const [profileImg, setProfileImg] = useState('/images/ellipse-profile.svg');

  const getProfile = async () => {
    const res = await axios.get(`${API_ENDPOINT}profile/${loginUser}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    });
    setProfileImg(res.data.profile.image);
  };

  useEffect(() => {
    getProfile()
  }, []);


  // const [imgUrl, setImgUrl] = useState('')
  const [images, setImages] = useState([] as string[])
  const [isImage, setIsImage] = useState(false)

  const getImage = (src: string[]) => {
    setImages(src)
  }

  const getIsImage = (img: boolean) => {
    setIsImage(img)
  }

  const getPost = async () => {
    const res = await axios.get(`${API_ENDPOINT}post/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    });
    setText(res.data.post.content);
    if(res.data.post.image !== '') {
      setImages(res.data.post.image.split(','))
    }
  };

  useEffect(() => {
    if(id !== "0") getPost()
  }, [id]);

  const deleteImg = (image: string) => {
    const currentIndex: number = images.indexOf(image)
    let newImgList = [...images]
    newImgList.splice(currentIndex, 1)
    setImages(newImgList)
    if(currentIndex < 1) {
      setImages([])
      setIsImage(false)
    }
  }

  const editPost = async () => {
    try {
      const postData = {
        post: {
          content: text,
          image: images + '',
        },
      };
      await axios.put(`${API_ENDPOINT}post/${id}`, postData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      });
      Router.push('/profile');
    } catch(err) {
      console.log(err);
    }
    
  };

  const onSubmit = (e: any) => {
    e.preventDefault()
    editPost()
  }

  return (
    <Container>
      <h2 className="sr-only">게시글 작성 페이지</h2>
      <ProfileImg src={profileImg} alt="프로필사진"/>
      <FillContainer>
        <h3 className="sr-only">게시글 작성</h3>
        <Form onSubmit={onSubmit}>
          <label>
            <Textarea
              name="text"
              value={text}
              onChange={onChange}
              ref={textAreaRef}
              onInput={resizeHeight}
              placeholder="게시글 입력하기..."
            ></Textarea>
          </label>
          <FileUpload images={images} getImage={getImage} getIsImage={getIsImage} token={token}/>
          <SaveBtn disabled={!(isText || isImage)}>업로드</SaveBtn>
        </Form>
        <section>
          <h4 className="sr-only">업로드된 사진</h4>
          <ImgListContainer>
            {images.map((image, index) => (
              <ImgList key={image + index}>
                <UploadedImg src={`${image}`} alt={`${index}번째 이미지`}/>
                <CloseIcon className="close" onClick={() => deleteImg(image)}></CloseIcon>
              </ImgList>
            ))}
          </ImgListContainer>
        </section>
      </FillContainer>
    </Container>
  );
};

const Container = styled.section`
  min-width: 390px;
  padding: 74px 0 20px 16px;
  display: flex;
`;

const ProfileImg = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 50px;
  border: 0.5px solid #dbdbdb;
  background-size: cover;
`

const FillContainer = styled.article`
  min-width: 300px;
  width: 100%;
  padding-right: 16px;
`

const Form = styled.form`
  padding: 12px;
`;

const Textarea = styled.textarea`
  width: 100%;
  margin-bottom: 16px;
  font-size: 14px;
  line-height: 18px;
  outline: none;
  border: none;
  padding: 0;
  resize: none;
  &::placeholder {
    color: #dbdbdb;
  }
`;

const ImgListContainer = styled.ul`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`

const ImgList = styled.li`
  width: 300px;
  height: 220px;
  border: 0.5px solid #dbdbdb;
  overflow: hidden;
  border-radius: 10px;
  position: relative;
  .close {
    position: absolute;
    top: 6px;
    right: 6px;
    height: 22px;
    width: 22px;
    color:#727272;
    filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25));
  }
`

const UploadedImg = styled.img `
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const SaveBtn = styled.button`
  position: absolute;
  top: 31px;
  right: 16px;
  width: 90px;
  height: 32px;
  border-radius: 32px;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  background-color: ${COLOR.orange};
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
  }
`;
