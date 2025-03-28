// import {useState} from "react"
import ButtonBig from '../login/ButtonBig';

/**
 * Kakao Payment 해야될것들
 * kakaopay logo
 */
interface Points {
  id:number;
  value: number;
}
const points: Points[] = [
  { id: 1, value: 5000 },
  { id: 2, value: 10000 },
  { id: 3, value: 20000 },
  { id: 4, value: 50000 },
  { id: 5, value: 100000 },
];
const handleRecharge = () => {
  console.log("RECHARGE"); //set active tab
};
const RechargePage = (): React.JSX.Element => {
  // const [amount, setAmount] = useState<number>(0)

  return (
    <div className="mypage ">
      <h2 className="title my-0 mx-[auto] max-w-[1440px] py-20 text-4xl font-semibold">
        포인트 구매
      </h2>
      <div className="contentWrap flex flex-col justify-between my-0 mx-[auto] max-w-[1440px]">
        {points.map((point, idx) => (
          <ButtonBig
            key={idx}
            name={`${point.value} 포인트`}
            arialabel="button"
            provider="kakao"
            value={point.value}
            onClick={handleRecharge}
          />
        ))}
        <div className="aboutProduct text-[gray] my-[120px] ml-[240px]">
          <h4>상품문의</h4>
          <p>
            주의: 구매한 상품의 취소/반품은 구매내역에서 신청 가능합니다.
            상품문의
          </p>
          <p>후기게시판을 통해 취소나 환불, 반품 등은 처리되지 않습니다. </p>
          <p>
            가격, 판매자, 교환/환불 및 배송 등 해당 상품 자체와 관련 없는 문의는
            고객센터 내 1:1 문의하기를 이용해주세요.
          </p>
        </div>
      </div>
    </div>
  );
};
export default RechargePage;
