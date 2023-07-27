import { createContext, useEffect, useState } from "react";
import { CreatePost } from "../components/createpost";
import { POST } from "../components/post";

export const AppContext = createContext<any>(0);

interface Post {
  _id: string
  content: string;
  userId: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
interface Like {
  _id: string
  userId: string
  postId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface FULLPOST {
  post: Post;
  likes: Like[];
}
const Main = () => {
  const [PostsList, setPostsList] = useState<FULLPOST[] | null>(null);
  
  useEffect(() => {
    const fetchPostsAndLikes = async () => {
      try {
        const PostsRes = await fetch('/posts');
        const posts: Post[] = await PostsRes.json();
        const fullPostsData: { post: Post, likes: Like[] }[] = [];
        for (const post of posts) {
          const LikeRes = await fetch(`Likes/${post._id}`);
          const likes: Like[] = await LikeRes.json();
          fullPostsData.push({ post, likes });
        }
        setPostsList(fullPostsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchPostsAndLikes();
  }, []);

  return (
    <div className="Main-Container">
      <div>
      </div>
      <div className="Middle-Container">
        <CreatePost />
        <AppContext.Provider value={{ PostsList, setPostsList }} >
          <div className="Posts-Container">
            {PostsList?.map((pts) => {
              return <POST pts={pts} />
            })}
          </div>
        </AppContext.Provider>
      </div>
      <div>
      </div>
    </div>
  );
};

export default Main;