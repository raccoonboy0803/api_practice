import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

interface DetailEleProps {
  id: string;
  date: string;
  item: string;
  description: string;
  amount: number;
}

function DetailElement({
  id,
  date,
  item,
  description,
  amount,
}: DetailEleProps) {
  const navigate = useNavigate();

  const navigateDetail = () => {
    navigate(`/${id}`);
  };
  return (
    <DatailContainer onClick={navigateDetail}>
      <DetailEleWrap>
        <DetailTitleWrap>
          <DetailTitleSpan>{date}</DetailTitleSpan>
          <DetailTitleSpan>{`${item} - ${description}`}</DetailTitleSpan>
        </DetailTitleWrap>
        <DeatilAmounWrap>{`${amount} 원`}</DeatilAmounWrap>
      </DetailEleWrap>
    </DatailContainer>
  );
}

export default DetailElement;

const DatailContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  margin-bottom: 10px;
  width: 700px;
  cursor: pointer;
`;

const DetailEleWrap = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5fr 1fr;
`;

const DetailTitleWrap = styled.div`
  display: flex;
  align-items: start;
  flex-direction: column;
  flex-grow: 1;
  overflow-x: hidden;
  overflow-y: hidden;
  width: 100%;
`;
const DetailTitleSpan = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  width: 100%;
`;

const DeatilAmounWrap = styled.span``;
