"use client";

import {withAuthenticator, WithAuthenticatorProps} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import styles from './page.module.css'
import Navbar from "@/components/Navbar";

function Home({ signOut, user }: WithAuthenticatorProps) {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1>Hello, {user?.username || "friend"} 👋</h1>
        <button onClick={signOut}>Sign out</button>
      </div>
    </main>
  )
}

export default withAuthenticator(Home);
