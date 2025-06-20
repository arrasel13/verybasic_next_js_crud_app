import Link from "next/link";
import style from "./post.module.css";

export const getPosts = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();
  return data;
};

export const metadata = {
  title: "All Posts",
  description: "Loading JSON placeholder posts",
};

const Posts = async () => {
  const posts = await getPosts();
  return (
    <div className="grid grid-cols-4 gap-4">
      {posts.map((post) => (
        <div key={post.id}>
          <h2 className={`${style["post-title"]}`}>{post.title}</h2>
          <p className="testing-purpose-css-class">{post.body}</p>
          <Link href={`/posts/${post.id}`}>
            <button className="btn px-5 py-3 bg-blue-500 text-white rounded-lg cursor-pointer">
              Details
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Posts;
