import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useRegister } from "../hooks/useRegister";

const Register = () => {
  const [ image , setImage ] = useState<any>("");
  const {signup , error ,isLoading} = useRegister();
  const schema = yup.object().shape({
    username: yup.string().required("You must add a username"),
    password: yup.string().required("You must add a password"),
    email: yup.string().required("You must add an email"),
    photo: yup.mixed().notRequired().test("is-image", "File must be an image", (value : any) => {
      if (value && value[0]) {
        return value[0].type.startsWith("image/");
      }
      return true; 
    }),
  });

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data : any) => {
    await signup(data.email , data.password ,  image , data.username );
  };
  const ConverttoBase64 = (e : any) =>{
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () =>{
      setImage(reader.result); // Image ..
    }
    reader.onerror = () => {
      console.log("Error reading");
    }
  }
  return (
    <div>
      <h1>Register</h1>
      <form  className="register"  onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="RL">Username:</label>
          <input className="RL" type="text" {...register("username")} />
        </div>

        <div>
          <label className="RL">Password:</label>
          <input type="password" {...register("password")} />
        </div>

        <div>
          <label className="RL">Email:</label>
          <input className="RL" type="text" {...register("email")} />
        </div>

        <div>
          <label className="RL">Upload Photo:</label>
          <input className="RL" type="file" {...register("photo")} accept="image/*" onChange={ConverttoBase64}/>
        </div>
        <button disabled={isLoading} className="RL" type="submit">Register</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default Register;
