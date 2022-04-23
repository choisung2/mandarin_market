import styled from "@emotion/styled";
import Link from "next/link";
import { COLOR } from "../../constants/index";
import HomeIcon from "@mui/icons-material/Home";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { useSession } from "next-auth/react";

export const Footer = () => {
  // const { data: session } = useSession();
  // const loginUser = session?.user?.email;

  const loginUser = window.localStorage.getItem('account')

  return (
    <FooterContainer>
      <nav>
        <MenuList>
          <li>
            <Link href="/home">
              <MenuLink>
                <HomeIcon className="icon home-icon" />
                <Text>홈</Text>
              </MenuLink>
            </Link>
          </li>
          <li>
            <Link href="/developer">
              <MenuLink>
                <ChatBubbleOutlineIcon className="icon chat-icon" />
                <Text>개발자</Text>
              </MenuLink>
            </Link>
          </li>
          <li>
            <Link href="/post/upload">
              <MenuLink>
                <AddBoxOutlinedIcon className="icon" />
                <Text>게시물 작성</Text>
              </MenuLink>
            </Link>
          </li>
          <li>
            <Link href="/profile">
              <MenuLink>
                <PermIdentityIcon className="icon" />
                <Text>프로필</Text>
              </MenuLink>
            </Link>
          </li>
        </MenuList>
      </nav>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  width: 100%;
  border-top: 1px solid #dbdbdb;
  padding: 5px 30px;
  position: fixed;
  left: 0;
  bottom: 0;
  min-width: 390px;
  background-color: #fff;
  z-index: 10;
  box-sizing: border-box;
`;

const MenuList = styled.ul`
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 0;
  border: 0;
  vertical-align: baseline;
`;

const MenuLink = styled.a`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #767676;
  .icon {
    width: 22px;
    height: 22px;
  }
  .chat-icon {
    width: 22px;
    height: 22px;
  }
  .home-icon {
    color: ${COLOR.orange};
  }
`;

const Text = styled.p`
  font-size: 11px;
  margin-top: 5px;
  margin-bottom: 1px;
`;
