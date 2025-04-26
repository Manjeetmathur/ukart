import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import HomeLower from "../HomeMiddle/HomeLower";
import { Link, useParams } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";

const Explore = () => {
  const [cat, setCat] = useState("all");
  const [productcat, setProCat] = useState("all");
  const { posts } = useSelector((st) => st.auth);
  let { name } = useParams()
  const electronicscategories = [
    { imag: "https://tse4.mm.bing.net/th?id=OIP.w18CXqXfi-8C-d1q89_ycgHaE8&pid=Api&P=0&h=180", label: "All", value: "all", },
    { imag: "https://cdn.vox-cdn.com/thumbor/gRRyI6jZSAeMRq3C1is36HtvFfs=/3x0:1017x676/1200x800/filters:focal(3x0:1017x676)/cdn.vox-cdn.com/imported_assets/1575983/smartphone-lineup_1020.jpg", label: "Airpods", value: "airpods", },
    { imag: "https://cdn.vox-cdn.com/thumbor/gRRyI6jZSAeMRq3C1is36HtvFfs=/3x0:1017x676/1200x800/filters:focal(3x0:1017x676)/cdn.vox-cdn.com/imported_assets/1575983/smartphone-lineup_1020.jpg", label: "Neckband", value: "neckband", },
    { imag: "https://tse1.mm.bing.net/th?id=OIP.tW2THcHjVClz4akyleVEsgHaJY&pid=Api&P=0&h=180", label: "watch", value: "watch", },
    { imag: "https://tse3.mm.bing.net/th?id=OIP.FCB33TXqP_3eepbjjans_AHaHa&pid=Api&P=0&h=180", label: "earphones", value: "earphone", },
    { imag: "https://tse3.mm.bing.net/th?id=OIP.FCB33TXqP_3eepbjjans_AHaHa&pid=Api&P=0&h=180", label: "Head Phone", value: "headphone", },
  ];
  const giftscategories = [
    { imag: "https://images.pexels.com/photos/1666065/pexels-photo-1666065.jpeg?cs=srgb&dl=background-bow-boxes-1666065.jpg&fm=jpg", label: "All", value: "all", },
    { imag: "https://deowgxgt4vwfe.cloudfront.net/uploads/1568377497_original.jpg", label: "photo Frame", value: "photoframes", },
    { imag: "https://www.ankurlighting.com/cdn/shop/articles/here-s-how-to-elegantly-light-up-your-terrace-garden-ankur-lighting.jpg?v=1695131159", label: "lightings", value: "lightings", },
    { imag: "https://i5.walmartimages.com/asr/efa6a7ae-0990-416d-ae54-533247d28661.3323c284302d7b1dfb816f41b01bd7f3.jpeg", label: "kithchenset", value: "kitchenset", },
  ];
  const shringarcategories = [
    { imag: "https://i.pinimg.com/originals/e6/85/d5/e685d5100f680666552f648b16c5e5b9.jpg", label: "All", value: "all", },
    { imag: "https://tse1.mm.bing.net/th?id=OIP.3TWo-Rx5pOAOC_82Oog2TQHaHa&pid=Api&P=0&h=180", label: "neckless", value: "neckless", },
    { imag: "https://tse4.mm.bing.net/th?id=OIP.in2vf18_01U2gPjhg6_JhgHaE8&pid=Api&P=0&h=180", label: "earings", value: "earings", },
    { imag: "https://cdn.shopify.com/s/files/1/0276/8666/6376/files/Bridal_Bangle_Design_7_2048x2048.jpg?v=1601301669", label: "bangles", value: "bangles", },
    { imag: "https://tse3.mm.bing.net/th?id=OIP.ulAKFmpPLSLQSR_s5WTfcQHaJ4&pid=Api&P=0&h=180", label: "rings", value: "rings", },
    { imag: "https://tse3.mm.bing.net/th?id=OIP.ulAKFmpPLSLQSR_s5WTfcQHaJ4&pid=Api&P=0&h=180", label: "Makup-kit", value: "makeupkit", },
  ];
  if (name) {
    useEffect(() => { setCat(name) }, [])
  }
  const filterPosts = posts?.filter((item) => (
    cat === "all" ? true : item?.postParentCategory == cat
  ));
  const filteredPosts = filterPosts?.filter((item) => (
    productcat === "all" ? true : item?.postCategory == productcat
  ));


  return (

    <div className="min-h-screen bg-gradient-to-r from-gray-300 via-pink-200 to-blue-200 font-poppins ">
      {/* Category Tabs */}
       <div className="flex p-2 px-6 overflow-x-auto space-x-4 scrollbar-hide snap-x snap-mandatorygap-3  ">
        {name  == 'electronics' && electronicscategories.map((category,idx) => (
          <div className="flex" key={idx}>
            <button
              
              onClick={() => setProCat(category.value)}
              className={`p rounded-full text-sm sm:text-base font-semibold transition-all duration-300  min-w-max whitespace-nowrap 
              `}
            >
              <img
                src={category?.imag}
                alt={category?.name}
                loading="lazy"
                className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full object-cover border-2 border-pink-300 shadow-md transition-transform duration-300 hover:scale-110 `}
              />
              <p className={`mt-2 text-sm sm:text-base rounded-xl px-3 py-1 font-semibold capitalize backdrop-blur-sm ${
                  cat === category?.value
                    ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg"
                    : "bg-white/80 text-purple-700 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 hover:text-white hover:shadow-lg"
                }`}>
                {category?.label}
              </p>
            </button>
            
          </div>
        ))}
        {name  == 'gifts' && giftscategories.map((category,idx) => (
          <div className="flex" key={idx}>
            <button
              
              onClick={() => setProCat(category?.value)}
              className={`p rounded-full text-sm sm:text-base font-semibold transition-all duration-300  min-w-max whitespace-nowrap 
              `}
            >
              <img
                src={category?.imag}
                alt={category?.name}
                loading="lazy"
                className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full object-cover border-2 border-pink-300 shadow-md transition-transform duration-300 hover:scale-110 `}
              />
              <p className={`mt-2 text-sm sm:text-base rounded-xl px-3 py-1 font-semibold capitalize backdrop-blur-sm ${
                  cat === category?.value
                    ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg"
                    : "bg-white/80 text-purple-700 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 hover:text-white hover:shadow-lg"
                }`}>
                {category?.label}
              </p>
            </button>
            
          </div>
        ))}
        {name  == 'shringar' && shringarcategories.map((category,idx) => (
          <div className="flex" key={idx}>
            <button
              
              onClick={() => setProCat(category?.value)}
              className={`p rounded-full text-sm sm:text-base font-semibold transition-all duration-300  min-w-max whitespace-nowrap 
              `}
            >
              <img
                src={category?.imag}
                alt={category?.name}
                loading="lazy"
                className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full object-cover border-2 border-pink-300 shadow-md transition-transform duration-300 hover:scale-110 `}
              />
              <p className={`mt-2 text-sm sm:text-base rounded-xl px-3 py-1 font-semibold capitalize backdrop-blur-sm ${
                  cat === category?.value
                    ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg"
                    : "bg-white/80 text-purple-700 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 hover:text-white hover:shadow-lg"
                }`}>
                {category?.label}
              </p>
            </button>
            
          </div>
        ))}
      </div>
     
      {/* Product Grid */}
      <div className="p-1">
        {filteredPosts?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredPosts.map((item) => (
              <HomeLower key={item?._id} post={item} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 text-lg py-10">
            No products found in this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;