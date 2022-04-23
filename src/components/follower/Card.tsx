import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import axios from "axios";
import { API_ENDPOINT } from "../../constants";
import { Follower } from "../../types/Follower";
import { COLOR } from "../../constants/index";

interface FollowerProps {
  followerData: Follower;
}

export const Card = ({ followerData }: FollowerProps) => {
  
  const token = window.localStorage.getItem('token')

  // const { data: session } = useSession();
  // const token = session?.user?.name;

  const { image, intro, username, isfollow, accountname } = followerData;

  const [userList, setUserList] = useState(isfollow);

  const follow = async () => {
    try {
      await axios(`${API_ENDPOINT}profile/${accountname}/follow`, {
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      });
      setUserList(!isfollow);
    } catch (error) {
      console.log(error);
    }
  };

  const unfollow = async () => {
    try {
      await axios(`${API_ENDPOINT}profile/${accountname}/unfollow`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      });
      setUserList(!isfollow);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserList>
      <UserItem>
        <Link href={`/profile/${accountname}`}>
          <UserProfile>
            <UserImg src={image} alt="user 이미지" />
            <UserInfo>
              <UserName>{username}</UserName>
              <UserId>{intro}</UserId>
            </UserInfo>
          </UserProfile>
        </Link>
        {userList ? (
          <UnfollowBtn onClick={() => unfollow()}>취소</UnfollowBtn>
        ) : (
          <FollowBtn onClick={() => follow()}>팔로우</FollowBtn>
        )}
      </UserItem>
    </UserList>
  );
};

const UserList = styled.ul`
  max-width: 390px;
  width: 100%;
  list-style: none;
  margin: 0 auto;
`;

const UserItem = styled.li`
  margin-bottom: 16px;
  position: relative;
  display: flex;
  align-items: center;
`;

const UserProfile = styled.a`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  cursor: pointer;
`;

const UserImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 0.5px solid #dbdbdb;
  font-size: 10px;
  overflow: hidden;
`;

const UserInfo = styled.div`
  width: calc(100% - 118px);
  margin-left: 12px;
  height: 100%;
  align-self: flex-start;
`;
const UserName = styled.strong`
  display: block;
  margin: 5px 0 6px;
  line-height: 18px;
  font-size: 14px;
  font-weight: 500;
`;
const UserId = styled.strong`
  color: #767676;
  font-size: 12px;
  line-height: 15px;
`;

const FollowBtn = styled.button`
  position: absolute;
  right: 0;
  width: 56px;
  height: 28px;
  border-radius: 26px;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  display: flex;
  align-items: center;
  color: #fff;
  justify-content: center;
  background-color: ${COLOR.orange};
  cursor: pointer;
`;

const UnfollowBtn = styled.button`
  position: absolute;
  right: 0;
  width: 56px;
  height: 28px;
  border-radius: 26px;
  font-weight: 400;
  display: flex;
  align-items: center;
  color: #767676;
  font-size: 12px;
  border: 1px solid #dbdbdb;
  border-radius: 26px;
  justify-content: center;
  cursor: pointer;
`;
