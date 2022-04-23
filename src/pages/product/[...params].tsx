import type { NextPage } from "next";
import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { EditContainer } from "../../components/product/EditContainer";
import { ProductModification } from "../../components/product/Modification";

const ProdcutEdit: NextPage = () => {
  const router = useRouter();
  const [id, setId] = useState("0");
  
  useEffect(() => {
    try {
      setId(router.query.params![0]);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <section>
      <Head>
        <title>상품 정보 수정 | 감귤마켓</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="sr-only">상품 정보 수정</h1>
      <EditContainer id={id} />
    </section>
  );
};

export default ProdcutEdit;
