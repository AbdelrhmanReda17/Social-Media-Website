import { useState } from "react";
import { useAuthContext } from "../hooks/userAuthContext";

const ChoosePosts = (props: any) => {
    const { user } = useAuthContext();
    const [selectedOption, setSelectedOption] = useState<String>("for-you");

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
        console.log(selectedOption)
        if(selectedOption === "for-you"){
            props.setMyPosts(true);
            console.log("AR")
        }else{
            props.setMyPosts(false);
        }
    }
    return (
        <form className="CheckboxBar">
            <div>
                <input
                    type="radio"
                    id="for-you"
                    name="post-type"
                    value="for-you"
                    checked={selectedOption === "for-you"}
                    onChange={handleRadioChange}
                />
                <label htmlFor="for-you">All Posts</label>
            </div>
            <div>
                <input
                    type="radio"
                    id="myposts"
                    name="post-type"
                    value="myposts"
                    checked={selectedOption === "myposts"}
                    onChange={handleRadioChange}
                />
                <label htmlFor="myposts">My Posts</label>
            </div>

        </form>
    );
};

export default ChoosePosts;
