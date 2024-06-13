import { useRef, useState } from 'react';
import styled from 'styled-components';

import { joinUser, loginUser } from '../util/api';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [isJoinClick, setIsJoinClick] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    nickname: '',
  });
  const idRef = useRef<HTMLInputElement>(null);
  const pwdRef = useRef<HTMLInputElement>(null);
  const nickNameRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    if (type === 'id') {
      setFormData((prev) => ({ ...prev, id: e.target.value }));
    }
    if (type === 'pwd') {
      setFormData((prev) => ({ ...prev, password: e.target.value }));
    }
    if (type === 'nickname') {
      setFormData((prev) => ({ ...prev, nickname: e.target.value }));
    }
  };

  const { mutate: joinMutate } = useMutation({
    mutationFn: joinUser,
    onSuccess: () => {
      alert('회원가입성공! 로그인해주세요');
      setIsJoinClick(false);
    },
  });
  const { mutate: loginMutate } = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      navigate('/');
    },
  });

  const submitForm = (e: React.MouseEvent<HTMLButtonElement>, type: string) => {
    e.preventDefault();
    if (type === 'join') {
      joinMutate(formData);
    }
    if (type === 'login') {
      if (idRef.current && pwdRef.current) {
        loginMutate({
          id: idRef.current.value,
          password: pwdRef.current.value,
        });
      }
    }
  };

  return (
    <LoginWrap>
      <Form>
        <Label htmlFor="id">로그인아이디</Label>
        <Input
          id="id"
          placeholder="아이디"
          ref={idRef}
          minLength={4}
          maxLength={10}
          onChange={(e) => handleInput(e, 'id')}
        />
        <Label htmlFor="pwd">비밀번호</Label>
        <Input
          id="pwd"
          placeholder="비밀번호"
          ref={pwdRef}
          minLength={4}
          maxLength={15}
          onChange={(e) => handleInput(e, 'pwd')}
          type="password"
        />
        {!isJoinClick ? (
          <>
            <Button onClick={(e) => submitForm(e, 'login')} type="submit">
              로그인
            </Button>
            <Button onClick={() => setIsJoinClick(true)} type="button">
              회원가입
            </Button>
          </>
        ) : (
          <>
            <Label htmlFor="nickname">닉네임</Label>
            <Input
              id="nickname"
              placeholder="닉네임"
              ref={nickNameRef}
              minLength={1}
              maxLength={10}
              onChange={(e) => handleInput(e, 'nickname')}
            />
            <Button onClick={(e) => submitForm(e, 'join')} type="submit">
              회원가입
            </Button>
            <Button onClick={() => setIsJoinClick(false)} type="button">
              로그인
            </Button>
          </>
        )}
      </Form>
    </LoginWrap>
  );
}

export default Login;

const LoginWrap = styled.div`
  width: 400px;
  height: 100%;
  background-color: white;
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label``;

const Input = styled.input`
  height: 30px;
`;

const Button = styled.button`
  height: 30px;
`;
