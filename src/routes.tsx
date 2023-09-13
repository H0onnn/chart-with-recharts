import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" Component={MainPage} />
    </Routes>
  );
};

export default AppRoutes;
