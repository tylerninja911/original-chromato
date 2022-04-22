import image from '../../assets/download_new.png';
import Menu from '../../Components/Menu';
import { drinksData, dessertsData, chineseData } from '../../data';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import './home.css';
import { useEffect } from 'react';
import { useState } from 'react';
import { getAllProductCategories, getAllProducts } from '../../services/productService';
import { AiOutlineDown } from 'react-icons/ai';
import OptionModal from '../../Components/Modals/Options';
import { useCallback } from 'react';
import { useMemo } from 'react';

function loadImage() {
  var img = new Image();
  let x = document.getElementById('cover_image');

  img.onload = function () {
    x.src = img.src;
  };

  img.src = image;
}

function Home() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.itemReducer);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [products, setProducts] = useState([]);
  const history = useHistory();
  const [showSortModal, setShowSortModal] = useState(false);
  const [sort, setSort] = useState({ field: '', direction: '', option: '' });
  const options = ['Price', 'Added', 'Rating'];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [categories, setCategories] = useState(['All']);

  const isMatch = (option) => {
    return option === sort.option;
  };

  const toggleSortModal = () => {
    setShowSortModal((state) => !state);
  };

  useEffect(() => {
    loadImage();
    reloadProducts();
  }, [sort]);

  const reloadProducts = (query = {}) => {
    const { category = '' } = query;
    // const sortList = sort.field
    getAllProducts(
      { category, fields: 'name,price,discount,image', sort: sort.field },
      (data) => setProducts(data)
    );
  };

  useEffect(() => {

    getAllProductCategories((categories) => setCategories(['All', ...categories]))

  }, [])

  const onSortQueryChange = (val) => {
    let direction = 'asc',
      field = val.toLowerCase(),
      option = val;

    const obj = {
      // Price: () => {
      //   // if(sort.option === val){
      //   // if(sort.direction === direction){
      //   //   direction = 'desc';
      //   //   field = `-${field}`
      //   // }
      //   // }
      // },
      Added: () => {
        field = 'createdAt';
        // if(sort.option === val){
        //   if(sort.direction === direction){
        //     direction = 'desc';
        //     field = `-${field}`
        //   }
        // }
      },
      Rating: () => {
        field = 'averageRating';
      },
    };

    obj[val]?.();

    if (sort.option === val && sort.direction === direction) {
      direction = 'desc';
      field = `-${field}`;
    }

    setSort({ option, field, direction });
    // console.log(val)
  };

  useEffect(() => {
    console.log(sort);
  }, [sort]);

  function makeGrid(arr) {
    return (
      <>
        {arr?.map(({ image, price, name, discount, _id }, index) => (
          <div
            key={index}
            className="drink-item shadow-md cursor-pointer  w-full h-full "
            onClick={() => history.push(`/menu-item/${_id}`)}
          >
            <div
              className="rounded-t-lg mb-4"
              style={{
                width: '100%',
                height: '208px',
                background: `url(${image}) no-repeat center center/cover`,
              }}
            ></div>
            <div className="flex flex-col ml-4 mt-2 w-178px">
              <div className="font-bold mb-2 font-barlow-semi-condensed">
                {name}
              </div>
              <div className="text-xs font-bold  my-4 font-barlow-semi-condensed">
                <span className={`${discount ? 'line-through mr-2' : ''}`}>
                  ₹{price}
                </span>
                {discount ? (
                  <span className="text-red text-base ">
                    ₹{price - discount}
                  </span>
                ) : null}
              </div>
            </div>
            <div className="flex justify-center items-center mb-4">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch({type:'SHOW_CART_PREVIEW'})
                  dispatch({
                    type: 'INCREASE_ITEM',
                    payload: {
                      name,
                      price: [price - discount],
                      img: image,
                      _id,
                    },
                  });
                }}
                className={`${
                  items.filter((item) => item.name === name).length !== 0
                    ? 'w-36'
                    : 'w-44'
                } mr-1 h-8 bg-yellow rounded-md cursor-pointer flex justify-center items-center font-barlow-semi-condensed`}
              >
                <span className="text-sm">Add to cart</span>
              </div>
              {items.map((item, index) => {
                if (item.name === name) {
                  return (
                    <div
                      key={index}
                      className="flex justify-center rounded-lg border border-gray   w-30px h-30px items-center"
                    >
                      <span className="text-sm font-barlow font-semibold">
                        {item.amount}
                      </span>
                    </div>
                  );
                } else {
                  return <></>;
                }
              })}
            </div>
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      <img
        id="cover_image"
        className={`xs:h-52 w-full opacity-100 md:h-308px`}
        alt=""
      ></img>
      <div
        style={{
          top: '72px',
          borderBottom: '0.5px solid rgba(217,219,224,0.5)',
          zIndex: 2,
        }}
        className="h-70px flex items-center justify-center bg-white sticky "
      >
        <div className="w-full  flex justify-center  ">
          <div className=" py-2 px-4 rounded-3xl  categories-container flex ">
            {categories.map((category) => (
              <span
                onClick={() => {
                  reloadProducts({ category });
                  setSelectedCategory(category);
                }}
                className={`font-barlow-semi-condensed capitalize  h-full cursor-pointer mx-2 p-2 ${
                  selectedCategory === category
                    ? 'bg-yellow rounded-3xl px-6'
                    : ''
                }`}
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-16   200px:mr-0 200px:ml-4 501px:ml-16 lg:mr-16 xl:ml-20 flex   justify-center">
        <div className=" p-2 smallScreen:ml-5 530px:ml-6  700px:ml-12 800px:ml-14 900px:ml-24 1000px:ml-2 xl:ml-12 flex flex-col">
          <div className="relative    self-end	mb-2  flex items-center">
            <div
              className={`flex border-2 rounded-lg border-gray items-center px-2 cursor-pointer  ${
                !products.length && 'hidden'
              } `}
              onClick={toggleSortModal}
            >
              <span className="  px-2 text-gray py-1 font-barlow-semi-condensed rounded-lg ">
                Sort by
              </span>
              <AiOutlineDown className="text-sm" />
            </div>
            {showSortModal && (
              <div className="absolute top-10 left-0">
                {
                  <OptionModal
                    className= {`flex items-center justify-between  hover:bg-yellow  font-barlow-semi-condensed rounded-lg px-3 py-1 cursor-pointer`}
                    type={2}
                    isSelected={isMatch}
                    handleClose={toggleSortModal}
                    selectedIndex={selectedIndex}
                    onOptionSelected={onSortQueryChange}
                    options={options}
                    sort={sort}
                    // setSort={(val) => }
                  />
                }
              </div>
            )}
          </div>

          <section id="Drinks" className="Drinks-category mb-12">
            {/* <h2 className="mb-4 font-barlow ">{selectedCategory}</h2> */}

            <div
              className="drink-items grid 400px:w-80 200px:grids-cols-1  501px:grid-cols-2 605px:w-400px 700px:w-450px 800px:grid-cols-3 800px:w-550px 835px:w-600px 1000px:grid-cols-4 1000px:w-full "
              style={{
                gridGap: '35px 15px',
              }}
            >
              {makeGrid(products)}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default Home;
