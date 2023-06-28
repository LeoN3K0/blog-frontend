import { Button } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

const CreateBlogBtn = () => {

  return (    
    <Link to="/createblog"><Button>Create Post</Button></Link>           
  );
};

export default CreateBlogBtn;