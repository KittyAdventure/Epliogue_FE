import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
// Layout
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import MainPage from '../pages/MainPage';
// Mypage
import LoginForm from '../components/login/LoginForm';
import SignupForm from '../components/login/SignupForm';
import MyPage from '../components/mypage/MyPage';
// Nav
import BookPage from '../pages/BookPage';
import GatheringPage from '../pages/GatheringPage';
import ProjectPage from '../pages/ProjectPage';
// Book
import BookDetailPage from '../pages/BookDetailPage';
// Review
import ReviewDetailSection from '../components/bookdetail/ReviewDetailSection';
import ReviewPage from '../pages/ReviewPage';

const AppRouter = (): React.JSX.Element => {
  // 로그인 상태, Header로 전달
  const [loggedIn, setLoggedIn] = useState(true);
  return (
    <Router>
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route
          path="/login"
          element={<LoginForm setLoggedIn={setLoggedIn} />}
        />
        <Route path="/login/signup" element={<SignupForm />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/project" element={<ProjectPage />} />
        <Route path="/book" element={<BookPage />} />
        <Route path="/gathering" element={<GatheringPage />} />
        <Route path="/book/:isbn" element={<BookDetailPage />} />
        <Route path="/review" element={<ReviewDetailSection />} />
        <Route path="/reviews/:id" element={<ReviewPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default AppRouter;
