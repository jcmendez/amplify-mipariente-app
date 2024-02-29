import Navbar from '@/components/Navbar';
import { fetchAuthSession } from 'aws-amplify/auth';

async function currentSession() {
  try {
    const { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {};
    return {
      accessToken: accessToken,
      idToken: idToken,
      user: idToken?.payload.email ?? idToken?.payload.sub ?? undefined,
      expires: idToken?.payload.exp * 1000 ?? undefined,
      isAuthenticated: !!accessToken && !!idToken && !!idToken.payload.email && !!idToken.payload.sub && !!idToken
    }
  } catch (err) {
    console.log(err);
  }
}
export default async function Nav() {
  const session = await currentSession();
  return <Navbar user={session?.user} />;
}