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
    console.log('response::', response);
    return response;
  } catch (error) {
    console.error('fail login', error);
    throw error;
  }
};
