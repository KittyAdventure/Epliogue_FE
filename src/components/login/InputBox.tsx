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
  value?:string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputBox: React.FC<InputInfo> = ({type, id, name, placeholder, value, onChange}) => {
  const inputStyle = {
    width: "400px",
    height: "60px"
  }
  return (
    <div>
      <input
        className="block w-[400px] h-[60px] border mx-[auto] mt-[20px] rounded-lg px-5 placeholder-gray-400"
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        style={inputStyle}
        autoComplete="off"
        value={value}
        onChange={onChange}
        // required
      />
    </div>
  );
};
export default InputBox;
