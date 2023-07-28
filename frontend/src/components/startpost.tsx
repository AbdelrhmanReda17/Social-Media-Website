import { useAuthContext } from "../hooks/userAuthContext";
const StartPost = (props : any) =>{
    const { user } = useAuthContext();

    return (
        <div className="BAR">
        <img src= {user.photoURL || "AR.jpg"} alt="UserPhoto" />
        <button className="PostBtn" onClick={props.changeDoPost}>
            Start a Post
        </button>
    </div>
    )
}

export default StartPost;