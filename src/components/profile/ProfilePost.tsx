import styled from "@emotion/styled";
import TableRowsIcon from "@mui/icons-material/TableRows";
import AppsIcon from "@mui/icons-material/Apps";
import { useEffect, useState } from "react";
import { ProfileAppPost } from "./ProfileAppPost";
import { MyPostContainer } from "./MyPostContainer";
import { useSession } from "next-auth/react";
import axios from "axios";
import { API_ENDPOINT } from "../../constants";
import { MyPost } from "../../types/MyPost";

interface Account {
  account: string | undefined
}

export const ProfilePost = ({account}: Account) => {
  const [select, setSelect] = useState(true);
  const tableClick = () => {
    if (select === false) setSelect(!select);
  };
  const appClick = () => {
    if (select === true) setSelect(!select);
  };

  const [postData, setPostData] = useState<MyPost[]>([{
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
  }])

  const token = window.localStorage.getItem('token')
  const loginUser = window.localStorage.getItem('account')

  // const { data: session } = useSession()

  // const token = session?.user?.name
  // const loginUser = session?.user?.email

  const getPost = async () => {
    const res = await axios.get(`${API_ENDPOINT}post/${account ? account : loginUser}/userpost`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    });
    setPostData(res.data.post)
  };

  useEffect(() => {
    getPost()
  }, [account]);

  return (
    <div>
      <IconContainer>
        <button type="button" onClick={tableClick}>
          <TableRowsIcon className={`${select}`} />
        </button>
        <button type="button" onClick={appClick}>
          <AppsIcon className={`${!select}`} />
        </button>
      </IconContainer>
      {select === true
        ? <MyPostContainer
            postList={postData}
            token={token}
            loginUser={loginUser}
          />
        : <ProfileAppPost
            postList={postData}
        />}
    </div>
  );
};

const IconContainer = styled.div`
  display: flex;
  justify-content: end;
  border-bottom: 1px solid #dbdbdb;
  padding: 12px 0px 12px 15px;
  margin-bottom: 20px;

  .true {
    opacity: 0.7;
    cursor: pointer;
  }
  .false {
    opacity: 0.2;
    cursor: pointer;
  }
`;
