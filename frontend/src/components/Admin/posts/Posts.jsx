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
  const { getAllPosts } = useContext(context);

  const handleMenuClick = () => setIsMenuOpen(!isMenuOpen);

  const handleSaveEdit = async () => {
    try {
      const formdata = new FormData();
      formdata.append("postId", post._id);
      formdata.append("postTitle", editTitle);
      formdata.append("postContent", editContent);
      formdata.append("postPrice", editPrice);
      formdata.append("stock", editStock);
      if (editImage) formdata.append("postImage", editImage);

      const { data } = await axios.patch(`${url}/post/edit-post`, formdata, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (data.success) {
        getAllPosts();
        toast.success("Post updated!");
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (error) {
      toast.error("Failed to update post");
    } finally {
      setIsMenuOpen(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${url}/post/delete-post`,
        { postId: post?._id },
        {
          withCredentials: true,
          withXSRFToken: true,
        }
      );
      if (data.success) {
        toast.success(data.message);
        getAllPosts();
      }
    } catch (error) {
      toast.error("Error deleting post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-white/10 backdrop-blur-lg rounded-lg shadow-md overflow-hidden p-4 px-10 transition-all hover:scale-[1.01] border border-white/10 text-sm">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <h2 className="text-base font-medium truncate max-w-[80%]">{post?.postTitle}</h2>
        <button onClick={handleMenuClick} className=" hover:text-gray-200">
          <MdMoreVert size={18} />
        </button>
      </div>

      {/* Edit Overlay */}
      {isMenuOpen && (
        <div className="absolute inset-0 z-10 bg-white/90 backdrop-blur-xl p-4 rounded-lg border border-white/20 flex flex-col gap-2 text-sm">
          <input
            type="file"
            onChange={(e) => setEditImage(e.target.files[0])}
            className="file:rounded file:px-2 file:py-1"
          />
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full p-1.5 rounded border border-gray-300"
            placeholder="Title"
          />
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full p-1.5 rounded border border-gray-300"
            placeholder="Content"
          />
          <input
            type="text"
            value={editPrice}
            onChange={(e) => setEditPrice(e.target.value)}
            className="w-full p-1.5 rounded border border-gray-300"
            placeholder="Price"
          />
          <input
            type="number"
            value={editStock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full p-1.5 rounded border border-gray-300"
            placeholder="Stock"
          />

          {/* Action Buttons */}
          <div className="flex justify-between mt-3">
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600  text-xs px-3 py-1.5 rounded"
            >
              {loading ? "Deleting..." : "Delete"}
            </button>
            <div className="flex gap-2">
              <button
                onClick={handleSaveEdit}
                className="bg-green-500 hover:bg-green-600  text-xs px-3 py-1.5 rounded"
              >
                Save
              </button>
              <button
                onClick={handleMenuClick}
                className="bg-gray-400 hover:bg-gray-500  text-xs px-3 py-1.5 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Post Image */}
      <div className="mb-2">
        <img
          src={post?.postImage}
          alt="Post"
          className="w-full h-36 object-cover rounded-md border border-white/20"
        />
      </div>

      {/* Content */}
      <p className=" mb-1 line-clamp-2">{post?.postContent}</p>
      <p className="text-pink-500 font-medium">₹{post?.postPrice}</p>
    </div>
  );
}

export default Post;
