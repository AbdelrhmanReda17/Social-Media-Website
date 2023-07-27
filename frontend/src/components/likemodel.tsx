import { LikeContext } from "./post";
import { useContext } from 'react';
import { LikeComp } from "./Like"


export const ShowLikes = () => {
  const { ShowLikes , pts } = useContext(LikeContext);

  return (
    <div className="Likes"
      onClick={(event) => {
        if (event.target === document.getElementsByClassName("Likes")[0]) {
            ShowLikes();
        }
      }}
    >
      <div className="Likes__window">
        <div className="Post__info Likes__Info">
          {pts.likes.length !== 0 ? <span className="Post__title">{pts.post.username}'S Post Likes</span> :   <span className="NO-LIKES"> No Likes</span> }
        </div>
        <div className="Likes_Content">
        <LikeComp likedUsers={pts.likes}/>
        </div>
      </div>
    </div>
  );
}
