import React, { useState, useEffect } from "react";
import BlogService from "../services/blog.service";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(5);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await BlogService.getAll();
      const publishedBlogs = response.data.filter((blog) => blog.published);
      setBlogs(publishedBlogs);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  // Filter blogs by title or author
  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-gray-200 pt-[80px] min-h-screen">
      <div className="container mx-auto px-8 py-12">
        <div className="grid grid-cols-1 gap-6">
          <div className="card bg-white p-4 rounded-md mb-4">
            <h2 className="text-xl font-bold mb-2">Blog List</h2>
            <div className="mb-4">
              <input
                type="text"
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
                placeholder="Search by title or author"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div>
                {currentBlogs.length > 0 ? (
                  currentBlogs.map((blog) => (
                    <div
                      key={blog.id}
                      className="border border-gray-300 rounded-md p-3 mb-2"
                    >
                      <h3 className="text-lg font-bold">{blog.title}</h3>
                      <p>Author: {blog.author}</p>
                    </div>
                  ))
                ) : (
                  <p>No blogs found.</p>
                )}
              </div>
            )}
            {filteredBlogs.length > blogsPerPage && (
              <div className="flex justify-center mt-4">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    className={`mx-1 px-3 py-1 rounded-md ${
                      currentPage === index + 1 ? "bg-blue-500 text-white" : ""
                    }`}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;