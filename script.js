let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function() {
        return (title + ', by ' + author + ' , ' + pages + ' pages, ' + read)
    }
}

function addBookToLibrary() {
    // do stuff here
}

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295', 'not read yet')

//   FUNCTOINALITY: Take user input for fields "title, author, pages, read"
//                  and, upon the click of a button, display that information
//                  on a brand new 'card' which will appear in a grid on the 
//                  page.
//                  

//                  NICE STUFF TO HAVE
//                  * Metrics of how many pages altogether you have read
//                  * How many books you have read in total