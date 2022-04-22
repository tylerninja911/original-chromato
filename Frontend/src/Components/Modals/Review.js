import axios from 'axios';
import { useState } from 'react';
import StarRating from '../StarRating';

export default function ReviewModal({
  review,
  setReview,
  handleClick,
  productId,
  getProductData,
}) {
  const onClickSubmit = () => {
    let url = 'http://localhost:5000/api/v1';
    if (process.env.NODE_ENV === 'production') {
      url = '/api/v1';
    }
    handleClick();
    axios({
      method: 'post',
      url: url + '/reviews/',
      data: {
        description: review.description,
        rating: review.rating || 5,
        product: productId,
      },
      headers: { Authorization: `Bearer ${localStorage.token}` },
    }).then((res) => getProductData());
  };

  const onClick = (e) => {
    if (e.target !== e.currentTarget) return;

    handleClick();
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 w-screen h-screen flex  z-1"
        onClick={onClick}
      ></div>

      <div className="relative top-0 flex flex-col bg-white z-1 shadow-md shadow-black	 border border-gray-200 rounded-lg px-4 py-3 font-barlow w-96 h-96 gap-2">
        <span>Rate this item</span>
        <StarRating
          setRating={(val) => setReview((state) => ({ ...state, rating: val }))}
          rating={review?.rating}
        />
        <textarea
          value={review.description}
          onChange={({ target: { value } }) =>
            setReview((state) => ({ ...state, description: value }))
          }
          className="resize-none px-4 py-2 flex-1 focus:outline-none border-2 focus:border-gray-300"
          placeholder="Description"
        ></textarea>
        <button
          onClick={onClickSubmit}
          className="font-barlow-semi-condensed bg-yellow rounded-lg px-4 py-2"
        >
          Submit Review
        </button>
      </div>
    </>
  );
}
