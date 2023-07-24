import Layout from '../components/Layout'
import '@/styles/globals.css'
import { RecoilRoot } from "recoil";

import { SessionProvider } from "next-auth/react"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    //next auth session
    <SessionProvider session={session}>
      {/* applies global useState effect */}
      <RecoilRoot>
      <Layout >
        <Component {...pageProps} />
      </Layout>
      </RecoilRoot>
    </SessionProvider>
  )
}
