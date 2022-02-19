import styled from "@emotion/styled";
import { useCallback, useState } from "react";
import { COLOR } from "../../constants";
import { FileUpload } from "./FileUpload";

export const ProductRegister = () => {
  const [isImage, setIsImage] = useState(false)

  const getImage = (img: boolean) => {
    setIsImage(img)
  }

  const [product, setProduct] = useState("")
  const [price, setPrice] = useState("")
  const [url, setUrl] = useState("")

  const [isProduct, setIsProduct] = useState(false)
  const [isPrice, setIsPrice] = useState(false)
  const [isUrl, setIsUrl] = useState(false)

  const onChange = useCallback((e) => {
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
  }, [])

  
  const onSubmit = useCallback((e) => {
    e.preventDefault()
  }, [])

  return (
    <Container>
      <h2 className="sr-only">상품 정보 입력창</h2>
      <Form onSubmit={onSubmit}>
        <SubText>이미지 등록</SubText>
        <FileUpload getImage={getImage}/>
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
        <SaveBtn disabled={!(isImage && isProduct && isPrice && isUrl)}>저장</SaveBtn>
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
  top: 31px;
  right: 16px;
  width: 90px;
  height: 32px;
  border-radius: 32px;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  background-color: ${COLOR.orange};
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
  }
`;
