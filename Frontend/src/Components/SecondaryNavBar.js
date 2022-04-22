import { IoIosArrowBack } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import CartIcon from '../assets/carts4.svg';
import CartPreviewComponent from './CartPreviewComponent';
export default function SecondaryNavBar() {
  const items = useSelector((state) => state.itemReducer);
  const user = useSelector((state) => state.loggedReducer);
  const showCartPreview = useSelector((state) => state.cartPreviewReducer)
  const history = useHistory();
  const dispatch = useDispatch();

  const handleCartClick = () => {
    if (items.length > 0 && user.userName) return history.push('/cart');
    if (!user.userName) dispatch({ type: 'SHOW_LOGIN_MODAL' });
  };

  //   const items = useSelector((state) => state.itemReducer);

  return (
    <nav className="w-full   ">
      <div className="flex items-center justify-between">
        <Link to="/">
          <div className="flex items-center">
            <IoIosArrowBack className="text-xl" />
            <span className="ml-2 text-sm font-semibold font-barlow">
              BACK TO MENU
            </span>
          </div>
        </Link>

        <div className="flex flex-col relative justify-center">
          <span
            className={`absolute flex justify-center  items-center h-5 font-barlow font-bold   ml-1 right-1 ${
              items.length > 0 ? '' : 'hidden'
            } w-5 rounded-full bg-yellow text-white`}
            style={{ top: '-14px' }}
          >
            {items.reduce((total, item) => {
              return Number(total) + Number(item.amount);
            }, 0)}
          </span>

          <img
            src={CartIcon}
            alt=""
            className="h-8 w-8  cursor-pointer "
            onClick={handleCartClick}
            onMouseEnter={() => {
              if (window.innerWidth >= 1000)
                dispatch({ type: 'SHOW_CART_PREVIEW' });
            }}
          ></img>
        </div>
      </div>
      { showCartPreview && <CartPreviewComponent /> }
    </nav>
  );
}
