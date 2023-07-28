import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const {  error , isLoading ,login } = useLogin();
  // Define the validation schema for the form fields
  const schema = yup.object().shape({
    password: yup.string().required("You must add a password"),
    email: yup.string().required("You must add an email").email("Invalid email format"),
  });

  // Initialize the react-hook-form
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  // Handle form submission
  const onSubmit = async (data : any) => {
    await login(data.email , data.password);
  };

  return (
    <div>
      <h1>Login</h1>
      <form className="login" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="RL">Email:</label>
          <input className="RL" type="text" {...register("email")} />
        </div>

        <div>
          <label className="RL">Password:</label>
          <input className="RL" type="password" {...register("password")} />
        </div>
        <button  disabled={isLoading} className="RL" type="submit">Login</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default Login;
