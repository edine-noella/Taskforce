import { useEffect, useState } from 'react'
import {  BsPlus } from 'react-icons/bs'
import { useForm, Controller } from 'react-hook-form'
import Button from '../Button'
import Loading from '../Loading'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import PropTypes from 'prop-types'
import { useCreateExpensesCategoriesMutation  } from '../../states/api/apiSlice'



function CreateCategoryModel() {
  
  const [isLoading, setIsLoading] = useState(false)
  const [CreateCategory] = useCreateExpensesCategoriesMutation()

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
      await CreateCategory({
        categoryName: data.categoryName,
        description: data.description        
      })

      .unwrap()
      .then(() => {
        toast.success('Category created successfully')
        closeModal()
      })
      .catch((error) => {
        console.error(error)
        if (error.data && error.data.message){
          toast.error(error.data.message)
        }else{
          toast.error('Error while creating Category')
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
        Create Category
      </button>

      {showModal && (
        <div
          tabIndex={-1}
          aria-hidden="true"
          className="fixed top-0 left-0 right-0 z-50 w-full h-screen p-4 flex items-center justify-center bg-gray-800 bg-opacity-60"
        >
          <div className="relative bg-white rounded-lg shadow">
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
                Add New Category
              </h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <label
                      htmlFor="categoryName"
                      className="block mb-2 text-sm font-medium text-black"
                    >
                      Category Name
                    </label>
                    <Controller
                      name="categoryName"
                      control={control}
                      defaultValue="" 
                      rules={{ required: 'category Name is required' }}
                      render={({ field }) => (
                        <input
                          type="text"
                          {...field}
                          placeholder="Category Name"
                          className="text-sm border-[1.3px] focus:outline-primary border-primary rounded-lg block w-full p-2 py-2.5 px-4"
                        />
                      )}
                    />
                    {errors.categoryName && (
                      <span className="text-red-500">
                        {errors.categoryName.message}
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
                          className="text-sm border-[1.3px] focus:outline-primary border-primary rounded-lg block w-full p-2 py-2.5 px-4"
                        />
                      )}
                    />
                    {errors.description && (
                      <span className="text-red-500">
                        {errors.description.message}
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

CreateCategoryModel.propTypes = {  
    categoryName: PropTypes.string,
    description: PropTypes.string,
    
}


export default CreateCategoryModel
