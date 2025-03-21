function GatheringBtnSection() {
  return (
    <div className="section-wrap mt-[80px] flex flex-col items-center justify-center py-20">
      <h2 className="text-5xl font-bold mb-10">모임 생성</h2>
      <p className="text-lg text-center mb-16 text-gray-500">
        다양한 공간에서 책과 사람을 만나는 의미 있는 시간!
        <br />
        책을 함께 읽고 깊이 있는 대화를 나누는 독서 모임을 제작해 보세요.
      </p>
      <button className="bg-black text-white hover:bg-white hover:text-black shadow-lg duration-400 px-20 py-3 rounded-full text-lg font-semibold">
        나만의 모임 만들기
      </button>
    </div>
  );
}

export default GatheringBtnSection;
