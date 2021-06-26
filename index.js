const taskContainer = document.querySelector(".task__container");
//global store
let globalStorage =[];


const newCard =({id,
    imageUrl,
    taskTitle,
    taskType,
    taskDescription})  =>
    `<div class="col-md-6 col-lg-4"  id =${id}>
    <div class="card rounded shadow">
      <div class="card-header d-flex justify-content-end gap-2">
        <button type="button" class="btn btn-outline-success"><i class="fas fa-pencil-alt" id =${id} onclick="deleteCard.apply(this,arguments )"></i></button>
        <button type="button" class="btn btn-outline-danger" id =${id} onclick="deleteCard.apply(this,arguments )"><i class="fas fa-dumpster"></i></button>
        
      </div>
    
    <img src=${imageUrl} class="card-img-top" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">${taskTitle}</h5>
        <p class="card-text">${taskDescription}</p>
        <span class="  badge bg-primary">${taskType}</span>
      </div>
      <div class="card-footer text-muted">
        <button type="button" class="btn btn-primary float-end">Open Task</button>
      </div>
    </div>
  </div>`
    

 

 const loadInitialCardData = ()  =>{
 //get the data from local storage
 const getInitialCardData =  localStorage.getItem("tasky");
 if(!getInitialCardData)  return;


// convert the stringify-objects to noraml objects
 const {cards }= JSON.parse(getInitialCardData);


//  map around the array to generate the html card and inject it to DOM
  
cards.map((cardObject)=>{
  const createdNewCard = newCard(cardObject);
  taskContainer.insertAdjacentHTML("beforeend",createdNewCard);
  globalStorage.push(cardObject);

});
};

 
const updatedLocalStorage = ()=>{
  localStorage.setItem("tasky",JSON.stringify({cards:globalStorage}))
};

const saveChanges = () =>{
    const taskData ={

    id: `${Date.now()}`,
    imageUrl:document.getElementById("imageurl").value,
    taskTitle:document.getElementById("tasktitle").value,
    taskType:document.getElementById("tasktype").value,
    taskDescription:document.getElementById("taskdescription").value,
    };
    const createdNewCard = newCard(taskData);

    taskContainer.insertAdjacentHTML("beforeend",createdNewCard);
    globalStorage.push(taskData);
    
    updatedLocalStorage();
};

// issues
// closing after savechanges[solved]...
//  evn when refreshed the data shouldnt vanish  [solved]...




// Features
// delete button
const deleteCard =(event)=>{
  //id
  event = window.event;
  const targetID = event.target.id;
  
  const tagname = event.target.tagName;
 
  //search the global storage and remove the object which matches the id
  const newUpdatedArray = globalStorage.filter((cardObject)=>cardObject.id!== targetID)
  globalStorage = newUpdatedArray;

  updatedLocalStorage();
 //access the DOM to remove it
  if(tagname==="BUTTON"){
   return taskContainer
   .removeChild(event.target.parentNode.parentNode.parentNode);
  };
  
    return taskContainer
    .removeChild(event.target.parentNode.parentNode.parentNode.parentNode)

};
