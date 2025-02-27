/**
 * 넓은 버튼 컴포넌트
 *
 * props
 * 1)name
 * 2)arialabel
 */
interface ButtonInfo {
  name: string;
  arialabel: string;
}
const ButtonBig: React.FC<ButtonInfo> = ({ name, arialabel }) => {
  return (
    <button
      className="w-[400px] h-[60px] border"
      type="submit"
      aria-label={arialabel}
    >
      {name}
    </button>
  );
};
export default ButtonBig;
