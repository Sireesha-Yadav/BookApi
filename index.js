const { json } = require("express");
const express = require("express");

//database
const Database = require("./database");

//initialization
const OurAPP = express();

OurAPP.use(express.json());

//http://localhost:4000/
OurAPP.get ("/", (request, response) => {
    response.json({ message: "server is working!!!!!!" });
    });
        
    
   //book
 
//Route  - /book
//Des    - To get all books
//Access - Public
//Method - GET
//Params - none
//Body   - none
OurAPP.get("/book", (req, res) => {
  return res.json({book : Database.Book});
});


//Route  - /book/:bookID
//Des    - To get a book based on ISBN
//Access - Public
//Method - GET
//Params - bookID
//Body   - none
OurAPP.get("/book/:bookID", (req, res) => {
  const getBook = Database.Book.filter(
      (book) => book.ISBN === req.params.bookID
  ); 

 return res.json({book: getBook });
});


//Route  - /book/c/:category
//Des    - To get a book based on category
//Access - Public
//Method - GET
//Params - bookID
//Body   - none
OurAPP.get("/book/c/:category", (req, res) => {
    const getBook = Database.Book.filter((book) => 
      book.category.includes(req.params.category)
    ); 
  
   return res.json({book: getBook });
});



OurAPP.get("/book/a/:authors", (req, res) => {
  const getBook = Database.Book.filter((book) => 
    book.authors.includes(parseInt(req.params.authors))
  ); 

 return res.json({book: getBook });
});



      //author

//Route  - /author
//Des    - To get all authors
//Access - Public
//Method - GET
//Params - none
//Body   - none
    
OurAPP.get("/author", (req, res) => {
    return res.json({author : Database.Author});
});


OurAPP.get("/author/:name", (req, res) => {
  const getAuthor = Database.Author.filter((book) => 
    book.name.includes(req.params.name)
  ); 

 return res.json({book: getAuthor });
});



OurAPP.get("/author/b/:books", (req, res) => {
  const getAuthor = Database.Author.filter((book) => 
    book.books.includes(req.params.books)
  ); 

 return res.json({book: getAuthor });
});

   
        //publication

OurAPP.get("/publication", (req, res) => {
  return res.json({publication: Database.Publication});
});

OurAPP.get("/publication/:name", (req, res) => {
  const getPublication = Database.Publication.filter((book) => 
    book.name.includes(req.params.name)
  ); 

 return res.json({book: getPublication });
});


OurAPP.get("/publication/na/:books", (req, res) => {
  const getPublication = Database.Publication.filter((book) => 
    book.books.includes(req.params.books)
  ); 

 return res.json({book: getPublication });
});


//Route          -  /book/new
//Description    -  add new book
//Access         -  public
//parameters     -  none
//method         -  post



OurAPP.post("/book/new", (req,res) => {
  const { newBook } = req.body;

  
  Database.Book.push(newBook);

  return res.json(Database.Book);
});



//Route          -  /author/new
//Description    -  add new author
//Access         -  public
//parameters     -  none
//method         -  post

OurAPP.post("/author/new", (req,res) => {
  const { newAuthor } = req.body;

 
  Database.Author.push(newAuthor);

  return res.json(Database.Author);
});


//Route          -  /publication/new
//Description    -  add new apublication
//Access         -  public
//parameters     -  none
//method         -  post

OurAPP.post("/publication/new", (req,res) => {
  const  { newPublication } = req.body;

  Database.Publication.push(newPublication);

  return res.json(Database.Publication);

});

//Route          -  /book/update/:isbn
//Description    -  update any details of the book
//Access         -  public
//parameters     -  isbn
//method         -  put

OurAPP.put("/book/update/:isbn", (req,res) => {
  const { updatedBook } = req.body;

  const { isbn } = req.params;

  console.log(updatedBook, isbn);

  const book = Database.Book.map((book) => {
    if(book.ISBN === isbn){
      return {...book, ...updatedBook}
    }
    return book;
  });

  return res.json(book);
});


//Route          -  /bookAuthor/update/:isbn
//Description    -  update/add new author to the book
//Access         -  public
//parameters     -  isbn
//method         -  put


OurAPP.put("/bookAuthor/update/:isbn", (req,res) => {
  const { newAuthor } = req.body;

  const { isbn } = req.params;

  const book = Database.Book.map((book) => {
    if(book.ISBN === isbn){
      if(!book.authors.includes(newAuthor)){
         return book.authors.push(newAuthor);
      }
      return book;
    }
    return book;
  });
  const author = Database.Author.map((author) => {
    if(author.id === newAuthor){
      if(!author.books.includes(isbn)){
          return author.books.push(isbn);
      }
      return author;
    }
    return author;
  });
  
  return res.json({book: book, author: author});
});


//Route          -  /author/update/:id
//Description    -  update any details of the author
//Access         -  public
//parameters     -  id
//method         -  put

OurAPP.put("/author/update/:id", (req,res) => {
  const { updateAuthor } = req.body;

  const { id } = req.params;

  console.log(updateAuthor, id);

  const author = Database.Author.map((author) => {
    if(author.id === parseInt(id)){
      return {...author, ...updateAuthor};
    }
    return author;
  });

  return res.json(author);
});


//Route          -  /publication/update/:id
//Description    -  update any details of the publisher
//Access         -  public
//parameters     -  id
//method         -  put

OurAPP.put("/publication/update/:id", (req,res) => {
  const { updatePublication } = req.body;

  const { id } = req.params;

  console.log(updatePublication, id);

  const publication = Database.Publication.map((publication) => {
    if(publication.id === parseInt(id)){
      return {...publication, ...updatePublication};
    }
    return publication;
  });

  return res.json(publication);
});


//Route          -  /publicationBook/update/:id
//Description    -  update any details of the publisher
//Access         -  public
//parameters     -  id
//method         -  put


OurAPP.put("/publicationBook/update/:isbn", (req,res) => {
  const { newPublication } = req.body;

  const { id } = req.params;

  const publication = Database.Publication.map((publication) => {
    if(publication.id === parseInt(id)){
      if(!publication.books.includes(newPublication)){
         return publication.books.push(newPublication);
      }
      return publication;
    }
    return publication;
  });
  const book = Database.Book.map((book) => {
    if(book.isbn === newPublication){
      if(!book.books.includes(isbn)){
          return book.books.push(isbn);
      }
      return book;
    }
    return book;
  });
  
  return res.json({book: book, publication: publication});
});


//Route          -  /book/delete/:isbn
//Description    - delete a book
//Access         -  public
//parameters     -  isbn
//method         -  delete

OurAPP.delete("/book/delete/:isbn", (req,res) => {
  const {isbn}  = req.params;

  const filteredBooks = Database.Book.filter((book) => book.ISBN !== isbn);

  Database.Book = filteredBooks;

  return res.json(Database.Book);

});


//Route          -  /book/delete/author
//Description    -  delete an author from a book
//Access         -  public
//parameters     -  id, isbn
//method         -  delete

OurAPP.delete("/book/delete/author/:isbn/:id", (req,res) => {
  const {isbn, id} = req.params;

  //updating book database object
  Database.Book.forEach((book) => {
    if(book.ISBN === isbn){
      if(!book.authors.includes(parseInt(id))){
        return book;
      }

      book.authors = book.authors.filter((databaseID) => databaseID !== parseInt(id));

      return book;
    }
    return book;
  });

  Database.Author.forEach((author) => {
    if(author.id === parseInt(id)){
      if(!author.books.includes(isbn)){
        return author;
      }
      author.books = author.books.filter((book) => book !== isbn);

      return author;
    
    }
    return author;
    
  });

  return res.json({book: Database.Book , author: Database.Author});
 
});



//Route          -  /author/delete
//Description    -  delete an author
//Access         -  public
//parameters     -  id
//method         -  delete

OurAPP.delete("/author/delete/:id", (req,res) => {
  const {id} = req.params;

  const filteredAuthors = Database.Author.filter((author) => author.id !== parseInt(id));

  Database.Author = filteredAuthors;

  return res.json(Database.Author);

});


//Route          -  /publication/delete
//Description    -  delete a publication
//Access         -  public
//parameters     -  id
//method         -  delete


OurAPP.delete("/publication/delete/:id", (req,res) => {
  const {id} = req.params;

  const filteredPub = Database.Publication.filter((pub) => pub.id !== parseInt(id));

  Database.Publication = filteredPub;

  return res.json(Database.Publication);
});


//Route          -  /publication/delete/book
//Description    -  delete a book from a publication
//Access         -  public
//parameters     -  id, isbn
//method         -  delete

OurAPP.delete("/publication/delete/book/:isbn/:id", (req,res) => {
  const {isbn, id } = req.params;

  Database.Book.forEach((book) => {
    if(book.ISBN === isbn){
      book.publication = 0;
      return book;
    }
    return book;
  });

  Database.Publication.forEach((publication) => {
    if(publication.id === parseInt(id)){
      const filteredBooks = publication.books.filter((book) => book !== isbn );
      publication.books = filteredBooks;
 
      return publication;
    }
    return publication;
  });
  return res.json({book: Database.Book, publication: Database.Publication})
});


OurAPP.listen(4000, () => console.log("Server is running"));