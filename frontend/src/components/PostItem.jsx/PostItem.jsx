import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { setPostData } from "../../store/authSlice";
import toast from "react-hot-toast";
import { url } from "../bacxkendUrl/BackendUrl";

const PostItem = () => {
  const [bloading, setbLoading] = useState(false);
  const [cloading, setcLoading] = useState(false);
  const params = useParams();
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postData, status } = useSelector((st) => st.auth);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const data = await axios.get(
          `${url}/post/get-post-by-id/${params.postId}`,
          {
            headers: { "content-type": "application/json" },
            withCredentials: true,
            withXSRFToken: true,
          }
        );
        const res = data.data;
        if (res.success) {
          dispatch(setPostData(res.post));
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to load product details");
      }
    };
    fetchdata();
  }, [params.postId, dispatch]);

  const addToCart = async () => {
    try {
      if (!status) throw new Error("User is not logged in");
      setcLoading(true);
      const data = await axios.post(
        `${url}/post/add-cart`,
        { postId: postData?._id },
        {
          withCredentials: true,
          withXSRFToken: true,
          headers: { "content-type": "application/json" },
        }
      );
      const res = data.data;
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("User is not logged in");
    } finally {
      setcLoading(false);
    }
    ''
  };
  const openWhatsapp = () => {
    const phoneNumber = "+919973154827";
    const message = "Hi, I'd like to order this item.\n" + postData?.postTitle + "\n price : Rs." + postData?.postPrice;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`);
  };

  return (
    <div className="min-h-screen bg-blue-400 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle Overlay Effect */}
      <div className="absolute inset-0 bg-black opacity-5 pointer-events-none"></div>

      <div className="bg-white border-2 border-gray-200/50 rounded-xl shadow-lg p-6 md:p-8 w-full max-w-4xl flex flex-col md:flex-row gap-8 transform hover:shadow-2xl transition-all duration-300 relative z-10">
        {/* Subtle Glow Effect */}
        <div className="absolute inset-0 -z-10 bg-purple-500/20 blur-3xl rounded-xl scale-105 animate-pulse-slow"></div>

        {/* Product Image */}
        <div className="flex-shrink-0">
          <Link to={postData?.postImage || "#"}>
            <img
              src={postData?.postImage || "https://via.placeholder.com/350"}
              alt={postData?.postTitle || "Product"}
              className="h-[300px] w-[300px] lg:h-[350px] lg:w-[350px] rounded-lg shadow-md object-cover hover:scale-105 transition-transform duration-300 mx-auto"
            />
          </Link>
        </div>

        {/* Product Details */}
        <div className="flex flex-col flex-1 space-y-6">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 drop-shadow-sm">
            {postData?.postTitle || "Product Title"}
          </h2>
          <p className="text-gray-700 text-base lg:text-lg leading-relaxed">
            {postData?.postContent || "No description available."}
          </p>

          {/* Price and Quantity */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-red-500 text-xl lg:text-2xl font-bold">
              Rs. {postData?.postPrice?.toFixed(2) || "N/A"}
            </p>
            <div className="flex items-center gap-4 bg-gray-100 rounded-lg px-4 py-2 shadow-inner">
              <button
                onClick={handleDecrement}
                className="text-gray-700 hover:text-purple-600 text-xl font-bold disabled:opacity-50 transition-colors duration-300"
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="text-gray-800 font-medium text-lg w-8 text-center">
                {quantity}
              </span>
              <button
                onClick={handleIncrement}
                className="text-gray-700 hover:text-purple-600 text-xl font-bold transition-colors duration-300"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          {postData?.stock == 0 ? <p className="flex-1 text-center bg-red-400 text-white py-3 rounded-lg transition-all duration-300 text-base font-semibold disabled shadow-md hover:shadow-lg">Sold out</p> : <div className="flex flex-col sm:flex-row gap-4 w-full">
            <button
              onClick={addToCart}
              className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-all duration-300 text-base font-semibold disabled:bg-purple-400 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
              disabled={cloading}
            >
              {cloading ? "Adding..." : "Add to Cart"}
            </button>
            <Link to={`/buy/${postData?._id}`} className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-all duration-300 text-base font-semibold disabled:bg-purple-400 disabled:cursor-not-allowed shadow-md hover:shadow-lg text-center">

              Buy Now
            </Link>

          </div>}
          <button
            onClick={openWhatsapp}
            className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-all duration-300 text-base font-semibold shadow-md hover:shadow-lg"
          >
            WhatsApp Now
          </button>
        </div>
      </div>

      {/* Animated Accents */}
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-200/30 rounded-full blur-2xl animate-float"></div>
      <div className="absolute top-0 right-0 w-40 h-40 bg-blue-200/30 rounded-full blur-2xl animate-float-slow"></div>
    </div>
  );
};

export default PostItem;