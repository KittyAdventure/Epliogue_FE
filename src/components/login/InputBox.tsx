/**
 * 로그인/회원가입용
 *
 * props
 * 1)type
 * 2)id
 * 3)name
 * 4)placeholder
 * 5)extra
 */
interface InputInfo {
  className?: string;
  type: string;
  id: string;
  name: string;
  placeholder: string;
}

const InputBox: React.FC<InputInfo> = ({type, id, name, placeholder}) => {
  const inputStyle = {
    width: "400px",
    height: "60px",
    backgroundColor: "initial",
    color: "inherit",
  }
  return (
    <div>
      <input
        className="block w-[400px] h-[60px] border mx-[auto] mt-[20px] rounded-lg px-5"
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        style={inputStyle}
        required
      />
    </div>
  );
};
export default InputBox;
