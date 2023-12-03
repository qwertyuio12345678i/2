import { useContext, useState } from "react";
import { User } from "../../utils/Validation";
import { z } from "zod";
import { UserContext } from "../../components/UserContextProvider";
import { Navigate, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);

  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    try {
      User.parse({
        email,
        password,
        confirm: password,
        date: Date.now(),
      });

      const query = new URLSearchParams({
        email,
        password,
      }).toString();

      fetch(`http://localhost:5001/users?${query}`)
        .then((r) => r.json())
        .then((users) => users[0])
        .then((user) => {
          if (user) {
            userContext.onChange(user);
            console.log(userContext);
            navigate("/home");
          } else setErrors({ user: "Invalid user" });
        })
        .catch((err) => {
          console.log(err);
        });
      setErrors(null);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors(err.format());
        console.log(err.format());
      }
    }
  };

  return (
    <div className="prose flex flex-col gap-5 mx-auto">
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {errors?.email && (
        <div className="text-red-500">{errors.email._errors}</div>
      )}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
      {errors?.user && <div className="text-red-500">{errors.user}</div>}
      <div className="h-15 mb-4">
        {errors?.password &&
          errors.password._errors.map((err) => {
            return <div className="text-red-500">{err}</div>;
          })}
      </div>
    </div>
  );
}

export default Login;

{
  /* 
      {errors?.password && (
        <div className="text-red-500">{errors.password._errors}</div>
      )} 
      */
}

// const user = {
//   email,
//   password,
//   createdAt: Date.now(),
// };
