import styled from "@emotion/styled";
import { API_ENDPOINT, COLOR } from "../../constants";
import Link from "next/link";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

interface Account {
  account: string | undefined;
}

export const MyProfileInfo = ({ account }: Account) => {

  const [userList, setUserList] = useState({
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

  const {
    accountname,
    follower,
    followerCount,
    following,
    followingCount,
    image,
    intro,
    isfollow,
    username,
  } = userList;

  const token = window.localStorage.getItem('token')
  const loginUser = window.localStorage.getItem('account')

  // const { data: session } = useSession();

  // const token = session?.user?.name;
  // const loginUser = session?.user?.email;

  const getProfile = async () => {
    const res = await axios.get(
      `${API_ENDPOINT}profile/${account ? account : loginUser}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      }
    );
    setUserList(res.data.profile);
  };

  useEffect(() => {
    getProfile();
  }, [account]);

  const follow = async () => {
    await axios(
      `${API_ENDPOINT}profile/${account ? account : loginUser}/follow`,
      {
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      }
    );
    setUserList({
      ...userList,
      isfollow: true,
      followerCount: followerCount + 1,
    });
  };

  const unFollow = async () => {
    await axios(
      `${API_ENDPOINT}profile/${account ? account : loginUser}/unfollow`,
      {
        method: "delete",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      }
    );
    setUserList({
      ...userList,
      isfollow: false,
      followerCount: followerCount - 1,
    });
  };

  return (
    <Container>
      <ProfileContainer>
        <h3 className="sr-only">마이 프로필</h3>
        <ImgContainer>
          <div>
            <Link href={`/follow/${loginUser}/follower`}>
              <a>
                <Followers>{followerCount}</Followers>
                <Text>followers</Text>
              </a>
            </Link>
          </div>
          <Img src={image} alt="유저 사진" />
          <div>
            <Link href={`/follow/${loginUser}/following`}>
              <a>
                <Followings>{followingCount}</Followings>
                <Text>followings</Text>
              </a>
            </Link>
          </div>
        </ImgContainer>
        <Nickname>{username}</Nickname>
        <Email>@ {accountname}</Email>
        <Content>{intro}</Content>
        {accountname === loginUser ? (
          <BtnContainer>
            <Link href={"/profile/edit"}>
              <WhiteBtn>프로필 수정</WhiteBtn>
            </Link>
            <Link href={"/product"}>
              <WhiteBtn>상품 등록</WhiteBtn>
            </Link>
          </BtnContainer>
        ) : (
          <BtnContainer>
            {/* <IconContainer>
              <ChatBubbleOutlineIcon className="icon" />
            </IconContainer> */}
            {isfollow ? (
              <UnFollowBtn onClick={unFollow}>언팔로우</UnFollowBtn>
            ) : (
              <FollowBtn onClick={follow}>팔로우</FollowBtn>
            )}
            {/* <IconContainer>
              <ShareIcon className="icon" />
            </IconContainer> */}
          </BtnContainer>
        )}
      </ProfileContainer>
    </Container>
  );
};

const Container = styled.div`
  border: 0.5px solid #dbdbdb;
`;
const ProfileContainer = styled.article`
  text-align: center;
  padding: 30px 55px;
`;
const ImgContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 16px;
`;
const Img = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;
const Followers = styled.p`
  font-size: 18px;
  font-weight: 700;
`;
const Followings = styled.p`
  font-size: 18px;
  font-weight: 700;
  color: #767676;
`;
const Text = styled.p`
  margin-top: 10px;
  font-size: 10px;
  color: #767676;
`;
const Nickname = styled.p`
  font-size: 16px;
  font-weight: 700;
`;
const Email = styled.p`
  font-size: 12px;
  color: #767676;
  margin: 6px 0 16px 0;
`;
const Content = styled.p`
  font-size: 14px;
  color: #767676;
`;
const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 24px 0 3px 0;
`;
const FollowBtn = styled.button`
  background-color: ${COLOR.orange};
  border: none;
  width: 120px;
  height: 34px;
  border-radius: 30px;
  margin: 0 10px;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
`;
const UnFollowBtn = styled.button`
  background-color: #fff;
  border: none;
  width: 120px;
  height: 34px;
  border-radius: 30px;
  margin: 0 10px;
  border: 1px solid #dbdbdb;
  color: #767676;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
`;
const WhiteBtn = styled.button`
  background-color: #fff;
  border: none;
  /* width: 120px; */
  /* height: 34px; */
  padding: 7px 23px;
  border-radius: 30px;
  margin: 0 10px;
  border: 1px solid #dbdbdb;
  color: #767676;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
`;
const IconContainer = styled.div`
  width: 34px;
  height: 34px;
  border: 1px solid #dbdbdb;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  .icon {
    width: 15px;
    height: 15px;
    color: #767676;
  }
`;
