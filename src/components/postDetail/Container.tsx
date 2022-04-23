import styled from "@emotion/styled";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { API_ENDPOINT } from "../../constants";
import { BackButton } from "../BackButton";
import { LogOutModal } from "../profile/LogOutModal";
import { MyProfileModal } from "../profile/MyProfileModal";
import { PostComment } from "./Comment";
import { PostDetailCard } from "./DetailCard";

interface PostId {
  postId: string | string[] | undefined
}

export const PostDetailContainer = ({postId}: PostId) => {

  const [postData, setPostData] = useState({
      author: {
        accountname: "",
        follower: [],
        followerCount: 0,
        following: [],
        followingCount: 0,
        image: "/images/ellipse-profile.svg",
        intro: "",
        isfollow: false,
        username: "",
        _id: ""
      },
      commentCount: 0,
      comments: [],
      content: "",
      createdAt: "",
      heartCount: 0,
      hearted: false,
      id: "",
      image: "",
      updatedAt: ""
    })
  
  const [commentData, setCommentData] = useState([{
    author: {
      accountname: "",
      follower: [],
      followerCount: 0,
      following: [],
      followingCount: 0,
      image: "/images/ellipse-profile.svg",
      intro: "",
      isfollow: false,
      username: "",
      _id: ""
    },
    content: "",
    createdAt: "",
    id: ""
  }])

  const token = window.localStorage.getItem('token')
  const loginUser = window.localStorage.getItem('account')

  // const { data: session } = useSession();

  // const token = session?.user?.name;
  // const loginUser = session?.user?.email;

  const getPostData = async () => {
    const res = await axios.get(`${API_ENDPOINT}post/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    });
    setPostData(res.data.post)
  }

  const getCommentData = async () => {
    const res = await axios.get(`${API_ENDPOINT}post/${postId}/comments`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    });
    setCommentData(res.data.comments);
  }
   
  useEffect(() => {
    if(postId) {
      getPostData();
      getCommentData();
    }
  }, [postId]);
  
  const [myProfileModal, setMyProfileModal] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);

  const openMyProfileModal = () => {
    setMyProfileModal(true);
  };
  const closeMyProfileModal = () => {
    setMyProfileModal(false);
  };
  const openLogoutModal = () => {
    setLogoutModal(true);
  };
  const closeLogoutModal = () => {
    setLogoutModal(false);
    setMyProfileModal(false);
  };
  
  return (
    <section>
      <h2 className="sr-only">상세 페이지</h2>
      <Nav>
        <BackButton />
        <button onClick={openMyProfileModal}>
          <MoreVertIcon className="more" />
        </button>
      </Nav>
      <MainCountainer>
        <PostDetailCard postData={postData} token={token} loginUser={loginUser}/>
        <PostComment commentData={commentData} token={token} loginUser={loginUser} postId={postId}/>
      </MainCountainer>
      <Background
        className={`${myProfileModal}`}
        onClick={closeMyProfileModal}
      ></Background>
      <MyProfileModal
        myProfileModal={myProfileModal}
        openLogoutModal={openLogoutModal}
      />
      {logoutModal && <LogOutModal closeLogoutModal={closeLogoutModal} />}
    </section>
  );
};
const Nav = styled.nav`
  width: 100%;
  height: 48px;
  border-bottom: 0.5px solid #dbdbdb;
  background-color: #fff;
  z-index: 100;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  .arrow {
    cursor: pointer;
  }
  .more {
    cursor: pointer;
  }
`;

const MainCountainer = styled.div`
  height: calc(100vh - 132px);
  overflow-y: scroll;
`

const Background = styled.div`
  &.true {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #777;
    opacity: 0.4;
    z-index: 10;
  }
`;
