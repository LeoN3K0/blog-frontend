import React, { useState, useEffect } from "react";
import BlogService from "../services/blog.service";
import AuthService from "../services/auth.service";
import CreateBlogBtn from "./CreateBlogBtn";

const Home = () => {
  const [recentPosts, setRecentPosts] = useState([]);
  const [nextPosts, setNextPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }

    fetchRecentPosts();
  }, []);

  const fetchRecentPosts = async () => {
    try {
      const response = await BlogService.getAll();
      const posts = response.data;
      const publishedPosts = posts.filter(post => post.published); // Filter out unpublished posts
      setRecentPosts(publishedPosts.slice(0, 1)); // Get the most recent published post
      setNextPosts(publishedPosts.slice(1, 6)); // Get the next 5 published posts
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-200 pt-[80px] min-h-screen">
      <div className="container mx-auto px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Welcome to My Blog</h1>
          {currentUser && (
            <CreateBlogBtn />
          )}
        </div>
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <div className="card bg-white p-4 rounded-md mb-4">
              {loading && <p>Loading...</p>}
              {!loading && recentPosts.length > 0 ? (
                recentPosts.map((post) => (
                  <React.Fragment key={post.id}>
                    <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                    <img
                      src={post.image}
                      alt={post.title}
                      className="mb-2 rounded-md"
                    />
                    <p>
                      <span className="text-gray-500">Author: </span>
                      {post.author}
                    </p>
                    <p>
                      <span className="text-gray-500">Published: </span>
                      {post.date}
                    </p>
                  </React.Fragment>
                ))
              ) : (
                <div className="card bg-white p-4 rounded-md">
                  <p>No blogs exist at this time.</p>
                </div>
              )}
            </div>
          </div>
          <div className="col-span-1">
            <div className="card bg-white p-4 rounded-md">
              <h2 className="text-xl font-bold mb-2">More</h2>
              <ul>
                {loading && <p>Loading...</p>}
                {!loading && nextPosts.length > 0 ? (
                  nextPosts.map((post) => (
                    <li key={post.id} className="text-blue-500">
                      {post.title}
                    </li>
                  ))
                ) : (
                  <div className="card bg-white p-4 rounded-md">
                    <p>No posts available.</p>
                  </div>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
