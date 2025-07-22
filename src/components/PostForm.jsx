import { React } from "react";
import MyButton from "./UI/button/MyButton.jsx";
import MyInput from "./UI/input/MyInput.jsx";
import { useState } from "react";

const PostForm = ({ create }) => {
  const [post, setPost] = useState({ title: "", body: "" });

  //---------------------------------------------
  const addNewPost = (e) => {
    e.preventDefault();
    //console.log(newPost);
    const newPost = {
      ...post,
      id: Date.now(),
    };

    create(newPost);

    setPost({ title: "", body: "" });
  };
  //----------------------------------------------
  return (
    <>
      <form>
        <MyInput
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          type="text"
          placeholder="Post Name"
        />

        <MyInput
          value={post.body}
          onChange={(e) => setPost({ ...post, body: e.target.value })}
          type="text"
          placeholder="Post Description"
        />
        <MyButton onClick={addNewPost}>Create Post</MyButton>
      </form>
    </>
  );
};

export default PostForm;
