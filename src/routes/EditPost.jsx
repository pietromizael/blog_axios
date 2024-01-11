import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import blogFetch from "../axios/config";

const EditPost = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState();
  const [body, setBody] = useState();

  const getPosts = async () => {
    try {
      const response = await blogFetch.get(`/posts/${id}`);
      const data = response.data;
      setTitle(data.title);
      setBody(data.body);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const editPost = async (e) => {
    e.preventDefault();

    const post = { title, body, userId: 1 };

    await blogFetch.put(`/posts/${id}`, {
      body: post,
    });
  };

  return (
    <div className="new-post">
      <h2>Editando: {title}</h2>
      <form onSubmit={(e) => editPost(e)}>
        <div className="form-control">
          <label>
            <span>Título</span>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Digite o título"
              value={title || ""}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
        </div>
        <div className="form-control">
          <label>
            <span>Conteúdo</span>
            <textarea
              name="body"
              id="body"
              placeholder="Digite o conteúdo"
              value={body || ""}
              onChange={(e) => setBody(e.target.value)}
            ></textarea>
          </label>
        </div>
        <input type="submit" value="Editar post" className="btn" />
      </form>
    </div>
  );
};

export default EditPost;
