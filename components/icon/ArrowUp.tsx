interface IProps {
  color: string;
}

const ArrowUp = ({ color }: IProps) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    fill={color}
  >
    <path d="M6.175 12.8416L10 9.02496L13.825 12.8416L15 11.6666L10 6.66663L5 11.6666L6.175 12.8416Z" />
  </svg>
);
export default ArrowUp;
