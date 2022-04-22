import Table, { SelectColumnFilter } from './Table';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { getCurrentUserOrders } from '../../services/orderService';

export default function UserOrders() {
  const [sortOptions, setSortOptions] = useState([{id:'name', desc:false}])
  const [rows, setRows] = useState([])

  const columns = React.useMemo(
    () => [
      {
        Header: 'Order Number',
        accessor: '_id',
      },
      {
        Header: 'Date',
        accessor: 'createdAt',
        Cell:props => <>{props.value?.split('T')[0]}</>
      },
      {
        Header:'Total',
        accessor:'total',
        Cell: props => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(props.value)

      },
      {
        Header:'Subtotal',
        accessor:'subTotal',
        Cell: props => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(props.value)


      },
      {
        Header:'Shipping Fee',
        accessor:'shippingFee',
        Cell: props => new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'INR' }).format(props.value)

      }
    ]
  )

  
  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    getCurrentUserOrders({fields:'total,subTotal,createdAt,shippingFee'}, (data) => setRows(data))

  }

  return (
    <>
      <div className="min-h-screen bg-gray-100" >
      <nav id="nav" className="w-full bg-white z-10 px-16 py-4 h-20">
        <div className="px-4">
          <div className="flex items-center">
              <div className="w-6/12 text-sm">
                <div className="flex items-center mt-2 ">
                  <Link to="/">
                    <div className="flex items-center">
                      <IoIosArrowBack className="text-xl" />
                      <span className="ml-2 font-semibold font-barlow">
                        BACK TO MENU
                      </span>
                    </div>
                  </Link>
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
        <main className="max-w-5xl mx-auto px-2 sm:px-4">
          {/* <div className="">
            <h1 className="text-xl font-semibold">Order History</h1>
          </div> */}
          <div className="mt-6">
            <Table sorted = {sortOptions} onSortedChange={(val) => setSortOptions(val)} data={rows} columns={columns} />
          </div>
        </main>
      </div>
    </>
  );
}
