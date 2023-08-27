import { Link } from "react-router-dom";

function LandingPage() {
    return (
<section className="bg-white dark:bg-gray-900">
    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
            
            <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Money, the terrible master, may be transformed into a great servant.</p>
            <div>
            <span className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400"> Welcome back </span>
            <span className="mb-4 text-4xl tracking-tight font-extrabold lg:text-4xl text-primary-600 dark:text-primary-500">Eric</span>
            </div>
            <Link to='/expenses' className="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4">Continue</Link>
        </div>   
    </div>
</section>
  
  );
}

export default LandingPage;