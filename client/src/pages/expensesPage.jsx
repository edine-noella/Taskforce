import ExpensesTable from "../components/expensesTable"
import CreateExpenseModel from "../components/models/createExpenseModel"

function expenses() {
  return (
    <main>
    <CreateExpenseModel />
    <ExpensesTable />
    </main>

  )
}

export default expenses