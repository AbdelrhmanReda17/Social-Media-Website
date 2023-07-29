import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { AppContext, FULLPOST } from "../pages/main";
import { ShowLikes as ShowLikesModel } from "./likemodel";
import { useAuthContext } from "../hooks/userAuthContext";
import { Comment as CommentComponent } from "./comment";
import  UpdateComponent from './updatepost';

interface Props {
  pts: FULLPOST;
}

interface State {
  ViewLikes: boolean;
  ViewComments: boolean;
}

interface Action {
  type: string;
}

export function getTimeDifferenceFromNow(dateStr: string): string {
  if (!dateStr) {
    return 'Invalid date format';
  }
  const date = new Date(dateStr);
  const now = new Date();
  const timeDiffInMilliseconds = now.getTime() - date.getTime();
  const secondsDiff = Math.floor(timeDiffInMilliseconds / 1000);
  const minutesDiff = Math.floor(secondsDiff / 60);
  const hoursDiff = Math.floor(minutesDiff / 60);
  const daysDiff = Math.floor(hoursDiff / 24);
  const weeksDiff = Math.floor(daysDiff / 7);
  const pluralize = (value: number, unit: string) => value + unit + ' ';
  if (secondsDiff < 60) {
    return pluralize(secondsDiff, ' sec ago');
  } else if (minutesDiff < 60) {
    return pluralize(minutesDiff, ' m ago');
  } else if (hoursDiff < 24) {
    return pluralize(hoursDiff, ' h ago');
  } else if (daysDiff < 7) {
    return pluralize(daysDiff, ' d ago');
  } else if (weeksDiff < 52) {
    return pluralize(weeksDiff, ' w ago');
  } else {
    const yearsDiff = Math.floor(daysDiff / 365);
    return pluralize(yearsDiff, ' y ago');
  }
}


const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SHOW_LIKES":
      return { ...state, ViewLikes: !state.ViewLikes };
    case "SHOW_COMMENTS":
      return { ...state, ViewComments: !state.ViewComments };
    default:
      return state;
  }
}
export const LikeContext = createContext<any>(0);
export const CommentContext = createContext<any>(0);

export const POST = (props: Props) => {
  const { user } = useAuthContext();
  const [ PostUser , setPostUser ] = useState<any> ();
  const [ isUpdatePost , setIsUpdatePost ] = useState<boolean> (false);

  const { PostsList, setPostsList , MyPosts } = useContext(AppContext);  
  const { pts } = props;
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`users/${pts.post.userId}`, { headers: { 'Authorization': `Bearer ${user.token}` } });
        if (response.ok) {
          const user = await response.json();
          return user;
        } else {
          console.error("Error:", response.status, response.statusText);
          return null;
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        return null;
      }
    };
  
    const getUserData = async () => {
      const user = await fetchUser();
      if (user) {
        setPostUser(user);
      }
    };
  
    getUserData();
  }, [user.token, setPostUser, pts.post.userId ]);
  const [state, dispatch] = useReducer(reducer, { ViewLikes: false, ViewComments: false });
  const addLike = async () => {
    try {
      await fetch('/likes/',
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          },
          body: JSON.stringify({ userId: `${user._id}`, postId: pts.post._id })
        }
      );
      const updatedPostsList = PostsList.map((post: FULLPOST) => {
        if (post.post._id === pts.post._id) {
          const newLike = { userId: `${user._id}`, postId: post.post._id };
          return { ...post, likes: [...post.likes, newLike] };
        }
        return post;
      });
      setPostsList(updatedPostsList);
    } catch (err) {
      console.log(err);
    }
  };
  const hasUserLiked = pts.likes?.find((like) => like.userId === `${user._id}`);

  const removeLike = async () => {
    try {
      const data = {
        userId: `${user._id}`,
        postId: pts.post._id,
      };
      await fetch('/likes/',
      {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(data)
      }
    );
      // Remove Like Form PostLists
      setPostsList(() =>
        PostsList.map((post: FULLPOST) => {
          if (post.post._id === pts.post._id) {
            const updatedLikes = post.likes.filter(
              (like) => like.userId !== data.userId || like.postId !== data.postId
            );
            return { ...post, likes: updatedLikes };
          }
          return post;
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const deletePost = async () =>{
    try {
      await fetch(`/posts/${pts.post._id}`,
      {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
      }
    );
      setPostsList((prevPostsList : any) =>
        prevPostsList.filter((post: FULLPOST) => post.post._id !== pts.post._id)
      );
    } catch (err) {
      console.log(err);
    }
  }

  const updatePost = async () =>{
    setIsUpdatePost(!isUpdatePost);
  }
  const ShowLikes = () => {
    dispatch({ type: "SHOW_LIKES" });
  }

  const ShowComments = () => {
    dispatch({ type: "SHOW_COMMENTS" });
  }
  
  return (
    <>
      <LikeContext.Provider value={{ ShowLikes, pts }}>
        {state.ViewLikes && <ShowLikesModel />}
      </LikeContext.Provider>
      <div className="Post-Container">
        <div className="Post-Info">
          <img src={PostUser?.user.photoURL || "user.png"} alt="ARAR" />
          <div className="Post-InfoTexts">
            <p className="first">{pts.post.username}</p>
            <p className="last">
            {getTimeDifferenceFromNow(pts.post.createdAt)}
            {pts.post.createdAt !== pts.post.updatedAt && " - Edited"}
        </p>          
        </div>
          {
            pts.post.userId === user._id && MyPosts ? (
              <div className="Post-btns">
                <button className="Post-delete" onClick={updatePost}> Edit </button>
                <button className="Post-delete" onClick={deletePost}> &times; </button>
                {isUpdatePost && <UpdateComponent updatePost={updatePost} post={pts.post} setPostsList={setPostsList} /> }
              </div>
            ) : null
          }
        </div>
        <div className="Post-Content">
          <div className="Post-Description"><span className="Post-Text"> {pts.post.content} </span></div>
          <div className="Post-Details">
            <button className="Post-ViewBtns" onClick={ShowLikes} > {pts.likes.length} Likes</button>
            <button className="Post-ViewBtns" onClick={ShowComments} > {pts.comments.length} Comments</button>
          </div>
          <div className="Post-Buttons">
            <button onClick={!hasUserLiked ? addLike : removeLike} > {!hasUserLiked ? <>&#128077;</> : <>&#128078;</>}</button>
            <button > Comments </button>
          </div>
        </div>
        <CommentContext.Provider value={{ ShowComments, pts }} >
           {state.ViewComments && <CommentComponent />}
        </CommentContext.Provider>
        
      </div>
    </>
  );
}

