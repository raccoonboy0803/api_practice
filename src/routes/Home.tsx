import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import monthData from '../data/monthData.ts';
import MonthBtn from '../components/MonthBtn';
import DetailElement from '../components/DetailElement.tsx';
import { v4 as uuidv4 } from 'uuid';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  getJsonData,
  getUserInfo,
  isJsonPropsArray,
  postJsonData,
  queryClient,
} from '../util/api.ts';

export interface MockDataTypes {
  id: string;
  date: string;
  item: string;
  amount: number;
  description: string;
}

export interface JsonProps {
  amount: number;
  date: string;
  description: string;
  item: string;
  id?: string;
  createdBy: string;
  month: number;
  userId: string;
}

function Home() {
  const [selectedMonth, setSelectedMonth] = useState<number>(1);
  const dateRef = useRef<HTMLInputElement>(null);
  const itemRef = useRef<HTMLInputElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const [monthState, setMonthState] = useState<JsonProps[]>([]);

  const { data: jsonData, isFetching } = useQuery({
    queryKey: ['detailData'],
    queryFn: () => getJsonData(),
  });

  useEffect(() => {
    if (jsonData && isJsonPropsArray(jsonData)) {
      const filteredData = jsonData.filter(
        (data) => data.month === selectedMonth
      );
      setMonthState(filteredData);
    }
  }, [jsonData, selectedMonth]);

  const clickMonthBtn = (month: number) => {
    setSelectedMonth(month);
    if (jsonData && isJsonPropsArray(jsonData)) {
      const monthFilteredData = jsonData.filter((data) => data.month === month);
      setMonthState(monthFilteredData);
    }
    if (dateRef.current) {
      const year = new Date().getFullYear();
      dateRef.current.value = `${year}-${String(month).padStart(2, '0')}-01`;
    }
  };

  const { data: userData } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
  });

  const { mutate } = useMutation({
    mutationFn: postJsonData,
    onSuccess: () => {
      alert('등록되었습니다');
      queryClient.invalidateQueries({
        queryKey: ['detailData'],
      });
    },
  });

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

      const newEntry = {
        id: uuidv4(),
        amount: Number(amountRef.current.value),
        date: dateRef.current.value,
        description: descriptionRef.current.value,
        item: itemRef.current.value,
        createdBy: userData.nickname,
        month: parseInt(dateRef?.current?.value.split('-')[1]),
        userId: userData.id,
      };

      mutate(newEntry);

      itemRef.current.value = '';
      amountRef.current.value = '';
      descriptionRef.current.value = '';
    }
  };

  return (
    <Container>
      <FormSecton>
        <FormWrap>
          <InputWrap>
            <Label htmlFor="date">날짜</Label>
            <Input
              type="date"
              id="date"
              placeholder="YYYY-MM-DD"
              ref={dateRef}
              defaultValue="2024-01-01"
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
        {!isFetching &&
          jsonData &&
          monthState.map((data) => {
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
