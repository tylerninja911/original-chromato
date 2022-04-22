import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { auth } from '../firebase';
import { ReactComponent as UserIcon } from '../assets/user-circle.svg';
import CartIcon4 from '../assets/carts4.svg';
import { useHistory } from 'react-router';
import { AiOutlineDown } from 'react-icons/ai';
import OptionModal from './Modals/Options';
import CartPreviewComponent from './CartPreviewComponent';


export default function NavBar() {
  const history = useHistory();
  const user = useSelector((state) => state.loggedReducer);
  const [isScrollZero, setIsScrollZero] = useState(window.scrollY === 0);
  const [showOptionsModal, setShowOptionModal] = useState(false);
  const options = ['My Orders'];
  if (user.role === 'admin') {
    options.push('Dashboard');
  }
  const showCartPreview = useSelector((state) => state.cartPreviewReducer);

  let items = useSelector((state) => state.itemReducer);

  const dispatch = useDispatch();

  const toggleOptionModal = () => {
    setShowOptionModal((state) => !state);
  };

  const onOptionSelected = (option) => {
    const paths = {
      'My Orders': '/order-history',
      'Dashboard': '/dashboard',
    };

    const path = paths[option];

    toggleOptionModal();

    history.push(path);
  };

  useEffect(() => {
    function handleScroll() {
      setIsScrollZero(window.scrollY === 0);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll, { passive: true });
    };
  }, []);

  return (
    <nav
      className={`w-full ${
        isScrollZero ? 'bg-yellow' : 'bg-white'
      } top-0 sticky z-20`}
    >
      <div className="flex 0px:px-4 md:px-32  justify-between items-center py-4">
        <Link className="focus:outline-none" to="/">
          {' '}
          <h1
            className={`${
              isScrollZero ? 'text-black' : 'text-yellow'
            }  font-marker text-30 `}
          >
            Chromato
          </h1>
        </Link>
        <div className="flex items-center">
          <div
            className={`${
              user.userName === null ? 'flex' : 'hidden'
            } buttons items-center`}
          >
            <div
              style={{ width: '86px' }}
              className="font-semibold flex justify-center items-center text-xs h-8 w-20 border	border-gray rounded-2xl  focus:outline-red mr-2 p-4 cursor-pointer"
              onClick={() => dispatch({ type: 'SHOW_LOGIN_MODAL' })}
            >
              LOG IN
            </div>
            <div
              className={`0px:hidden md:flex w-90px flex justify-center items-center  h-8 w-24	 rounded-2xl ${
                isScrollZero ? 'bg-black' : 'bg-yellow'
              } focus:outline-red mr-4 p-4 cursor-pointer`}
              onClick={() => dispatch({ type: 'SHOW_SIGNUP_MODAL' })}
            >
              <span
                className={`${
                  isScrollZero ? 'text-yellow' : 'text-black'
                } text-xs font-semibold`}
              >
                SIGN UP
              </span>
            </div>
          </div>

          <div
            className={`${
              user.userName === null ? 'hidden' : 'block'
            } flex justify-between items-center`}
          >
            <div className="flex items-center mr-2">
              <div className="mr-2 text-lg font-barlow font-semibold flex items-center relative">
                <div
                  className="flex items-center cursor-pointer"
                  onClick={toggleOptionModal}
                >
                  <UserIcon className="w-6" /> {user.userName}
                  <AiOutlineDown className="text-sm w-4 h-3 " />
                </div>
                <div className="absolute top-10 left-0">
                  {showOptionsModal && (
                    <OptionModal
                      className={`flex items-center justify-between  hover:bg-yellow  font-barlow-semi-condensed rounded-lg px-3 cursor-pointer`}
                      type={2}
                      onOptionSelected={onOptionSelected}
                      handleClose={toggleOptionModal}
                      options={options}
                    />
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                // auth.signOut();
                dispatch({ type: 'SIGN_OUT' });
                dispatch({ type: 'PURGE' });
                localStorage.removeItem('token');
                history.push('/');
              }}
              className={` focus:outline-none flex justify-center items-center  h-8 w-24	 rounded-2xl ${
                isScrollZero ? 'bg-black' : 'bg-yellow'
              }  mr-8 p-4 cursor-pointer`}
            >
              <span
                className={`${
                  isScrollZero ? 'text-yellow' : 'text-black'
                } text-xs font-semibold`}
              >
                SIGN OUT
              </span>{' '}
            </button>
          </div>

          <div className="ml-2 flex flex-col h-12 items-center justify-around w-30px">
            <div
              className={`ml-1 top-3.5  absolute flex items-center justify-center text-xs ${
                items.length > 0 ? '' : 'hidden'
              }
            text-center  rounded-full w-5 h-5 ${
              isScrollZero ? 'bg-white text-gray' : 'bg-yellow text-white'
            } `}
            >
              {items.reduce((total, item) => {
                return Number(total) + Number(item.amount);
              }, 0)}
            </div>
            <div className={` h-8 w-8 absolute`}>
              <Link
                className="focus:outline-none"
                to={`${items.length > 0 && user.userName ? '/cart' : '/'}`}
              >
                <img
                  src={CartIcon4}
                  alt=""
                  onMouseEnter={() => {
                    if (window.innerWidth >= 1000)
                      dispatch({ type: 'SHOW_CART_PREVIEW' });
                  }}
                ></img>
              </Link>
            </div>
          </div>
          {showCartPreview && <CartPreviewComponent />}
        </div>
      </div>
    </nav>
  );
}
