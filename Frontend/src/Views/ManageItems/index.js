import { useEffect, useMemo, useState } from 'react';
import { deleteProduct, getAllProducts } from '../../services/productService'
import Table from '../UserOrders/Table'
import { BsPencil } from 'react-icons/bs';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import SecondaryNavBar from '../../Components/SecondaryNavBar'
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import AddEditItem from '../../Components/Modals/AddEditItem'
import Prompt from '../../Components/Modals/Prompt' 

export default function ManageItems() {
  const [sortOptions, setSortOptions] = useState([
    { id: 'price', desc: false },
  ]);
  const [rows, setRows] = useState([]);
  const [showAddItemModal, setShowAddItemModal] = useState(false)
  const [showDeletePrompt, setShowDeletePrompt] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [action, setAction] = useState('')
 

  const toggleAddItemModal = () => {
    setShowAddItemModal(state => !state)
  }

  const removeSelectedProduct = () => {
    setSelectedProduct(null)
  }

  const togglePromptModal = () => {
    setShowDeletePrompt(state => !state)
  }

  const onClickEditIcon = (original) => {
    setSelectedProduct(original)
    setAction('edit')
    toggleAddItemModal()

  }

  const onClickDeleteIcon = (original) => {
    togglePromptModal()
    setSelectedProduct(original)
  }

  const columns = useMemo(() => [
    {
      Header: 'Name',
      accessor: 'name',
      imgAccessor: 'image',
      Cell: ({ row: { original }, value, column }) => (
        <div className="flex gap-x-2">
          <img
            className="h-10 w-10"
            src={original[column.imgAccessor]}
            alt=""
          ></img>
          {value}
        </div>
      ),
    },
    {
      Header: 'Category',
      accessor: 'category',
      Cell: (props) => <span className="capitalize">{props.value}</span>,
    },
    {
      Header: 'Price',
      accessor: 'price',
    },

    {
      Header: 'Actions',
      Cell: ({ row: { original }, value, column }) => (
        <div className="flex gap-x-2 items-center" >
          <BsPencil onClick={() => onClickEditIcon(original)} size="15" className="cursor-pointer text-gray-600"/>
          <MdOutlineDeleteOutline onClick={() => onClickDeleteIcon(original)} size="20" className="cursor-pointer " />
        </div>
      ),
    },
  ]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    getAllProducts({ fields: 'name,price,discount,image,category' }, (data) =>
      setRows(data)
    );
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 px-4   py-4  ">
        <main className="max-w-5xl mx-auto px-2 sm:px-4">
          <nav className="w-full">
            <div className="flex items-center justify-between">
              <Link to="/dashboard">
                <div className="flex items-center">
                  <IoIosArrowBack className="text-xl" />
                  <span className="ml-2 text-sm font-semibold font-barlow uppercase">
                    back to dashboard
                  </span>
                </div>
              </Link>
            </div>
          </nav>


          <div className="mt-6 relative">
            {showAddItemModal && <AddEditItem removeSelectedProduct = {removeSelectedProduct} action={action} selectedProduct={selectedProduct}  reloadItems = {getData} handleClose = {toggleAddItemModal}/>}
            {showDeletePrompt && <Prompt handleClose={togglePromptModal} handleAction={() => deleteProduct(selectedProduct['_id'], () => getData())} title={'Delete Item'} content={'Are you sure you want to delete this item?'}></Prompt>}
            <button onClick={() => {
              toggleAddItemModal()
              setAction('add')
            }} className='absolute top-0 right-0 border py-2 px-4 hover:bg-yellow rounded-lg bg-white'>Add Item</button>
            <Table
              tableType={2}
              sorted={sortOptions}
              onSortedChange={(val) => setSortOptions(val)}
              data={rows}
              columns={columns}
            />
          </div>
        </main>
      </div>
    </>
  );
}
