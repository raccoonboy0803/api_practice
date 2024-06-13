import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getUserInfo } from '../util/api';

function Header() {
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ['getUser'],
    queryFn: getUserInfo,
  });

  return (
    <HeaderWrap>
      <NavWrap>
        <HomeNav onClick={() => navigate('/')}>HOME</HomeNav>
        <MyProfile onClick={() => navigate('/profile')}>내프로필</MyProfile>
      </NavWrap>
      <InfoWrap>
        <MyInfo>
          <Avatar src={data?.avatar ? data?.avatar : null} />
          {data?.nickname}
        </MyInfo>
        <LogoutBtn>로그아웃</LogoutBtn>
      </InfoWrap>
    </HeaderWrap>
  );
}

export default Header;

const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 50px;
  width: 100vw;
  background-color: lightgray;
  margin-bottom: 20px;
`;
const NavWrap = styled.div``;
const HomeNav = styled.button``;
const MyInfo = styled.div``;
const MyProfile = styled.button``;
const InfoWrap = styled.div`
  display: flex;
`;
const LogoutBtn = styled.button``;
const Avatar = styled.img`
  width: 30px;
  border-radius: 100px;
`;
