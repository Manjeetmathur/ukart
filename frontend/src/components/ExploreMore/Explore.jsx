import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import HomeLower from "../HomeMiddle/HomeLower";
import { Link, useParams } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";

const Explore = () => {
  const [cat, setCat] = useState("all");
  const [productcat, setProCat] = useState("all");
  const { posts } = useSelector((st) => st.auth);
  let { name } = useParams();

  const electronicscategories = [
    {
      imag: "https://tse4.mm.bing.net/th?id=OIP.w18CXqXfi-8C-d1q89_ycgHaE8&pid=Api&P=0&h=180",
      label: "All",
      value: "all",
    },
    {
      imag: "https://tse2.mm.bing.net/th?id=OIP.L0ljSYevUa1znazEpoHDMgHaE8&pid=Api&P=0&h=180",
      label: "Airpods",
      value: "airpods",
    },
    {
      imag: "https://m.media-amazon.com/images/S/aplus-media/vc/97ee441c-f142-4386-be96-3b289d65e024.jpg",
      label: "Neckband",
      value: "neckband",
    },
    {
      imag: "https://tse1.mm.bing.net/th?id=OIP.tW2THcHjVClz4akyleVEsgHaJY&pid=Api&P=0&h=180",
      label: "Watch",
      value: "watch",
    },
    {
      imag: "https://tse3.mm.bing.net/th?id=OIP.3Lwp2zMqdI-R7LbkXaXxrwHaHa&pid=Api&P=0&h=180",
      label: "Earphones",
      value: "earphone",
    },
    {
      imag: "https://tse3.mm.bing.net/th?id=OIP.FCB33TXqP_3eepbjjans_AHaHa&pid=Api&P=0&h=180",
      label: "Head Phone",
      value: "headphone",
    },
  ];

  const giftscategories = [
    {
      imag: "https://images.pexels.com/photos/1666065/pexels-photo-1666065.jpeg?cs=srgb&dl=background-bow-boxes-1666065.jpg&fm=jpg",
      label: "All",
      value: "all",
    },
    {
      imag: "https://deowgxgt4vwfe.cloudfront.net/uploads/1568377497_original.jpg",
      label: "Photo Frame",
      value: "photoframes",
    },
    {
      imag: "https://www.ankurlighting.com/cdn/shop/articles/here-s-how-to-elegantly-light-up-your-terrace-garden-ankur-lighting.jpg?v=1695131159",
      label: "Lightings",
      value: "lightings",
    },
    {
      imag: "https://i5.walmartimages.com/asr/efa6a7ae-0990-416d-ae54-533247d28661.3323c284302d7b1dfb816f41b01bd7f3.jpeg",
      label: "Kitchen Set",
      value: "kitchenset",
    },
  ];

  const shringarcategories = [
    {
      imag: "https://i.pinimg.com/originals/e6/85/d5/e685d5100f680666552f648b16c5e5b9.jpg",
      label: "All",
      value: "all",
    },
    {
      imag: "https://tse1.mm.bing.net/th?id=OIP.3TWo-Rx5pOAOC_82Oog2TQHaHa&pid=Api&P=0&h=180",
      label: "Necklace",
      value: "neckless",
    },
    {
      imag: "https://tse4.mm.bing.net/th?id=OIP.in2vf18_01U2gPjhg6_JhgHaE8&pid=Api&P=0&h=180",
      label: "Earrings",
      value: "earings",
    },
    {
      imag: "https://cdn.shopify.com/s/files/1/0276/8666/6376/files/Bridal_Bangle_Design_7_2048x2048.jpg?v=1601301669",
      label: "Bangles",
      value: "bangles",
    },
    {
      imag: "https://tse3.mm.bing.net/th?id=OIP.ulAKFmpPLSLQSR_s5WTfcQHaJ4&pid=Api&P=0&h=180",
      label: "Rings",
      value: "rings",
    },
    {
      imag: "https://i5.walmartimages.com/asr/ff7c1af0-8802-4a1f-8ed8-ccbf09d4a2b0_1.dede3f39941244c7b22f283f5bed36f3.jpeg",
      label: "Makeup Kit",
      value: "makeupkit",
    },
  ];

  useEffect(() => {
    if (name) {
      setCat(name);
      setProCat("all");
    }
  }, [name]);

  const filterPosts = posts?.filter((item) =>
    cat === "all" ? true : item?.postParentCategory === cat
  );
  const filteredPosts = filterPosts?.filter((item) =>
    productcat === "all" ? true : item?.postCategory === productcat
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 font-poppins bg-wave-pattern">
      {/* Category Tabs */}
      <div className="py-8 px-6">
        <h2 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 mb-6 text-center sparkle animate-slideUp">
          Explore Categories
        </h2>
        <div className="flex p-2 px-6 overflow-x-auto space-x-4 scrollbar-hide snap-x snap-mandatorygap-3">
          {name === "electronics" &&
            electronicscategories.map((category, idx) => (
              <button
                key={idx}
                onClick={() => setProCat(category.value)}
                className="flex-shrink-0 text-center snap-center group animate-slideUp"
              >
                <div className="relative glassmorphism rounded-full p-2">
                  <img
                    src={category.imag}
                    alt={category.label}
                    loading="lazy"
                    className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full object-cover border-4 border-pink-300/50 shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:border-pink-400"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <p
                  className={`mt-2 text-sm sm:text-base font-semibold capitalize rounded-xl px-3 py-1 glow-button ${
                    productcat === category.value
                      ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg"
                      : "bg-white/80 text-purple-700 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 hover:text-white hover:shadow-lg"
                  }`}
                >
                  {category.label}
                </p>
              </button>
            ))}
          {name === "gifts" &&
            giftscategories.map((category, idx) => (
              <button
                key={idx}
                onClick={() => setProCat(category.value)}
                className="flex-shrink-0 text-center snap-center group animate-slideUp"
              >
                <div className="relative glassmorphism rounded-full p-2">
                  <img
                    src={category.imag}
                    alt={category.label}
                    loading="lazy"
                    className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full object-cover border-4 border-pink-300/50 shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:border-pink-400"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <p
                  className={`mt-2 text-sm sm:text-base font-semibold capitalize rounded-xl px-3 py-1 glow-button ${
                    productcat === category.value
                      ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg"
                      : "bg-white/80 text-purple-700 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 hover:text-white hover:shadow-lg"
                  }`}
                >
                  {category.label}
                </p>
              </button>
            ))}
          {name === "shringar" &&
            shringarcategories.map((category, idx) => (
              <button
                key={idx}
                onClick={() => setProCat(category.value)}
                className="flex-shrink-0 text-center snap-center group animate-slideUp"
              >
                <div className="relative glassmorphism rounded-full p-2">
                  <img
                    src={category.imag}
                    alt={category.label}
                    loading="lazy"
                    className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full object-cover border-4 border-pink-300/50 shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:border-pink-400"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <p
                  className={`mt-2 text-sm sm:text-base font-semibold capitalize rounded-xl px-3 py-1 glow-button ${
                    productcat === category.value
                      ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg"
                      : "bg-white/80 text-purple-700 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 hover:text-white hover:shadow-lg"
                  }`}
                >
                  {category.label}
                </p>
              </button>
            ))}
        </div>
      </div>

      {/* Decorative Divider */}
      <div className="divider-wave"></div>

      {/* Product Grid */}
      <div className="py-8 px-6 bg-gradient-to-br from-blue-200 to-purple-200 bg-wave-pattern animate-slideUp">
        <h2 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 mb-8 text-center sparkle">
          Products
        </h2>
        {filteredPosts?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPosts.map((item) => (
              <HomeLower key={item?._id} post={item} />
            ))}
          </div>
        ) : (
          <div className="text-center text-purple-800 text-lg py-10 animate-pulse">
            No products found in this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;