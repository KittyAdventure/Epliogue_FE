const ProjectPage = () => {
  return (
    <div className="w-full">
      {/* 배경 및 로고 */}
      <section className="relative h-screen flex flex-col justify-center items-center bg-gray-800 text-white">
        <div className="text-4xl font-bold">LOGO</div>
        <div className="text-sm mt-2">LOGO의 의미</div>
        <div className="absolute bottom-10 flex flex-col items-center">
          <span className="text-sm">Scroll Down</span>
          <span className="animate-bounce text-xl">↓</span>
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
      <section className="h-screen flex flex-col justify-center items-center bg-gray-100 p-10 text-center relative">
        <h2 className="text-3xl font-bold mb-6">멤버소개</h2>
        <div className="flex items-center space-x-4">
          <button className="p-2 bg-gray-300 rounded-full">{'<'}</button>
          <div className="w-32 h-32 bg-white shadow-md"></div>
          <div className="w-32 h-32 bg-white shadow-md"></div>
          <div className="w-32 h-32 bg-white shadow-md"></div>
          <button className="p-2 bg-gray-300 rounded-full">{'>'}</button>
        </div>
      </section>
    </div>
  );
};

export default ProjectPage;
