export const LikeComp = (props: any) => {
    return (
      <>
        {(
          props.likedUsers?.map((Like: any) => (
            <div >
              <img src="AR.jpg"alt="ARAR" />
              <span className="Likes_Mader">Abdelrhman Reda</span>
            </div>
          ))
        )
        }
      </>
    );
};
  