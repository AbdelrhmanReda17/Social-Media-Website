import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useRef, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import StartPost from "./startpost";

interface createFormData {
    content: string
}

export const CreatePost = () => {

    const formInput = useRef(null);

    const schema = yup.object().shape({
        content: yup.string().required("You must add a content"),
    });

    const { register, handleSubmit, reset, formState: { errors }, } = useForm<createFormData>({
        resolver: yupResolver(schema),
    });

    const [doPost, setDoPost] = useState(false);

    const changeDoPost = () => {
        reset();
        setDoPost(!doPost);
    };

    const submitPost = async (data : createFormData) =>{
        reset();
        const newPost = {
          content: data.content,
          userId: "1",
          username: "Abdelrhman Reda",
        };
        try{
            await axios.post('/posts/', newPost);
        }catch(error){
            console.error("Error fetching Posts:", error);
        }
    }

    return (
        <div>
            <StartPost changeDoPost = {changeDoPost} / >
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
                            < img className="Post_img" src="AR.jpg"alt="ar" />
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
