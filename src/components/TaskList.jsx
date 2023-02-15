import { useContext } from 'react';
import { NoteCard } from './NoteCard'
import { NoteContext } from '../context/NoteContext';

export function TaskList() {

    const { journals } = useContext(NoteContext)

    if (journals.length === 0) {
        return <h1>NO HAY TAREAS AUN</h1>
    }
console.log(journals)


    return (
        <>{
            journals.length >=1 && journals.map((journal) => (
                <NoteCard key={journal.id} journal={journal} />
            ))}
        </>
    );
}