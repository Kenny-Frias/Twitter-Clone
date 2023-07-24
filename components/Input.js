
import { useRef, useState } from "react";
import {
    CalendarIcon,
    ChartBarIcon,
    PhotographIcon,
    XIcon,
  } from "@heroicons/react/outline";

  import { db, storage } from "../firebase";
  import {
    addDoc,
    collection,
    doc,
    serverTimestamp,
    updateDoc,
  } from "@firebase/firestore";
  //in built firebase functions that improve efficiency 
  import { getDownloadURL, ref, uploadString } from "@firebase/storage";
  import { useSession } from "next-auth/react";
function Input() {
    const { data: session } = useSession();
    //functions to be used for tweet functionality 
    const [input, setInput] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const filePickerRef = useRef(null);

    const [loading, setLoading] = useState(false);
    //when using await, need to use an async function
    const sendPost = async () => {
        //if loading, do nothing
        if (loading) return;
        setLoading(true);
        
        //Inside of firestore, create document to a collection called "posts",
        // and then add post info 

        //TODO: ADD USER INTERESTS AS SOMETHING THAT IS LOGGED 
        //Empty variable for interests. As user interacts with posts, huggingface determines what 
        //interest a post falls under. After interacting with 5 posts, only similar posts will be displayed. 
        
        const docRef = await addDoc(collection(db, "posts"), {
             id: session.user.uid,
             username: session.user.name,
             userImg: session.user.image,
             tag: session.user.tag,
            text: input,
            timestamp: serverTimestamp(),
          });

          //storage reference to upload image associated with post. 
          //Each image is stored under unique path based on the posts id. 
          const imageRef = ref(storage, `posts/${docRef.id}/image`);

          if (selectedFile) {
            await uploadString(imageRef, selectedFile, "data_url").then(async () => {

              const downloadURL = await getDownloadURL(imageRef);

              await updateDoc(doc(db, "posts", docRef.id), {

                image: downloadURL,

              });
            });
          }
          //after upload, reset tweet 
          setLoading(false);
          setInput("");
          setSelectedFile(null);

        };
        //uses FileReader API to read an inputted file, and then selects the file and
        // retrieves it as a data URL to then display it on the user interface 
        // using the selectedFile function 
         const addImageToPost = (e) => {
       
        const reader = new FileReader();

        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }

        reader.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target.result);
        };
    };
    
  return (
    //opacity changes when loading post 
    <div className={`border-b border-gray-700 p-3 flex space-x-3 ${
        loading && "opacity-60"
      }`}
      >
        {/* USER IMAGE */}
        <img
        src={session.user.image}
        alt=""
        className="h-11 w-11 rounded-full cursor-pointer"
        
      />
        <div className="divide-y divide-gray-700 w-full">
            {/* when img is selected, spacing is increased to make distance between text+img */}
            <div className={`${selectedFile && 'pb-7'} ${input && 'space-y-2.5'}`}>
                <textarea 
                value={input} 
                rows='2'
                //everytime you type something, it changes the input 
                onChange={(e) => setInput(e.target.value)}
                placeholder="What's happening?"
                className="bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full min-h-[50px]"
                />
                {/* icons+functionality for tweet functionality. Div only displayed when selected file is there.  */}
                {selectedFile && (
                      <div className="relative">
                      <div className="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer"
                      onClick={() => setSelectedFile(null)} >
                    <XIcon className='text-white h-5' />
                      </div>
                      <img 
                        src={selectedFile} 
                        alt="" 
                        className="rounded-2xl max-h-80 object-contain"
                      />
                  </div>
                )}
            </div>
            {/* div to display icons. When loading, they go away. */}
            {!loading && (
                <div className="flex items-center justify-between pt-2.5">
                <div className="flex items-center">
                    <div className="icon"
                    // the filePicker will occur with the icon, not default file picker
                    onClick={() => filePickerRef.current.click()}>
                        <PhotographIcon className="text-[#1d9bf0] h-[22px]" />
                        
                        <input type='file' 
                        hidden
                        onChange={addImageToPost} 
                        ref={filePickerRef}
                        />
                    </div>

                        <div className="icon rotate-90">
                            <ChartBarIcon className="text-[#1d9bf0] h-[22px]" />
                        </div>
                       
                        
                        <div className="icon">
                            <CalendarIcon className="text-[#1d9bf0] h-[22px]" />
                        </div>
                </div>
                <button
              className="bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 
              font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] 
              disabled:opacity-50 disabled:cursor-default"
              //button is disabled when there is no text. When disabled, 
              //the disabled css is applied to the button. .Trim keeps it disabled with spaces
              disabled={!input.trim() && !selectedFile}
              onClick={sendPost}
            >
              Tweet
            </button>
            </div>
            )}
        </div>
    </div>
  );
}

export default Input;