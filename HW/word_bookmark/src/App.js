import './App.css';
import { useState, useEffect } from 'react'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getDatabase, onValue, remove, set, ref, push } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAj9nhRvCOxXbBSGHWDLqe5ewcsafxeI0w",
  authDomain: "bookmark-homework.firebaseapp.com",
  databaseURL: "https://bookmark-homework-default-rtdb.firebaseio.com",
  projectId: "bookmark-homework",
  storageBucket: "bookmark-homework.appspot.com",
  messagingSenderId: "558147488912",
  appId: "1:558147488912:web:fc974beba8ab245bc4dc15",
  measurementId: "G-MWVN1X9JWZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const database = getDatabase(app);

function App() {

  // INPUT BOX - ADDING A NEW WORD
  const [word, setWord] = useState("");

  // LIST
  const [words, setWords] = useState([]);

  //INPUT BOX - UPDATING THE WORD
  const [newWord, setNewWord] = useState("");

  // ID OF THE WORD BEING UPDATED
  const [updateWordID, setUpdateWordID] = useState("");

  useEffect(() => {
    const db_ref = ref(database,"/words");
    onValue(db_ref,(snapshot) => {
      console.log("snapshot", snapshot);
      console.log("value", snapshot.val());
      const data = snapshot.val();
      const wordArray = [];
        for (let id in data) {
          wordArray.push({ id, ...data[id] })
        }
        console.log ("wordArray", wordArray);
        setWords(wordArray);
      })
  }, [])

  function addWord(event) {
    const db_ref = ref(database, "/words");
    push(db_ref,{
      title: word
    });
  }

  function handleDelete(id) {
    // Delete Item with ID
    const db_ref = ref(database,`/words/${id}`);
    remove(db_ref);
  }

  function handleUpdate(id) {
    setUpdateWordID(id);
  }

  function handleChange(id, newTitle) {
    const db_ref = ref(database,`/words/${id}`);
    set(db_ref,{
      title: newTitle
    });
    setUpdateWordID("");
  }

  return (
    <>
      <div className='titleArea'>
        <h1 className="title"> Word Bookmark </h1>
      </div>
      <div className='inputArea'>
        <input className="inputBox1" type ="text" onChange = {(event)=> {
          setWord(event.target.value);
        }} value = {word}/>
        <button onClick = {addWord}>Add Word</button>
        <ol className='bookmarkList'>
          {words.map(word => {
              return (
                <li key={word.id} className='bookmarkedItem'>
                  {word.title}
                  {
                    updateWordID === word.id ?
                    <div>
                      <input type="text" value = {newWord} onChange={function(event) {
                        handleChange(word.id,event.target.value);
                      }} className='inputBox2'/>
                      <button onClick={function() {
                        setUpdateWordID("");
                      }} className='cancel'> Cancel </button>
                    </div>
                    :
                    <div>
                      <button onClick={function() {
                        handleUpdate(word.id);
                      }} className='update'> Update </button>
                      <button onClick={function() {
                        handleDelete(word.id);
                      }} className='delete'> Delete </button>
                    </div>
                  }
                </li>
              )
          })}
        </ol>
      </div>
    </>
  );
}

export default App;
