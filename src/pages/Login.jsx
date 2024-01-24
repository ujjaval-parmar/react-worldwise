import { useEffect, useState } from "react";
import styles from "./Login.module.css";

import NavBar from '../Components/NavBar';
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../Components/Button";
import { useAuth } from "../contexts/FackAuth";

export default function Login() {

  const navigate = useNavigate();

  const { login, isAuthenticated } = useAuth();

  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("ujjaval@example.com");
  const [password, setPassword] = useState("qwerty");

  function handleSubmit(e) {
    e.preventDefault();

    if (email && password)
      login(email, password);

  }

  useEffect(()=>{
    if(isAuthenticated) navigate('/app', { replace: true});
  }, [isAuthenticated, navigate]);

  return (
    <main className={styles.login}>

      <NavBar />

      <form className={styles.form} onSubmit={e => handleSubmit(e)}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type='primary'>Login</Button>
        </div>
      </form>
    </main>
  );
}
