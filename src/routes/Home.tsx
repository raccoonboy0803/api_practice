import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import monthData from '../data/monthData.ts';
import MonthBtn from '../components/MonthBtn';
import DetailElement from '../components/DetailElement.tsx';
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import {
  addList,
  saveState,
  loadState,
  RootState,
  StateProp,
} from '../store.ts';

export interface MockDataTypes {
  id: string;
  date: string;
  item: string;
  amount: number;
  description: string;
}

function Home() {
  const [mockData, setMockData] = useState<MockDataTypes[]>([]);
  const [curMonthData, setCurMonthData] = useState<MockDataTypes[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<number>(1);
  const location = useLocation();
  const dispatch = useDispatch();
  const lists = useSelector((state: RootState) => state.list);
  const { newData, delData } = location.state || {};
  const dateRef = useRef<HTMLInputElement>(null);
  const itemRef = useRef<HTMLInputElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/mockData.json');
      const data = await response.json();

      saveState(data);
      data.map((item: StateProp) => {
        dispatch(addList(item));
      });
      setMockData(data);
      const initialMonthData = data.filter(
        (item: MockDataTypes) => new Date(item.date).getMonth() + 1 === 1
      );
      if (dateRef.current) {
        const year = new Date().getFullYear();
        dateRef.current.value = `${year}-${'01'.padStart(2, '0')}-01`;
      }
      setCurMonthData(initialMonthData);
    };

    const storedData = loadState();
    if (storedData.length >= 1) {
      setMockData(storedData);
      const initialMonthData = storedData.filter(
        (item: MockDataTypes) => new Date(item.date).getMonth() + 1 === 1
      );
      if (dateRef.current) {
        const year = new Date().getFullYear();
        dateRef.current.value = `${year}-${'01'.padStart(2, '0')}-01`;
      }
      setCurMonthData(initialMonthData);
    } else {
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (newData) {
      setMockData((prevMockData) => {
        const updatedData = prevMockData.map((item) => {
          if (item.id === newData.id) {
            return { ...newData, amount: Number(newData.amount) };
          }
          return item;
        });

        const initialMonthData = updatedData.filter(
          (item: MockDataTypes) => new Date(item.date).getMonth() + 1 === 1
        );

        setCurMonthData(initialMonthData);
        return updatedData;
      });
    }
    if (delData) {
      setMockData((prevMockData) => {
        const updatedData = prevMockData.filter(
          (item) => item.id !== delData.id
        );

        const initialMonthData = updatedData.filter(
          (item: MockDataTypes) => new Date(item.date).getMonth() + 1 === 1
        );
        if (dateRef.current) {
          const year = new Date().getFullYear();
          dateRef.current.value = `${year}-${'01'.padStart(2, '0')}-01`;
        }
        setCurMonthData(initialMonthData);
        return updatedData;
      });
    }
  }, [newData, delData]);

  const clickMonthBtn = async (month: number) => {
    if (lists !== null) {
      const filterdData = lists.filter(
        (data: MockDataTypes) => new Date(data.date).getMonth() + 1 === month
      );
      setCurMonthData(filterdData);
    }
    if (dateRef.current) {
      const year = new Date().getFullYear();
      dateRef.current.value = `${year}-${String(month).padStart(2, '0')}-01`;
    }
    setSelectedMonth(month);
  };

  const submitForm = () => {
    if (
      dateRef.current &&
      itemRef.current &&
      amountRef.current &&
      descriptionRef.current
    ) {
      if (
        !dateRef.current.value ||
        !itemRef.current.value ||
        !amountRef.current.value ||
        !descriptionRef.current.value
      ) {
        alert('모든 작성칸을 입력해주세요');
        return;
      }

      const newEntry: MockDataTypes = {
        id: uuidv4(),
        date: dateRef.current.value,
        item: itemRef.current.value,
        amount: Number(amountRef.current.value),
        description: descriptionRef.current.value,
      };

      const updatedData = [...mockData, newEntry];
      setMockData(updatedData);
      dispatch(addList(newEntry));

      const initialMonthData = updatedData.filter(
        (item: MockDataTypes) => new Date(item.date).getMonth() + 1 === 1
      );
      setCurMonthData(initialMonthData);
    }
  };

  return (
    <Container>
      <FormSecton>
        <FormWrap>
          <InputWrap>
            <Label htmlFor="date">날짜</Label>
            <Input
              type="text"
              id="date"
              placeholder="YYYY-MM-DD"
              ref={dateRef}
            />
          </InputWrap>
          <InputWrap>
            <Label htmlFor="item">항목</Label>
            <Input
              type="text"
              id="item"
              placeholder="지출 항목"
              ref={itemRef}
            />
          </InputWrap>
          <InputWrap>
            <Label htmlFor="amount">금액</Label>
            <Input
              type="number"
              id="amount"
              placeholder="지출 금액"
              ref={amountRef}
            />
          </InputWrap>
          <InputWrap>
            <Label htmlFor="description">내용</Label>
            <Input
              type="text"
              id="description"
              placeholder="지출 내용"
              ref={descriptionRef}
            />
          </InputWrap>
          <FormButton onClick={submitForm}>저장</FormButton>
        </FormWrap>
      </FormSecton>
      <DateSection>
        <DateWrap>
          {monthData.map((data, index) => (
            <MonthBtn
              key={index}
              month={data}
              onClick={clickMonthBtn}
              isSelected={data === selectedMonth}
            />
          ))}
        </DateWrap>
      </DateSection>
      <GraphWrap></GraphWrap>
      <DetailSection>
        {curMonthData.map((data) => {
          return <DetailElement key={data.id} {...data} />;
        })}
      </DetailSection>
    </Container>
  );
}

export default Home;

const Container = styled.main`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  row-gap: 20px;
  margin: 0 auto;
`;

const FormSecton = styled.section`
  padding: 20px;
  background-color: white;
`;

const FormWrap = styled.div`
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
`;

const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label``;

const Input = styled.input``;

const FormButton = styled.button``;

const DateSection = styled.section`
  padding: 20px;
  background-color: white;
`;

const DateWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const GraphWrap = styled.div``;

const DetailSection = styled.section`
  padding: 20px;
  background-color: white;
`;
