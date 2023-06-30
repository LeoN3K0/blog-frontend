import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import BlogService from "../services/blog.service";
import CreateBlogBtn from "./CreateBlogBtn";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  let navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTitle, setSearchTitle] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(15);

  useEffect(() => {
    if (!currentUser) {
      navigate("/home");
    } else {
      retrievePosts();
    }
  }, [currentUser, navigate]);

  const retrievePosts = async () => {
    try {
      const response = await BlogService.getAll();
      const publishedPosts = response.data.filter((post) => post.published);
      setPosts(publishedPosts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    setSearchTitle(event.target.value);
    setCurrentPage(1);
  };

  // Filter posts by title
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTitle.toLowerCase())
  );

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="bg-gray-200 pt-[80px] min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3 bg-white rounded-lg shadow-md p-4">
            <h3 className="text-2xl font-bold mb-4">Profile</h3>
            <p>
              <strong>Username:</strong> {currentUser.username}
            </p>
            <p>
              <strong>Token:</strong>{" "}
              {currentUser.accessToken.substring(0, 20)} ...{" "}
              {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
            </p>
            <p>
              <strong>Email:</strong> {currentUser.email}
            </p>
            <strong>Roles:</strong>
            <ul>
              {currentUser.roles &&
                currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
            </ul>
          </div>
          <div className="w-full md:w-2/3 bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold">My Posts</h3>
              <CreateBlogBtn />
            </div>
            <div className="mb-4">
              <input
                type="text"
                className="border border-gray-300 rounded-md px-4 py-2 w-full"
                placeholder="Search by title"
                value={searchTitle}
                onChange={handleSearch}
              />
            </div>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div>
                {currentPosts.length > 0 ? (
                  <div>
                    <ul>
                      {currentPosts.map((post) => (
                        <li key={post.id}>
                          <strong>{post.title}</strong> (Created on: {post.date})
                          {post.author === currentUser.username && <span> - by you</span>}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4">
                      {totalPages > 1 && (
                        <nav className="inline-flex">
                          <ul className="flex space-x-2">
                            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                              (page) => (
                                <li key={page}>
                                  <button
                                    className={`${
                                      page === currentPage
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-300 text-gray-700 hover:bg-blue-500 hover:text-white"
                                    } font-bold py-2 px-4 rounded`}
                                    onClick={() => handlePageChange(page)}
                                  >
                                    {page}
                                  </button>
                                </li>
                              )
                            )}
                          </ul>
                        </nav>
                      )}
                    </div>
                  </div>
                ) : (
                  <p>No posts found.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
