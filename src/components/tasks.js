// export const tasks = [
    
// {
//     id: 0,
//     title: 'Example note one',
//     description: 'Welcome to Journal Note 💗 Here I describe my first note'
// },
// {
//     id: 1,
//     title: 'Example note two',
//     description: 'Welcome to Journal Note 💗 Here I describe my second note'
// },



export const getNote = async (journal) => {

    // const idNote = localStorage.getItem('idNote')
    // console.log({idNote}, '*******')
    
    try {
        const docRef = doc(db, 'notes', idNote)
        const docSnap = await getDoc(docRef)
        setJournal(docSnap.data()) //Generar variable para almacenar los datos de Firestore para referenciarlo en el estado
        console.log ({journal});
    } catch (error) {
        console.log(error);
    }
}

// useEffect(() => {
//     if (editNote !== '') {
//        /*const preGetNote = */getNote(editNote)
//     //    console.log (preGetNote);
//     }
// }, [editNote])
