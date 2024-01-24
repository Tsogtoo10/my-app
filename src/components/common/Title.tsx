const Title = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center gap-2">
      <svg
        className="overflow-visible"
        style={{}}
        width="6"
        height="28"
        viewBox="0 0 6 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 3.5C6 1.84315 4.65685 0.5 3 0.5C1.34315 0.5 0 1.84315 0 3.5V24.5C0 26.1569 1.34315 27.5 3 27.5C4.65685 27.5 6 26.1569 6 24.5V3.5Z"
          fill="url(#paint0_linear_12_15400)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_12_15400"
            x1="3"
            y1="0.5"
            x2="3"
            y2="27.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#684087" />
            <stop offset="1" stopColor="#E10A65" />
          </linearGradient>
        </defs>
      </svg>
      <h1>{title}</h1>
    </div>
  );
};
export default Title;
