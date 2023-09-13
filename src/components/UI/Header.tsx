import styled from 'styled-components';
import { colors } from '../../constants/colors';

const Header = () => {
  return (
    <HeaderLayout>
      <HeaderTitle>Chart Data</HeaderTitle>
    </HeaderLayout>
  );
};

export default Header;

const HeaderLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  background-color: ${colors.white};
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;

const HeaderTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: ${colors.primary};
  margin: 0;
`;
