"use client";

import {withAuthenticator, WithAuthenticatorProps} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import styles from './page.module.css'
import config from "@/amplifyconfiguration.json";
import {Amplify} from "aws-amplify";
import ParienteList from "@/components/ParienteList";

Amplify.configure(config, {ssr: true});

function Home({ signOut, user }: WithAuthenticatorProps) {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1>Hello, {user?.username || "friend"} 👋</h1>
        <ParienteList />
        <button onClick={signOut}>Sign out</button>
      </div>
    </main>
  )
}

export default withAuthenticator(Home);
