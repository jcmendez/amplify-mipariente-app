"use client";

import Navbar from '@/components/Navbar';
import { getCurrentUser } from 'aws-amplify/auth';

export default function Nav() {
  return getCurrentUser().then(function (auth) {
    console.log(`The username: ${auth.username}`);
    console.log(`The userId: ${auth.userId}`);
    console.log(`The signInDetails: ${auth.signInDetails}`);
    return <Navbar user={auth.username}/>;
  }).catch(function () {
    console.error("Unable to getCurrentUser")
    return <Navbar user={undefined}/>;
  })
}