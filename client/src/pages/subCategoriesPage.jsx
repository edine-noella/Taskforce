import SubCategoryTable from '../components/SubCategoryTable'
import CreateSubCategoryModel from '../components/models/createSubCategoryModel'
function subCategoriesPage() {
  return (
    <main>
      <CreateSubCategoryModel />
    <SubCategoryTable />
    </main>
  )
}

export default subCategoriesPage