var db = firebase.firestore()
const editionSection = document.getElementById("edition"); //section where the edition will be rendered

const elements = {
    image: function() {
      const img = document.createElement("img");
      img.src = this.content;
      editionSection.appendChild(img);
    },
    hyperlink: function() {
      const link = document.createElement("span");
      link.innerHTML = this.content;
      editionSection.appendChild(link);
    },
    paragraph: function() {
      const p = document.createElement("p");
      p.textContent = this.content;
      editionSection.appendChild(p);
    },
    header: function() {
      const head = document.createElement("div");
      head.innerHTML = this.content;
      editionSection.appendChild(head);
    },
    button: function() {
      // create the button
    }
};

function createEdition(edition){
  for(var i = 0;i<sections.length;i++){ //how many sections the edition has, iterates through sections (below)
      db.collection("editions").doc("edition" + edition).collection(sections[i]).get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const data = doc.data(); //retrieves all the sections as 'objects'
            let entries1 = Object.entries(data); //return array of each object's key-value pairs
            for (const [key, value] of entries1.sort()) { //loop through each element (key-value) in the array
              let keyword = `${key}`; //the different key properties
              let values = `${value}`; //the different value properties
              let renderElement = new Object();
              renderElement.content = value;
              //create a new object with content property of value
              let entries2 = Object.entries(elements); //create array of the 'elements'
              for(let j=0;j<entries2.length;j++) { //access the elements + call the apropriate function to the element
                if(keyword.includes(entries2[j][0])==true) {
                  if(entries2[j][0] == "image") { //use call method
                    elements.image.call(renderElement);
                  } else if(entries2[j][0] == "header") {
                    elements.header.call(renderElement);
                  } else if(entries2[j][0] == "hyperlink") {
                    elements.hyperlink.call(renderElement);
                  } else if(entries2[j][0] == "paragraph") {
                    elements.paragraph.call(renderElement);
                  }
                }
              }
            }
          });
        });
    };
  }

/*
what we have:
- have 3 hardcoded options on the main page (more, less, whatever)
- on click (any of them), will redirect to new page
- on new page, will be a diff html file
- will generate the new edition (create edition) based on the document id
- (add firebase imports to the new file, yay)


8/13/2020

- rename each field alphanumerically for each field in each section
  - e.g (1) header, (2), image1, etc.
- add a sections array to each html file with the unique order of the sections in the given edition
  - e.g for edition15, var sections = [title, investemgations, politics, challenges, etc.]
- creating the individual functions for each element type
- using a parse function to find out which element function to call
  - e.g if we use (1) header, it should call the createHeader() function
*/
