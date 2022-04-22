export default function Prompt({ title, content, handleClose, handleAction }) {
    
    const onClickDelete = () => {
      handleAction();
      handleClose();
    };


    return (
    <>
      <div className="fixed top-0 left-0 font-barlow flex justify-center items-center h-screen w-screen z-10">
        <div className="bg-gray-500 opacity-75 w-full h-full fixed z-10"></div>
        <div className=" flex flex-col z-10 bg-white w-96  rounded-lg z-10">
          <div className="flex flex-col py-3 px-4">
            <span className="text-lg font-barlow-semi-condensed">{title}</span>
            <p>{content}</p>
          </div>
          <div className="flex flex-end gap-x-4 bg-gray-50  px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse rounded-b-lg">
            <button
              onClick={onClickDelete}
              className="border-2 px-4 py-2 border-transparent rounded-lg text-white bg-red-600 hover:bg-red-700 flex items-center"
            >
              {' '}
              Delete
            </button>
            <button
              onClick={handleClose}
              className="bg-white border-2 px-4 py-2 border-gray-300 rounded-lg hover:bg-gray-50 flex items-center"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
