import React from 'react';
import heroImage from '../assets/heroimg.jpg';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const HomePage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/location-based-insights')
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <section className="hero flex flex-col md:flex-row items-center justify-between bg-green-700 py-20 min-h-[550px] text-white px-6 sm:px-10">
    {/* Left Side*/}
    <div className="text-center md:text-left md:w-1/2">
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-8">HomeScope</h1>
      <p className="mt-4 text-lg sm:text-xl md:text-2xl max-w-md mx-auto md:mx-0">
        Moving and relocating is hard. We help make your search a little easier.
      </p>
      <div className="mt-12 flex flex-col md:flex-row items-center md:items-start">
        <button
          className="bg-black text-white px-6 py-3 mb-4 md:mb-0 md:mr-4 rounded hover:bg-gray-800"
          onClick={() => window.location.href = '/market-page'}
        >
          Market Overview
        </button>
        <button
          className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800"
          onClick={() => window.location.href = '/location-based-insights'}
        >
          Location-based Insights
        </button>
      </div>
    </div>
    <div className="mt-10 md:mt-0 md:w-1/2">
      <img
        src={heroImage}
        alt="World Map with Pins in It"
        className="rounded-lg shadow-lg mx-auto w-3/4 md:w-full"
      />
    </div>
  </section>

<section className="py-10 bg-white">
  <div className="container mx-auto px-6 max-w-4xl">
    <p className="text-left text-lg leading-relaxed text-gray-800">
      We’re a group of five college seniors excited about the future, but we know graduating and starting a career often comes with the challenge of relocating. Moving to a new city or state can feel overwhelming, especially when you’re unfamiliar with the area, the people, or the housing market. That’s where HomeScope comes in.
    </p>
    <p className="text-left text-lg leading-relaxed text-gray-800 mt-6">
      Our platform is designed to simplify your housing decisions by offering valuable insights into demographics, property types, ownership options, and housing market trends. Explore our interactive maps to compare data across counties or analyze housing costs over time with our easy-to-use line graphs. Whether you’re a policymaker researching different regions or someone searching for a new place to call home, HomeScope helps make those tough choices easier and more informed.
    </p>
    <p className="text-left text-lg leading-relaxed text-gray-800 mt-6">
      In the future we're looking to expand our site's capabilities by adding real-time listing updates in your area, crime statistics, and neighborhood network graphs. If you have any other suggestions, feedback, or questions,{' '}
      <Link to="/contact-us" className="text-blue-700 underline hover:text-blue-900">
        please reach out
      </Link>
      !
    </p>
  </div>
</section>

<div className="w-full bg-green-700 py-12">
  <div className="container mx-auto px-6 max-w-4xl flex items-center justify-between text-white">
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold">
        Get started now and explore location-based insights with map and line graph visualizations
      </h1>
    </div>

    <div>
      <button
        onClick={handleGetStarted}
        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 text-base font-medium"
      >
        Get Started
      </button>
    </div>
  </div>
</div>

      <Footer />
      </div>
      
  );
};

export default HomePage;
