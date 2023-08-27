import IncomeTable from "../components/IncomeTable"
import CreateIncomeModal from "../components/models/createIncomeModel"
function incomePage() {
  return (
    <main>
    <CreateIncomeModal />
    <IncomeTable />
    </main>
  )
}

export default incomePage