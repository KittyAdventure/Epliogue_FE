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
  type: string;
  id: string;
  name: string;
  placeholder: string;
}
const InputBox: React.FC<InputInfo> = ({ type, id, name, placeholder}) => {
  return (
    <div>
      <input type={type} id={id} name={name} placeholder={placeholder}/>
    </div>
  );
};
export default InputBox;
