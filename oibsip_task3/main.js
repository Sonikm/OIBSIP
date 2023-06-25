//-------------SHOW AND HIDE TODO POPUP BOX-----------------
const addTodo = document.querySelector('.add-todo');
const popBox = document.querySelector('.popup-container');
const createTodo = document.querySelector('.create-todo');
const closePopup = document.querySelector('.close-popup');

addTodo.addEventListener('click', () => {
    popBox.classList.add('show-popup');
    createTodo.classList.add('show-popup');
    document.querySelector('.update').classList.add('inactive');

    document.querySelector('#content').value = '';
    let categories = document.querySelectorAll('.category  input');
    categories.forEach(e => { 
      e.checked = false;
     }) 
    
})

closePopup.addEventListener('click', ()=>{
    popBox.classList.remove('show-popup');
    createTodo.classList.remove('show-popup');
})


//   ----------------------|| SHOW LEFT AND RIGHT CONTAINER ---------------

const showListBtn = document.querySelector('.show-list'),
      leftContainer = document.querySelector('.left-container'),
      rightContainer = document.querySelector('.right-container')


 showListBtn.addEventListener('click', ()=>{
    leftContainer.classList.toggle('inactive');
    rightContainer.classList.toggle('active')

    let activeSlide = leftContainer.classList.contains('inactive') && rightContainer.classList.contains('active')
    showListBtn.innerHTML = activeSlide ? `&lt;` : `&gt;`;

 })     

// -----------------|| TODO FUNCTIONALITIES START ||----------------------------

// -------------------SET AND GET DATA FROM LOCAL STORAGE----------------------
function getCrudData()
{
    let todoList;
    if(localStorage.getItem('todoList') == null)
    {
        todoList = [];
    }
    else {
        todoList = JSON.parse(localStorage.getItem('todoList'));
    }
    return todoList;
}

function setCrudData(todoList){
    localStorage.setItem('todoList', JSON.stringify(todoList))
}

//---------------------ACESSING ELEMENTS------------------------------
let todoContent = document.querySelector('#content'),
    categories = document.querySelectorAll('.category  input'),
    saveTodo = document.querySelector('.save'),
    updateTodo = document.querySelector('.update'),
    currentDate = document.querySelector('.current-date');
// -------------------------------------------------------------------

// ----------------|| SHOW CURRENT DATE
let now = new Date().toLocaleDateString('en-us', {weekday:"long", day:"numeric", month:"long"})
currentDate.innerHTML = now;

// -----------------------VALIDATE INPUT ----------------------------------
function validateInput()
{
    let mark = false;
    categories.forEach(e => {
      if(e.checked) mark = true;
    })

    return todoContent.value && mark ? true : false;
}

//-----------------------GET VALUES AND ADD IT IN LOCAL STORAGE-----------------------
function addTodoList()
{
        let content = todoContent.value;
        let date = currentDate.innerHTML;
        let category;

        categories.forEach(e => { 
            if(e.checked) category = e.value;
         })        
    
   let todoList = getCrudData();     

   todoList.push({
    'content': content,
    'category': category,
    'check': '',
    'date': date
    
    }) 

    if(validateInput()) {
        setCrudData(todoList)
    }
}



// ----------------------SAVE DATA---------------------------------------------
saveTodo.addEventListener ('click', (e)=> {
    e.preventDefault();
    addTodoList();

    if(validateInput())
    {
        closePopup.click();
        showTodoList();
        countTodosList();
        updateThroughtCheckBoxBtn();

        leftContainer.classList.add('inactive');
        rightContainer.classList.add('active')
    
        let activeSlide = leftContainer.classList.contains('inactive') && rightContainer.classList.contains('active')
        showListBtn.innerHTML = activeSlide ? `&lt;` : `&gt;`;

    }
 })

// -----------------------------FILTER TODOS LIST----------------------------------
function filterList(elem, index) 
{
    return `
                
    <div class="todo-item">
      <div class="todo-content flex">
         <div class="content flex">
             <input type="checkbox"  id="study-${index+1}" name="study-${index+1}" value="reading">
             <label for="study-${index+1}"></label> 
             <p class="${elem.check}" onclick="setCompletedTodos(${index}, this)">${elem.content}</p>
          </div>
             <div class="edit-delete flex">
             <button onclick="deleteData(${index})"> delete </button>
             <button onclick="updateData(${index})"> edit </button>
             </div>
                 
         </div>
         <div class="hr"></div>
         <div class="date">
             <span>${elem.date}</span>
             <span>${elem.category}</span>
         </div>
     </div>
        `
}
 
// ----------------------SHOW DATA--------------------------------------
const todoItem = document.querySelector('.todo-list');
function showTodoList()
{
    let todoList = getCrudData();
    let list = '';

    todoList.forEach((elem, index) => {
         list += filterList(elem, index);
    })
    todoItem.innerHTML = list;
    markCheckedAndUnchecked()
    updateThroughtCheckBoxBtn()
}
showTodoList();

// ------------------------DELETE DATA------------------------------------
function deleteData(index){
    let todoList = getCrudData();
    todoList.splice(index, 1);
    setCrudData(todoList)
    allTodos.click();
    showTodoList();
    countTodosList();
    updateThroughtCheckBoxBtn()
}

// ------------------------UPDATE DATA------------------------------
var index2;
function updateData(index){
    addTodo.click();

    updateTodo.classList.remove('inactive');
    let todoList = getCrudData();
    todoContent.value = todoList[index].content;
    let category = todoList[index].category;
    
    categories.forEach(e => {
        e.checked = e.value == category ? true : false;
    })

    allTodos.click();
    index2 = index;
}

// -----------SET UPDATED DATA IN LOCAL STORAGE----------
updateTodo.addEventListener('click', (e)=>{
    e.preventDefault();

    let todoList = getCrudData();
    if(validateInput())
    { 
    categories.forEach(e => { 
        if(e.checked)
         {
            todoList[index2].category = e.value;
         }
     }) 

    todoList[index2].content = todoContent.value;
    setCrudData(todoList);
    showTodoList();
    closePopup.click();
    countTodosList();
    updateThroughtCheckBoxBtn()
    }
})

// ------------|| MARKS AS A COMPLETEDED TODO----------------------
function setCompletedTodos(index, elem){
    let todoList = getCrudData();
    elem.classList.toggle('checked')
    todoList[index].check = elem.classList.contains('checked') ? 'checked' : '';

    setCrudData(todoList)
    markCheckedAndUnchecked()
    countTodosList();
}

// ----------------|| SHOW ALL, NEW AND COMPELETED TODOS-----------------------
let allTodos = document.querySelector('.all-todos'),
    newTodos = document.querySelector('.new-todos'),
    completedTodos = document.querySelector('.completed-todos');

// Show all todos
    allTodos.addEventListener('click', ()=>{

      showTodoList();
      countTodosList();
      showCurrentTodoList(allTodos)
      updateThroughtCheckBoxBtn()

 })


 // Show only new todos    
newTodos.addEventListener('click', ()=>{
    let todoList = getCrudData();
    let list = '';

    todoList.forEach((elem, index) => {
        if(elem.check == '')
        {
            list += filterList(elem, index);           }
    })
    todoItem.innerHTML = list;
    markCheckedAndUnchecked()
    countTodosList()
    showCurrentTodoList(newTodos)
    updateThroughtCheckBoxBtn()
})  


// Show only completed todos
completedTodos.addEventListener('click', ()=>{
    let todoList = getCrudData();
    let list = '';

    todoList.forEach((elem, index) => {
        if(elem.check != '')
        {
            list += filterList(elem, index);   
        }
    })
    todoItem.innerHTML = list;

    markCheckedAndUnchecked()
    countTodosList();
    showCurrentTodoList(completedTodos)
    updateThroughtCheckBoxBtn()
})


//..................................
function markCheckedAndUnchecked()
{
    let input = document.querySelectorAll('.content input');
        input.forEach(e =>{
        let check = e.nextElementSibling.nextElementSibling.classList.contains('checked');
        e.checked = check ? true : false
    })
    
    input.forEach((e)=>{
   e.addEventListener('click', ()=>{
   e.nextElementSibling.nextElementSibling.classList.toggle('checked');
   })
})
}

// --------------COUNT TODODS-----------------
function countTodosList(){
    let todoList = getCrudData();
    let countAll = 0;
    let countNew = 0;
    let countCompleted = 0;
    
    todoList.forEach((elem) => {
        
        if(elem.check == '')
        {
            countNew++;
            countAll++;
        }
        else{
            countCompleted++;
            countAll++;
        }
    })
    allTodos.children[0].innerHTML = countAll;
    newTodos.children[0].innerHTML = countNew;
    completedTodos.children[0].innerHTML = countCompleted;
    countAll = 0;
    countNew = 0;
    countCompleted = 0;
    }
    countTodosList();

    // ---------------|| SET COLOR OF ACTIVE TODOLIST AND REMOVE COLORS OF OTHER LIST----------------
    function showCurrentTodoList(todos)
    {

         if(todos.classList.contains('all-todos'))
         {
          allTodos.classList.add('active')
          allTodos.children[0].classList.add('active')
          newTodos.classList.remove('active')
          newTodos.children[0].classList.remove('active')
          completedTodos.classList.remove('active')
          completedTodos.children[0].classList.remove('active')
         }
        else if(todos.classList.contains('new-todos'))
         {
          newTodos.classList.add('active')
          newTodos.children[0].classList.add('active')
          allTodos.classList.remove('active')
          allTodos.children[0].classList.remove('active')
          completedTodos.classList.remove('active')
          completedTodos.children[0].classList.remove('active')
         }
         else {
            completedTodos.classList.add('active')
            completedTodos.children[0].classList.add('active')
            newTodos.classList.remove('active')
            newTodos.children[0].classList.remove('active')
            allTodos.classList.remove('active')
            allTodos.children[0].classList.remove('active')
         }
    }
    
 // -----------------------|| DISPLAY USER NAME IN BANNER SECTION--------------------

 let userName = document.getElementById('name');

 userName.addEventListener('keyup', ()=>{
     localStorage.setItem('name', userName.value);
     printName();
 })
 
 function printName(){
     let user = localStorage.getItem('name');
     document.getElementById('name').value = user;
 }
 
 printName();
   

// -------------------------------------------------------

//Mark as completed after clicking on checkbox button
function updateThroughtCheckBoxBtn ()
{
    
let checkboxBtn = document.querySelectorAll(".content input");

checkboxBtn.forEach((elem, index) =>{
    elem.addEventListener('click', ()=>{
        let todoList = getCrudData();

        if(elem.checked)
        {
            todoList[index].check = 'checked';
        }
        else {
            todoList[index].check = '';
        }
        setCrudData(todoList);
        countTodosList();
    })
})
}
