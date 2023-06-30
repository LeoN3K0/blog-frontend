import http from "../http-common";
import AuthService from "../services/auth.service";


const getAll = () => {
  return http.get("/blogs");
};

const get = id => {
  return http.get(`/blogs/${id}`);
};

const create = data => {
  const currentUser = AuthService.getCurrentUser();
  const headers = {
    Authorization: `Bearer ${currentUser.accessToken}`
  };

  return http.post(`/blogs`, data, { headers });
};

const update = (id, data) => {
  return http.put(`/blogs/${id}`, data);
};

const remove = id => {
  return http.delete(`/blogs/${id}`);
};

const removeAll = () => {
  return http.delete(`/blogs`);
};

const findByTitle = title => {
  return http.get(`/blogs?title=${title}`);
};

const findByAuthor = (author) => {
  return http.get(`/blogs?author=${author}`);
};

const BlogService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
  findByAuthor
};

export default BlogService;