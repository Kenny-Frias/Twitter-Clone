import React from 'react';
import Header from "@/components/layout/Header";
import Feed from '../components/Feed';
import { getProviders, getSession, useSession } from "next-auth/react";
import Login from "../components/Login";

export default function Home({ trendingResults, followResults, providers }) {

  //easiest way to check if someone is signed in: using a useSession() React Hook 
  const { data: session } = useSession()
  if (!session) return <Login providers={providers} />;

  return (
   <div>
    <>
      <Header label='Home' />
      <Feed />
    </>
   </div>
  )
}

 export async function getServerSideProps(context) {
  //  const trendingResults = await fetch("https://jsonkeeper.com/b/NKEV").then(
  //    (res) => res.json()
  // );
  //  const followResults = await fetch("https://jsonkeeper.com/b/WWMJ").then(
  //    (res) => res.json()
  //  );
   const providers = await getProviders();
   const session = await getSession(context);

  return {
     props: {
      //  trendingResults,
      //  followResults,
       providers,
       session,
     },
   };
 }