import styled from "@emotion/styled";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { API_ENDPOINT, COLOR } from "../../constants";
import { FileUpload } from "./FileUpload";

interface id {
  id: string
}

export const ProductModification = ({id}: id) => {
  
  const router = useRouter()

  const [image, setImage] = useState("")
  const [isImage, setIsImage] = useState(false)

  const getImage = (src: string) => {
    setImage(src)
  }

  const getIsImage = (img: boolean) => {
    setIsImage(img)
  }

  const [product, setProduct] = useState("")
  const [price, setPrice] = useState("")
  const [url, setUrl] = useState("")

  const [isProduct, setIsProduct] = useState(false)
  const [isPrice, setIsPrice] = useState(false)
  const [isUrl, setIsUrl] = useState(false)

  const token = window.localStorage.getItem('token')

  // const { data: session } = useSession()

  // const token = session?.user?.name

  const getProduct = async () => {
    try{
      const res = await axios.get(`${API_ENDPOINT}product/detail/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      });
      setProduct(res.data.product.itemName)
      setPrice(res.data.product.price+"")
      setUrl(res.data.product.link)
      setImage(res.data.product.itemImage)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if(id !== "0") getProduct()
  }, [id])

  const onChange = (e: any) => {
    const {target: {name, value}} = e
    if(name === "product") {
      setProduct(value)
      if(value.length < 2 || value.length > 15) {
        setIsProduct(false)
      } else {
        setIsProduct(true)
      }
    } else if(name ==="price") {
      const priceRegex = /^[0-9]*$/
      if(!priceRegex.test(value)) {
        setIsPrice(false)
      } else {
        setPrice(value)
        setIsPrice(true)
      }
    } else if(name === "url") {
      setUrl(value)
      const urlRegex = /^(((http(s?))\:\/\/)?)([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,6}(\:[0-9]+)?(\/\S*)?/
       if(!urlRegex.test(value)) {
        setIsUrl(false)
      } else {
        setIsUrl(true)
      }
    }
  }

  const editProduct = async () => {
    try {
      const productData = {
        product: {
          itemName: product,
          price: parseInt(price.replace(/,/g , '')),
          link: url,
          itemImage: image
        },
      };
      await axios.put(`${API_ENDPOINT}product/${id}`, productData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      });
      router.push('/profile');
    } catch(err) {
      console.log(err);
    }
  };
  
  const onSubmit = (e: any) => {
    e.preventDefault()
    editProduct()
  }

  return (
    <Container>
      <h2 className="sr-only">상품 정보 입력창</h2>
      <Form onSubmit={onSubmit}>
        <SubText>이미지 등록</SubText>
        <FileUpload image={image} getImage={getImage} isImage={isImage} getIsImage={getIsImage} token={token}/>
        <Label>
          <SubText>상품명</SubText>
          <Input
            name="product"
            type="text"
            id="product"
            placeholder="2~15자 이내여야 합니다."
            value={product}
            onChange={onChange}
          ></Input>
        </Label>
        <Label>
          <SubText>가격</SubText>
          <Input
            name="price"
            type="text"
            id="price"
            placeholder="숫자만 입력 가능합니다."
            value={price}
            onChange={onChange}
          ></Input>
        </Label>
        <Label>
          <SubText>판매 링크</SubText>
          <Input
            name="url"
            type="text"
            id="url"
            placeholder="URL을 입력해 주세요."
            value={url}
            onChange={onChange}
          ></Input>
        </Label>
        <SaveBtn disabled={!(isImage || isProduct || isPrice || isUrl)}>저장</SaveBtn>
      </Form>
    </Container>
  );
};

const Container = styled.section`
  max-width: 390px;
  margin: 0 auto;
`;


const Form = styled.form`
  padding: 100px 34px 0;
`;

const SubText = styled.span`
  margin-bottom: 10px;
  color: #767676;
  font-size: 12px;
  line-height: 15px;
`;

const Label = styled.label`
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 10px;
  font-size: 14px;
  padding-bottom: 8px;
  border: none;
  border-bottom: 1px solid #dbdbdb;
  &:focus {
    outline: none;
    border-bottom: 1px solid ${COLOR.orange};
  }
  &::placeholder {
    color: #dbdbdb;
  }
`;

const SaveBtn = styled.button`
  position: absolute;
  top: 30px;
  right: 10px;
  width: 90px;
  height: 32px;
  border-radius: 32px;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  background-color: ${COLOR.orange};
  &:disabled {
    opacity: 0.5;
  }
`;
