import React, { useState } from "react";
import { IoCart } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import HomeLower from "../../HomeMiddle/HomeLower";

// Sample category images
const categories = [

  {
    name: "electronics",
    image:
      "https://tse4.mm.bing.net/th?id=OIP.w18CXqXfi-8C-d1q89_ycgHaE8&pid=Api&P=0&h=180",
  },
  {
    name: "gifts",
    image: "https://tse1.mm.bing.net/th?id=OIP.wd3p1bZSRi2rJBR-PaWVeQHaHa&pid=Api&P=0&h=180",
  },
  {
    name: "shringar",
    image: "https://wallpapercave.com/wp/wp8149661.jpg",
  },

];

const Home = () => {
  const { posts } = useSelector((st) => st.auth);
  const [bannerIndex, setBannerIndex] = useState(0);

  // Sample banners
  const banners = [
    {
      image:
        "https://png.pngtree.com/thumb_back/fw800/background/20230704/pngtree-office-essentials-technology-and-gadgets-illustration-featuring-laptop-printer-camera-tablet-image_3748458.jpg",
      title: "Spring Tech Sale",
      subtitle: "Up to 40% off on gadgets!",
      cta: "Shop Now",
      link: "/explore/electronics",
    },
    {
      image:
        "https://img.freepik.com/premium-photo/gifts-dark-backgrounds_1141064-809.jpg",
      title: "New Arrivals",
      subtitle: "Gifts to loved one",
      cta: "Enter Now",
      link: "/explore/gifts",
    },
    {
      image:
        "https://www.culturalindia.net/iliimages/Solah-Shringaar-ili-104-img-7.jpg",
      title: "New Arrivals",
      subtitle: "Shringar ",
      cta: "Explore Now",
      link: "/explore/shringar",
    },
  ];

  // Auto-rotate banners every 4 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 font-poppins">
      {/* Hero Banner Slider */}
      <div className="relative">
        <div className="w-full h-[40vh] sm:h-[50vh] md:h-[400px] lg:h-[70vh] overflow-hidden">

          <img
            src={banners[bannerIndex].image}
            alt={banners[bannerIndex].title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0  flex items-center justify-start px-4 sm:px-8 md:px-12 lg:px-16">
            <div className="text-left max-w-lg">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r  from-white to-pink-300 tracking-tight">
                {banners[bannerIndex].title}
              </h1>
              <p className="mt-2 text-sm sm:text-base md:text-lg text-white opacity-90 font-medium">
                {banners[bannerIndex].subtitle}
              </p>
              <Link to={banners[bannerIndex].link}>
                <button className="mt-4 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center gap-2 shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2">
                  {banners[bannerIndex].cta} <FaLongArrowAltRight />
                </button>
              </Link>
            </div>
          </div>
        </div>
        {/* Banner Navigation Dots */}
        <div className="absolute bottom-4 p-4 left-1/2 transform -translate-x-1/2 flex space-x-5">
          {banners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setBannerIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all p-2  duration-300 ${bannerIndex === idx ? "bg-pink-300 scale-125" : "bg-white/50"
                }`}
            />
          ))}
        </div>
      </div>

      {/* Category Carousel */}
      <div className="py-8 px-4 flex  flex-col justify-center items-center   sm:px-6 lg:px-8 bg-gradient-to-r from-purple-300 to-pink-100 shadow-md">
        <h2 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
          Shop by Category
        </h2>
        <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide snap-x snap-mandatory">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/explore/${category.name.toLowerCase()}`}
              className="flex-shrink-0 text-center snap-center"
            >
              <img
                src={category.image}
                alt={category.name}
                loading="lazy"
                className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full object-cover border-2 border-pink-300 shadow-md transition-transform duration-300 hover:scale-110"
              />
              <p className="mt-2 text-sm sm:text-base text-purple-700 font-semibold capitalize">
                {category.name}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-200 to-purple-100">
        {["electronics", "shringar", "gifts"].map((category) => {
          const categoryPosts = posts?.filter(
            (item) => item.postParentCategory === category
          );

          return categoryPosts?.length > 0 ? (
            <div key={category} className="mb-12">
              <h2 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 mb-6 capitalize">
                {category}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {categoryPosts?.slice(0, 4).map((item, idx) => (
                  <HomeLower key={idx} post={item} />
                ))}
              </div>
              <div className="flex justify-center mt-6">
                <Link to={`/explore/${category}`}>
                  <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    See All
                  </button>
                </Link>
              </div>
            </div>
          ) : null;
        })}

        {posts?.length === 0 && (
          <p className="text-center text-purple-700 mt-10 text-lg font-medium">
            No items available at the moment.
          </p>
        )}
      </div>

      {/* Top Deals Section */}
      <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-pink-100 to-blue-100">
        <h2 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-pink-600 mb-6">
          Top Deals
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {posts?.slice(0, 4).map((item, idx) => (
            <HomeLower key={idx} post={item} />
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <Link to="/explore">
            <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-pink-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-pink-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2">
              View All Deals
            </button>
          </Link>
        </div>
      </div>

      {/* Promotional Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-pink-300 tracking-tight">
            Spring Tech Sale
          </h2>
          <p className="mt-3 text-base sm:text-lg text-gray-100 opacity-90 font-medium">
            Save up to 40% on selected gadgets!
          </p>
          <Link to="/explore">
            <button className="mt-6 px-8 py-3 bg-gradient-to-r from-white to-pink-300 text-purple-700 font-semibold rounded-lg hover:from-gray-100 hover:to-pink-200 transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2">
              Shop Deals Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;