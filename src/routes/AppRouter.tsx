import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import MainPage from '../pages/MainPage';
import LoginForm from "../components/login/LoginForm"
import SignupForm from '../components/login/SignupForm';

const AppRouter = (): React.JSX.Element => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/login/signup" element={<SignupForm />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default AppRouter;
