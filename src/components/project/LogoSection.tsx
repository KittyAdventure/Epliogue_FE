import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import logowh from '../../assets/images/logowh.png';

function LogoSection() {
  const scrollToNext = () => {
    window.scrollTo({ top: window.innerHeight + 80, behavior: 'smooth' });
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: 'easeInOut' },
    },
  };

  const logoVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 0.6,
      y: 0,
      transition: { duration: 1, ease: 'easeInOut' },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 2, ease: 'easeInOut' } },
  };

  return (
    <div
      className="relative h-screen flex flex-col items-center text-white"
      style={{
        backgroundImage: `url(../../public/img/logosection.webp)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      {/* 반투명 레이어 */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
      <motion.img
        src={logowh}
        alt="Logo"
        className="max-w-xs h-auto object-contain z-10 mb-6 mt-[20vh]"
        variants={logoVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      />
      <div className="text-center z-20">
        <motion.h2
          className="text-4xl font-extrabold text-white tracking-wide mb-6 uppercase text-shadow-lg"
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          에필로그
        </motion.h2>

        {/* 설명 텍스트 */}
        <motion.p
          className="max-w-3xl text-lg text-gray-200 leading-relaxed"
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          고양이는 예로부터 독립적이면서도 호기심이 많은 존재로 알려져 있습니다.
          그런 고양이가 한 권의 책을 펼쳐 깊이 몰입하는 모습은, 지식과 이야기
          속으로 빠져드는 모든 독자의 모습을 상징합니다. 책을 읽는다는 것은
          단순한 정보 습득이 아니라, 새로운 세계로의 여행이며, 무한한 가능성을
          여는 문입니다. 로고 속 고양이는 그러한 지적 탐험의 아이콘이 되어
          누구나 쉽고 자유롭게 책을 즐길 수 있도록 이끕니다.
        </motion.p>
      </div>
      <div
        className="absolute bottom-12 flex flex-col items-center cursor-pointer"
        onClick={scrollToNext}
      >
        <motion.span
          className="text-lg font-semibold mb-2"
          variants={letterVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          더 많은 정보를 보려면
        </motion.span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          variants={letterVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <FontAwesomeIcon icon={faArrowDown} className="text-4xl" />
        </motion.div>
      </div>
    </div>
  );
}

export default LogoSection;
