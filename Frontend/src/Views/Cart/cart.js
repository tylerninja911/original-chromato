import bagImage from '../../assets/empty-bag.png';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import StripeContainer from '../../Components/StripeContainer';
import { useState } from 'react';
import { BsChevronUp } from 'react-icons/bs';
import { BsChevronDown } from 'react-icons/bs';

function Cart() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.itemReducer);
  const [isOpen, setIsOpen] = useState(true);
  const history = useHistory();
  const [showCheckout, setShowCheckout] = useState(false);


  return (
    <>
      <div className="min-h-screen  bg-gray-100">
        <nav id="nav" className="w-full bg-white z-10 px-16 py-4 h-20">
          <div className="md:px-4">
            <div className="flex items-center">
              <div className="w-6/12 text-sm">
                <div className="flex items-center mt-2 ">
                  <div
                    className="flex items-center cursor-pointer"
                    onClick={() => {
                      if (showCheckout) return setShowCheckout(false);
                      history.push('/');
                    }}
                  >
                    <IoIosArrowBack className="text-xl" />
                    <span className="ml-2 font-semibold font-barlow uppercase whitespace-nowrap hidden sm:inline">
                      back to {showCheckout ? 'cart' : 'menu'}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <Link className="focus:outline-none" to="/">
                  {' '}
                  <h1 className="text-yellow font-marker text-30 w-2/14 ">
                    Chromato
                  </h1>
                </Link>
              </div>
              <div className="w-6/12"></div>
            </div>
          </div>
        </nav>

        {!showCheckout ? (
          <section
            className={`bg-white-smoke w-full ${
              items.length > 0 ? 'block' : 'fixed'
            }`}
          >
            <div
              className={`${
                items.length > 0 ? 'hidden' : 'flex'
              }   justify-center items-center py-24`}
            >
              <div className="flex flex-col bg-white justify-center items-center py-12 px-24 rounded-lg">
                <img alt="" className="h-48 w-48 " src={bagImage}></img>
                <div className="text-2xl font-bold mt-4 font-barlow font-semibold">
                  Your bag is empty
                </div>
                <div className="text-gray my-4">Nothing to see here</div>
                <Link to="/">
                  <div className="flex text-sm  md:w-338px h-9 bg-yellow justify-center items-center rounded-md">
                    <span className=" font-semibold font-barlow">
                      CONTINUE SHOPPING
                    </span>
                  </div>
                </Link>
              </div>
            </div>

            <div className={`${items.length <= 0 ? 'hidden' : 'flex'} py-8 `}>
              <div className=" bg-white w-10/12  rounded mx-auto max-w-3xl bg-white">
                <div>
                  <div className="flex justify-center">
                    <div className="p-4 flex flex-col justify-between right-part">
                      <div className="flex w-full justify-between mb-4">
                        <div className="font-barlow font-semibold">
                          Your Order
                        </div>
                        <div className="font-barlow">
                          {items.reduce(
                            (total, item) =>
                              parseInt(total) + parseInt(item.amount),
                            0
                          )}
                          {' items'}
                        </div>
                      </div>
                      <div className='w-full max-h-96 overflow-auto '>
                      {items.map(({ img, name, price, amount }, index) => (
                        <div
                          key={index}
                          className="flex  justify-between w-full mb-2 gap-x-10  text-xs"
                        >
                          <img
                            src={img}
                            className="rounded-lg h-80px w-80px hidden md:inline"
                            alt=""
                          ></img>
                          <div className="flex flex-col w-200px ">
                            <div className="font-barlow">{name}</div>
                            <div className="flex w-200px">
                              <button
                                onClick={() =>
                                  dispatch({
                                    type: 'DECREASE_ITEM',
                                    payload: { img, name, price },
                                  })
                                }
                                className="bg-gray-300 rounded-full h-30px w-30px flex justify-center items-center focus:outline-none"
                              >
                                <div className="w-4 h-px bg-white"></div>
                              </button>
                              <div className="font-barlow flex justify-center mt-1 mx-2 rounded-lg border border-gray w-8 text-center ">
                                {amount}
                              </div>
                              <button
                                onClick={() =>
                                  dispatch({
                                    type: 'INCREASE_ITEM',
                                    payload: { img, name, price },
                                  })
                                }
                                className="bg-gray-300 rounded-full h-30px w-30px flex justify-center items-center focus:outline-none relative"
                              >
                                <div className="w-4 h-px bg-white absolute"></div>
                                <div className="w-px h-4 bg-white absolute"></div>
                              </button>
                            </div>
                          </div>
                          <div className=" w-40px">
                            ₹{price * amount}
                          </div>
                        </div>
                      ))}
                      </div>

                      <div className="mt-2 w-full h-px bg-gray-100"></div>
                      <div className="mt-2 mb-2 flex justify-between w-full">
                        <div className="font-barlow text-sm ">Subtotal</div>
                        <div className="text-sm font-barlow">
                          ₹
                          {items.reduce(
                            (total, item) =>
                              parseInt(total) +
                              parseInt(item.price * item.amount),
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
                        <div className="text-sm font-barlow-semi-condensed">
                          Total
                        </div>
                        <div className="text-sm font-barlow-semi-condensed">
                          ₹
                          {items.reduce(
                            (total, item) =>
                              parseInt(total) +
                              parseInt(item.price * item.amount),
                            0
                          ) + 40}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
             
            <div className="flex">
              <div
                onClick={() => {
                  setShowCheckout(true);
                }}
                className="w-full font-barlow-semi-condensed h-12 bg-yellow rounded-md flex justify-center items-center mx-auto cursor-pointer"
              >
                <span className="text-lg">
                  <a href="#nav">Proceed to checkout</a>
                </span>
              </div>

            </div>
            </div>
            </div>
            <div
              className={`${
                items.length <= 0 ? 'hidden' : 'flex'
              }   justify-center items-center py-24`}
            ></div>
          </section>
        ) : (
          <section className={`bg-white-smoke w-full pb-96`}>
            <div className="pt-8  w-full flex-col  h-full ">
              <div className=" w-full flex  h-1/2">
                <div className="w-10/12 mx-auto max-w-7xl gap-4 flex justify-between flex-col md:flex-row">
                  <div className="md:w-60% bg-white p-4 rounded-md h-256px">
                    {<StripeContainer shippingFee={40} items={items} />}
                  </div>

                  <div className="bg-white md:w-37.5% rounded-md p-4">
                    <div className="font-barlow font-semibold">Products</div>
                    <div className="mt-2 w-full h-px bg-gray-100"></div>
                    <div className="flex justify-between py-2">
                      <div className="text-13px font-barlow font-bold">
                        TODAY,{' '}
                      </div>

                      <div className="flex">
                        <div className="text-13px font-barlow font-bold mr-4">
                          {items.reduce(
                            (total, item) =>
                              parseInt(total) + parseInt(item.amount),
                            0
                          )}{' '}
                          items
                        </div>
                        <div
                          className="cursor-pointer"
                          onClick={() => setIsOpen(!isOpen)}
                        >
                          {isOpen ? (
                            <BsChevronUp className="w-20px h-20px" />
                          ) : (
                            <BsChevronDown className="w-20px h-20px" />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="w-full h-px bg-gray-100"></div>

                    <div className="flex flex-col w-full mt-2">
                      {isOpen
                        ? items.map((item) => {
                            return (
                              <>
                                <div className="flex w-full items-center justify-between mb-4">
                                  <div className="text-sm flex-1 font-barlow ">
                                    {item.name}
                                  </div>
                                  <div className="flex items-center flex-1 justify-between">
                                    <div className="text-sm font-barlow">
                                      x{item.amount}
                                    </div>
                                    <div className="text-sm w-80px font-barlow text-right">
                        ₹
                                      {item.price * item.amount}
                                    </div>
                                  </div>
                                </div>
                              </>
                            );
                          })
                        : ''}
                    </div>

                    <div className="mt-2 mb-2 flex justify-between w-full">
                      <div className="font-barlow text-sm ">Subtotal</div>
                      <div className="text-sm font-barlow">
                        ₹
                        {items.reduce(
                          (total, item) =>
                            parseInt(total) +
                            parseInt(item.price * item.amount),
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
                      <div className="text-sm font-barlow-semi-condensed">
                        Total
                      </div>
                      <div className="text-sm font-barlow-semi-condensed">
                        ₹
                        {items.reduce(
                          (total, item) =>
                            parseInt(total) +
                            parseInt(item.price * item.amount),
                          0
                        ) + 40}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              <div className="w-full h-100"></div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}

export default Cart;
