import { createContext, useEffect, useState } from "react";
import { CreatePost } from "../components/createpost";
import { POST } from "../components/post";
import { useAuthContext } from "../hooks/userAuthContext";

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
export interface Like {
  _id: string
  userId: string
  postId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface Comment {
  _id: string
  userId: string
  postId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface FULLPOST {
  post: Post;
  likes: Like[];
  comments : Comment[];
}
const Main = () => {
  const [PostsList, setPostsList] = useState<FULLPOST[] | null>(null);
  const { user } = useAuthContext();
  useEffect(() => {
    const fetchPostsAndLikes = async () => {
      try {
        const PostsRes = await fetch('/posts' , { headers : {'Authorization': `Bearer ${user.token}`}});
        const posts: Post[] = await PostsRes.json();
        const fullPostsData: FULLPOST[] = [];
        for (const post of posts) {
          const LikeRes = await fetch(`Likes/${post._id}` , { headers : {'Authorization': `Bearer ${user.token}`}} );
          const likes: Like[] = await LikeRes.json();
          const CommentRes = await fetch(`Comments/${post._id}` , { headers : {'Authorization': `Bearer ${user.token}`}} );
          const comments: Comment[] = await CommentRes.json();
          fullPostsData.push({ post, likes , comments});
        }
        setPostsList(fullPostsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    if(user){
        fetchPostsAndLikes();
    }    
  }, []);


  return (
    <div className="Main-Container">
      <div>
      </div>
      <div className="Middle-Container">
        <AppContext.Provider value={{ PostsList, setPostsList }} >
          <CreatePost />
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