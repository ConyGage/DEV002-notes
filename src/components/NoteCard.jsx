import "./css-components/NoteCard.css";
import { deleteDoc, doc, setDoc, collection } from "firebase/firestore";
import { db } from "./Home";
import { useState, useEffect } from "react";

// Función de borrado--------------------------------------------------------
 const deleteNote = async (id) => {
    const deleteId = id.toString()
    await deleteDoc(doc(db, "notes", deleteId));

}

// Función de Editar-----------------------------------------------------------

const [editNote, setEditNote] = useState('')
const getNote = async (journal) => {
    try {
        console.log(id)
        const docRef = doc(db, 'notes', journal.id)
        const docSnap = await getDoc(docRef)
        createNote(docSnap.data())
    } catch (error) {
        // console.log(error);
    }
}

useEffect(() => {
    if (editNote !== '') {
        getNote(editNote)
    }
}, [editNote])

export function NoteCard({ task}) {

    return (

        <>
            <div className="container-all">
                <div className="container-note">
                    <h2 className="card-title">{task.title} </h2>
                    <p className="nc-description">{task.description} </p>
                    <div className="dad-delete">
                        <i onClick={() => editNote(task.id)} className="material-icons">edit</i>
                        <i onClick={() => deleteNote(task.id)} className="material-icons">delete</i>
                    </div>
                </div>
            </div>
        </>
    );
}
