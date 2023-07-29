import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useContext, useRef, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import StartPost from "./startpost";
import { useAuthContext } from "../hooks/userAuthContext";
import { FieldError } from "react-hook-form";
import { AppContext , Comment, Like } from "../pages/main";
import ChoosePosts from "./chspost";

interface createFormData {
    content: string
}

export const CreatePost = () => {
    const { user } = useAuthContext();
    const formInput = useRef(null);
    const { PostsList, setPostsList , MyPosts ,setMyPosts , isLoading } = useContext(AppContext);

    const schema = yup.object().shape({
        content: yup.string().required("You must add a content"),
    });

    const { register, handleSubmit, reset, setError ,formState: { errors }, } = useForm<createFormData>({
        resolver: yupResolver(schema),
    });

    const [doPost, setDoPost] = useState(false);

    const changeDoPost = () => {
        reset();
        setDoPost(!doPost);
    };
    const submitPost = async (data: createFormData) => {
        if (!user) {
            if (!errors.content) {
              errors.content = {} as FieldError;
            }
            setError("content", {
                type: "manual",
                message: "You must be logged in",
            });
            return;
        }
        reset();
        try {
            const NPOST = await fetch("/posts", {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify( {
                        content: data.content,
                        userId: `${user._id}`,
                        username: `${user.username}`,
                } )
              });
            const createdPost = await NPOST.json();
            setPostsList((prevPostsList : any) => [{ post: createdPost.NewPost, likes: [] as Like[] , comments: [] as Comment[] } , ...prevPostsList ]);
        } catch (error) {
            console.error("Error fetching Posts:", error);
        }
        changeDoPost();            

    }

    return (
        <div>
            <ChoosePosts MyPosts={MyPosts} setMyPosts={setMyPosts} isLoading={isLoading} />
            <StartPost changeDoPost={changeDoPost} />
            {doPost && (
                <form
                    className="Post"
                    onSubmit={handleSubmit(submitPost)}
                    ref={formInput}
                    onClick={(event) => {
                        if (event.target === formInput.current) {
                            changeDoPost();
                        }
                    }}
                >
                    <div className="Post__window">
                        <div className="Post__info">
                            {errors.content && <p style={{ color: 'red' }}>{errors.content.message} </p>}
                            < img className="Post_img" src= {user.photoURL || "AR.jpg"} alt="ar" />
                            <span className="Post__title">Create a Post</span>
                            <button className="Post__close" onClick={changeDoPost}> &times; </button>
                        </div>
                        <div className="Post__content">
                            <textarea
                                id="textArea"
                                placeholder="What do you want to talk about?"
                                {...register("content")}
                            />
                        </div>
                        <div className="Post__buttons">
                            <input
                                className="Post__button Post__button--ok Post__button--fill"
                                type="submit"
                                placeholder="AR"
                            />
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
};
