import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_ENDPOINT } from "../../constants";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Main } from "./Main";

export const ResearchContainer = () => {
  const token = window.localStorage.getItem('token')

  const [researchValue, setResearchValue] = useState("");
  const [researchCards, setResearchCards] = useState([]);

  const Cards = async () => {
    const res = await axios.get(
      `${API_ENDPOINT}user/searchuser/?keyword=${researchValue}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      }
    );
    if (res.data.length > 0) setResearchCards(res.data);
  };

  useEffect(() => {
    Cards();
  }, [researchValue]);

  return (
    <>
      <Header setResearchValue={setResearchValue} />
      <Main researchCards={researchCards} />
      <Footer />
    </>
  );
};
