
import { useState } from 'react';

interface InputInfo {
  className?: string;
  type: string;
  id: string;
  name: string;
  placeholder: string;
  value?: string;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  validate?: (value: string) => string | null;
}

const InputBox: React.FC<InputInfo> = ({
  type,
  id,
  name,
  placeholder,
  value,
  disabled,
  onChange,
  validate,
}) => {
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    onChange?.(event);
    if (validate) {
      const validationError = validate(inputValue);
      setError(validationError);
    }
  };

  return (
    <div>
      <input
        className="block w-[400px] h-[60px] border mx-[auto] mt-[20px] rounded-lg px-5 placeholder-gray-400"
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        autoComplete="off"
        value={value}
        onChange={handleChange}
        disabled={disabled}
        // required
      />
      {error && <p className="">{error}</p>}
    </div>
  );
};
export default InputBox;
