import 'core-js/stable'
import 'regenerator-runtime/runtime'
import { useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import Loading from '../components/Loading'
import moment from 'moment';

import {
  useGlobalFilter,
  useTable,
  useAsyncDebounce,
  useFilters,
  usePagination,
  useSortBy
} from 'react-table'

import { useLazyGetAllExpensesQuery } from '../states/api/apiSlice'
import Button from '../components/Button'
import Input from '../components/Input'


const ExpensesTable = () => {
  const [
    ExpensesMutation,
    {
      data: expensesData,
      isLoading: expensesListIsLoading,
      isSuccess: expensesListIsSuccess,
      isError: expensesListIsError,
      error: expensesListError,
    },
  ] = useLazyGetAllExpensesQuery()


  const [data, setData] = useState(expensesData?.data || [])

  useEffect(() => {
    if (expensesListIsSuccess) {      
      setData(
        expensesData?.data?.rows?.map((row, index) => ({
          id: index + 1,
          amount: row?.amount,
          categoryName: row?.ExpensesCategories?.categoryName,
          subCategoryName: row?.ExpensesSubCategories?.subCategoryName, 
          description: row?.ExpensesSubCategories?.description,
          CreatedAt: row?.CreatedAt
        })) || []
      )
    }
  }, [expensesData, expensesListIsSuccess])

  useEffect(() => {
    ExpensesMutation({})
    .unwrap()
    .then((data) => {
        
      setData(
        data?.data?.map((row, index) => ({           
            id: index + 1,
            amount: row?.amount,
            categoryName: row?.ExpensesCategories?.categoryName,
            subCategoryName: row?.ExpensesSubCategories?.subCategoryName,
            description: row?.ExpensesSubCategories?.description,
            CreatedAt: moment(row?.CreatedAt)            
            .format('YYYY-MM-DD'),     
           
        })) || [data]
        )
    })
}, [])




const columns = useMemo(
    () => [
      {
        Header: 'Category Name', // Updated header text
        accessor: 'categoryName', // Match with property name in data
        sortable: true,
        Filter: SelectColumnFilter,
      },
      {
        Header: 'Subcategory Name', // Updated header text
        accessor: 'subCategoryName', // Match with property name in data
        sortable: true,
        Filter: SelectColumnFilter,
      },
      {
        Header: 'Amount',
        accessor: 'amount',
        sortable: true,
        Filter: SelectColumnFilter,      
      },
      {
        Header: 'Date', // Updated header text
        accessor: 'CreatedAt', // Match with property name in data
        sortable: true,
        Filter: SelectColumnFilter,
      },    
      {
        Header: 'description', // Updated header text
        accessor: 'description', // Match with property name in data
        sortable: true,
       
      },   
    ],
    []
  );

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      {
        id: 'no',
        Header: 'No',
        accessor: 'id',
        Cell: ({ row, index }) => <p>{row.index + 1}</p>,
        sortable: true,
      },
      ...columns,
    ])
  }

  const TableInstance = useTable(
    {
      columns,
      data,
    },
    useFilters,
    tableHooks,
    useGlobalFilter,
    useSortBy,
    usePagination
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    setGlobalFilter,
    rows,
    prepareRow,
    state,
    preGlobalFilteredRows,
    page,
    
  } = TableInstance

  if (expensesListIsSuccess) {
    return (
      <main className="my-12 w-full">
        <div className="flex flex-col items-center gap-6">
          <div className="search-filter flex flex-col items-center gap-6">
            <span className="w-fit min-w-[30rem] flex flex-col items-end justify-center">
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            </span>
            <span className="w-full h-fit flex items-center gap-4">
              {headerGroups.map((headerGroup) =>
                headerGroup.headers.map((column) =>
                  column.Filter ? (
                    <div
                      key={column.id}
                      className="p-[5px] px-2 border-[1px] shadow-md rounded-md"
                    >
                      <label htmlFor={column.id}></label>
                      {column.render('Filter')}
                    </div>
                  ) : null
                )
              )}
            </span>
          </div>
          <div className="mt-2 flex flex-col w-[95%] mx-auto">
            <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table
                    {...getTableProps()}
                    border="1"
                    className="min-w-full divide-y divide-gray-200"
                  >
                    <thead className="bg-gray-50">
                      {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                          {headerGroup.headers.map((column) => (
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              {...column.getHeaderProps(
                                column.getSortByToggleProps()
                              )}
                            >
                              {column.render('Header')}
                              <span>
                                {column.isSorted
                                  ? column.isSortedDesc
                                    ? ' ▼'
                                    : ' ▲'
                                  : ''}
                              </span>
                            </th>
                          ))}
                        </tr>
                      ))}
                    </thead>
                    <tbody
                      className="bg-white divide-y divide-gray-200"
                      {...getTableBodyProps()}
                    >
                      {page.map((row, i) => {
                        prepareRow(row)
                        return (
                          <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                              return (
                                <td
                                  {...cell.getCellProps()}
                                  className="px-6 py-4 whitespace-nowrap"
                                >
                                  {cell.render('Cell')}
                                </td>
                              )
                            })}
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>       
      </main>
    )
  }

  if (expensesListIsError) {
    return (
      <main className="min-h-[80vh] flex items-center justify-center flex-col gap-6">
        <h1 className="text-[25px] font-medium text-center">
          Could not load expenses records
        </h1>
        <Button value="Go to LandingPage" route="/landingPage" />
      </main>
    )
  }

  if (expensesListIsLoading) {
    return (
      <main className="w-full min-h-[80vh] flex items-center justify-center">
        <Loading />
      </main>
    )
  }
  return (
    <main className="w-full min-h-[80vh] flex items-center justify-center">
      <Loading />
    </main>
  )
}


export function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id, render },
}) {
  const options = useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach((row) => {
      options.add(row.values[id])
    })
    return [...options.values()]
  }, [id, preFilteredRows])

  return (
    <label className="flex gap-x-2 items-baseline">
      <span className="text-gray-1000 text-[14px]">{render('Header')}: </span>
      <select
        className="rounded-sm bg-transparent outline-none border-none focus:border-none focus:outline-primary"
        name={id}
        id={id}
        value={filterValue}
        onChange={(e) => {
          setFilter(e.target.value || undefined)
        }}
      >
        <option className="text-[13px]" value="">
          All
        </option>
        {options.map((option, i) => (
          <option className="text-[13px]" key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  )
}

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <label className="flex gap-2 items-center w-full mx-auto">
      <Input
        type="text"
        className="p-2 outline-[2px] w-full max-w-[20rem] border-[1px] border-primary rounded-md outline-primary focus:outline-primary"
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value)
          onChange(e.target.value)
        }}
        placeholder={`${count} Expenses...`}
      />
      <Button
        value="Search"
        onClick={() => {
          setGlobalFilter(value || undefined)
        }}
      />
    </label>
  )
}

export default ExpensesTable
