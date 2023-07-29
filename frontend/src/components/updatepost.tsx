import React, { useRef, useState } from "react";
import { useAuthContext } from "../hooks/userAuthContext";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { FieldError } from "react-hook-form";

interface createFormData {
    content: string
}

export const UpdateComponent = (props : any) => {
    const formInput = useRef(null);
    const { user } = useAuthContext();
    const [isUpdatePost , setIsUpdatePost] = useState<Boolean>(true);
    const schema = yup.object().shape({
        content: yup.string().required("You must add a content"),
    });

    const { register, handleSubmit, reset, setError ,formState: { errors }, } = useForm<createFormData>({
        resolver: yupResolver(schema),
    });
    
    const submitPost = async (post : any, data : string) => {
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
        try {
            const updatedPost = { ...post, content: data }; // Merge the new content with the existing post data
            const response = await fetch(`/posts/${post._id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(updatedPost)
            });
    
            if (!response.ok) {
                console.error("Error updating post:", response.status, response.statusText);
                return;
            }
                props.setPostsList((prevPostsList : any) => {
                return prevPostsList.map( (prevPost : any) => {
                    if (prevPost.post._id === post._id) {
                        return { ...prevPost, post: updatedPost };
                    }
                    return prevPost;
                });
            });
        } catch (error) {
            console.error("Error fetching Posts:", error);
        }
    };
    const updatePost = async (data : createFormData) => {
        try {
            await submitPost(props.post, data.content);
            setIsUpdatePost(!isUpdatePost);
        } catch (error) {
            console.error("Error updating post:", error);
        }
    };
    return (
        <div>
            {isUpdatePost &&
            <form className="Post" ref={formInput} 
                onClick={(event) => {
                        if (event.target === formInput.current) {
                            props.updatePost();
                        }
                }} 
                onSubmit={handleSubmit(updatePost)}
                >
                <div className="Post__window">
                    <div className="Post__info">
                        {errors.content && <p style={{ color: 'red' }}>{errors.content.message} </p>}
                        <img className="Post_img" src={user.photoURL} alt="ar" />
                        <span className="Post__title">Edit a Post</span>
                        <button className="Post__close" onClick={ () => props.updatePost()}> &times; </button>

                    </div>
                    <div className="Post__content">
                    <textarea
                            id="textArea"
                            defaultValue={props.post.content}
                            {...register("content")}
                        />
                    </div>
                    <div className="Post__buttons">
                        <input
                            className="Post__button Post__button--ok Post__button--fill"
                            type="submit"
                            value="Update"
                            />
                    </div>
                </div>
            </form>}    
        </div>
    );
};

// Exporting as default to be used in other components
export default UpdateComponent;
