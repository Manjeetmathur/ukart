import React, { useContext, useState } from "react";
import axios from "axios";
import { url } from "../../bacxkendUrl/BackendUrl";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { context } from "../../../Context/Context";

const CreateProduct = () => {
  const [image, setImage] = useState("");
  const [postTitle, setpostTitle] = useState("");
  const [postContent, setpostContent] = useState("");
  const [postPrice, setpostPrice] = useState("");
  const [postCategory, setpostCategory] = useState("");
  const [postParentCategory, setpostParentCategory] = useState("");
  const [stock, setstock] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { getAllPosts } = useContext(context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("postImage", image);
      formData.append("postTitle", postTitle);
      formData.append("postContent", postContent);
      formData.append("postPrice", postPrice);
      formData.append("postCategory", postCategory);
      formData.append("postParentCategory", postParentCategory);
      formData.append("stock", stock);
      const { data } = await axios.post(`${url}/post/create-post`, formData, {
        headers: { "content-type": "multipart/form-data" },
        withCredentials: true,
        withXRFToken: true,
      });
      if (data.success) {
        toast.success(data.message);
        getAllPosts();
        setImage("");
        setpostCategory("");
        setpostParentCategory("");
        setpostContent("");
        setpostPrice("");
        setpostTitle("");
        setstock(0);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const categoryOptions = {
    electronics: ["airpods", "watch", "gadgets", "earphone", "neckband", "headphone"],
    gifts: ["photoframes", "lightings", "kitchenset"],
    shringar: ["neckless", "earings", "bangles", "rings", "makeupkit"],
    decoration: ["jhalar", "lights"]
  };

  return (
    <div className="flex items-center justify-center  bg-gray-100 px-4">
      <div className="w-full max-w-2xl bg-white text-black rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Create Product</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Image Upload */}
          <div>
            <label htmlFor="postImage" className="block text-sm font-semibold mb-1">Product Image</label>
            <input
              type="file"
              id="postImage"
              name="postImage"
              required
              onChange={(e) => setImage(e.target.files?.[0])}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Text Inputs */}
          {[
            { id: "postTitle", label: "Product Title", value: postTitle, setter: setpostTitle },
            { id: "postPrice", label: "Price", value: postPrice, setter: setpostPrice },
            { id: "stock", label: "Stock", value: stock, setter: setstock }
          ].map(({ id, label, value, setter }) => (
            <div key={id}>
              <label htmlFor={id} className="block text-sm font-semibold mb-1">{label}</label>
              <input
                type="text"
                id={id}
                name={id}
                required
                value={value}
                onChange={(e) => setter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          {/* Content */}
          <div>
            <label htmlFor="postContent" className="block text-sm font-semibold mb-1">Description</label>
            <textarea
              id="postContent"
              name="postContent"
              required
              value={postContent}
              onChange={(e) => setpostContent(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 h-28 resize-none"
            />
          </div>

          {/* Domain */}
          <div>
            <label htmlFor="postParentCategory" className="block text-sm font-semibold mb-1">Product Domain</label>
            <select
              id="postParentCategory"
              name="postParentCategory"
              required
              value={postParentCategory}
              onChange={(e) => {
                setpostParentCategory(e.target.value);
                setpostCategory("");
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Select Domain</option>
              {Object.keys(categoryOptions).map(domain => (
                <option key={domain} value={domain}>{domain}</option>
              ))}
            </select>
          </div>

          {/* Subcategory */}
          {postParentCategory && (
            <div>
              <label htmlFor="postCategory" className="block text-sm font-semibold mb-1">Product Category</label>
              <select
                id="postCategory"
                name="postCategory"
                required
                value={postCategory}
                onChange={(e) => setpostCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>Select Category</option>
                {categoryOptions[postParentCategory].map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-800 transition flex items-center justify-center"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Creating...
              </>
            ) : (
              "Create Product"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
