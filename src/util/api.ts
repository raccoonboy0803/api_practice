import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = 'https://moneyfulpublicpolicy.co.kr';

export const queryClient = new QueryClient();

interface userProps {
  id: string;
  password: string;
  nickname: string;
}

export const joinUser = async (data: userProps) => {
  try {
    const response = await axios.post(BASE_URL + '/register', data);
    return response;
  } catch (error) {
    console.error('fail join', error);
    throw error;
  }
};

export const loginUser = async (data: Omit<userProps, 'nickname'>) => {
  try {
    const response = await axios.post(BASE_URL + '/login', data);
    return response;
  } catch (error) {
    console.error('fail login', error);
    throw error;
  }
};

export const getUserInfo = async () => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await axios.get(BASE_URL + '/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Failed to fetch user data', error);
    throw error;
  }
};

interface UpdateProps {
  nickname: string;
  avatar: File | null;
}

export const updateProfile = async (data: UpdateProps) => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await axios.patch(BASE_URL + '/profile', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    console.error('Failed to update profile', error);
    throw error;
  }
};
