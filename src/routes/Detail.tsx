import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, deleteList, updateList } from '../store';

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
  const currentData = useSelector((state: RootState) => state.list).find(
    (item) => item.id === id
  );
  const [stateVal, setStateVal] = useState<StateProps>({
    id: currentData?.id || '',
    date: currentData?.date || '',
    item: currentData?.item || '',
    amount: currentData?.amount || 0,
    description: currentData?.description || '',
  });

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setStateVal((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const dispatch = useDispatch();

  const updateState = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(updateList(stateVal));
    navigate('/');
  };

  const deleteState = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const response = window.confirm('정말로 이 지출 항목을 삭제하시겠습니까?');
    if (!response) {
      return;
    }
    if (id) {
      dispatch(deleteList(id));
    }
    navigate('/');
  };

  const moveToPrev = () => {
    navigate('/');
  };

  return (
    <DetailWrap>
      <Form>
        <Label htmlFor="data">날짜</Label>
        <Input id="data" value={stateVal.date} onChange={changeInput} />
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
        <BtnWrap>
          <UpdateBtn onClick={updateState}>수정</UpdateBtn>
          <DelBtn onClick={deleteState}>삭제</DelBtn>
          <PrevBtn onClick={moveToPrev}>뒤로 가기</PrevBtn>
        </BtnWrap>
      </Form>
    </DetailWrap>
  );
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
