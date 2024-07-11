import { useRef } from "react";

function Start({ setUserName }) {
  const inputRef = useRef();
  const handleClick = () => {
    inputRef.current.value && setUserName(inputRef.current.value);
  };
  return (
    <div className="quiz_start">
      <input
        ref={inputRef}
        type="quiz_text"
        placeholder="Enter your name"
        className="quiz_startInput"
      />
      <button className="quiz_buttonStart" onClick={handleClick}>
        Start
      </button>
    </div>
  );
}

export default Start;
