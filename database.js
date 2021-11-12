//temporary database

let Book = [
    {
      ISBN: "12345ONE",
      title: "Getting started with MERN",
      authors: [1, 2],
      language: "en",
      pubDate: "2021-07-07",
      numOfPage: 225,
      category: ["fiction", "programming", "tech", "web dev"],
      publication: 1,
    },
    {
      ISBN: "12345TWO",
      title: "Getting started with Python",
      authors: [1],
      language: "en",
      pubDate: "2021-07-07",
      numOfPage: 225,
      category: ["fiction", "tech", "web dev"],
      publication: 1,
    },
  ];
  
  let Author = [
    {
      id: 1,
      name: "siri",
      books: ["12345ONE", "12345TWO"],
    },
    {
      id: 2,
      name: "manu",
      books: ["12345ONE"],
    },
  ];
  
  let Publication = [
    {
      id: 1,
      name: "Chakra",
      books: ["12345ONE"],
    },
    {
      id: 2,
      name: "Vickie Publications",
      books: ["12345ONE", "12345TWO"],
    },
  ];

  module.exports = { Book, Author, Publication };