import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import MainPage from '../pages/MainPage';
// import Header from '../components/layout/Header';
// import Footer from '../components/layout/Footer';

const AppRouter = (): React.JSX.Element => {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        <Route path="/" />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
};

export default AppRouter;
