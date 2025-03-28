import React from 'react';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import { useAuth } from '../utility/useAuth'; //for private routes
// Layout
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import MainPage from '../pages/MainPage';
// Mypage
import LoginForm from '../components/login/LoginForm';
import SignupForm from '../components/login/SignupForm';
import MyPage from '../components/mypage/MyPage';
import PaymentPage from "../components/payment/PaymentPage"
// Nav (서브 페이지)
import BookPage from '../pages/BookPage';
import GatheringPage from '../pages/GatheringPage';
import ProjectPage from '../pages/ProjectPage';
// Book
import BookDetailPage from '../pages/BookDetailPage';
// Review
import ReviewSection from '../components/bookdetail/ReviewSection';
import MainReviewSection from '../components/main/MainReviewSection';
import ReviewPage from '../pages/ReviewPage';
// Search
import SearchPage from '../pages/SearchPage';
import UserSearchPage from '../pages/UserSearchPage';
// Chat
import ChatPage from '../pages/ChatPage';

const AppRouter = (): React.JSX.Element => {
  const memberId = String(localStorage.getItem('memberId') || '1');

  // 로그인 상태 하드코딩없이, Header로 전달 -> contextapi 활용, prop drilling 불필요
  const { loggedIn } = useAuth(); //로그인&token 상태 확인, 확인 되면 private route, 안되면 redirect(navigate)
  // 보안 차원에서 private route 를 사용해준다. 로그인 없이 방문 할 수 없는 페이지를 접근 못하게 1차적으로 해줌
  const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    if (!loggedIn) {
      return <Navigate to="/login" replace />;
    }
    return <>{children}</>; // Render protected component if authenticated
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<SignupForm />} />
        {/* private route 적용 */}
        <Route
          path="/mypage"
          element={
            <PrivateRoute>
              <MyPage />
            </PrivateRoute>
          }
        />
        <Route path='/payment' element={<PaymentPage />}/>
        <Route path="/project" element={<ProjectPage />} />
        <Route path="/book" element={<BookPage />} />
        <Route path="/gathering" element={<GatheringPage />} />
        <Route
          path="/book/:isbn"
          element={<BookDetailPage memberId={memberId} />}
        />
        <Route
          path="/review/:bookId"
          element={<ReviewSection bookId={memberId} />}
        />
        <Route path="/review" element={<MainReviewSection />} />
        <Route path="/reviews/:reviewId" element={<ReviewPage />} />
        <Route path="/books/:searchTerm" element={<SearchPage />} />
        <Route
          path="/members/search/:searchTerm"
          element={<UserSearchPage />}
        />
        <Route path="/ChatPage/:roomId" element={<ChatPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default AppRouter;
