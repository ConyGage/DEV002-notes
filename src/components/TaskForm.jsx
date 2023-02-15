import { useContext, useEffect } from "react";
import "./css-components/taskForm.css";
import { NoteContext } from "../context/NoteContext";

export function TaskForm() {

    const { createNote, journals, title, setTitle, description, setDescription, editNote, setEditNote } = useContext(NoteContext)
    console.log(journals);


    console.log(journals);

    const handleSubmit = (e) => {
        e.preventDefault();
        createNote({
            title,
            description
        });

        setTitle("")
        setDescription("")
    };

    useEffect(() => {
        if (editNote) { console.log(editNote, "useEffect") } // Con este useEffect alterar-actualizar el state de title y description
    }, [editNote])

    // console.log(editNote, "editNote")
    // console.log(setEditNote, "setEditNote")

    return (

        <form onSubmit={handleSubmit} className="box">
            <input placeholder="Write your title note"
                onChange={(e) => setTitle(e.target.value)} // Cambiar onChange por onBlur
                value={title} className="container-title"
                autoFocus
            />
            <div className="text-description">
                <textarea placeholder="Describes your note"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description} className="container-description"></textarea>
                <div className="dad-save">
                    <i className="material-icons">add</i>
                    <button className="btn-save">
                        Save
                    </button>
                </div>
            </div>
        </form>

    );
}