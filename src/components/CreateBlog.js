import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import BlogService from "../services/blog.service";

const CreateBlog = () => {
  const initialBlogState = {
    title: "",
    body: ""
  };
  const [blog, setBlog] = useState(initialBlogState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setBlog({ ...blog, [name]: value });
  };

  const handleEditorChange = value => {
    setBlog({ ...blog, body: value });
  };

  const handleImageUpload = file => {
    // Implement your image upload logic here
    // You can use libraries like Cloudinary, Firebase Storage, etc.
  };

  const saveBlog = () => {
    const data = {
      title: blog.title,
      body: blog.body
    };

    BlogService.create(data)
      .then(response => {
        setBlog(initialBlogState);
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const resetForm = () => {
    setBlog(initialBlogState);
    setSubmitted(false);
  };

  return (
    <div className="bg-gray-200 pt-[80px] min-h-screen">
      <div className="container mx-auto px-8 py-12">
        <div className="max-w-md mx-auto bg-white rounded-md shadow-md p-6">
          {submitted ? (
            <div>
              <h4 className="text-lg font-semibold mb-4">
                You submitted successfully!
              </h4>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-md"
                onClick={resetForm}
              >
                Add Another Blog
              </button>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Create Blog</h2>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  required
                  value={blog.title}
                  onChange={handleInputChange}
                  name="title"
                  className="border border-gray-300 rounded-md px-4 py-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="body"
                  className="block text-sm font-medium text-gray-700"
                >
                  Body
                </label>
                <ReactQuill
                  value={blog.body}
                  onChange={handleEditorChange}
                  className="bg-white"
                  modules={{
                    toolbar: {
                      container: [
                        [{ header: [1, 2, 3, 4, 5, 6, false] }],
                        ["bold", "italic", "underline", "strike"],
                        [{ script: "sub" }, { script: "super" }],
                        [{ list: "ordered" }, { list: "bullet" }],
                        ["link", "image", "video"],
                        ["clean"]
                      ],
                      handlers: {
                        image: handleImageUpload // Handle image upload
                      }
                    }
                  }}
                />
              </div>
              <button
                onClick={saveBlog}
                className="px-4 py-2 bg-green-500 text-white rounded-md"
              >
                Submit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
