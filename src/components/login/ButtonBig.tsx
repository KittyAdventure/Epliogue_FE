/**
 * 넓은 버튼 컴포넌트
 *
 * props
 * 1)name
 * 2)arialabel
 * 3)kakao/google id
 */
interface ButtonInfo {
  name: string;
  arialabel: string;
  provider?: "kakao" | "google";
}
const ButtonBig: React.FC<ButtonInfo> = ({ name, arialabel, provider="" }) => {
  const providerColor: Record<
    string,
    { backgroundColor: string; color: string }
  > = {
    kakao: { backgroundColor: '#ffc64c', color: 'black' },
    google: { backgroundColor: '#DB4437', color: 'white' },
  };
  const providerStyles = {
    ...providerColor[provider]
  }
  return (
    <button
      className="block w-[400px] h-[60px] border mx-[auto] mt-[20px] rounded-lg"
      type="submit"
      aria-label={arialabel}
      style={providerStyles}
    >
      {name}
    </button>
  );
};
export default ButtonBig;
