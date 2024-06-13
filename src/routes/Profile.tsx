import { useMutation, useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import styled from 'styled-components';
import { getUserInfo, queryClient, updateProfile } from '../util/api';

function Profile() {
  const nickNameRef = useRef<HTMLInputElement>(null);
  const avatarRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<{
    nickname: string;
    avatar: File | null;
  }>({ nickname: '', avatar: null });

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    if (type === 'nickname') {
      setFormData((prev) => ({ ...prev, nickname: e.target.value }));
    }
    if (type === 'avatar') {
      setFormData((prev) => ({ ...prev, avatar: e.target.files![0] }));
    }
  };

  const { data } = useQuery({
    queryKey: ['getUser'],
    queryFn: getUserInfo,
  });

  const { mutate } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      alert('프로필 업데이트 성공');
      queryClient.invalidateQueries({
        queryKey: ['getUser'],
      });
    },
  });

  return (
    <ProfileWrap>
      <p>프로필 수정</p>
      <InputWrap>
        <label htmlFor="nickname">닉네임</label>
        <input
          id="nickname"
          type="text"
          ref={nickNameRef}
          defaultValue={data?.nickname}
          onChange={(e) => handleInput(e, 'nickname')}
        />
      </InputWrap>
      <InputWrap>
        <label htmlFor="avatar">아바타 이미지</label>
        <input
          id="avatar"
          type="file"
          accept="image/*"
          ref={avatarRef}
          onChange={(e) => handleInput(e, 'avatar')}
        />
      </InputWrap>
      <Button onClick={() => mutate(formData)}>프로필 업데이트 </Button>
    </ProfileWrap>
  );
}

export default Profile;

const ProfileWrap = styled.div`
  width: 400px;
  background-color: white;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;
const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
`;
const Button = styled.button``;
