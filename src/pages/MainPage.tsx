import { useState } from 'react';
import Chart from '../components/chart/Chart';
import ButtonContainer from '../components/ButtonContainer';

const MainPage = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div>
      <ButtonContainer setSelectedId={setSelectedId} />
      <Chart selectedId={selectedId} setSelectedId={setSelectedId} />
    </div>
  );
};

export default MainPage;
