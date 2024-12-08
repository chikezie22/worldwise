import { replace, useNavigate } from "react-router-dom";
import PageNav from "../components/PageNav";
import { useAuth } from "../context/FakeAuth";
import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import Button from "../components/Button";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    isAuthenticated ? navigate("/app", { replace: true }) : null;
  }, [isAuthenticated, navigate]);

  // this path is for handling authentication
  const handleAuthentication = (e) => {
    e.preventDefault();
    if (email && password) login(email, password);
  };

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleAuthentication}>
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
          {/* <button type="submit">Login</button> */}
          <Button type={"primary"}>Login</Button>
        </div>
      </form>
    </main>
  );
}
