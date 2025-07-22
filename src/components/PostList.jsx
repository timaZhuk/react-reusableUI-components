import React from "react";
import PostItem from "./PostItem";

const PostList = function ({ posts, title, remove }) {
  if (!posts.length) {
    return <h2 style={{ textAlign: "center" }}>Post are not found</h2>;
  }
  return (
    <>
      <h1 style={{ textAlign: "center" }}>{title}</h1>

      {posts.map((post, index) => (
        <PostItem
          remove={remove}
          number={index + 1}
          post={post}
          key={post.id}
        />
      ))}
    </>
  );
};

export default PostList;
