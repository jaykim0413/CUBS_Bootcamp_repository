import "./App.css";
import { useState, useEffect } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, push, onValue } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTEbkC2VgXXNGFe5-oY3ShhRuNak60dsI",
  authDomain: "fir-demo-53373.firebaseapp.com",
  projectId: "fir-demo-53373",
  storageBucket: "fir-demo-53373.appspot.com",
  messagingSenderId: "973341453311",
  appId: "1:973341453311:web:0fea9a644efd5526dc95ca",
  measurementId: "G-FPGP4EPE1V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const analytics = getAnalytics(app);


function MyHeader(props) {
  return (
    <div>
      <h1>
        <a onClick={ function(event) {
          props.onClickFunction();
        }} href='https://openai.com/blog/chatgpt/'> { props.title } </a>
      </h1>
    </div>
  );
}
// target={"_blank"} href= { topic.link }
function MyNavbar(props) {
  const li_array = [];
  for (let i = 0; i < props.topics.length; i++) {
    const topic = props.topics[i];
    li_array.push(<li key={ topic.id }><a href= { topic.link } onClick={function(event) {
      props.onClickFunction(topic.title);
    }}> { topic.title } </a></li>)
  }
  return (
    <div>
      <ol>
        { li_array }
      </ol>
    </div>
  );
}

function MySection(props) {
  return (
    <div>
      <h2> { props.title } </h2>
      <p> { props.body } </p>
    </div>
  );
}

const App = () => {
  const topics = [
    {id : 1, title : "HTML", link : "https://www.w3schools.com/html/default.asp"},
    {id : 2, title : "CSS", link : "https://www.w3schools.com/css/default.asp"},
    {id : 3, title : "JavaScript", link : "https://www.w3schools.com/js/default.asp"}
  ];

  const [task, setTask] = useState("");

  useEffect(() => {
    const db_ref = ref(database,"/tasks");
    onValue(db_ref,(snapshot) => {

    })
  })

  function addTask(event) {
    event.preventDefault();
    const db_ref = ref(database, "/tasks");
    push(db_ref,{
      title: task
    });
  }
  return (
    <>
      <div className="App">
        <MyHeader title ="What You Need for Web Development" onClickFunction={function() {
          alert();
        }}></MyHeader>
        <MyNavbar topics = {topics} onClickFunction={function(title) {
          alert(title);
        }}></MyNavbar>
        <MySection title="..." body="..."></MySection>
      </div>
      <div>
        <h1> TO DO List </h1>
        <input type ="text" onChange = {(event)=> {
          setTask(event.target.value);
        }} value = {task}/>
        <button onClick = {addTask}>Add Task</button>
      </div>
    </>
  );
}

export default App;