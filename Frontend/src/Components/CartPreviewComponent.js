import bagImage from '../assets/empty-bag.png';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
// import '../../src/index.css';

export default function CartPreviewComponent() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.itemReducer);
  const user = useSelector((state) => state.loggedReducer);
  const history = useHistory();

  const hideCartPreview = () => {
    dispatch({ type: 'HIDE_CART_PREVIEW' });
  };

  return (
    <>
      <div
        className="fixed w-screen h-screen top-0 z-40"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
        }}
        onClick={(e) => {
          if (e.target !== e.currentTarget) return;
          hideCartPreview();
        }}
      >
        <div
          id="cart-preview"
          onMouseLeave={() => {
            window.setTimeout(function () {
              hideCartPreview();
            }, 500);
          }}
          style={{
            top: '63px',
            right: '30px',
            width: '400px',
            maxHeight: `90vh`,
            zIndex: 3,
          }}
          className=" rounded-md overflow-y-auto min-h-32 max-h-96 border bg-white border-gray  p-5  fixed z-40"
        >
          <div className="flex flex-col justify-center items-center ">
            <div
              className={`${
                items.length > 0 ? 'hidden' : 'flex'
              } flex-col justify-center items-center w-full h-full py-12`}
            >
              <img alt="" className="h-100px w-100px" src={bagImage}></img>
              <div className="text-2xl font-bold my-2">Your bag is empty</div>
              <div className="text-sm">Start adding meals!</div>
            </div>
            <div className="w-full flex flex-col justify-between">
              {items.map(({ img, name, price, amount, _id }, index) => (
                <div key={index} className="flex  justify-between w-full mb-2">
                  <img
                    alt=""
                    src={img}
                    className="rounded-lg h-80px w-80px"
                  ></img>
                  <div className="flex flex-col w-200px">
                    <div className="font-barlow text-sm">{name}</div>
                    <div className="flex w-200px">
                      <button
                        onClick={() =>
                          dispatch({
                            type: 'DECREASE_ITEM',
                            payload: { img, name, price, _id },
                          })
                        }
                        className="bg-gray-300 rounded-full h-30px w-30px flex justify-center items-center focus:outline-none hover:bg-gray-500"
                      >
                        <div className="w-4 h-px bg-white"></div>
                      </button>
                      <div className="font-barlow flex justify-center mt-1 mx-2 rounded-lg border border-gray w-8 text-center text-sm">
                        {amount}
                      </div>
                      <button
                        onClick={() =>
                          dispatch({
                            type: 'INCREASE_ITEM',
                            payload: { img, name, price, _id },
                          })
                        }
                        className="bg-gray-300 rounded-full h-30px w-30px flex justify-center items-center focus:outline-none hover:bg-gray-500"
                      >
                        <div className="w-4 h-px bg-white absolute"></div>
                        <div className="w-px h-4 bg-white absolute"></div>
                      </button>
                    </div>
                  </div>
                  <div className="text-sm w-40px">₹{price * amount}</div>
                </div>
              ))}
            </div>
            <div
              className={`${
                items.length > 0 ? 'flex' : 'hidden'
              } w-full flex-col`}
            >
              <div className="mt-2 w-full h-px bg-gray-100"></div>

              <div className="mt-2 mb-2 flex justify-between w-full">
                <div className="font-barlow text-sm ">Subtotal</div>
                <div className="text-sm font-barlow">
                  ₹
                  {items.reduce(
                    (total, item) =>
                      parseInt(total) + parseInt(item.price * item.amount),
                    0
                  )}
                </div>
              </div>
              <div className="mb-2 flex justify-between w-full">
                <div className="text-sm font-barlow">Delivery</div>
                <div className="text-sm font-barlow">₹40</div>
              </div>
              <div className="w-full h-px bg-gray-100"></div>

              <div className="flex justify-between w-full mt-2 mb-4">
                <div className="text-sm font-barlow-semi-condensed">Total</div>
                <div className="text-sm font-barlow-semi-condensed">
                  ₹
                  {items.reduce(
                    (total, item) =>
                      parseInt(total) + parseInt(item.price * item.amount),
                    0
                  ) + 40}
                </div>
              </div>
              <div
                onClick={() => {
                  hideCartPreview();
                  if (user.userName === null) {
                    dispatch({ type: 'SHOW_LOGIN_MODAL' });
                  } else {
                    history.push('/cart');
                  }
                }}
                className="font-barlow-semi-condensed w-full h-10 bg-yellow rounded-md flex justify-center items-center mx-auto cursor-pointer"
              >
                <span className="text-sm">Proceed to checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
