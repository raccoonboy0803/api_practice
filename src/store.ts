import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface StateProp {
  id: string;
  date: string;
  item: string;
  amount: number;
  description: string;
}

const listSlice = createSlice({
  name: 'listReducer',
  initialState: [{ id: '', date: '', item: '', description: '', amount: 0 }],
  reducers: {
    addList: (
      state,
      action: PayloadAction<{
        id: string;
        date: string;
        item: string;
        description: string;
        amount: number;
      }>
    ) => {
      return [
        {
          id: action.payload.id,
          date: action.payload.date,
          item: action.payload.item,
          description: action.payload.description,
          amount: action.payload.amount,
        },
        ...state,
      ];
    },
    deleteList: (state, action: PayloadAction<string>) => {
      return state.filter((list) => list.id !== action.payload);
    },
    updateList: (state, action: PayloadAction<StateProp>) => {
      const updatedItem = action.payload;
      return state.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      );
    },
  },
});

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return [];
  }
};

export const saveState = (state: StateProp[]) => {
  const serializedState = JSON.stringify(state);
  localStorage.setItem('state', serializedState);
};

const persistedState = loadState();

const store = configureStore({
  reducer: {
    list: listSlice.reducer,
  },
  preloadedState: {
    list: persistedState,
  },
});

store.subscribe(() => {
  saveState(store.getState().list);
});

export type RootState = ReturnType<typeof store.getState>;
export const { addList, deleteList, updateList } = listSlice.actions;
export default store;
