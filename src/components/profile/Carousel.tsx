import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { API_ENDPOINT, COLOR } from "../../constants";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Border } from "../Border";
import { ProductModal } from "../product/ProductModal";
import { CarouselCard } from "./CarouselCard";
import { ProductDeleteModal } from "../product/ProductDeleteModal";

type IndexTypeProps = {
  index: number;
};

interface Account {
  account: string | undefined
}

export const Carousel = ({account}: Account) => {
  const [productList, setProductList] = useState([{
    author: { accountname: "" },
    id: "",
    itemImage: "",
    itemName: "",
    link: "",
    price: 0
  }])

  const token = window.localStorage.getItem('token')
  const loginUser = window.localStorage.getItem('account')

  // const { data: session } = useSession()

  // const token = session?.user?.name
  // const loginUser = session?.user?.email

  const [isModal, setIsModal] = useState(false);
  const [isDelModal, setIsDelModal] = useState(false);

  const openProductModal = () => {
    setIsModal(true);
  };
  const closeProductModal = () => {
    setIsModal(false);
  };
  const openDeleteModal = () => {
    setIsDelModal(true);
  };
  const closeDeleteModal = () => {
    setIsDelModal(false);
    setIsModal(false);
  };

  const getProduct = async () => {
    const res = await axios.get(`${API_ENDPOINT}product/${account ? account : loginUser}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    });
    setProductList(res.data.product)
  };

  useEffect(() => {
    getProduct()   
  }, [account]);

  const [link, setLink] = useState("")
  const [productId, setProductId] = useState("")
  
  const getLink = (link: string) => {
    setLink(link)
  }

  const getProductId = (id: string) => {
    setProductId(id)
  }

  const [caroucelIndex, setCaroucelIndex] = useState(0);

  const handlePrevBtn = () => {
    if (caroucelIndex === 0) return;
    setCaroucelIndex(caroucelIndex - 1);
  };

  const handleNextBtn = () => {
    if (caroucelIndex === productList.length - 1) return;
    setCaroucelIndex(caroucelIndex + 1);
  };

  return (
    <Div>
      {productList.length > 0 ? (
        <>
        <Container>
          <H3>판매 중인 상품</H3>
          <CarouselContainer >
            <h4 className="sr-only">판매 중인 상품의 캐러샐</h4>
              {productList.map((product) => {
                return (
                  <CarouselItem index={caroucelIndex} key={product.id}>
                    <CarouselCard
                      product={product}
                      loginUser={loginUser}
                      openModal={openProductModal}
                      getProductId={getProductId}
                      getLink={getLink}
                    />
                  </CarouselItem>
                );
              })}
          </CarouselContainer>
          <BtnContainer>
            <Btn type="button" onClick={handlePrevBtn}>
              <ArrowBackIcon />
            </Btn>
            <Btn type="button" onClick={handleNextBtn}>
              <ArrowForwardIcon />
            </Btn>
          </BtnContainer>
        </Container>
        {isDelModal && <ProductDeleteModal closeDeleteModal={closeDeleteModal} token={token} id={productId}  />}
        {isModal && <ProductModal Modal={isModal} openDeleteModal={openDeleteModal} link={link} id={productId} />}
        <Background className={`${isModal}`} onClick={closeProductModal} />
        <Border />
        </>
      ) : null}
    </Div>
  );
};

const Div = styled.div`
  border: 0.5px solid #dbdbdb;
`;
const Container = styled.section`
  margin: 16px 21px;
`;
const H3 = styled.h3`
  font-size: 16px;
  font-weight: 700;
  margin: 20px 0 16px 0;
`;
const CarouselContainer = styled.article`
  display: flex;
  width: 330px;
  height: 125px;
  margin: 0 auto;
  overflow: hidden;
`;
const caroucelIndex = (props: IndexTypeProps) => css`
  transform: translateX(-${150 * props.index}px);
  /* z-index: -100; */
`;
const CarouselItem = styled.div`
  ${caroucelIndex}
  transition: all 0.5s ease-in-out;
`;
const BtnContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;
const Btn = styled.button`
  width: 40px;
  height: 40px;
  color: ${COLOR.orange};
  font-size: 32px;
  margin: 20px 0;
  border: 1px solid ${COLOR.orange};
  border-radius: 50%;
  :hover {
    background-color: ${COLOR.orange};
    color: #fff;
    border: 1px solid ${COLOR.orange};
  }
`;
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
