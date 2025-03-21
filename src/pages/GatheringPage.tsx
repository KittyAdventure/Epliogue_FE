//Offline 모임 페이지
// import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import ButtonBig from '../components/login/ButtonBig';

const GatheringPage = (): React.JSX.Element => {
  // const [offGathering, setOffGathering] = useState<string>("")
  // const settings: Settings = {
  //   dots: true, // Show dots below the slider
  //   infinite: true, // Enable infinite scroll
  //   speed: 500, // Transition speed in ms
  //   slidesToShow: 1, // Number of slides to show at a time
  //   slidesToScroll: 1, // Number of slides to scroll at a time
  //   arrows: true, // Enable next/previous arrows
  //   autoplay: false, // Disable autoplay
  // };
  // try {
  //   const apiUrl =
  //     import.meta.env.NODE === 'production'
  //       ? import.meta.env.VITE_API_URL_PROD
  //       : import.meta.env.VITE_API_URL_DEV;
  //   const response = await axios.get(`${apiUrl}/mypage/gathering`);

  //   console.log(response.data);
  //   // setOffGathering(response.data.gathering);
  // } catch (error) {
  //   console.error('Failed to fetch meetings', error);
  // }
  // const handleGatheringModal = () => {
  //   console.log("create meeting")
  // }

  return (
    <div className="">
      <div className="title w-full max-w-[1440px] m-auto mt-[120px] text-center  ">
        <h2 className="font-semibold text-6xl leading-20">모임 생성</h2>
        <p className="mt-10 ">
          다양한 공간에서 책과 사람을 만나는 의미있는 시간!
        </p>
        <p>책을 함께 읽고 깊이 있는 대화를 나누는 독서모임을 제작해 보세요</p>
        <ButtonBig
          name="나만의 모임 만들기"
          arialabel="meeting button"
          classname={'bg-black text-white text-2xl rounded-full mt-[60px]'}
          // onClick={handleGatheringModal}
        />
      </div>

      <div className="gatheringWrap">
        <h3>내 모임</h3>
        {/* Slick slider */}
        <div className="slider-container">
          {/* <Slider {...settings}>
            {slides.map(slide => (
                <div key={slide.id}>
                  <h3>{slide.content}</h3>
                </div>
              ))}
            <h2>hiellalsd</h2>
          </Slider> */}
        </div>
      </div>
    </div>
  );
};
export default GatheringPage;
