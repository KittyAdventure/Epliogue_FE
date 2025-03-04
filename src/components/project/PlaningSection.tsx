import { motion } from 'framer-motion';

function PlaningSection() {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: 'easeInOut' },
    },
  };

  const lineVariants = {
    hidden: { scaleY: 0 },
    visible: {
      scaleY: 1,
      transition: { duration: 2, ease: 'easeInOut' },
    },
  };

  const circleVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, ease: 'easeInOut', delay: 2 },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 10, color: '#CBD5E0' },
    visible: {
      opacity: 0.5,
      transition: { duration: 2, ease: 'easeInOut' },
    },
  };

  return (
    <div
      className="relative h-screen flex flex-col justify-center items-center overflow-hidden text-[#7f868d]"
      style={{ background: 'linear-gradient(to bottom, #f7fafc, #e2e8f0)' }}
    >
      {/* 배경 알파벳 */}
      {['E', 'P', 'I', 'L', 'O', 'G', 'U', 'E'].map((letter, index) => (
        <motion.span
          key={index}
          className="absolute text-[12vw] font-bold pointer-events-none" // 마우스 이벤트 차단
          style={{
            top: `${index * 8 + 5}%`,
            left: `${index * 12 + 3}%`,
            whiteSpace: 'nowrap',
            transform: 'translateXY(-50%,-50%)',
          }}
          variants={letterVariants}
          initial="hidden"
          whileInView="visible"
          animate={{
            y: [-10, 10, -10],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: index * 0.3,
          }}
          viewport={{ once: false }}
        >
          {letter}
        </motion.span>
      ))}

      {/* 제목 */}
      <motion.h2
        className="text-4xl font-bold text-black my-10 mx-auto text-shadow-md z-10"
        variants={textVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
      >
        기획배경
      </motion.h2>

      {/* 설명 텍스트 */}
      <motion.p
        className="max-w-3xl text-center text-lg text-gray-500 leading-relaxed z-10 "
        variants={textVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
      >
        현대인은 다양한 디지털 플랫폼을 통해 책과 관련된 정보를 접하고 있지만,
        기존의 독서 플랫폼은 주로 간단한 리뷰나 평점 입력에 그칩니다. 독서는
        개인적이고 주관적인 경험으로, 책을 읽으며 느낀 감정, 중요한 구절, 작가의
        메시지 등 다양한 요소를 기록하고 분석할 수 있는 공간이 필요합니다.
        이러한 공간은 독자가 독서 경험을 더욱 풍부하게 쌓을 수 있도록 도와주며,
        다른 독자들과 깊이 있는 소통을 가능하게 합니다. 따라서, 사용자가 자신의
        독서 경험을 다각도로 분석하고 기록할 수 있는 독서 플랫폼의 필요성이
        커지고 있습니다.
      </motion.p>

      {/* 세로 선 */}
      <motion.div
        className="absolute left-[50%] top-0 w-[2px] bg-black h-[40vh] origin-top z-10"
        variants={lineVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
      ></motion.div>

      {/* 선 끝 원 */}
      <motion.div
        className="absolute left-[calc(50%-7px)] top-[40vh] w-4 h-4 bg-black rounded-full z-10"
        variants={circleVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
      ></motion.div>
    </div>
  );
}

export default PlaningSection;
