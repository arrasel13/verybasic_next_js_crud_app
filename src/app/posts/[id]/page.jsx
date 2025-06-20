export const getSinglePost = async (post_id) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${post_id}`
  );
  const data = await res.json();
  return data;
};

export const generateMetadata = async ({ params }) => {
  const post = await getSinglePost(params.id);
  return {
    title: post.title,
  };
};

const SinglePost = async ({ params }) => {
  const p = await params;
  const singlePost = await getSinglePost(p.id);

  return (
    <div>
      <h2>Title: {singlePost.title}</h2>
      <p>Description: {singlePost.body}</p>
    </div>
  );
};

export default SinglePost;
