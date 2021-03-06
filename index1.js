const taskContainer = document.querySelector(".task__container");

let globalStore = [];

const newCard =         
({id,                    
 imageUrl,                 //destructuring
 taskTitle,
 taskType,
 taskDescription
})=> `<div class="col-md-6 col-lg-4" id=${id} >
<div class="card rounded shadow">
  <div class="card-header d-flex justify-content-end gap-2">
    <button type="button" class="btn btn-outline-success" ${id} onclick="editCard()" >
    <i class="fas fa-pencil-alt" ${id} ></i></button>

    <button type="button" class="btn btn-outline-danger" id=${id} onclick="deleteCard.apply(this,arguments)">
    <i class="fas fa-dumpster" id= ${id}  onclick="deleteCard.apply(this,arguments)"></i></button>
    
  </div>
  <img src=${imageUrl} alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title" contenteditable ="true">${taskTitle}</h5>
    <p class="card-text" contenteditable ="true">${taskDescription}</p>
    <span class="  badge bg-primary" contenteditable ="true">${taskType}</span>
  </div>
  <div class="card-footer text-muted ">
    <button type="button" class="btn btn-primary float-end " id ="editingOccurs">Open Task</button>
  </div>
</div>
</div>`


const loadInitialTaskCards = ()=>{

// access the local storage
const getInitialData = localStorage.getItem("taskyy");
if (!getInitialData) return;

// stringify-obj to normal obj
const  {cards}= JSON.parse(getInitialData);


// map each card and represent the DOM
cards.map((cardObjects)=>{
      const createNewCard = newCard(cardObjects);
      taskContainer.insertAdjacentHTML("beforeend",createNewCard);
      globalStore.push(cardObjects);
     
    });
};


const saveChanges =()=>{
    const taskData ={
        id:`${Date.now()}`,
        imageUrl: document.getElementById("imageurl").value,
        taskTitle: document.getElementById("tasktitle").value,
        taskDescription: document.getElementById("taskdescription").value

    };
    
    const createNewCard = newCard(taskData);
    taskContainer.insertAdjacentHTML("beforeend",createNewCard);
    globalStore.push(taskData);

    localStorage.setItem("taskyy",JSON.stringify({cards:globalStore}));
};   

// issues facing:
// close it automatically after save changes[solved.... by using dismiss class in save changes button also]
// should not close while refreshes[solved ???? ]



// delete function
const deleteCard = (event)=>{
  event = window.event;
  const targetID = event.target.id;
  const targetname= event.target.tagName;
  
  const newCreatedArray = globalStore.filter((cardObjects)=>cardObjects.id!==targetID);
  globalStore =newCreatedArray;
  localStorage.setItem("taskyy",JSON.stringify({cards:globalStore}));
  

if (targetname==="BUTTON"){
      return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
    }
 return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
};


// edit function
const editCard =(event)=>{
  event = window.event;
  const targetID = event.target.id;
  const tagname = event.target.tagName;
  // console.log(tagname);
  let parentElement ;
  if(tagname==="BUTTON"){
     parentElement = event.target.parentNode.parentNode;
  
  }else{
    parentElement = event.target.parentNode.parentNode.parentNode;
  }
    // console.log(parentElement);


    //access the parent elements and specific child elements
    const taskTitle = parentElement.childNodes[5].childNodes[1];
    const taskDescription =parentElement.childNodes[5].childNodes[3];
    const taskType =parentElement.childNodes[5].childNodes[5];
    let submitChanges = parentElement.childNodes[7].childNodes[1];
    
    taskTitle.setAttribute("contenteditable","true");
    taskDescription.setAttribute("contenteditable","true");
    taskType.setAttribute("contenteditable","true");
    submitChanges.innerHTML="Save Changes";

    
    

    
    
}
