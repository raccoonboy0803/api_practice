import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  deleteJsonData,
  getJsonData,
  getUserInfo,
  isJsonPropsArray,
  queryClient,
  updateJsonData,
} from '../util/api';
import { JsonProps } from './Home';

export interface StateProps {
  date: string;
  item: string;
  amount: number;
  description: string;
  id: string;
}

function Detail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setStateVal((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const moveToPrev = () => {
    navigate('/');
  };

  const { data: userData, isFetching: isUserFetching } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
  });

  const { data: jsonData, isFetching } = useQuery({
    queryKey: ['detailDataFromId'],
    queryFn: () => getJsonData(id),
  });

  const { mutate: deleteMutate } = useMutation({
    mutationFn: deleteJsonData,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['detailData'],
      });
      navigate('/');
    },
  });

  const deleteState = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const response = window.confirm('정말로 이 지출 항목을 삭제하시겠습니까?');
    if (!response) {
      return;
    }
    if (jsonData && !isJsonPropsArray(jsonData)) {
      deleteMutate(jsonData.id!);
    }
  };

  const [stateVal, setStateVal] = useState<JsonProps>({
    date: '',
    item: '',
    amount: 0,
    description: '',
    createdBy: '',
    month: 0,
    userId: '',
  });

  useEffect(() => {
    if (jsonData && !isJsonPropsArray(jsonData)) {
      setStateVal({
        date: jsonData.date || '',
        item: jsonData.item || '',
        amount: jsonData.amount || 0,
        description: jsonData.description || '',
        createdBy: jsonData.createdBy || '',
        month: jsonData.month,
        userId: jsonData.userId,
      });
    }
  }, [jsonData]);

  const { mutate } = useMutation({
    mutationFn: (updatedData: JsonProps) =>
      updateJsonData(id as string, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['detailData'],
      });
      alert('수정되었습니다');
      navigate('/');
    },
  });

  const handleUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (id) {
      mutate(stateVal);
    }
  };

  if (isFetching || isUserFetching) {
    return <div>Loading...</div>;
  }

  if (
    !isFetching &&
    !isUserFetching &&
    jsonData &&
    !isJsonPropsArray(jsonData)
  ) {
    return (
      <DetailWrap>
        <Form>
          <Label htmlFor="date">날짜</Label>
          <Input
            id="date"
            value={stateVal.date}
            onChange={changeInput}
            type="date"
          />
          <Label htmlFor="item">항목</Label>
          <Input id="item" value={stateVal.item} onChange={changeInput} />
          <Label htmlFor="amount">금액</Label>
          <Input
            id="amount"
            type="number"
            value={stateVal.amount}
            onChange={changeInput}
          />
          <Label htmlFor="description">내용</Label>
          <Input
            id="description"
            value={stateVal.description}
            onChange={changeInput}
          />
          {userData.id === jsonData?.userId ? (
            <BtnWrap>
              <UpdateBtn onClick={handleUpdate}>수정</UpdateBtn>
              <DelBtn onClick={deleteState}>삭제</DelBtn>
              <PrevBtn onClick={moveToPrev}>뒤로 가기</PrevBtn>
            </BtnWrap>
          ) : null}
        </Form>
      </DetailWrap>
    );
  }
}

export default Detail;

const DetailWrap = styled.div``;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label``;

const Input = styled.input``;

const BtnWrap = styled.div``;

const UpdateBtn = styled.button``;

const DelBtn = styled.button``;

const PrevBtn = styled.button``;
