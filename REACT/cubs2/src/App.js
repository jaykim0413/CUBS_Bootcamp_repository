import './App.css';
import { useState, useEffect } from 'react'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, push, onValue, remove, set } from "firebase/database";
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
// const analytics = getAnalytics(app);

function App() {

  // INPUT BOX - ADDING A NEW TASK
  const [task, setTask] = useState("");

  // LIST
  const [tasks, setTasks] = useState([]);

  //INPUT BOX - UPDATING THE TASK
  const [newTask, setNewTask] = useState("");

  // ID OF THE TASK BEING UPDATED
  const [updateTaskID, setUpdateTaskID] = useState("");

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
        setTasks(taskArray);
      })
  }, [])

  function addTask(event) {
    const db_ref = ref(database, "/tasks");
    push(db_ref,{
      title: task
    });
  }

  function handleDelete(id) {
    // Delete Item with ID
    const db_ref = ref(database,`/tasks/${id}`);
    remove(db_ref);
  }

  function handleUpdate(id) {
    setUpdateTaskID(id);
  }

  function handleChange(id, newTitle) {
    const db_ref = ref(database,`/tasks/${id}`);
    set(db_ref,{
      title: newTitle
    });
    setUpdateTaskID("");
  }

  return (
    <>
      <div className="App">
        <h1> TO DO List </h1>
        <input type ="text" onChange = {(event)=> {
          setTask(event.target.value);
        }} value = {task}/>
        <button onClick = {addTask}>Add Task</button>
        <ul>
          {tasks.map(task => {
              return (
                <li key={task.id}>
                  {task.title}
                  {
                    updateTaskID === task.id ?
                    <div>
                      <input type="text" value = {newTask} onChange={function(event) {
                        handleChange(task.id,event.target.value);
                      }}/>
                      <button onClick={function() {
                        setUpdateTaskID("");
                      }}> Cancel </button>
                    </div>
                    :
                    <div>
                      <button onClick={function() {
                        handleUpdate(task.id);
                      }}> Update </button>
                      <button onClick={function() {
                        handleDelete(task.id);
                      }}> Delete </button>
                    </div>
                  }
                </li>
              )
          })}
        </ul>
      </div>
    </>
  );
}

export default App;
