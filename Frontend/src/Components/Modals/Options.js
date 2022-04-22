import { BsArrowDownShort, BsArrowUpShort } from 'react-icons/bs';

export default function OptionModal(props) {
  const handleClick = (e) => {
    if (e.target !== e.currentTarget) return;
    props.handleClose?.();
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="fixed top-0 left-0 w-screen h-screen z-4"
      ></div>

      <ul className="shadow-lg relative bg-white w-44 border-2 border-gray rounded-lg px-4 z-1 top-0 py-6 flex flex-col gap-2">
        {props.options?.map((option, index) => (
          <li
            onMouseDown={() => props.onOptionSelected(option)}
            className={`${props.className} ${
              props.isMatch?.(option) && 'bg-yellow '
            }`}
          >
            <span>{option}</span>
            {props.type === 2 &&
              props.sort?.option === option &&
              (props.sort?.direction === 'asc' ? (
                <BsArrowUpShort />
              ) : (
                <BsArrowDownShort />
              ))}
          </li>
        ))}
      </ul>
    </>
  );
}
