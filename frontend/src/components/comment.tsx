import { useContext, useEffect, useState } from "react";
import { useAuthContext } from "../hooks/userAuthContext";
import { AppContext, Comment as CommentInterface, FULLPOST } from "../pages/main";
import { CommentContext, getTimeDifferenceFromNow } from "./post";

function getCurrentDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const milliseconds = String(now.getMilliseconds()).padStart(3, '0');
  const timezoneOffset = -now.getTimezoneOffset() / 60;
  const timezoneOffsetString = `${timezoneOffset >= 0 ? '+' : '-'}${String(Math.abs(timezoneOffset)).padStart(2, '0')}:00`;

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}${timezoneOffsetString}`;
}

export const Comment = () => {
  const { ShowComments, pts } = useContext(CommentContext);
  const { PostsList, setPostsList } = useContext(AppContext);

  const [Users, setUsers] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [CommentText, setCommentText] = useState<string>("");
  const { user } = useAuthContext();

  const UpdateText = (event: any) => {
    setCommentText(event.target.value);
  };

  useEffect(() => {
    const GetUsers = async () => {
      // Check if props.likedUsers has some elements
      if (pts.comments.length > 0) {
        try {
          // Map the likedUsers array to an array of promises
          const fetchPromises = pts.comments.map(async (comment: CommentInterface) => {
            const response = await fetch(`/users/${comment.userId}`, { headers: { 'Authorization': `Bearer ${user.token}` } });
            if (response.ok) {
              const Luser = await response.json();
              return Luser;
            } else {
              console.error("Error:", response.status, response.statusText);
              return null;
            }
          });
          const fetchedUsers = await Promise.all(fetchPromises);
          const filteredUsers = fetchedUsers.filter(user => user !== null);
          setUsers((prevUsers: any) => (!prevUsers ? filteredUsers : [...filteredUsers, ...prevUsers]));
        } catch (err) {
          console.error("Error:");
        }
      }
    };
    GetUsers();
    setIsLoading(false);
  }, [pts.comments, user.token]);
  const SubmitComment = async () => {
    try {
      const newComment = {
        postId: pts.post._id,
        userId: user._id,
        content: CommentText,
      };
      try {
        console.log("AR")
        const Cres = await fetch('/comments/',
          {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(newComment)
          }
        );
        const NewS = await Cres.json();
        const updatedPostsList = PostsList.map((post: FULLPOST) => {
          if (post.post._id === pts.post._id) {
            return { ...post, likes: post.likes, comments: [...post.comments, NewS] };
          }
          return post;
        });
        setPostsList(updatedPostsList);
        console.log(PostsList, NewS);
      } catch (err) {
        console.log(err);
      }
      setCommentText("");
    } catch (error) {
      console.log("AR");
    }
  };
  return (
    <>
      <div className="Post-Comments">
        <div className="div1">
          <img src="AR.jpg" alt="ARAR" />
        </div>
        <div className="div2">
          <input
            className="Post-CommentTxt"
            type="text"
            placeholder=" Add a Comment"
            value={CommentText}
            onChange={(event) => { UpdateText(event) }}
          />
        </div>
        <div className="div3">
          {CommentText && <button onClick={SubmitComment}>Post</button>}
        </div>
      </div>
      {!isLoading && (
        <div className="Post-AllComments">
          {Users?.map((commentUser: any, index: number) => {
              const comment = pts.comments[index];
              return (
                <>
                  {comment &&
                    <>
                      <div className="Comment-Photo">
                        <img src={commentUser?.user.photoURL || "AR.jpg"} alt="ARAR" />
                      </div>
                      <div className="Comment-Details">
                        <div className="Comment-D1">
                          <span className="Comment-User">
                            {commentUser?.user.username}
                          </span>
                          <span className="Comment-Time">{getTimeDifferenceFromNow(comment.createdAt)}</span>
                        </div>
                        <div className="Comment-D2">
                          <span className="Comment-Info">{comment.content}</span>
                        </div>
                      </div>
                    </>
                  }
                </>
              );
          })}
        </div>
      )}
    </>
  );
}
