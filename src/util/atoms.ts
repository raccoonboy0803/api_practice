import { atom } from 'recoil';

type UserIdProp = {
  userId: string;
};

export const categoryState = atom<UserIdProp>({
  key: 'userIdInfo',
  default: { userId: '' },
});
