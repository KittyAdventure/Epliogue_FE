import { motion } from 'framer-motion';

function ExpectedSection() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeOut' } },
  };

  const sections = [
    {
      title: '기대효과 01',
      subtitle: '"다양한 의견 공유와 관심사 기반의 네트워킹"',
      text: '동일한 책을 읽은 다양한 사람들의 의견을 공유함으로써 여러 관점을 접하고, 새로운 인사이트를 발견할 수 있습니다. 온라인과 오프라인 채팅을 통해 비슷한 취향의 사람들과 네트워킹하며, 깊이 있는 토론과 책 추천을 받을 수 있습니다. 이러한 상호작용은 독서 경험을 풍부하게 만듭니다.',
      image: 'ex_section_1.jpg',
    },
    {
      title: '기대효과 02',
      subtitle: '"독서 경험 기록을 통한 평가 및 비교"',
      text: '책을 읽고 느낌, 별점, 생각 등을 기록하면 추후 이를 비교하고 분석할 수 있습니다. 시간이 지나면서 감정 변화를 추적하고, 여러 권의 책을 비교해 독서 취향의 변화를 확인할 수 있습니다. 독서 기록을 통해 자신이 선호하는 책의 스타일을 파악하고, 향후 더 나은 독서 선택을 할 수 있습니다. 이를 통해 독서의 깊이를 더하고, 자기 개선에 도움이 됩니다.',
      image: 'ex_section_2.jpg',
    },
    {
      title: '기대효과 03',
      subtitle: '"개인의 독서 선호도 분석 및 맞춤형 추천"',
      text: '독서 기록을 통해 자신만의 독서 선호도를 파악할 수 있습니다. 자주 읽는 장르, 주제, 작가를 알게 되면 맞춤화된 책 추천을 받을 수 있습니다. 이러한 데이터를 바탕으로 추천 시스템이 개인화되어 독서 경험을 더 만족스럽고 효율적으로 만들어줍니다. 또한, 새로운 장르나 작가를 발견하는 데 도움이 되어 독서의 폭을 넓힐 수 있습니다.',
      image: 'ex_section_3.jpg',
    },
  ];

  return (
    <div className="relative">
      {sections.map((section, index) => (
        <div
          key={index}
          className="expected-tit sticky top-0 left-0 h-screen flex justify-center items-center px-8"
        >
          {/* 배경 이미지 */}
          <div
            className="expected-bg absolute inset-0 bg-cover bg-center before:absolute before:inset-0 before:bg-black/30"
            style={{
              backgroundImage: `url(/img/expected/${section.image})`,
            }}
          ></div>

          {/* 컨텐츠 박스 */}
          <motion.div
            className="relative text-center max-w-3xl flex items-center justify-center flex-col p-10 bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 shadow-xl transition-transform duration-300"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            <h2 className="text-4xl font-extrabold text-white tracking-wide uppercase text-shadow-lg">
              {section.title}
            </h2>
            <h3 className="text-2xl font-bold text-white mb-3 mt-8">
              {section.subtitle}
            </h3>
            <p className="text-lg text-gray-200 leading-relaxed">
              {section.text}
            </p>
          </motion.div>
        </div>
      ))}
    </div>
  );
}

export default ExpectedSection;
