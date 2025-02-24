import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import MainPage from '../pages/MainPage';
import Header from "../layout/Header"
import Footer from "../layout/Footer"

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
