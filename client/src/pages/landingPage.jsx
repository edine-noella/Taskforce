import { Link } from "react-router-dom";

function LandingPage() {
    return (
<div className="bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center">
  <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-18 lg:px-6 text-center">
    <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Money, the terrible master, may be transformed into a great servant.</p>
    <div>
      <span className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Welcome back</span>
      <span className="mb-4 text-4xl tracking-tight font-extrabold lg:text-4xl text-blue-700 dark:text-blue-500">  Eric</span>
    </div>
    <Link to='/expenses' className="inline-flex text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-900 my-4">Continue</Link>
  </div>   
</div>
  
  );
}

export default LandingPage;