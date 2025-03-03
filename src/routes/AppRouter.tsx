import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import LoginForm from '../components/login/LoginForm';
import SignupForm from '../components/login/SignupForm';
// import MyPage from '../components/mypage/MyPage';
import BookPage from '../pages/BookPage';
import GatheringPage from '../pages/GatheringPage';
import MainPage from '../pages/MainPage';
import ProjectPage from '../pages/ProjectPage';

const AppRouter = (): React.JSX.Element => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/login/signup" element={<SignupForm />} />
        {/* <Route path="/mypage" element= {<MyPage />} */}
        <Route path="/project" element={<ProjectPage />} />
        <Route path="/book" element={<BookPage />} />
        <Route path="/gathering" element={<GatheringPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default AppRouter;
