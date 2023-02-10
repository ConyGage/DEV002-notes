import { useAuth } from "../context/authContext";
import { TaskList } from './TaskList';
import { TaskForm } from './TaskForm';
import { tasks as data } from './tasks';
import { useState, useEffect } from 'react';
import "./css-components/home.css";
import {getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoc} from "firebase/firestore";
import { app } from "../Firebase";

const db = getFirestore(app)

export function Home() {
    const { user, logout, loading } = useAuth()
    const [tasks, setTasks] = useState([])
    useEffect(() => {
        setTasks(data)
    }, []
    )
    function createNote(task) {
        setTasks([...tasks, {
            title: task.title,
            id: tasks.length,
            description: task.description
        }])
        try {
            const saveNotes = addDoc(collection(db, "notes"), {
                title: task.title,
                id: tasks.length,
                description: task.description
            });
          
            saveNotes;
            console.log();
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }

    // function saveNotes (tasks) {
    //         addDoc(collection(db, "notes"), {
    //             ...tasks
    //         });
    //         console.log(tasks.title, tasks.id, tasks.description);
    // }
    

    function deleteNote(taskId) {
        setTasks(tasks.filter(task => task.id !== taskId))
    }

    const handledLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error(error);
        }
    };
    if (loading) return <h2>Loading</h2>
    return <div>
        <div className="dad-logout">
            <button onClick={handledLogout} className="btn-logout" >Logout</button>
        </div>

        <h1 className="title-page">💗✨Welcome to Journal Note✨💗
            <br />
            {user.displayName || user.email}</h1>
        <h2 className="subtitle-page">Remember this is important to you !</h2>


        <TaskForm createNote={createNote} />
        <div className="container-notes">
            <TaskList tasks={tasks} deleteNote={deleteNote} />


        </div>
    </div>
}



