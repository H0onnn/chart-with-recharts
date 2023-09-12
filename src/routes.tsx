// routes.tsx
import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" Component={Home} />
    </Routes>
  );
};

export default AppRoutes;
