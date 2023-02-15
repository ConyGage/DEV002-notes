import { createContext, useState, useEffect } from "react";
import { getFirestore, collection, addDoc, onSnapshot, doc, getDoc, deleteDoc } from "firebase/firestore";


export const db = getFirestore();

export const NoteContext = createContext();

export function NoteContextProvider(props) {
    const [journals, setJournals] = useState([])
    const [journal, setJournal] = useState([])
    const [title, setTitle] = useState(journals?.title || '');
    const [description, setDescription] = useState(journals?.description || '');

console.log(journals)
    useEffect(() => {
        onSnapshot(collection(db, "notes"), (querySnapshot) => { //ordenarle en fecha tal vez sort(...data)
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({ ...doc.data(), id: doc.id });
            });
            setJournals(docs);
            console.log({docs});

        })

    }, []
    )

    // Función para Crear Nota-------------------------

    function createNote(journal) {
        
        try {
            addDoc(collection(db, "notes"), {
                title: journal.title,
                description: journal.description
            });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }


    // Función de borrado--------------------------------------------------------

    const deleteNote = async (id) => {
        const deleteId = id.toString()
        await deleteDoc(doc(db, "notes", deleteId));
    }

    // Función de Editar-----------------------------------------------------------

    const [editNote, setEditNote] = useState('')
    

    // Renderizado------------------------------

    return (
        <NoteContext.Provider
            value={{
                journals,
                deleteNote,
                createNote,
                editNote,
                setEditNote,
                title,
                setTitle,
                description,
                setDescription
            }}>
            {props.children}
        </NoteContext.Provider >
    );

}