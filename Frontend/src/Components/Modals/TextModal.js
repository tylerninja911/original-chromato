export default function TextModal({ text, handleClose, className = '' }) {
  const closeModal = (e) => {
    if (e.target !== e.currentTarget) return;
    handleClose();
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 z-1 h-screen w-screen flex justify-center items-center font-barlow"
        onClick={closeModal}
      >
      </div>
      <div className={`${className} flex flex-col bg-white z-1 relative top-0`}>
        <span>{text}</span>
        <button className="bg-yellow mt-4 rounded-md " onClick={handleClose}>
          OK
        </button>
      </div>
    </>
  );
}
