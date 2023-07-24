import { db } from "../firebase";
 import Post from "./Post";
import { useSession } from "next-auth/react";
import Input from "./Input";
import { onSnapshot, collection, query, orderBy } from "@firebase/firestore";
import { useEffect, useState } from "react";

function Feed() {

  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);


  useEffect(
    () =>
      onSnapshot(
        //Displaying posts from latest to oldest by using the timestamp associated with each post
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),
    [db]
  );


  return (
    <div>
  
    <Input />
    <div className="pb-72">
      {/* Map through all posts. Each post has an id associated with them.  */}
        {posts.map((post) => (
          <Post key={post.id} id={post.id} post={post.data()} />
        ))}
      </div>
  </div>
);
}


export default Feed