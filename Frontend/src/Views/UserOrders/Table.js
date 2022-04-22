import React from 'react';
import {
  useTable,
  useGlobalFilter,
  useAsyncDebounce,
  useFilters,
  useSortBy,
  usePagination,
} from 'react-table';
import { SortDownIcon, SortIcon, SortUpIcon } from '../../shared/Icons';
import { HiChevronLeft, HiChevronDoubleLeft, HiChevronRight ,HiChevronDoubleRight} from 'react-icons/hi';

// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span className="font-barlow ">
      Search:{' '}
      <input
        value={value || ''}
        className="ml-2 rounded-lg px-4 py-2 border-2 border-gray-200 focus:outline-none focus:border-gray-400"
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
      />
    </span>
  );
}

export function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <select
      name={id}
      id={id}
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
      className="px-4 py-3 border-2 border-gray-400"
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

function Table({ columns, data }) {
  // console.log(data)

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state, // new
    preGlobalFilteredRows, // new
    setGlobalFilter, // new

    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useGlobalFilter, // new
    useSortBy,
    usePagination
    /*
        First, we're passing the useFilter as an additional argument to the useTable hook. 
        Note that the order of useFilter and useGlobalFilter matters. 
        In our case, useFilter is applied first, so the globalFilter text search is only applied on whatever rows are
        selected by useFilter. This performs better, especially for larger amounts of data, because it reduces the number of
        rows that have to be included in the text search
        */
  );


  // Use the state and functions returned from useTable to build your UI

  // Render the UI for your table
  return (
    <>
      <div className="flex">
        <GlobalFilter
          
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
        {headerGroups.map((headerGroup) =>
          headerGroup.headers.map((column) =>
            column.Filter ? (
              <div key={column.id}>
                <label for={column.id}>{column.render('Header')}: </label>
                {column.render('Filter')}
              </div>
            ) : null
          )
        )}
      </div>
      <div className="flex flex-col justify-center items-center mt-6">
        <div className="w-auto overflow-x-auto w-full">
          <table {...getTableProps()} border="1" className="rounded-lg  w-full">
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="group tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase bg-gray-50 font-barlow"
                    >
                      <div className="flex justify-between items-center">
                        {column.render('Header')}
                        <span>
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <SortDownIcon className="text-gray-400" />
                            ) : (
                              <SortUpIcon />
                            )
                          ) : (
                            <SortIcon className="opacity-0 group-hover:opacity-100" />
                          )}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody
              {...getTableBodyProps()}
              className="bg-white divide-y divide-gray-200 border-b border-gray-200 shadow"
            >
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} className="">
                    {row.cells.map((cell) => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          className="px-6 py-4 text-left text-gray-500 text-md font-barlow-semi-condensed"
                        >
                          {cell.render('Cell')}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="pagination flex items-center mt-2 w-full font-barlow">
          <div className="flex items-center  w-full gap-x-2">
            <span className=''>
              Page{' '}
              <strong>
                {state.pageIndex + 1} of {pageOptions.length}
              </strong>{' '}
            </span>
            <select
              className="px-4 py-3 flex justify-center"
              value={state.pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[5, 10, 20].map((pageSize) => (
                <option className="" key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
          <div className="buttons flex bg-white ">
            <button
              className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              <HiChevronDoubleLeft/>
            </button>{' '}
            <button
              className="relative inline-flex items-center px-2 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              <HiChevronLeft/>
            </button>{' '}
            <button
              className="relative inline-flex items-center px-2 py-2 border border-r-0 border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              <HiChevronRight/>
            </button>{' '}
            <button
              className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              <HiChevronDoubleRight/>
            </button>{' '}
          </div>
        </div>
      </div>
    </>
  );
}

export default Table;
