import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import { memberData } from '../../data/memberData';

function MemberSection() {
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
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <section
      className="min-h-[80vh] flex flex-col justify-center items-center p-10 text-center"
      style={{ background: 'linear-gradient(to bottom, #f7fafc, #e2e8f0)' }}
    >
      <h2 className="text-4xl font-bold mb-4 mx-auto text-shadow-md">
        멤버소개
      </h2>

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
                    className="px-4 py-2 bg-[#F26666] text-white rounded-lg text-sm transition-all duration-300 hover:bg-[#e24f4f]"
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
  );
}

export default MemberSection;
