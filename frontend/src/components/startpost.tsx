const StartPost = (props : any) =>{
    return (
        <div className="BAR">
        <img src="AR.jpg" alt="UserPhoto" />
        <button className="PostBtn" onClick={props.changeDoPost}>
            Start a Post
        </button>
    </div>
    )
}

export default StartPost;