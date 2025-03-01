import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import logo from '../assets/images/logo.png';
import { memberData } from '../data/memberData';

const ProjectPage = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2, // 태블릿에서 2개씩 보이게
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1, // 모바일에서 1개씩 보이게
        },
      },
    ],
  };

  return (
    <div className="w-full project-page-section">
      {/* 로고 섹션 */}
      <section className="relative h-screen flex flex-col justify-center items-center">
        <div className="relative flex items-center justify-center">
          <div className="absolute w-60 h-60 border-4 border-white rounded-full animate-ping opacity-50"></div>{' '}
          <img
            src={logo}
            alt="Logo"
            className="w-40 h-auto object-contain z-10"
          />
        </div>
        <div className="text-lg mt-4 font-semibold">LOGO의 의미</div>
        <div className="absolute bottom-10 flex flex-col items-center">
          <span className="text-lg font-semibold mb-2">
            더 많은 정보를 보려면
          </span>
          <span className="animate-bounce text-3xl text-black">↓</span>
        </div>
      </section>

      {/* 기획 배경 */}
      <section className="relative h-screen flex flex-col justify-center items-center bg-gray-200 text-black">
        <h2 className="text-3xl font-bold mb-4">기획배경</h2>
        <p className="max-w-3xl text-lg text-center">
          현대인은 다양한 디지털 플랫폼에서 책과 관련된 정보를 접하지만, 기초
          독서 플랫폼은 다소 한계가 있어...
        </p>
      </section>

      {/* 기대 효과 */}
      <section className="h-screen flex flex-col justify-center items-center bg-white p-10 text-center">
        <h2 className="text-3xl font-bold mb-4">기대효과</h2>
        <p className="max-w-2xl text-lg">
          같은 책을 읽은 다양한 사람들의 의견 공유
        </p>
      </section>

      {/* 멤버 소개 */}
      <section className="min-h-[80vh] flex flex-col justify-center items-center bg-gradient-to-b from-gray-100 to-gray-300 p-10 text-center">
        <h2 className="text-4xl font-bold mb-10 text-gray-800">멤버소개</h2>

        <div className="w-full max-w-7xl">
          <Slider {...settings}>
            {memberData.map((member, index) => (
              <div key={index} className="p-6">
                <div className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center min-h-[350px] transition-all duration-300 hover:scale-105 mb-7">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-40 h-40 object-cover rounded-full mb-6 shadow-md"
                  />
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-md text-gray-600">{member.role}</p>
                  <div className="mt-4 flex gap-4">
                    <a
                      href={`mailto:${member.email}`}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm transition-all duration-300 hover:bg-blue-600"
                    >
                      이메일
                    </a>

                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm transition-all duration-300 hover:bg-gray-900"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </div>
  );
};

export default ProjectPage;
