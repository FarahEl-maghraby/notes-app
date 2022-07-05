const fs = require("fs");

// version1
// const addNote = (title,body) =>{
//     // [{title:"new",body:"body1"}]
//     const notes = loadNotes()  // array of object // []
//     console.log(notes)
//     notes.push({
//         // shorthand Property
//         title,
//         body
//     })
//     // [{title:"new",body:"body1"}],{title:"title1",body:"body2"}]]
//     console.log(notes) // array of object
//     saveNotes(notes)
// }

////////////////////////////////////////////////////////////////////////

// version 2 (filter)
// const addNote = (title,body) =>{
//     //  [{title:"title1",body:"body1"}]
//     const notes = loadNotes() // array of object // []
//     // new array elements statisfy condtion
//     // note --> each elemment array (obj)
//     const duplicateTitles = notes.filter((obj)=>{
//         // {title:"title1",body:"body1"} // obj
//         // {title:"title2",body:"body2"} // obj
//         //  {title:"title3",body:"body3"} //obj
//         /**
//          * existed === new data form terminal
//          * title1 === title2 F
//          * title2 === title2 T
//          */
//         /**
//          * title1 === title1  T
//          */
//         /**
//          * title1 === title2 F
//          * title2 === title2 T // {title:"title2",body:"body2"}
//          * title3 === title2 F
//           */
//         return obj.title === title
//     })
//     console.log(duplicateTitles) //  [{title:"title2",body:"body2"}]  // []
//     if(duplicateTitles.length === 0){
//         notes.push({
//             title,body
//         })
//         saveNotes(notes)
//         console.log('Saved Successfully')
//     }
//     else {
//         console.log(' Error Duplicate title ')
//     }
// }

/////////////////////////////////////////////////////////////////////////////////

// version2 (find)

const addNote = (title, body) => {
  const notes = loadNotes();
  // first value / occurence element satisfy condtion
  // el   { title: "title1", body: "body1" }, 
  // el  { title: "title2", body: "body1" },
  // el  { title: "title3", body: "body3" }
  const duplicateTitle = notes.find((el) => {
    /**title 4 does not exist file */
    /**
     *title1 === title3 F
     title2 === title3  F 
     title3 === title3 T
   
     */
    return el.title === title;
  });
  console.log(duplicateTitle); // object  // { title: "title3", body: "body3" }

  if (!duplicateTitle) {
    notes.push({
      title,
      body,
    });
    saveNotes(notes);
    console.log("Saved Successfully");
  } else {
    console.log("Error duplicate title");
  }
};

const loadNotes = () => {
  try {
    // [{"title":"title1","body":"body1"}]
    const data = fs.readFileSync("notes.json").toString();
    //    [{title:"title1",body:"body1"}]
    return JSON.parse(data); // josn --> object
  } catch (e) {
    return [];
  }
};
const saveNotes = (notes) => {
  // notes --> [ { title: 'new', body: 'body1' } ]
  //  [{title:"new",body:"body1"}],{title:"title1",body:"body2"}]] -->
  //  [{"title":"new","body":"body1"}],{"title":"title1","body":"body2"}]]
  const saveData = JSON.stringify(notes);
  // [ { title: 'new', body: 'body1' } ] --> [ { "title": 'new', "body": 'body1' } ]

  console.log(saveData);
  fs.writeFileSync("notes.json", saveData);
};

////////////////////////////////////////////////////////////////////////////

// delete 
const deleteNote = (title) =>{
    const notes = loadNotes()
    console.log(notes)
    const notesToKeep = notes.filter((el)=>{
        /**
         * title1 !== title4 T
         * title2 !== title4 T
         * title3 !== title4 T
         * title4 !== title4 F
         */

        /**
         * title1 !== title2 T
         * title2 !== title2 F
         * title3 !== title2  T
         */

        /**
         * title1 !== title3 T
         * title3 !== title3 F
         */
        /**
          title1 !== title5 T
         * title2 !== title5 T
         * title3 !== title5 T
         * title4 !== title5 T
         * 
         */
        /**
         * title1 !== title3 T
         * title2 !== title3 T
         * title3 !== ttile3 F
         */
        return el.title !== title
    })
    // array 3 elemnt
    console.log(notesToKeep) // [{title:'title1',body:'body1'}]

    if(notes.length !== notesToKeep.length)
    {
    saveNotes(notesToKeep)
    console.log('Deleted sucessfully')
    }
    else {
    console.log('No title is found')
    }
}
// read
const readNote = (title) =>{
    const notes = loadNotes()
    const note = notes.find((el)=>{
        /**
         * title1 === title2 F
         * title2 === title2 T
         */
        /**
         title1 === neww F
         * title2 === neww F
         */
        return el.title === title
    })
    console.log(note) // {title:"title2",body:"body2"}
    if(note){
        console.log(note.body)
    }
    else {
        console.log('Not found')
    }
}
// list

const listNotes = () =>{
    const notes = loadNotes()
    notes.forEach((el)=>{
        console.log(el.title)
    })
}

module.exports = {
  addNote, // addNote:addNote
  deleteNote,
  readNote,
  listNotes
};
