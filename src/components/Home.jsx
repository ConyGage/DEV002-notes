import { useAuth } from "../context/authContext";
import { TaskList } from './TaskList';
import { TaskForm } from './TaskForm';
import { useState, useEffect } from 'react';
import "./css-components/home.css";
import { getFirestore, collection, addDoc, onSnapshot, doc, getDoc } from "firebase/firestore";
import { app } from "../Firebase";

export const db = getFirestore(app)
// import { async } from "@firebase/util";
// import { tasks as data } from './tasks';
// Función-Componente Home (página principal)

export function Home() {

    // Usos del Estado--------------------------------------------

    const { user, logout, loading } = useAuth()
    const [tasks, setTasks] = useState([])
    const [editNote, setEditNote] = useState('')

    useEffect(() => {
        onSnapshot(collection(db, "notes"), (querySnapshot) => { //ordenarle en fecha tal vez sort(...data)
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({ ...doc.data(), id: doc.id });
            });
            setTasks(docs);
            // console.log(doc.id);

        })

    }, []
    )

    // Función para Crear Nota-------------------------

    function createNote(task) {
        try {
            addDoc(collection(db, "notes"), {
                title: task.title,
                id: tasks.length,
                description: task.description
            });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    // Función de Editar-----------------------------------------------------------

    const getNote = async (id) => {
        try {
            console.log(id)
            const docRef = doc(db, 'notes', id)
            const docSnap = await getDoc(docRef)
            setTasks(docSnap.data())
        } catch (error) {
            console.log(error);
        }

        console.log(id)
    }

    useEffect(() => {
        if (editNote !== '') {
            getNote(editNote)
        }
    }, [editNote])

    // Logueo---------------------------

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
            <TaskList tasks={tasks} setEditNote={setEditNote} />


        </div>
    </div>
}

    // function deleteNote(noteId) {
    //     deleteDoc(doc(db, "notes", noteId))
    //     setTasks()
    // }
    // console.log(deleteNote);


    // function deleteNote(taskId) {
    //     setTasks(tasks.filter(task => task.id !== taskId))
    // }
