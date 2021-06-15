const addButton = document.querySelector('#add');

const updateLSData = () => {
    const textAreaData = document.querySelectorAll('textarea');
    const notes= [];

    textAreaData.forEach((note) => {
        return notes.push(note.value);
    });
    // console.log(notes);
    localStorage.setItem('notes',JSON.stringify(notes));
}

const addNewNote = (text = " ") => {
    const note = document.createElement('div');
    note.classList.add('note');

    const htmlData = `
    <div class="operation tools">
    <button class="edit"><i class=" fas fa-edit"></i></button>
    <button class="delet"><i class=" fas fa-trash-alt"></i></button>
    </div>
    <div class="main ${text ? " " : "hidden"}"></div>
    <textarea class=" ${text ? "hidden" :  " "} "></textarea>`;
    note.insertAdjacentHTML('afterbegin',htmlData);
    // console.log(note);

    //getting the reference 
    const editButton = note.querySelector('.edit');
    const delButton = note.querySelector('.delet');
    const mainDiv = note.querySelector('.main');
    const textarea = note.querySelector('textarea');

    //deleting note
    delButton.addEventListener('click', () => {
        note.remove();
        updateLSData();
    });

    //toggle using edit 
    textarea.value = text;
    mainDiv.innerHTML = text;

     //edit note 
    editButton.addEventListener('click',() => {
        mainDiv.classList.toggle('hidden');
        textarea.classList.toggle('hidden');
    });

    textarea.addEventListener('change',(event)=> {
        const value = event.target.value;
        mainDiv.innerHTML= value;
        updateLSData();
    });

    document.body.appendChild(note);
};
//getting back the data from localstorage 
const notes = JSON.parse(localStorage.getItem('notes'));
if(notes){
    notes.forEach((note) => addNewNote(note));
};
 

addButton.addEventListener('click',()=> addNewNote() );