import { Card } from "./Card";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { API_ENDPOINT } from "../../constants";

export const CardContainer = () => {
  const [followingsDatas, setFollowingsData] = useState([
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
        `${API_ENDPOINT}profile/${loginUser}/following`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
        }
      );
      setFollowingsData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    usersData();
  }, []);

  return (
    <div>
      {followingsDatas.map((followingData) => {
        return <Card key={followingData._id} followingData={followingData} />;
      })}
    </div>
  );
};
