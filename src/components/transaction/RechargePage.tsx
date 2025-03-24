import ButtonBig from '../login/ButtonBig';

interface Points {
  value: number;
}
const points: Points[] = [
  { value: 5000 },
  { value: 10000 },
  { value: 20000 },
  { value: 50000 },
  { value: 100000 },
];
const handleRecharge = () => {
  console.log('RECHARGE'); //set active tab
};
const RechargePage = (): React.JSX.Element => {
  return (
    <div className="mypage ">
      <h2 className="title my-0 mx-[auto] max-w-[1440px] py-20 text-4xl font-semibold">
        포인트 구매
      </h2>
      <div className="contentWrap flex flex-col justify-between my-0 mx-[auto] max-w-[1440px]">
        {points.map((point, idx) => (
          <ButtonBig
            key={idx}
            name={`${point.value}`}
            arialabel="button"
            provider="kakao"
            onClick={handleRecharge}
          />
        ))}
      </div>
    </div>
  );
};
export default RechargePage;
