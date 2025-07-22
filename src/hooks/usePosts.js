import { useMemo } from "react";

// sort post depend of sorting
export const useSortedPosts = (posts, sort) => {
  const sortedPosts = useMemo(() => {
    if (sort) {
      return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]));
    }

    return posts;
  }, [sort, posts]);

  return sortedPosts;
};

//---------filter post by query-------------------------
export const usePosts = (posts, sort, query) => {
  const sortedPosts = useSortedPosts(posts, sort);
  const sortedandSearchedPosts = useMemo(() => {
    return sortedPosts.filter((post) =>
      post.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, sortedPosts]);
  return sortedandSearchedPosts;
};

/**
 //-----sorted Posts with ceshing------------------------------
  const sortedPosts = useMemo(() => {
    console.log("we invoked  func getSorted");
    if (filter.sort) {
      return [...posts].sort((a, b) =>
        a[filter.sort].localeCompare(b[filter.sort])
      );
    }
    return posts;
  }, [filter.sort, posts]);

  //--------querying and sorting---------------------------
  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter((post) =>
      post.title.toLocaleLowerCase().includes(filter.query)
    );
  }, [filter.query, sortedPosts]);

 */
