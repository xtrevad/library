const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const pagesInput = document.getElementById('pages');
const readInput = document.getElementById('read');

const submitButton = document.getElementById('submit-button');
submitButton.addEventListener('click', submit);

let myLibrary = [];

function submit() {
    let createdBook = new Book(`${titleInput.value}`, `${authorInput.value}`, `${pagesInput.value}`, `${readInput.checked}`);
    if (createdBook.read === 'true') {
        createdBook.read = 'Read'
    } else if (createdBook.read === 'false') {
        createdBook.read = 'Not yet read'
    };
    createdBook.pages += ' pages'
    myLibrary.push(createdBook);
    addBookToLibrary();
};


function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
};

Book.prototype.toggleReadStatus = function() {                                  // Toggle switch functionality
    const id = (this.id);
    const thisCard = document.querySelector(`[data-index-number="${id}"]`);
    if (myLibrary[`${id - 1}`].read === 'Read') {
        myLibrary[`${id - 1}`].read = 'Not yet read';                           // Changes it in "myLibrary"
        thisCard.querySelector(" :nth-child(4)").textContent = "Not yet read";  // Changes it on the DOM
    } else if (myLibrary[`${id - 1}`].read === 'Not yet read') {
        myLibrary[`${id - 1}`].read = 'Read';
        thisCard.querySelector(" :nth-child(4)").textContent = "Read";
    };
    metrics();
}

Book.prototype.removeFromLibrary = function() {
    const id = (this.id);
    const thisCard = document.querySelector(`[data-index-number="${id}"]`);
    thisCard.remove();
    myLibrary.splice(id - 1, 1);
    metrics();
}

function addBookToLibrary() {
    const book = myLibrary[myLibrary.length - 1];    //Selects the last book added to the library
    const card = document.createElement('div');
    card.classList.add('card');
    for (prop in book) {    
        if (book.hasOwnProperty(prop)) {                       // creates a list of text nodes for each property of the book
        const newPara = document.createElement('p');
        const propTextNode = document.createTextNode(`${book[prop]}`);
        newPara.appendChild(propTextNode);   
        card.appendChild(newPara);
        };
    };
    // Adds the "read toggle"
    const toggle = document.createElement('label');
    toggle.classList.add('switch');
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('readToggle')
    checkbox.id = (myLibrary.length);
    checkbox.addEventListener('change', book.toggleReadStatus);
    if (book.read === 'Read') {
        checkbox.checked = true;
    };
    const slider = document.createElement('span');
    slider.classList.add('slider', 'round');
    const span = document.createElement('span');
    checkbox.appendChild(span);
    toggle.appendChild(checkbox);
    toggle.appendChild(slider);
    card.appendChild(toggle);
    // Adds "remove from library" button
    const remove = document.createElement('button');
    remove.textContent = ('Remove');
    remove.classList.add('removeBtn');
    remove.id = (myLibrary.length);
    remove.addEventListener('click', book.removeFromLibrary);
    card.appendChild(remove);
    // Adds finished card to the library display
    const container = document.getElementById("card-container");
    container.appendChild(card);
    card.dataset.indexNumber = (myLibrary.length);
    metrics();
};

function metrics() {
    const booksRead = document.getElementById('books-read');
    const pagesRead = document.getElementById('pages-read');
    const readNumber = myLibrary.filter(book => {
        return book.read === 'Read';
    });
    booksRead.textContent = "Books read: " + readNumber.length;
    let sum = 0;
    for (let i = 0; i < readNumber.length; i++) {
        const book = readNumber[i];
        let pages = +(book.pages.slice(0, -6));
        sum += pages;
    };
    pagesRead.textContent = "Total pages read: " + sum;

}

let theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295 pages', 'Read');
myLibrary.push(theHobbit);
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