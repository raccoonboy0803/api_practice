import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getUserInfo } from '../util/api';
import { useEffect, useState } from 'react';

function Header() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  const { data } = useQuery({
    queryKey: ['getUser'],
    queryFn: getUserInfo,
  });

  const logout = () => {
    localStorage.removeItem('accessToken');
    setIsLogin(false);
    navigate('/login');
  };

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      setIsLogin(true);
    } else {
      navigate('/login');
    }
  }, []);

  return (
    <HeaderWrap>
      <NavWrap>
        <HomeNav onClick={() => navigate('/')}>HOME</HomeNav>
        {isLogin ? (
          <MyProfile onClick={() => navigate('/profile')}>내프로필</MyProfile>
        ) : null}
      </NavWrap>
      <InfoWrap>
        {isLogin ? (
          <>
            <MyInfo>
              <Avatar src={data?.avatar ? data?.avatar : null} />
              {data?.nickname}
            </MyInfo>
            <LogoutBtn onClick={logout}>로그아웃</LogoutBtn>
          </>
        ) : null}
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
