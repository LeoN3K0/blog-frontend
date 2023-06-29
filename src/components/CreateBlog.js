import React, { useState, } from "react";
import BlogDataService from "../services/blog.service";
import AuthService from "../services/auth.service";

const CreateBlog = () => {
  const initialBlogState = {
    id: null,
    title: "",
    body: "",
    published: false,
    author: "",
    publisheddate: "",
  };
  const [blog, setBlog] = useState(initialBlogState);
  const [submitted, setSubmitted] = useState(false);
  const currentUser = AuthService.getCurrentUser();
  const currentDate = new Date().toLocaleDateString();


  const handleInputChange = event => {
    const { name, value } = event.target;
    setBlog({ ...blog, [name]: value });
  };

  const saveBlog = () => {
    var data = {
      title: blog.title,
      body: blog.body,
      author: currentUser.username,
      publisheddate: currentDate
    };

    BlogDataService.create(data)
      .then(response => {
        setBlog({
          id: response.data.id,
          title: response.data.title,
          body: response.data.description,
          published: response.data.published,
          author: currentUser.username,
          publisheddate: currentDate
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newBlog = () => {
    setBlog(initialBlogState);
    setSubmitted(false);
  };

  return (
    <div className="bg-gray-200 pt-[80px] min-h-screen">
      <div className="ontainer mx-auto px-8 py-12">
        <div className="max-w-md mx-auto bg-white rounded p-6 shadow-md">
          {submitted ? (
            <div className="text-center">
              <h4 className="text-2xl font-bold mb-4">You submitted successfully!</h4>
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                onClick={newBlog}
              >
                Add
              </button>
            </div>
          ) : (
            <div>
              <div className="mb-4">
                <label htmlFor="title" className="text-lg font-bold">Title</label>
                <input
                  type="text"
                  className="block w-full border border-gray-300 rounded px-4 py-2"
                  id="title"
                  required
                  value={blog.title}
                  onChange={handleInputChange}
                  name="title"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="body" className="text-lg font-bold">Body</label>
                <textarea
                  className="block w-full border border-gray-300 rounded px-4 py-2"
                  id="body"
                  required
                  value={blog.body}
                  onChange={handleInputChange}
                  name="body"
                />
              </div>

              <button
                onClick={saveBlog}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
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