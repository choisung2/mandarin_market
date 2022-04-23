import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { CardContainer } from "./CardContainer";
import { NonFeed } from "../home/Nonfeed";
import { useSession } from "next-auth/react";
import axios from "axios";
import { API_ENDPOINT } from "../../constants";

export const Main = () => {
  const [postData, setPostData] = useState([
    {
      author: {
        accountname: "",
        // follower: [],
        // followerCount: "",
        // following: "",
        // followingCount: 0,
        image: "",
        // intro: "",
        // isfollow: false,
        username: "",
        _id: "",
      },
      commentCount: 0,
      comments: [],
      content: "",
      createdAt: "",
      heartCount: 0,
      hearted: false,
      id: "",
      image: "",
      updatedAt: "",
    },
  ]);

  const token = window.localStorage.getItem('token')
  
  // const { data: session } = useSession();

  // const token = session?.user?.name;

  const userData = async () => {
    try {
      const res: any = await axios.get(
        API_ENDPOINT + "post/feed/?limit=15&skip=0",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
        }
      );
      setPostData(res.data.posts);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    userData();
  }, []);

  return (
    <MainContainer>
      <h2 className="sr-only">감귤마켓 피드</h2>
      {postData.length === 0 ? (
        <NonFeed />
      ) : (
        <CardContainer postData={postData} />
      )}
    </MainContainer>
  );
};

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 120px);
  margin: 0px auto;
  overflow-y: scroll;
  padding: 20px 16px 0;
`;
