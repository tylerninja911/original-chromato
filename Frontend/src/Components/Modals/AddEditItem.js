import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  addProduct,
  editProduct,
  getAllProductCategories,
  uploadImage,
} from '../../services/productService';
import OptionModal from './Options';

export default function AddEditItem({
  action = 'add',
  handleClose,
  reloadItems,
  selectedProduct,
  removeSelectedProduct,
}) {
  
  const [categories, setCategories] = useState([]);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [error, setError] = useState('');

  const [itemData, setItemData] = useState(selectedProduct || {});

  const handleImageUpload = (e) => {
    const formData = new FormData();
    const file = e.target.files[0];
    formData.append('image', file);
    uploadImage(formData, (res) =>
      setItemData((state) => ({ ...state, image: res.src }))
    );
  };

  const getItemCategories = () => {
    getAllProductCategories((categories) => {
      setCategories(categories);
    });
  };

  const toggleOptionModal = () => {
    setShowOptionsModal((state) => !state);
  };

  const onOptionSelected = (option) => {
    setItemData((state) => ({ ...state, category: option }));
  };

  const removeImage = () => {
    setItemData((state) => ({ ...state, image: null }));
  };

  const onSuccess = () => {
    handleClose();
    reloadItems();
  };

  const onClickSave = () => {
    const { discount, price, category, name, image } = itemData;

    if (!(price && category && name))
      return setError('Please fill all details');

    if (!image) return setError('Please upload an image');

    if (discount && price && (+discount) > (+price))
      return setError("Discount can't be greater than price");


    if (action === 'add')
      addProduct(
        itemData,
        () => onSuccess(),
        (err) => console.log(err)
      );
    else {
      editProduct(
        { ...itemData, _id: selectedProduct['_id'] },
        () => onSuccess(),
        (err) => setError(err)
      );
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setItemData((state) => ({ ...state, [name]: value }));

  };

  useEffect(() => {
    getItemCategories();
    return () => {
      removeSelectedProduct();
    };
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 z-1 h-screen w-screen flex justify-center items-center">
        <div className=" z-10 bg-white w-96 max-w-2xl border shadow  flex flex-col text-sm p-8 gap-2 font-barlow">
          <span className="text-base font-barlow-semi-condensed">
            {action === 'add' ? 'Add New Item' : 'Edit Item'}
          </span>
          <input
            value={itemData.name}
            onChange={onChange}
            name="name"
            className=" p-2 h-8 focus:outline-1 focus:outline-gray-200"
            placeholder="Name Your Product here"
          ></input>
          <div className="relative flex flex-col">
            <label>Category</label>
            <input
              onChange={onChange}
              name="category"
              onFocus={toggleOptionModal}
              onBlur={toggleOptionModal}
              value={itemData.category}
              className="h-8 border p-2 capitalize"
              placeholder="Enter Category"
            ></input>
            <div className="absolute top-14 left-0">
              {showOptionsModal && (
                <OptionModal
                  options={categories}
                  className={`capitalize flex items-center justify-between  hover:bg-yellow  font-barlow rounded-lg px-3 py-1 cursor-pointer`}
                  onOptionSelected={onOptionSelected}
                  handleClose={toggleOptionModal}
                />
              )}
            </div>
          </div>
          <span>Price</span>
          <input
            onChange={onChange}
            name="price"
            value={itemData.price}
            className="border p-2 h-8"
          ></input>

          <span>Discount</span>
          <input
            onChange={onChange}
            name="discount"
            value={itemData.discount}
            className="border p-2 h-8"
          ></input>

          <span>Image</span>
          <div className=" h-16">
            <div
              className={`${
                itemData['image'] && 'border'
              } flex gap-x-4 items-center font-barlow`}
            >
              {
                <>
                  {itemData.image ? (
                    <img
                      className="object-cover w-32 h-16"
                      src={itemData['image']}
                    ></img>
                  ) : (
                    <label>
                      <span className="cursor-pointer border p-2 rounded-md">
                        Upload Image
                      </span>

                      <input
                        onChange={handleImageUpload}
                        accept="image/*"
                        type="file"
                        className="hidden"
                      ></input>
                    </label>
                  )}
                </>
              }
              {itemData['image'] && (
                <>
                  <a
                    href={itemData['image']}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <button className="border h-8 p-2 flex justify-center items-center rounded-md">
                      View
                    </button>
                  </a>
                  <button
                    onClick={removeImage}
                    className="border h-8 p-2 flex justify-center items-center rounded-md"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
          <span className="text-red">{error}</span>
          <div className="flex justify-between font-barlow-semi-condensed mt-2">
            <button
              className="bg-yellow px-4 py-2 rounded-lg"
              onClick={onClickSave}
            >
              Save
            </button>
            <button
              className="border border-gray-300 px-4 py-2 rounded-lg"
              onClick={handleClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
