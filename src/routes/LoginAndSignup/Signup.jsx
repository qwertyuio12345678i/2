import { useState } from 'react';
import { User } from '../../utils/Validation';
import { Api } from '../../utils/DataLoader';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setSecConfirm] = useState('');
  const [errors, setErrors] = useState(null);

  const navigate = useNavigate();

  const handleSignUp = () => {
    try {
      const user = User.parse({
        email,
        password,
        confirm,
        date: Date.now(),
      });

      console.log('new user: ', user);

      navigate('/');
      if (password === confirm) {
        Api.setUser({ user });
        setErrors(null);
      } else setErrors({ confirm: "Passwords don't match" });
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors(err.format());
        console.log(err.format());
      }
    }
  };

  console.log(errors);

  return (
    <div className="prose flex flex-col gap-5 mx-auto">
      <h1>Sign up</h1>
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
      <input
        type="password"
        placeholder="Reapeat password"
        value={confirm}
        onChange={(e) => setSecConfirm(e.target.value)}
      />

      <button onClick={handleSignUp}>Sign up</button>

      <div className="h-15 mb-4">
        {errors?.password &&
          errors.password._errors.map((err) => {
            return <div className="text-red-500">{err}</div>;
          })}
      </div>
    </div>
  );
}

export default Signup;
