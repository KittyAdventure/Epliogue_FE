import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import logo from '../../assets/images/logo.png';

function LogoSection() {
  const scrollToNext = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };
  return (
    <section className="relative h-screen flex flex-col justify-center items-center">
      <img src={logo} alt="Logo" className="w-36 h-auto object-contain z-10" />
      <div className="text-gray-900 max-w-lg text-center">
        <h2 className="text-2xl font-bold mb-4">에필로그</h2>
        <p className="text-sm">
          고양이는 예로부터 독립적이면서도 호기심이 많은 존재로 알려져 있습니다.
          그런 고양이가 한 권의 책을 펼쳐 깊이 몰입하는 모습은, 지식과 이야기
          속으로 빠져드는 모든 독자의 모습을 상징합니다. 책을 읽는다는 것은
          단순한 정보 습득이 아니라, 새로운 세계로의 여행이며, 무한한 가능성을
          여는 문입니다. 로고 속 고양이는 그러한 지적 탐험의 아이콘이 되어
          누구나 쉽고 자유롭게 책을 즐길 수 있도록 이끕니다.
        </p>
      </div>
      <div
        className="absolute bottom-12 flex flex-col items-center cursor-pointer"
        onClick={scrollToNext}
      >
        <span className="text-lg font-semibold mb-2">
          더 많은 정보를 보려면
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <FontAwesomeIcon
            icon={faArrowDown}
            className="text-4xl transform transition-all hover:scale-125"
          />
        </motion.div>
      </div>
    </section>
  );
}

export default LogoSection;
