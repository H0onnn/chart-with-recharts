import styled from 'styled-components';
import Button from './UI/Button';
import transformedData from '../utils/dataTransform';

const ButtonContainer = ({
  setSelectedId,
}: {
  setSelectedId: React.Dispatch<React.SetStateAction<null | string>>;
}) => {
  const buttonArray = Array.from(new Set(transformedData.map(item => item.id)));

  return (
    <ButtonContainerWrapper>
      <Button size="small" onClick={() => setSelectedId(null)}>
        전체
      </Button>
      {buttonArray.map((id, index) => {
        return (
          <Button key={index} size="small" onClick={() => setSelectedId(id)}>
            {id}
          </Button>
        );
      })}
    </ButtonContainerWrapper>
  );
};

export default ButtonContainer;

const ButtonContainerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 100%;
  gap: 10px;
`;
