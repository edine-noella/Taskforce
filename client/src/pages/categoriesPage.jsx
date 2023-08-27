import CategoryTable from "../components/CategoryTable"
import CreateCategoryModel from "../components/models/createCategoryModel"
function categoriesPage() {
  return (
    <main>
    <CreateCategoryModel />
    <CategoryTable />
    </main>
  )
}

export default categoriesPage