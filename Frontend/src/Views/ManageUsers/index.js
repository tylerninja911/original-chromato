import { useState, useMemo, useEffect } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { MdDelete, MdDeleteForever } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Prompt from '../../Components/Modals/Prompt';
import { deleteUser, getAllUsers } from '../../services/userService';
import Table from '../UserOrders/Table';
import { RiDeleteBinLine } from 'react-icons/ri';

export default function ManageUsers() {
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const togglePromptModal = () => {
    setShowDeletePrompt((state) => !state);
  };

  const getUsers = () => {
    getAllUsers((res) => setUsers(res));
  };

  useEffect(() => {
    getUsers();
  }, []);

  const columns = useMemo(() => [
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'Role',
      accessor: 'role',
      Cell: ({ value }) => (
        <span
          className={`capitalize
			px-3 py-1  leading-wide font-bold text-xs rounded-full shadow-sm
          ${value === 'admin' ? 'bg-green-100 text-green-800' : null}
          ${value === 'member' ? 'bg-red-100 text-red-800' : null}
			`}
        >
          {value}
        </span>
      ),
    },
    {
      Header: 'Action',
      Cell: ({ row: { original } }) => {
        return (
          <>
            <RiDeleteBinLine
              className="w-8 h-5 cursor-pointer"
              onClick={() => {
                togglePromptModal();
                setSelectedUser(original);
              }}
            />

          </>
        );
      },
    },

    // {
    //   Header: 'Actions',
    //   Cell: ({ row: { original }, value, column }) => (
    //     <div className="flex gap-x-2 items-center">
    //       <BsPencil
    //         onClick={() => {
    //           setSelectedProduct(original);
    //           setAction('edit');
    //           toggleAddItemModal();
    //         }}
    //         size="15"
    //         className="cursor-pointer text-gray-600"
    //       />
    //       <MdOutlineDeleteOutline
    //         onClick={() => {
    //           // setShowDeletePrompt(true)
    //           // setAction('add')
    //           togglePromptModal();
    //           setSelectedProduct(original);
    //           // deleteProduct(original['_id'], () => getData())

    //           // console.log(original)
    //         }}
    //         size="20"
    //         className="cursor-pointer "
    //       />
    //     </div>
    //   ),
    // },
  ]);

  return (
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
          {/* {showAddItemModal && (
            <AddEditItem
              removeSelectedProduct={removeSelectedProduct}
              action={action}
              selectedProduct={selectedProduct}
              reloadItems={getData}
              handleClose={toggleAddItemModal}
            />
          )} */}
          {showDeletePrompt && (
            <Prompt
              handleClose={togglePromptModal}
              handleAction={() =>
                deleteUser(selectedUser['_id'], () => getUsers())
              }
              title={'Delete Item'}
              content={'Are you sure you want to delete this user?'}
            ></Prompt>
          )}
          <Table
            tableType={2}
            // sorted={sortOptions}
            // onSortedChange={(val) => setSortOptions(val)}
            data={users}
            columns={columns}
          />
        </div>
      </main>
    </div>
  );
}
