const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const readInput = document.getElementById("read");

const submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", isValidCheck);

const randomColor = Math.floor(Math.random() * 16777215).toString(16);
// document.getElementsByClassName('card').style.backgroundColor = '#' + randomColor;
// submitButton.addEventListener('click', submit);

function isValidCheck() {
  checkNotEmpty();
  checkIsNumber();
  if (valid === "yyyy") {
    submit();
  } else return;
}

const reg = /^[0-9]*$/;

let valid = "";
function checkNotEmpty() {
  valid = "";
  if (titleInput.value === "") {
    titleInput.setCustomValidity("Cannot be left blank");
    titleInput.classList.add("error");
    document.getElementById("title-label").classList.add("error-msg");
    valid += "n";
  } else {
    titleInput.setCustomValidity("");
    titleInput.classList.remove("error");
    document.getElementById("title-label").classList.remove("error-msg");
    valid += "y";
  }
  if (authorInput.value == "") {
    authorInput.setCustomValidity("Cannot be left blank");
    authorInput.classList.add("error");
    document.getElementById("author-label").classList.add("error-msg");
    valid += "n";
  } else {
    authorInput.setCustomValidity("");
    authorInput.classList.remove("error");
    document.getElementById("author-label").classList.remove("error-msg");
    valid += "y";
  }
  if (pagesInput.value == "") {
    pagesInput.setCustomValidity("Cannot be left blank");
    pagesInput.classList.add("error");
    document.getElementById("pages-label").classList.add("error-msg");
    valid += "n";
  } else {
    pagesInput.setCustomValidity("");
    pagesInput.classList.remove("error");
    document.getElementById("pages-label").classList.remove("error-msg");
    valid += "y";
  }
}

function checkIsNumber() {
  if (!reg.test(+pagesInput.value)) {
    pagesInput.setCustomValidity("Must be a number");
    pagesInput.classList.add("error");
    document.getElementById("pages-label").classList.add("num-msg");
    valid += "n";
  } else {
    pagesInput.setCustomValidity("");
    pagesInput.classList.remove("error");
    document.getElementById("pages-label").classList.remove("num-msg");
    valid += "y";
  }
}

let myLibrary = [];

function submit() {
  let createdBook = new Book(
    `${titleInput.value}`,
    `${authorInput.value}`,
    `${pagesInput.value}`,
    `${readInput.checked}`
  );
  if (createdBook.read === "true") {
    createdBook.read = "Read";
  } else if (createdBook.read === "false") {
    createdBook.read = "Not yet read";
  }
  createdBook.pages += " pages";
  myLibrary.push(createdBook);
  addBookToLibrary();
}

// function Book(title, author, pages, read) {
//   this.title = title;
//   this.author = author;
//   this.pages = pages;
//   this.read = read;
// }

class Book {
  // refactored from constructor function
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggleReadStatus() {
    // Toggle switch functionality
    const id = this.id;
    const thisCard = document.querySelector(`[data-index-number="${id}"]`);
    if (myLibrary[`${id - 1}`].read === "Read") {
      myLibrary[`${id - 1}`].read = "Not yet read"; // Changes it in "myLibrary"
      thisCard.querySelector(" :nth-child(4)").textContent = "Not yet read"; // Changes it on the DOM
    } else if (myLibrary[`${id - 1}`].read === "Not yet read") {
      myLibrary[`${id - 1}`].read = "Read";
      thisCard.querySelector(" :nth-child(4)").textContent = "Read";
    }
    metrics();
  }

  removeFromLibrary() {
    const id = this.id;
    const thisCard = document.querySelector(`[data-index-number="${id}"]`);
    thisCard.remove();
    // myLibrary.splice(id - 1, 1);
    delete myLibrary[id - 1]; // NOTE: "delete" causes undefined holes in myLibrary array, but it is currently the best way to maintain linkage of DOM element index ID and array placement values.
    metrics();
  }
}

// Book.prototype.toggleReadStatus = function () {
//   // Toggle switch functionality
//   const id = this.id;
//   const thisCard = document.querySelector(`[data-index-number="${id}"]`);
//   if (myLibrary[`${id - 1}`].read === "Read") {
//     myLibrary[`${id - 1}`].read = "Not yet read"; // Changes it in "myLibrary"
//     thisCard.querySelector(" :nth-child(4)").textContent = "Not yet read"; // Changes it on the DOM
//   } else if (myLibrary[`${id - 1}`].read === "Not yet read") {
//     myLibrary[`${id - 1}`].read = "Read";
//     thisCard.querySelector(" :nth-child(4)").textContent = "Read";
//   }
//   metrics();
// };

// Book.prototype.removeFromLibrary = function () {
//   const id = this.id;
//   const thisCard = document.querySelector(`[data-index-number="${id}"]`);
//   thisCard.remove();
//   // myLibrary.splice(id - 1, 1);
//   delete myLibrary[id - 1]; // NOTE: "delete" causes undefined holes in myLibrary array, but it is currently the best way to maintain linkage of DOM element index ID and array placement values.
//   metrics();
// };

function addBookToLibrary() {
  const book = myLibrary[myLibrary.length - 1]; //Selects the last book added to the library
  let card = document.createElement("div");
  card.classList.add("card");
  for (prop in book) {
    if (book.hasOwnProperty(prop)) {
      // creates a list of text nodes for each property of the book
      const newPara = document.createElement("p");
      const propTextNode = document.createTextNode(`${book[prop]}`);
      newPara.appendChild(propTextNode);
      card.appendChild(newPara);
    }
  }
  // Adds the "read toggle"
  const toggle = document.createElement("label");
  toggle.classList.add("switch");
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("readToggle");
  checkbox.id = myLibrary.length;
  checkbox.addEventListener("change", book.toggleReadStatus);
  if (book.read === "Read") {
    checkbox.checked = true;
  }
  const slider = document.createElement("span");
  slider.classList.add("slider", "round");
  const span = document.createElement("span");
  checkbox.appendChild(span);
  toggle.appendChild(checkbox);
  toggle.appendChild(slider);
  card.appendChild(toggle);
  // Adds "remove from library" button
  const remove = document.createElement("button");
  remove.textContent = "Remove";
  remove.classList.add("removeBtn");
  remove.id = myLibrary.length;
  remove.addEventListener("click", book.removeFromLibrary);
  card.appendChild(remove);
  // Adds finished card to the library display
  const container = document.getElementById("card-container");
  // const randomColor = Math.floor(Math.random()*16777215).toString(16);
  // card.style.backgroundColor = '#' + randomColor;
  container.appendChild(card);
  card.dataset.indexNumber = myLibrary.length;
  metrics();
}

function metrics() {
  const booksRead = document.getElementById("books-read");
  const pagesRead = document.getElementById("pages-read");
  const readNumber = myLibrary.filter((book) => {
    return book.read === "Read";
  });
  booksRead.textContent = "Books read: " + readNumber.length;
  let sum = 0;
  for (let i = 0; i < readNumber.length; i++) {
    const book = readNumber[i];
    let pages = +book.pages.slice(0, -6);
    sum += pages;
  }
  pagesRead.textContent = "Total pages read: " + sum;
}

let theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", "295 pages", "Read");
myLibrary.push(theHobbit);
addBookToLibrary();

let warAndPeace = new Book(
  "War and Peace",
  "Leo Tolstoy",
  "1225 pages",
  "Not yet read"
);
myLibrary.push(warAndPeace);
addBookToLibrary();

// STATE OF PLAY FEB 14:
// All we need is custom validity checking to prevent
// empty books from being added to the library. Thats it!
// And maybe make it prettier.

//                  SUMMARY:
//                  Take user input for fields "title, author, pages, read"
//                  and, upon the click of a button, display that information
//                  on a brand new 'card' which will appear in a grid on the
//                  page.

//                  NICE STUFF TO HAVE
//                  * An animation when a new book is added. Perhaps the "display" function stores its
//                    length in a variable, and if that variable is one more than it used to be, then the
//                    last item in they array smoothly inflates or slides into place at the end of the grid
//                  * Little clickable "x" in the corner of each card to remove it from the library - and
//                    clicking it would prompt "are you sure you want to delete this book?"
