"use client";
import axios, { AxiosError } from "axios";
import { useRouter } from 'next/navigation';
import styles from './api/auth/login/Login.module.css'; 


export default function Home() {
  const { push } = useRouter();

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const payload = {
      username: event.currentTarget.username.value, 
      password: event.currentTarget.password.value,
    };
    try {
      const { data } = await axios.post("/api/auth/login", payload)
      alert(JSON.stringify(data));

      push("/pokedex")

    } catch(e) {
      const error = e as AxiosError
      alert(error.message);
    }
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="username" className={styles.label}>
          Username:
        </label>
        <input
          type="text"
          id="username"
          className={styles.input}
        />

        <label htmlFor="password" className={styles.label}>
          Password:
        </label>
        <input
          type="password"
          id="password"
          className={styles.input}
        />

        <button type="submit" className={styles.button}>
          Submit
        </button>
      </form>
    </div>
  )
}