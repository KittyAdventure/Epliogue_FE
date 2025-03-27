import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../utility/useAuth';

const KakaoRedirectHandler = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setLoggedIn } = useAuth();

  useEffect(() => {
    const code = searchParams.get('code');
    console.log('Kakao auth code:', code); // Debugging output
    if (code) {
      exchangeKakaoToken(code);
    }
  }, [searchParams]);

  const exchangeKakaoToken = async (code: string) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL_PROD}/api/members/login`,
        {
          provider: 'kakao',
          token: code, // Send the authorization code to the backend
        },
      );

      if (response.status === 200) {
        console.log('✅ Kakao login successful:', response.data);
        localStorage.setItem('accesstoken', response.data.accessToken);
        localStorage.setItem('memberId', response.data.user.userId);
        setLoggedIn(true);
        navigate('/'); // Redirect to home
      }
    } catch (error) {
      console.error('❌ Kakao login error:', error);
      navigate('/login'); // If login fails, go back to login page
    }
  };

  return <p>Logging in with Kakao...</p>;
};

export default KakaoRedirectHandler;
