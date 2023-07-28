import { Like, } from "../pages/main";
import { useAuthContext } from "../hooks/userAuthContext";
import { useEffect, useState } from "react";

export const LikeComp = (props: any) => {
  const [Users, setUsers] = useState<any>([]);
  const { user } = useAuthContext();
  
  useEffect(() => {
    const GetUsers = async () => {
      // Check if props.likedUsers has some elements
      if (props.likedUsers.length > 0) {
        try {
          // Map the likedUsers array to an array of promises
          const fetchPromises = props.likedUsers.map(async (like: Like) => {
            const response = await fetch(`users/${like.userId}`, { headers: { 'Authorization': `Bearer ${user.token}` } });
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
          setUsers((prevUsers : any) => (!prevUsers ? filteredUsers : [...filteredUsers, ...prevUsers]));
        } catch (err) {
          console.error("Error:");
        }
      }
    };
    GetUsers();
  }, []);
  console.log(Users)
  return (
    <>
      {(
        Users?.map((User: any) => (
          <div >
            <img src={User.user.photoURL || "AR.jpg"} alt="ARAR" />
            <span className="Likes_Mader">{User.user.username}</span>
          </div>
        ))
      )
      }
    </>
  );
};
