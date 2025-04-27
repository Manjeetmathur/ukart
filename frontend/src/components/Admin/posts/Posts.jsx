import React, { useContext, useState } from "react";
import { MdMoreVert } from "react-icons/md";
import axios from "axios";
import { url } from "../../bacxkendUrl/BackendUrl";
import { toast } from "react-hot-toast";
import { context } from "../../../Context/Context";

function Post({ post }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [editImage, setEditImage] = useState(post.postImage);
  const [editTitle, setEditTitle] = useState(post.postTitle);
  const [editContent, setEditContent] = useState(post.postContent);
  const [editPrice, setEditPrice] = useState(post.postPrice);
  const [editStock, setStock] = useState(post.stock);
  const [loading, setLoading] = useState(false);
  const { getAllPosts } = useContext(context)
  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSaveEdit = async () => {
    try {
      const formdata = new FormData();
      formdata.append("postId", post._id);
      formdata.append("postTitle", editTitle);
      formdata.append("postContent", editContent);
      formdata.append("postPrice", editPrice);
      formdata.append("stock", editStock);

      // Append image only if there's a new file
      if (editImage) {
        formdata.append("postImage", editImage);
      }

      const { data } = await axios.patch(
        `${url}/post/edit-post`,
        formdata,
        {
          headers: { "Content-Type": "multipart/form-data" }, // Fix: Required for file uploads
          withCredentials: true,
        }
      );

      if (data.success) {
        getAllPosts() // Reload to reflect changes
      } else {
        console.error("Error updating post:", data.message);
      }
    } catch (error) {
      console.error("Failed to update post:", error);
    } finally {
      setIsMenuOpen(false);
    }
  };


  const handleDelete = async () => {
    const postId = post?._id;
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${url}/post/delete-post`,
        { postId },
        {
          withCredentials: true,
          withXSRFToken: true,
        }
      );
      if (data.success) {
        toast.success(data.message);
        window.location.reload();
      }
    } catch (error) {
      toast.error("Error deleting post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-pink-600 via-purple-500 to-blue-600  shadow-lg rounded-xl overflow-hidden p-6 relative transition-transform duration-300 hover:scale-[1.02]">
      {/* Post Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">{post?.postTitle}</h2>
        <button
          onClick={handleMenuClick}
          className="text-gray-400 hover:text-gray-200 transition"
        >
          <MdMoreVert size={24} />
        </button>
      </div>

      {/* Edit Mode */}
      {isMenuOpen && (
        <div className="absolute inset-0 bg-gray-900/90 backdrop-blur-md p-5 rounded-xl shadow-lg transition-all duration-300">
          <input
            type="file"
            onChange={(e) => setEditImage(e.target.files[0])}
            className="w-full border border-gray-600 bg-gray-700 text-white p-2 rounded-lg focus:ring focus:ring-blue-500 mb-2"
          />
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full border border-gray-600 bg-gray-700 text-white p-2 rounded-lg focus:ring focus:ring-blue-500 mb-2"
          />
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full border border-gray-600 bg-gray-700 text-white p-2 rounded-lg focus:ring focus:ring-blue-500 mb-2"
          />
          <input
            type="text"
            value={editPrice}
            onChange={(e) => setEditPrice(e.target.value)}
            className="w-full border border-gray-600 bg-gray-700 text-white p-2 rounded-lg focus:ring focus:ring-blue-500 mb-2"
          />
          <input
            type="number"
            value={editStock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full border border-gray-600 bg-gray-700 text-white p-2 rounded-lg focus:ring focus:ring-blue-500 mb-2"
          />

          {/* Edit Buttons */}
          <div className="flex items-center justify-between mt-3">
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg shadow transition"
            >
              {loading ? "Deleting..." : "Delete"}
            </button>
            <div className="flex gap-2">
              <button
                onClick={handleSaveEdit}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow transition"
              >
                Save
              </button>
              <button
                onClick={handleMenuClick}
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Post Image */}
      <img
        src={post?.postImage}
        className="w-full h-56 object-cover rounded-lg mb-4 shadow-md"
        alt="Post"
      />

      {/* Post Content */}
      <p className="text-gray-300">{post?.postContent}</p>
      <p className="text-lg font-semibold text-blue-400 mt-2">
        Price: ₹{post?.postPrice}
      </p>
    </div>
  );
}

export default Post;
