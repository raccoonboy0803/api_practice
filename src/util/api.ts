import { QueryClient } from '@tanstack/react-query';
// import axios from 'axios';

// import { JsonProps } from '../routes/Home';

// const BASE_URL = 'https://moneyfulpublicpolicy.co.kr';

// export const queryClient = new QueryClient();

// interface userProps {
//   id: string;
//   password: string;
//   nickname: string;
// }

// export const joinUser = async (data: userProps) => {
//   try {
//     const response = await axios.post(BASE_URL + '/register', data);
//     return response;
//   } catch (error) {
//     console.error('fail join', error);
//     throw error;
//   }
// };

// export const loginUser = async (data: Omit<userProps, 'nickname'>) => {
//   try {
//     const response = await axios.post(BASE_URL + '/login', data);
//     return response;
//   } catch (error) {
//     console.error('fail login', error);
//     throw error;
//   }
// };

// export const getUserInfo = async () => {
//   const accessToken = localStorage.getItem('accessToken');
//   try {
//     const response = await axios.get(BASE_URL + '/user', {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });

//     return response.data;
//   } catch (error) {
//     console.error('Failed to fetch user data', error);
//     throw error;
//   }
// };

// interface UpdateProps {
//   nickname: string;
//   avatar: File | null;
// }

// export const updateProfile = async (data: UpdateProps) => {
//   const accessToken = localStorage.getItem('accessToken');
//   try {
//     const response = await axios.patch(BASE_URL + '/profile', data, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });
//     return response;
//   } catch (error) {
//     console.error('Failed to update profile', error);
//     throw error;
//   }
//   getUserInfo;
// };

// // const rootUrl = 'https://purple-telling-kosmoceratops.glitch.me/';
// const rootUrl = 'https://skitter-desert-microwave.glitch.me';

// export const getJsonData = async (
//   id?: string
// ): Promise<JsonProps[] | JsonProps> => {
//   const endpoint = id ? `/expenses/${id}` : '/expenses';
//   try {
//     const response = await axios.get(rootUrl + endpoint);

//     return response.data;
//   } catch (error) {
//     console.error('Failed to fetch json data', error);
//     throw error;
//   }
// };

// export function isJsonPropsArray(
//   data: JsonProps[] | JsonProps
// ): data is JsonProps[] {
//   return Array.isArray(data);
// }

// export const updateJsonData = async (id: string, updatedData: JsonProps) => {
//   const endpoint = `/expenses/${id}`;
//   try {
//     const response = await axios.put(rootUrl + endpoint, updatedData);

//     return response.data;
//   } catch (error) {
//     console.error('Failed to update json data', error);
//     throw error;
//   }
// };

// export const postJsonData = async (data: JsonProps) => {
//   const response = await axios.post(rootUrl + '/expenses', data);
//   return response;
// };

// export const deleteJsonData = async (id: string) => {
//   const endpoint = `/expenses/${id}`;
//   try {
//     const response = await axios.delete(rootUrl + endpoint);
//     return response;
//   } catch (error) {
//     console.error('Failed to delete json data', error);
//     throw error;
//   }
// };

import axios, { AxiosError } from 'axios';
import { JsonProps } from '../routes/Home';

export const queryClient = new QueryClient();

const BASE_URL = 'https://moneyfulpublicpolicy.co.kr';

const rootUrl = 'https://skitter-desert-microwave.glitch.me';

const axiosInstance = axios.create({
  baseURL: rootUrl,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config; // 에러가 발생한 원본 요청

    if (error.response?.status === 401) {
      try {
        // 재요청 후 에러가 발생하면 로그아웃 처리
        const response = await axiosInstance(originalRequest!);
        return response;
      } catch (refreshError) {
        alert('로그인 만료시간이 끝났습니다. 재로그인해주세요');
        logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

const logout = () => {
  localStorage.removeItem('accessToken');
};

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
  getUserInfo;
};

export const getJsonData = async (
  id?: string
): Promise<JsonProps[] | JsonProps> => {
  const endpoint = id ? `/expenses/${id}` : '/expenses';
  try {
    const response = await axiosInstance.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch json data', error);
    throw error;
  }
};

export function isJsonPropsArray(
  data: JsonProps[] | JsonProps
): data is JsonProps[] {
  return Array.isArray(data);
}

export const updateJsonData = async (id: string, updatedData: JsonProps) => {
  const endpoint = `/expenses/${id}`;
  try {
    const response = await axiosInstance.put(endpoint, updatedData);
    return response.data;
  } catch (error) {
    console.error('Failed to update json data', error);
    throw error;
  }
};

export const postJsonData = async (data: JsonProps) => {
  try {
    const response = await axiosInstance.post('/expenses', data);
    return response.data;
  } catch (error) {
    console.error('Failed to post json data', error);
    throw error;
  }
};

export const deleteJsonData = async (id: string) => {
  const endpoint = `/expenses/${id}`;
  try {
    const response = await axiosInstance.delete(endpoint);
    return response.data;
  } catch (error) {
    console.error('Failed to delete json data', error);
    throw error;
  }
};
