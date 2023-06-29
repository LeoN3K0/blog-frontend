import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-type": "application/json",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlbWFsYmVyZyIsImlhdCI6MTY4ODA1ODM2NCwiZXhwIjoxNjg4MTQ0NzY0fQ.MIEcC8GKxlSg5782QOgTyLfm096saW3krcaw-yFsQ0Q"
  }
});