import { useSession, signIn, signOut } from "next-auth/react";
import styles from "./Navbar.module.css";

export const Navbar = () => {
  const { data: session } = useSession();
  if (session) {
    console.log(session!.user!.image);
  }

  const login = () => {
    signIn();
  };

  const logout = () => {
    signOut();
  };

  return (
    <header className={styles.navbar}>
      <span className={styles.logo}>🦸 Hero Image Uploader</span>
      {session ? (
        <div className={styles.user}>
          <span className={styles.username}>{session.user!.name}</span>
          <button className={styles.logoutBtn} onClick={logout}>
            Logout
          </button>
        </div>
      ) : (
        <button className={styles.loginBtn} onClick={login}>
          Login
        </button>
      )}
    </header>
  );
};
