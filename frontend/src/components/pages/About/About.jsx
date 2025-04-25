import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-pink-300 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-purple-300 shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">About TechTrend</h1>
        <p className="text-gray-600 text-lg text-center mb-6">
          Welcome to <span className="font-semibold text-blue-600">TechTrend</span>, your ultimate destination for the latest in technology and gadgets.
          Our platform is dedicated to keeping you updated with trending tech news, in-depth product reviews,
          and expert insights into the ever-evolving digital world.
        </p>
        <h2 className="text-2xl font-semibold text-gray-700 mt-6">Our Mission</h2>
        <p className="text-gray-600 mt-2">
          At TechTrend, we strive to bring you the most accurate and up-to-date information about the latest gadgets,
          smartphones, accessories, and more. Our goal is to help you make informed decisions when purchasing tech products.
        </p>
        <h2 className="text-2xl font-semibold text-gray-700 mt-6">Why Choose Us?</h2>
        <ul className="list-disc list-inside text-gray-600 mt-2">
          <li>Unbiased product reviews and comparisons</li>
          <li>Expert opinions and buying guides</li>
          <li>Latest trends in the tech industry</li>
          <li>Comprehensive coverage of gadgets and accessories</li>
        </ul>
        <p className="text-gray-600 mt-6 text-center">
          Join us on this journey as we explore the future of technology together.
        </p>
      </div>
    </div>
  );
};

export default About;
