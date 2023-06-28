import React, { useState } from "react";
import BlogService from "../services/blog.service";
import AuthService from "../services/auth.service";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const currentUser = AuthService.getCurrentUser();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleBodyChange = (content) => {
    setBody(content);
  };

  const handleSave = async () => {
    setLoading(true);

    try {
      const data = {
        title: title,
        body: body,
        published: false,
        date: null,
        author: currentUser.username,
      };

      await BlogService.create(data);
      // Clear form fields
      setTitle("");
      setBody("");
      setLoading(false);
      console.log("Blog saved successfully.");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handlePublish = async () => {
    setLoading(true);

    try {
      const currentDate = new Date();
      const data = {
        title: title,
        body: body,
        published: true,
        date: currentDate.toISOString(),
        author: currentUser.username,
      };

      await BlogService.create(data);
      // Clear form fields
      setTitle("");
      setBody("");
      setLoading(false);
      console.log("Blog published successfully.");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-200 pt-[80px] min-h-screen">
      <div className="container mx-auto px-8 py-12">
        <div className="card bg-white p-4 rounded-md mb-4">
          <h2 className="text-xl font-bold mb-2">Create a New Blog</h2>
          <div className="mb-4">
            <label htmlFor="title" className="block font-bold mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          <div className="mb-4 card-body">
            <label htmlFor="body" className="block font-bold mb-1">
              Body
            </label>
            <div className="editor-container">
              <ReactQuill
                id="body"
                value={body}
                onChange={handleBodyChange}
                placeholder="Write your blog post here..."
                style={{ height: "300px" }} // Adjust the height as desired
                modules={{
                  toolbar: [
                    ["bold", "italic", "underline", "strike"],
                    [{ header: [1, 2, 3, 4, 5, 6] }],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["link", "image"],
                    ["clean"],
                  ],
                }}
              />
            </div>
          </div>
          <div className="flex justify-between mt-4">
          <div className="flex justify-between mt-4">
  <div>
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded"
      onClick={handleSave}
      disabled={loading}
    >
      Save
    </button>
  </div>
  <div>
    <button
      className="bg-green-500 text-white px-4 py-2 rounded"
      onClick={handlePublish}
      disabled={loading}
    >
      Publish
    </button>
  </div>
</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
