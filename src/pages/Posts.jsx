import { useState, useEffect, useRef } from "react";

import "../styles/App.css";
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";

import PostFilter from "../components/PostFilter";
import MyModal from "../components/UI/MyModal/MyModal";
import MyButton from "../components/UI/button/MyButton";
import { usePosts } from "../hooks/usePosts.js";
import PostService from "../API/PostService.js";
import { useFetching } from "../hooks/useFetching.js";
import { getPageCount } from "../utils/pages.js";
import Pagination from "../components/UI/pagination/Pagination.jsx";

// https://jsonplaceholder.typicode.com/
// https://jsonplaceholder.typicode.com/posts
function Posts() {
  const [posts, setPosts] = useState([
    { id: 1, title: "AJavaScript", body: "ADescription" },
    { id: 2, title: "BPython", body: "CDescription Python" },
    { id: 3, title: "CKotlin", body: "BKotlin" },
  ]);

  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPages] = useState(1);
  const lastElement = useRef();
  const observer = useRef();
  console.log(lastElement);

  //--------------------------------------

  // ------- axios----------------------
  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data]);
    const totalCount = response.headers["x-total-count"];
    setTotalPages(getPageCount(totalCount, limit));
  });
  //-----pagination useEffect------------------------
  useEffect(() => {
    if (isPostsLoading) return; //we stop loading new observers (new posts)
    if (observer.current) observer.current.disconnect(); //if observer was created
    // we need to turn off the obrerving for new elements
    var callback = function (entries, observer) {
      //-------------
      if (entries[0].isIntersecting && page < totalPages) {
        //console.log("div for pagination here");
        setPages(page + 1);
      }
    };

    observer.current = new IntersectionObserver(callback);
    observer.current.observe(lastElement.current);
  }, [isPostsLoading]);

  //------useEffect-----------------
  useEffect(() => {
    console.log("USE EFFECT");
    fetchPosts();
  }, [page]);

  //----------------------------------------
  // const bodyInputRef = useRef();
  //--------create Post-------------------
  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };
  //---------remove Post------------------------------
  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };
  //--------------------------------------------------
  const changePage = (page) => {
    setPages(page);
  };
  //--------------------------------------------------
  return (
    <>
      <button onClick={fetchPosts}>GET POSTS</button>
      <MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>
        Create Post
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: "15px 0" }} />
      <div>
        <PostFilter filter={filter} setFilter={setFilter} />
      </div>
      {postError && <h1>Error is ocurred:{postError}</h1>}
      <PostList
        remove={removePost}
        posts={sortedAndSearchedPosts}
        title="Posts 2025"
      />
      <div ref={lastElement} style={{ height: 20, background: "red" }}></div>
      {isPostsLoading && <h1>Loading....</h1>}

      <Pagination page={page} changePage={changePage} totalPages={totalPages} />
    </>
  );
}

export default Posts;
