import { IoIosArrowBack } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
// import CartPreview from '../../Components/CartPreview';
// ../../Components/CartPreviewComponent
import CartIcon from '../../assets/carts4.svg';
import { getSingleProduct } from '../../services/productService';
import { useEffect, useState } from 'react';
import './MenuItemDetails.css';
import { AiOutlineStar } from 'react-icons/ai';
import ReviewModal from '../../Components/Modals/Review';
import { Star, YellowStar } from '../../shared/Icons';
import axios from 'axios';
import TextModal from '../../Components/Modals/TextModal';
import SecondaryNavBar from '../../Components/SecondaryNavBar';

export default function MenuItemDetails() {
  const items = useSelector((state) => state.itemReducer);
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const switchOptions = ['Description', 'Reviews'];
  const [product, setProduct] = useState({});
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [review, setReview] = useState({});
  const [notBoughtModalOpen, setNotBoughtModalOpen] = useState(false);

  const toggleReviewModal = () => {
    setShowReviewModal((state) => !state);
  };

  const toggleNotBoughtModal = () => {
    setNotBoughtModalOpen((state) => !state);
  };

  useEffect(() => {
    getProductData();
  }, []);

  const getProductData = () => {
    getSingleProduct({ id }, (product) => setProduct(product));
  };

  //to do make a function for this in service file
  const getProductReview = async () => {
    let url = 'http://localhost:5000/api/v1'
    if (process.env.NODE_ENV === 'production') {
      url = '/api/v1'
    }
    try {
      const {
        data: { isBuyer, rating = 5, description = '' },
      } = await axios({
        method: 'get',
        url: url + `/reviews/product/details/${id}`,
        headers: { Authorization: `Bearer ${localStorage.token}` },
      });
      setReview({ rating, description });
      if (!isBuyer) return toggleNotBoughtModal();
      isBuyer && setShowReviewModal(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="px-4  lg:px-32 py-4 flex flex-col gap-2 lg:gap-4">
        <SecondaryNavBar />
        <div className="flex flex-col sm:flex-row gap-6">
          <img
            src={product.image}
            className="dish-image sm:w-5/12 rounded-lg"
          />
          <div className="dish-details flex-1  flex flex-col gap-2">
            <span className="font-barlow font-bold text-2xl text-center sm:text-left">
              {product.name}
            </span>
            <div className="w-full flex gap-x-2 items-baseline relative">
              {product.averageRating ? (
                <span className="h-6 mr-2 font-barlow-semi-condensed bg-yellow  w-10 text-center rounded-md">
                  {product.averageRating}★
                </span>
              ) : null}
              <button
                onClick={getProductReview}
                className="bg-yellow px-4 py-1 font-barlow font-bold text-sm rounded-md"
              >
                Add a review
              </button>
              <div className="absolute left-60">
                {notBoughtModalOpen && (
                  <TextModal
                    className={
                      'w-52 shadow-lg border border-gray-300 rounded-lg px-4 py-2 font-barlow'
                    }
                    text={
                      "You can't review this product since you haven't bought it"
                    }
                    handleClose={toggleNotBoughtModal}
                  />
                )}
                {showReviewModal && (
                  <ReviewModal
                    getProductData={getProductData}
                    productId={id}
                    setReview={setReview}
                    review={review}
                    handleClick={toggleReviewModal}
                  />
                )}
              </div>
            </div>
            <span className="text-center sm:text-left mt-4 font-barlow-semi-condensed">
              ₹{product.price - product.discount}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                dispatch({ type: 'SHOW_CART_PREVIEW' });
                dispatch({
                  type: 'INCREASE_ITEM',
                  payload: {
                    name: product.name,
                    price: [product.price - product.discount],
                    img: product.image,
                    _id: product._id,
                  },
                });
              }}
              className={`w-full h-12 sm:w-48 sm:h-9 text-sm  flex justify-center items-center font-barlow-semi-condensed mr-1  bg-yellow rounded-md`}
            >
              {items.filter((item) => item.name === product.name).length !== 0
                ? "I'll have one more!"
                : 'Add to cart'}
            </button>
            <div className="flex font-barlow font-bold    ">
              <div
                className="
               
              flex gap-6 py-3 mb-4"
              >
                {switchOptions.map((option, index) => (
                  <>
                    <button
                      onClick={() => setSelectedIndex(index)}
                      key={index}
                      className={`font-bold py-2  ${
                        selectedIndex === index && 'border-b border-black'
                      }`}
                    >
                      {option}
                    </button>
                    <hr className="w-full"></hr>
                  </>
                ))}
              </div>
            </div>
            {selectedIndex === 0 ? (
              <p>{product.description}</p>
            ) : product.reviews?.length ? (
              product.reviews.map((review, index) => (
                <div key={index} className="py-3 border-b border-gray">
                  <div className="flex justify-between">
                    <span className="font-barlow-semi-condensed ">
                      {review.name}
                    </span>

                    <div className="flex">
                      {[...Array(5)].map((item, i) =>
                        i + 1 <= review.rating ? <YellowStar /> : <Star />
                      )}
                    </div>
                  </div>
                  <p className="">{review.description}</p>
                </div>
              ))
            ) : (
              'No reviews for this product'
            )}
          </div>
        </div>
      </div>
    </>
  );
}
