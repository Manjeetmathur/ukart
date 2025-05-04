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
    link:"electronics",
    image: "https://tse4.mm.bing.net/th?id=OIP.w18CXqXfi-8C-d1q89_ycgHaE8&pid=Api&P=0&h=180",
  },
  {
    name: "gifts",
    link: "gifts",
    image: "https://tse1.mm.bing.net/th?id=OIP.wd3p1bZSRi2rJBR-PaWVeQHaHa&pid=Api&P=0&h=180",
  },
  {
    name: "Sringaar",
    link: "shringar",
    image: "https://wallpapercave.com/wp/wp8149661.jpg",
  },
  {
    name: "decoration",
    link: "decoration",
    image: "https://deowgxgt4vwfe.cloudfront.net/uploads/1677676541_original.jpg",
  },
];

// Sample banners
const banners = [
  {
    image: "https://png.pngtree.com/thumb_back/fw800/background/20230704/pngtree-office-essentials-technology-and-gadgets-illustration-featuring-laptop-printer-camera-tablet-image_3748458.jpg",
    title: "Spring Tech Sale",
    subtitle: "Up to 40% off on gadgets!",
    cta: "Shop Now",
    link: "/explore/electronics",
  },
  {
    image: "https://img.freepik.com/premium-photo/gifts-dark-backgrounds_1141064-809.jpg",
    title: "New Arrivals",
    subtitle: "Gifts to loved one",
    cta: "Enter Now",
    link: "/explore/gifts",
  },
  {
    image: "https://www.culturalindia.net/iliimages/Solah-Shringaar-ili-104-img-7.jpg",
    title: "New Arrivals",
    subtitle: "shringar",
    cta: "Explore Now",
    link: "/explore/shringar",
  },
  {
    image: "https://tse1.mm.bing.net/th?id=OIP.dvd4bSti6M3QZ_BGmb9KbwHaEK&pid=Api&P=0&h=180",
    title: "Decorate the world",
    subtitle: "Decoration",
    cta: "Explore Now",
    link: "/explore/decoration",
  },
];

const Home = () => {
  const { posts = [] } = useSelector((st) => st.auth) || {};
  const [bannerIndex, setBannerIndex] = useState(0);

  // Auto-rotate banners every 4 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 font-poppins bg-wave-pattern">
      {/* Hero Banner Slider */}
      <div className="overflow-hidden relative">
        <div className="w-full h-[40vh] sm:h-[50vh] md:h-[400px] lg:h-[60vh] relative">
          {/* Image element instead of background image */}
          <img
            src={banners[bannerIndex]?.image}
            alt={banners[bannerIndex]?.title}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 glassmorphism flex items-center justify-start px-4 sm:px-8 md:px-12 lg:px-16">
            <div className="text-left max-w-lg animate-slideUp">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-white tracking-tight drop-shadow-lg sparkle">
                {banners[bannerIndex]?.title}
              </h1>
              <p className="mt-3 text-sm sm:text-base md:text-lg text-white font-medium opacity-90">
                {banners[bannerIndex]?.subtitle}
              </p>
              <Link to={banners[bannerIndex]?.link}>
                <button className="mt-6 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full glow-button shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-3 focus:outline-none focus:ring-4 focus:ring-pink-400/50">
                  {banners[bannerIndex]?.cta} <FaLongArrowAltRight />
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Banner Navigation Dots */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {banners?.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setBannerIndex(idx)}
              aria-label={`Select banner ${idx + 1}`}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${bannerIndex === idx ? "bg-pink-300 scale-150 shadow-md" : "bg-white/60 hover:bg-white/80"
                }`}
            />
          ))}
        </div>
      </div>


      {/* Decorative Divider */}
      <div className="divider-wave"></div>

      {/* Category Carousel */}
      <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-300 to-pink-200 shadow-inner relative animate-slideUp">
        <h2 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 mb-6 text-center sparkle">
          Shop by Category
        </h2>
        <div className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide snap-x snap-mandatory justify-center pl-[180px]">
          {categories?.map((category) => (
            <Link
              key={category?.name}
              to={`/explore/${category?.link?.toLowerCase()}`}
              className="flex-shrink-0 text-center snap-center group"
            >
              <div className="relative glassmorphism rounded-full p-2">
                <img
                  src={category?.image}
                  alt={category?.name}
                  loading="lazy"
                  className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full object-cover border-4 border-pink-300/50 shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:border-pink-400"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <p className="mt-3 text-sm sm:text-base text-purple-800 font-semibold capitalize group-hover:text-pink-600 transition-colors duration-300">
                {category?.name}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Decorative Divider */}
      <div className="divider-wave"></div>

      {/* Featured Products Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-200 to-purple-200 bg-wave-pattern">
        {["electronics", "shringar", "gifts"]?.map((category) => {
          const categoryPosts = posts?.filter((item) => item.postParentCategory === category);

          return categoryPosts?.length > 0 ? (
            <div key={category} className="mb-16 animate-slideUp">
              <h2 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 mb-8 capitalize text-center sparkle">
                {category==='shringar' ? "Sringaar" : category }
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categoryPosts?.slice(0, 4)?.map((item, idx) => (
                  <HomeLower key={idx} post={item} />
                ))}
              </div>
              <div className="flex justify-center mt-8">
                <Link to={`/explore/${category}`}>
                  <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full glow-button shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-400/50">
                    See All
                  </button>
                </Link>
              </div>
            </div>
          ) : null;
        })}

        {posts?.length === 0 && (
          <p className="text-center text-purple-800 text-lg font-medium mt-12 animate-pulse">
            No items available at the moment.
          </p>
        )}
      </div>

      {/* Decorative Divider */}
      <div className="divider-wave"></div>

      {/* Top Deals Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-pink-200 to-blue-200 bg-wave-pattern animate-slideUp">
        <h2 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-pink-600 mb-8 text-center sparkle">
          Top Deals
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {posts?.slice(0, 4)?.map((item, idx) => (
            <HomeLower key={idx} post={item} />
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Link to="/explore">
            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-pink-600 text-white font-semibold rounded-full glow-button shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-pink-400/50">
              View All Deals
            </button>
          </Link>
        </div>
      </div>

      {/* Decorative Divider */}
      <div className="divider-wave"></div>

      {/* Promotional Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16 relative overflow-hidden animate-slideUp">
        <div className="absolute inset-0 bg-wave-pattern opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-pink-300 tracking-tight drop-shadow-lg sparkle">
            Spring Tech Sale
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-gray-100 font-medium opacity-90">
            Save up to 40% on selected gadgets!
          </p>
          <Link to="/explore">
            <button className="mt-8 px-10 py-4 bg-gradient-to-r from-white to-pink-300 text-purple-800 font-semibold rounded-full glow-button shadow-xl hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-pink-400/50">
              Shop Deals Now
            </button>
          </Link>
        </div>
      </div>

    </div>
  );
};

export default Home;