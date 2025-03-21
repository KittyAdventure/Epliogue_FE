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
  // 로그인 상태, Header로 전달 -> contextapi 활용, prop drilling 불필요
  // const [loggedIn, setLoggedIn] = useState(true);
  const memberId = String(localStorage.getItem('memberId') || '1');

  const { loggedIn } = useAuth(); //로그인&token 상태 확인, 확인 되면 route, 안되면 redirect
  // 보안 차원에서 private route 를 사용해준다. 방문 할 수 없는 페이지를 접근 할 수 없게 1차적으로 해줌
  const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    if (!loggedIn) {
      return <Navigate to="/members/login" replace />;
    }
    // Render protected component if authenticated
    return <>{children}</>
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/members/login" element={<LoginForm />} />
        <Route path="/members/register" element={<SignupForm />} />
        {/* private route 적용 */}
        <Route
          path="/mypage"
          element={
            <PrivateRoute>
              <MyPage />
            </PrivateRoute>
          }
        />
        <Route path="/project" element={<ProjectPage />} />
        <Route path="/book" element={<BookPage />} />
        <Route path="/gathering" element={<GatheringPage />} />
        <Route
          path="/book/:isbn"
          element={<BookDetailPage memberId={memberId} />}
        />
        <Route path="/review" element={<ReviewSection />} />
        <Route path="/review" element={<MainReviewSection />} />
        <Route path="/reviews/:id" element={<ReviewPage />} />
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
