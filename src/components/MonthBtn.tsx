import styled from 'styled-components';

interface MonthBtnProp {
  month: number;
  isSelected: boolean;
  onClick: (month: number) => void;
}

function MonthBtn({ month, isSelected, onClick }: MonthBtnProp) {
  return (
    <Button onClick={() => onClick(month)} $isSelected={isSelected}>
      {month}월
    </Button>
  );
}

export default MonthBtn;

const Button = styled.button<{ $isSelected: boolean }>`
  background-color: ${(props) =>
    props.$isSelected ? 'rgb(48,196,182)' : 'white'};
`;
