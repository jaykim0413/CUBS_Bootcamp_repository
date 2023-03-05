import './App.css';
import { useState, useEffect } from 'react'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, push, onValue } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKeyPG6TEglMuH8Wp_vl6ZbwWqvv4ogUs",
  authDomain: "fir-demo-9647e.firebaseapp.com",
  databaseURL: "https://fir-demo-9647e-default-rtdb.firebaseio.com",
  projectId: "fir-demo-9647e",
  storageBucket: "fir-demo-9647e.appspot.com",
  messagingSenderId: "285065775372",
  appId: "1:285065775372:web:161c7dd387a1dc43f2a129",
  measurementId: "G-49HB7LQ9E6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const analytics = getAnalytics(app);

function App() {

  const [task, setTask] = useState("");

  useEffect(() => {
    const db_ref = ref(database,"/tasks");
    onValue(db_ref,(snapshot) => {
      console.log("snapshot", snapshot);
      console.log("value", snapshot.val());
      const data = snapshot.val();
      const taskArray = [];
        for (let id in data) {
          taskArray.push({ id, ...data[id] })
        }
        console.log ("taskArray", taskArray);
        setTask(taskArray);
      })
  }, [])

  function addTask(event) {
    const db_ref = ref(database, "/tasks");
    push(db_ref,{
      title: task
    });
  }

  return (
    <div className="App">
      <h1> TO DO List </h1>
      <input type ="text" onChange = {(event)=> {
        setTask(event.target.value);
      }} value = {task}/>
      <button onClick = {addTask}>Add Task</button>
      <ul>
        {task.map(task => {
            return (
              <li>
                {task.title}
              </li>
            )
        })}
      </ul>
    </div>
  );
}

export default App;
