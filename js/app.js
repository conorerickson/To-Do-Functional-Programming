//Element selectors
const clear = document.querySelector('.clear');
const dateElement = document.getElementById('date');
const list = document.getElementById('list');
const input = document.getElementById('input');

//html class names
const CHECK = 'fa-check-circle';
const UNCHECK = 'fa-circle-thin';
const LINE_THROUGH = 'lineThrough';

//variables
let LIST = [];
let id = 0;

//get item from local storage
let data = localStorage.getItem('TODO');

//check if data value is not empty
if(data){
    LIST = JSON.parse(data);
    id = LIST.length; //set id to the last in the list
    loadList(LIST); //load the lisy to UI

}else{
    //if data is not empty
    LIST = [];
    id = 0;
}

//load items to UI
function loadList(arr){
    arr.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

//Show current date
const options = {weekday :'long', month:'short', day:'numeric'};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString('en-US', options);

//function for adding to-do's
function addToDo(toDo, id, done, trash){
    if(trash) { 
        return; 
    }
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH: '';

    const item = `
    <li class = 'item'>
        <i class="fa ${DONE} co" job="complete" id="${id}"></i>
        <p class="text ${LINE}">${toDo}</p>
        <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
    </li>
    `;
    const position = 'beforeend';

    list.insertAdjacentHTML(position, item);
}

//add item to list on press enter
document.addEventListener('keyup',function(e){
    if(e.keyCode == 13){
        const toDo = input.value;
        if(toDo){
            addToDo(toDo);

            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });
            //add item  to local storage
            localStorage.setItem("TODO", JSON.stringify(LIST));
            id++;
        }
        input.value = '';
    }
} )

//complete todo item
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector('.text').classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

//remove todo item
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

//target dynamic items
list.addEventListener('click',function(e){
    const element = event.target; //return clicked element in list
    const elementJob = element.attributes.job.value; //complete or delete

    if(elementJob == 'complete'){
        completeToDo(element);
    }else if(elementJob == 'delete'){
        removeToDo(element);
    }
    //add item  to local storage
    localStorage.setItem("TODO", JSON.stringify(LIST));

})

//clear local storage
clear.addEventListener('click', function(){
    localStorage.clear();
    location.reload();
} )