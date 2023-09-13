import styled from 'styled-components';
import Header from '../components/UI/Header';

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <MainLayout>
        <main>{children}</main>
      </MainLayout>
    </>
  );
};

export default PageLayout;

const MainLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 170px auto 0 auto;
  padding: 40px 20px 20px 20px;
  max-width: 1200px;
  width: 100%;
  height: calc(100vh - 170px - 80px);
  box-sizing: border-box;
`;
