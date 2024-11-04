//? Taking Reference of elements

const addNotesBtn = document.querySelector(".button-text");
const notesSections = document.querySelector(".allNotes-section");

//? functions

//* adding notes to local storage
const addToLocalStorage = () => {
  const textarea = document.querySelectorAll("textarea");
  // console.log(textarea);

  const allNotes = [];
  textarea.forEach((currNote) => {
    allNotes.push(currNote.value);
  });

  localStorage.setItem("myNotes", JSON.stringify(allNotes));
};

const notesContainer = (text = "") => {
  const noteDiv = document.createElement("div");
  noteDiv.classList.add("notes");
  noteDiv.innerHTML = `
  				<div class="edit_delete_wrapper">
                    <button class="edit" title= "Click Me"><i class="fas fa-edit"></i></button>
                    <button class="delete" title= "Delete Notes"><i class="fas fa-trash-alt"></i></button>
                </div>
					  
                <div class="actual-notes ${text ? "" : "hidden"} "></div>
                <textarea cols="40" rows="10" class = "${
                  text ? "hidden" : ""
                }" ></textarea>  `;

  notesSections.appendChild(noteDiv);

  //! Taking References of elements inside 'noteDiv' => here, all elements we are adding using 'innerHTML' so, we are not write "document"
  const deleteBtn = noteDiv.querySelector(".delete");
  const editBtn = noteDiv.querySelector(".edit");
  const actualNotes = noteDiv.querySelector(".actual-notes");
  const textArea = noteDiv.querySelector("textarea");

  //* Deleting individual notes
  deleteBtn.addEventListener("click", () => {
    noteDiv.remove();
    // update ls when we delete
    addToLocalStorage();
  });

  //* edit notes
  editBtn.addEventListener("click", () => {
    actualNotes.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });

  //! This will used when we get local storage data
  textArea.value = text;
  actualNotes.innerHTML = text.replace(/\n/g, "<br>");

  //* When we click on edit button then our text will also disappear. So,
  textArea.addEventListener("change", (e) => {
    let value = e.target.value;
    actualNotes.innerHTML = value.replace(/\n/g, "<br>");

    addToLocalStorage();
  });
};

//* getting local storage notes
const lsNotes = JSON.parse(localStorage.getItem("myNotes"));

if (lsNotes) {
  lsNotes.forEach((notesText) => notesContainer(notesText));
}

//? Applying event(s)

addNotesBtn.addEventListener("click", () => notesContainer());
