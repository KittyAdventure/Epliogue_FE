import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import MainPage from '../pages/MainPage';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';

const AppRouter = (): React.JSX.Element => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default AppRouter;
