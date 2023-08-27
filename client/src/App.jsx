import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Expenses from './pages/expensesPage'
import Categories from './pages/categoriesPage'
import Income from './pages/incomePage'
import SubCategoriesPage from './pages/subCategoriesPage'
import LandingPage from './pages/landingPage'
import Navbar from './components/Navbar'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'

const App = () => {

  return (
    <Router>
      <main className='relative h-full' >
        <Navbar />  

            <Routes>     
            <Route path="/" element={<LandingPage />} />  
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/income" element={<Income />} />
            <Route path="/subcategories" element={<SubCategoriesPage />} />
            <Route path="/landingPage" element={<LandingPage />} />

           
          </Routes>       
          <ToastContainer/>
      </main>
    </Router>
  )
}

export default App
