const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const pagesInput = document.getElementById('pages');
const readInput = document.getElementById('read');

const submitButton = document.getElementById('submit-button');
submitButton.addEventListener('click', submit);

function submit() {
    const createdBook = new Book(`${titleInput.value}`, `${authorInput.value}`, `${pagesInput.value}`, `${readInput.checked}`);
    myLibrary.push(createdBook);
    // console.log(myLibrary[0])
};

let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
};

function addBookToLibrary() {
    for (book of myLibrary) {
        for (prop in book) {
            alert(`${book[prop]}`);
        };
        const card = document.createElement("div");
        const cardContent = document.createTextNode(`${book.info()}`);
        card.appendChild(cardContent);
        const container = document.getElementById("card-container");
        container.appendChild(card);
                // This is where I'm up to. This works, but it prints "object Object" in the DOM
                // instead of the properties that make up the book. My next task is to extract
                // the properties and have these printed as individual "div" elements.
    }
}

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295', 'not read yet')

//                  SUMMARY: 
//                  Take user input for fields "title, author, pages, read"
//                  and, upon the click of a button, display that information
//                  on a brand new 'card' which will appear in a grid on the 
//                  page.
//                  
//                  CORE FUNCTIONALITY:
//                  * Input forms for the user for "title, author, pages, read"
//                  * Submit button which first calls the "new Book" constructor, and then
//                    calls the "add book to library" function
//                  * THe logic follows as such once the user presses the submit button:
//                      a) Create a new book with the user inputs
//                      b) Push the book into the "myLibrary" array
//                      c) Call the "display" function, which iterates through the array and diplays them on a page

//                  NICE STUFF TO HAVE
//                  * Metrics of how many pages altogether you have read
//                  * How many books you have read in total
//                  * An animation when a new book is added. Perhaps the "display" function stores its
//                    length in a variable, and if that variable is one more than it used to be, then the
//                    last item in they array smoothly inflates or slides into place at the end of the grid