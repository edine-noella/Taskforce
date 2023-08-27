import { useEffect, useState } from 'react'
import {  BsPlus } from 'react-icons/bs'
import { useForm, Controller } from 'react-hook-form'
import Button from '../Button'
import Loading from '../Loading'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import PropTypes from 'prop-types'
import { useCreateSubCategoriesMutation, useLazyGetAllExpensesCategoriesQuery  } from '../../states/api/apiSlice'


function CreateSubCategoryModel() {
  
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [CreateSubCategory] = useCreateSubCategoriesMutation()
 
  const [
    categoryMutation,
    {
      data: categoryData,
      isLoading: categoryListIsLoading,
      isSuccess: categoryListIsSuccess,
      isError: categoryListIsError,
      error: categoryListError,
    },
  ] = useLazyGetAllExpensesCategoriesQuery()

  useEffect(() => {
    if (categoryListIsSuccess) {      
      setData(
        categoryData?.data?.rows?.map((row, index) => ({
          id: index + 1,
          description: row?.description,
          subCategoryName: row?.subCategoryName,         
         
        })) || []
      )
    }
  }, [categoryData, categoryListIsSuccess])

  useEffect(() => {
    categoryMutation()
    .unwrap()
    .then((data) => {
        console.log(data)
      setData(
        data?.data?.rows?.map((row, index) => ({           
            id: index + 1,
            description: row?.description,
            categoryName: row?.categoryName
        })) || [data]
        )
    })
}, [])


console.log(data)

  const [showModal, setShowModal] = useState(false)
  const {
    control,   
    handleSubmit,
    formState: { errors },
  } = useForm()

  const openModal = () => {
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const onSubmit = async (data) => {
    setIsLoading(true)

    try{
      await CreateSubCategory({
        subCategoryName: data.subCategoryName,
        description: data.description,
        ExpensesCategoriesId: data.ExpensesCategoriesId
      })

      .unwrap()
      .then(() => {
        toast.success('Sub Category created successfully')
        closeModal()
      })
      .catch((error) => {
        console.error(error)
        if (error.data && error.data.message){
          toast.error(error.data.message)
        }else{
          toast.error('Error while creating Sub Category')
        }
      })

      .finally(()=> {
        setIsLoading(false)
      })

      } catch (error) {       
        return error
    }

  }

  return (
    <div className="relative">
      <button
        onClick={openModal}
        className="flex items-center absolute right-6 top-4 justify-center px-4 py-2.5 text-sm font-medium text-white bg-primary rounded-lg shadow-md ease-in-out duration-300 hover:scale-[]"
        type="button"
      >
        <BsPlus className="mr-2 text-lg" />
        Create Sub Category
      </button>

      {showModal && (
        <div
          tabIndex={-1}
          aria-hidden="true"
          className="fixed top-0 left-0 right-0 z-50 w-full h-full p-4 flex items-center justify-center bg-gray-800 bg-opacity-60"
        >
          <div className="relative bg-white rounded-lg shadow p-8 w-full md:w-96">
            <button
              onClick={closeModal}
              type="button"
              className="absolute top-3 right-2.5 text-primary bg-transparent hover:bg-primary hover:text-primary rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-primary dark:hover:text-white"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="px-6 py-6 lg:px-8">
              <h3 className="mb-4 text-xl text-center font-medium text-black">
                Add New Sub Category
              </h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <label
                      htmlFor="categoryName"
                      className="block mb-2 text-sm font-medium text-black"
                    >
                      Sub Category Name
                    </label>
                    <Controller
                      name="subCategoryName"
                      control={control}
                      defaultValue="" 
                      rules={{ required: 'Sub Category Name is required' }}
                      render={({ field }) => (
                        <input
                          type="text"
                          {...field}
                          placeholder="Sub Category Name"
                          className="text-sm border-[1.3px] focus:outline-primary border-primary rounded-lg block w-full p-2 py-3 px-4"
                        />
                      )}
                    />
                    {errors.subCategoryName && (
                      <span className="text-red-500">
                        {errors.subCategoryName.message}
                      </span>
                    )}
                  </div>                  
                </div>
                <div className="flex-1">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-black"
                    >
                      Description
                    </label>
                    <Controller
                      name="description"
                      control={control}
                      defaultValue="" 
                      rules={{ required: 'Description is required' }}
                      render={({ field }) => (
                        <input
                          type="text"
                          {...field}
                          placeholder="Description"
                          className="text-sm border-[1.3px] focus:outline-primary border-primary rounded-lg block w-full p-2 py-3 px-4"
                        />
                      )}
                    />
                    {errors.description && (
                      <span className="text-red-500">
                        {errors.description.message}
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <label
                      htmlFor="category"
                      className="block mb-2 text-sm font-medium text-black"
                    >
                        Category    
                    </label>
                    {/* a select contoller to select from the retrieved categories */}
                    <Controller
                        name="ExpensesCategoriesId"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Category is required' }}
                        render={({ field }) => (
                            <select
                            {...field}
                            className="text-sm border-[1.3px] focus:outline-primary border-primary rounded-lg block w-full p-2 py-3 px-4"
                          >
                            <option value="">Select Category</option>
                            {data?.map((category) => (
                              <option key={category.id} value={category.id}>
                                {category.categoryName}
                              </option>
                            ))}
                          </select>
                        )}
                        />
                        
                    {errors.ExpensesCategoriesId && (
                      <span className="text-red-500">
                        {errors.ExpensesCategoriesId.message}
                      </span>
                    )}
                  </div>              
                <Button
                  submit
                  name="submit"                  
                  value= { isLoading ? <Loading /> : 'Create Category'}
                />
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

CreateSubCategoryModel.propTypes = {  
    categoryName: PropTypes.string,
    description: PropTypes.string,
    ExpensesCategoriesId: PropTypes.number,
    
}


export default CreateSubCategoryModel
