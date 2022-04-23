import styled from "@emotion/styled";
import Link from "next/link";
import { MyPost } from "../../types/MyPost";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

interface PostProps {
  postList: MyPost[]
}

export const ProfileAppPost = ({postList}: PostProps) => {
  
  return (
    <ImgContainer>
      <h3 className="sr-only">이미지 한눈에 보기</h3>
      {postList.map((postData) => {
        return (
          <>
            {postData.image !== ''
            ? <Link key={postData.id} href={`/postdetail/${postData.id}`}>
                <ImgWrap>
                  {postData.image.split(',').length > 1 ? <ContentCopyIcon className="icon" /> : null}
                  <Img src={postData.image.split(',')[0]} />
                </ImgWrap>
              </Link>
            : null
            }
          </>
        )
      })}
    </ImgContainer>
  );
};

const ImgContainer = styled.article`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin: 10px auto;
  max-width: 358px;
  padding-bottom: 50px;
`;
const ImgWrap = styled.a`
  cursor: pointer;
  position: relative;
  .icon {
    position: absolute;
    top: 15px;
    right: 15px;
    color: #fff;
  }
`
const Img = styled.img`
  width: 100%;
  height: 100%;
`;
