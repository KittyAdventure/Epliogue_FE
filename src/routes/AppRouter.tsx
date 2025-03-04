import React, {useState} from "react"
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
// Common Layout
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
// Pages
import LoginForm from '../components/login/LoginForm';
import SignupForm from '../components/login/SignupForm';
import MyPage from '../components/mypage/MyPage';
import BookPage from '../pages/BookPage';
import GatheringPage from '../pages/GatheringPage';
import MainPage from '../pages/MainPage';
import ProjectPage from '../pages/ProjectPage';

const AppRouter = (): React.JSX.Element => {
  // 로그인 상태, Header로 전달
  const [loggedIn, setLoggedIn] = useState(true);
  return (
    <Router>
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginForm setLoggedIn={setLoggedIn}/>} />
        <Route path="/login/signup" element={<SignupForm />} />
        <Route path="/mypage" element= {<MyPage />} />
        <Route path="/project" element={<ProjectPage />} />
        <Route path="/book" element={<BookPage />} />
        <Route path="/gathering" element={<GatheringPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default AppRouter;
