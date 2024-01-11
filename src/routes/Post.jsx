import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import blogFetch from "../axios/config.js";

import "./Post.css"


const Post = () => {
  const {id} = useParams()

  const [post, setPost] = useState({});

  const getPost = async() => {
    try {
      const response = await blogFetch(`/posts/${id}`)
      const data = response.data
      setPost(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getPost()
  }, [])

  return (
    <div className="post-container">
      {!post.title ? (
        <p>Carregando...</p>
      ) : (
        <div className="post">
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      )}
    </div>
  );
};

export default Post;
