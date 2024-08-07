/* eslint-disable react-refresh/only-export-components */
import { useState } from "react";
import { addPosts, getPostCount, getPosts, getTags } from "../api/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import add_post from "../redux/actions/posts";

const Posts = ({ add_post, myPost }) => {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts", { page }],
    queryFn: () => getPosts(page),
    staleTime: 1000 * 60 * 1,
  });

  console.log(myPost);
  const { mutate } = useMutation({
    mutationKey: "addPost",
    mutationFn: addPosts,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
  const submitForm = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const title = form.get("title");
    const tag = Array.from(form.keys()).filter((key) => key !== "title");
    mutate({ id: myPost?.count + 1, title: title, tags: [tag] });
    e.target.reset();
  };

  const { data: tags, isLoading: isTagsLoading } = useQuery({
    queryKey: ["tags"],
    queryFn: getTags,
    staleTime: Infinity,
  });

  const { data: count } = useQuery({
    queryKey: ["postsCount"],
    queryFn: getPostCount,
  });
  console.log(count);
  const payLoad = {
    posts,
    count,
  };
  add_post(payLoad);
  return (
    <div>
      <form onSubmit={submitForm}>
        <input type="text" name="title" />
        {!isTagsLoading &&
          tags.map((tag) => {
            return (
              <div key={tag}>
                <input type="checkbox" name={tag} id={tag} /> {tag}
              </div>
            );
          })}

        <input type="submit" value="Submit Form" />
      </form>
      <div>
        <button
          onClick={() => {
            setPage((n) => n - 1);
          }}
        >
          Prev. Page
        </button>
        <span>page :{page}</span>
        <button
          onClick={() => {
            setPage((n) => n + 1);
          }}
        >
          Next Page
        </button>
      </div>
      {!isLoading &&
        posts?.map((posts) => {
          return (
            <div key={posts.id}>
              {posts.title} tags :{" "}
              {posts.tags.map((tags) => {
                return tags + " ";
              })}
            </div>
          );
        })}
    </div>
  );
};

Posts.propTypes = {
  add_post: PropTypes.any,
  myPost: PropTypes.any,
};
const mapStateToProps = (state) => {
  return { myPost: state.PostsReducer };
};
const mapDispatchToProps = (dispatch) => ({
  add_post: (post) => dispatch(add_post(post)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
