/*

Requirements

Book
- ISBN          - String
- Title         -String
- Author        -[number]
- Language      -String
- Publications  -Number
- NumOfPages    -Number
- Categories    -[string]

Author
- ID     -Number
- name   -String
- books  -[string]

Publications
- ID     -Number
- name   -String
- books  -[string]

----- APIs- -----

Book
- Get
  - to get all books
  - to get specific books
  - to get list of books based on category
  - to get list of books based on author

- Post
  - to add new book

- Put
  - to update book details
  - to update/add new author

- Delete
  - delete a book
  - delete an author from the book


Author
 - GET
    - to get all authors
    - to get specific author
    - to get list of author based on a book

 - POST
    - to add new author
    - to update/add new book

 - PUT
    - to update book details

 - DELETE
    - delete an author

Publication
- GET
    - to get all publications
    - to get specific publication
    - to get a list of publication based on a book
- POST
    - add new publication

- PUT
    - update publication
    - update /add new book

- DELETE
    - delete a book from publication
    - delete a publication


/*

OurAPP.post("/book/new", (req,res) => {
     console.log(req.body);
     return res.json({ message: "Book Added Successfullly" });
});


OurAPP.post("/author/new" , (req,res) => {
  const { newAuthor } = req.body;
  
  console.log(newAuthor);
  return res.json({ message: " author is added "});
});