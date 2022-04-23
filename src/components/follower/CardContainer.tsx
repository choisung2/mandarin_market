import { Card } from "./Card";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { API_ENDPOINT } from "../../constants";

export const CardContainer = () => {
  const [followersData, setFollowersData] = useState([
    {
      username: "",
      intro: "",
      image: "",
      _id: "",
      isfollow: false,
      accountname: "",
    },
  ]);

  const token = window.localStorage.getItem('token')
  const loginUser = window.localStorage.getItem('account')

  // const { data: session } = useSession();
  // const loginUser = session?.user?.email;
  // const token = session?.user?.name;

  const usersData = async () => {
    try {
      const res = await axios.get(
        `${API_ENDPOINT}profile/${loginUser}/follower`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
        }
      );
      setFollowersData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    usersData();
  }, []);

  return (
    <div>
      {followersData.map((followerData) => {
        return <Card key={followerData._id} followerData={followerData} />;
      })}
    </div>
  );
};
