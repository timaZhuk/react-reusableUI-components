import React from "react";
import { useParams } from "react-router-dom";
import PostService from "../API/PostService";
import { useState, useEffect } from "react";
import { useFetching } from "../hooks/useFetching";

const PostIdPage = () => {
  const params = useParams();
  console.log(params);
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  //----post info----------------------
  const [fetchPostById, isLoading, error] = useFetching(async () => {
    const response = await PostService.getById(params.id);
    setPost(response.data);
  });
  //--------comment info---------------------------
  const [fetchComments, isComment, comError] = useFetching(async () => {
    const response = await PostService.getCommentsByPostId(params.id);
    setComments(response.data);
  });
  console.log("Comments");
  console.log(comments);
  //-------------------------------
  useEffect(() => {
    fetchPostById();
    fetchComments();
  }, []);

  console.log(post);
  return (
    <div>
      <h1>You open the posts page with ID = {params.id}</h1>
      <div>
        {post.id}
        {post.title}
      </div>
      <h1>Comments</h1>
      <div>
        {comments.map((comm) => (
          <div key={comm.email} style={{ marginTop: 15 }}>
            <h5>{comm.email}</h5>
            <div>{comm.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostIdPage;
