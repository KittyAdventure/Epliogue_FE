import { motion } from 'framer-motion';

function PlaningSection() {
  const textVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1, ease: 'easeInOut' } },
  };
  const lineVariants = {
    hidden: { height: '0%' },
    visible: {
      height: '100%',
      transition: { duration: 2, ease: 'easeInOut' },
    },
  };
  return (
    <section className="relative h-screen flex flex-col justify-center items-center bg-gray-100 text-black">
      <motion.h2
        className="text-3xl font-bold mb-4"
        variants={textVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        기획배경
      </motion.h2>

      {/* 기획 배경 텍스트 */}
      <motion.p
        className="max-w-3xl text-lg text-center"
        variants={textVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        현대인은 다양한 디지털 플랫폼에서 책과 관련된 정보를 접하지만, 기존 독서
        플랫폼은 단순 리뷰나 평점 입력에 그치는 경우가 많습니다. 이러한 한계를
        극복하기 위해, 사용자가 자신의 독서 경험을 다각도로 분석하고 기록할 수
        있는 공간이 필요하다.
      </motion.p>

      {/* 선 */}
      <motion.div
        className="absolute left-[50%] top-0 w-[2px] bg-black h-[40vh]"
        variants={lineVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      ></motion.div>
    </section>
  );
}

export default PlaningSection;
