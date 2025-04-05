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
  type?: 'submit' | "button";
  provider?: 'kakao' | 'google';
  classname?: string;
  value?:number;
  onClick?: () => void;
}
const ButtonBig: React.FC<ButtonInfo> = ({
  name,
  arialabel,
  type = 'submit',
  provider = '',
  classname = '',
  value,
  onClick,
}) => {
  const providerColor: Record<
    string,
    { backgroundColor: string; color: string }
  > = {
    kakao: { backgroundColor: '#fee500', color: '#191919' },
    google: { backgroundColor: '#fff', color: '#191919' },
  };
  const providerStyles = {
    ...providerColor[provider],
  };
  // kakao/google SVG
  const kakaoIcon = (
    <svg
      className="inline mr-3"
      width="24"
      height="24"
      viewBox="0 0 512 512"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#191919"
        d="M255.5 48C299.345 48 339.897 56.5332 377.156 73.5996C414.415 90.666 443.871 113.873 465.522 143.22C487.174 172.566 498 204.577 498 239.252C498 273.926 487.174 305.982 465.522 335.42C443.871 364.857 414.46 388.109 377.291 405.175C340.122 422.241 299.525 430.775 255.5 430.775C241.607 430.775 227.262 429.781 212.467 427.795C148.233 472.402 114.042 494.977 109.892 495.518C107.907 496.241 106.012 496.15 104.208 495.248C103.486 494.706 102.945 493.983 102.584 493.08C102.223 492.177 102.043 491.365 102.043 490.642V489.559C103.126 482.515 111.335 453.169 126.672 401.518C91.8486 384.181 64.1974 361.2 43.7185 332.575C23.2395 303.951 13 272.843 13 239.252C13 204.577 23.8259 172.566 45.4777 143.22C67.1295 113.873 96.5849 90.666 133.844 73.5996C171.103 56.5332 211.655 48 255.5 48Z"
      ></path>
    </svg>
  );
  const googleIcon = (
    <svg
      className="inline mr-3"
      width="24"
      height="24"
      viewBox="-3 0 262 262"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid"
    >
      <g>
        <path
          d="M255.878,133.451 C255.878,122.717 255.007,114.884 253.122,106.761 L130.55,106.761 L130.55,155.209 L202.497,155.209 C201.047,167.249 193.214,185.381 175.807,197.565 L175.563,199.187 L214.318,229.21 L217.003,229.478 C241.662,206.704 255.878,173.196 255.878,133.451"
          fill="#4285F4"
        ></path>
        <path
          d="M130.55,261.1 C165.798,261.1 195.389,249.495 217.003,229.478 L175.807,197.565 C164.783,205.253 149.987,210.62 130.55,210.62 C96.027,210.62 66.726,187.847 56.281,156.37 L54.75,156.5 L14.452,187.687 L13.925,189.152 C35.393,231.798 79.49,261.1 130.55,261.1"
          fill="#34A853"
        ></path>
        <path
          d="M56.281,156.37 C53.525,148.247 51.93,139.543 51.93,130.55 C51.93,121.556 53.525,112.853 56.136,104.73 L56.063,103 L15.26,71.312 L13.925,71.947 C5.077,89.644 0,109.517 0,130.55 C0,151.583 5.077,171.455 13.925,189.152 L56.281,156.37"
          fill="#FBBC05"
        ></path>
        <path
          d="M130.55,50.479 C155.064,50.479 171.6,61.068 181.029,69.917 L217.873,33.943 C195.245,12.91 165.798,0 130.55,0 C79.49,0 35.393,29.301 13.925,71.947 L56.136,104.73 C66.726,73.253 96.027,50.479 130.55,50.479"
          fill="#EB4335"
        ></path>
      </g>
    </svg>
  );
  return (
    <button
      className={`block w-[400px] h-[60px] border mx-[auto] mt-[20px] rounded-xl ${classname}`}
      type={type}
      aria-label={arialabel}
      style={providerStyles}
      onClick={onClick}
      value={value}
    >
      {provider === 'kakao' && kakaoIcon}
      {provider === 'google' && googleIcon}
      {name}
    </button>
  );
};
export default ButtonBig;
