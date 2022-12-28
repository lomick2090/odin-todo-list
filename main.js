/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
let taskControl = (() => {

    let lists = [];

    function createList(name) {
        lists.push({name,
            tasks: []
        });
    }

    function addTask(listItem, taskName, taskDesc, taskDue,) {
        lists[listItem].tasks.push({
            name: taskName,
            desc: taskDesc,
            due: taskDue
        })
    }

    return {
        createList,
        lists,
        addTask,
    }

})();

function updateStorage() {
    localStorage.setItem('lists', JSON.stringify(taskControl.lists));
}

function updateFromStorage() {
    let storedLists = JSON.parse(localStorage.getItem('lists'));
    for(i = 0; i < storedLists.length; i++) {
        taskControl.lists.push(storedLists[i]);
    }
}

function createListPrompt() {
    let listFormDiv = document.createElement('div')
    listFormDiv.className = 'listformdiv';

    let listForm = document.createElement('form');
    listForm.className = 'listform';

    let listHeader = document.createElement('h1');
    listHeader.textContent = 'Add List:';

    let listInputLabel = document.createElement('label');
    listInputLabel.for = 'listname'
    listInputLabel.textContent = 'List Name: '

    let listInput = document.createElement('input');
    listInput.type = 'text';
    listInput.id = 'listname';
    listInput.name = 'listname';

    let submitButton = document.createElement('button');
    submitButton.textContent = 'Add';
    submitButton.addEventListener('click', () => {
        event.preventDefault();
        document.querySelector('.page').id = '';
        if (listInput.value != '') {
            taskControl.createList(listInput.value);
            updateStorage();
            populateLists();
        }
        listForm.reset();
        listFormDiv.remove();
    });

    listInputLabel.appendChild(listInput);
    listForm.appendChild(listHeader);
    listForm.appendChild(listInputLabel);
    listForm.appendChild(submitButton);
    listFormDiv.appendChild(listForm);

    document.querySelector('body').appendChild(listFormDiv);

    document.querySelector('.page').id = 'blur';
    
}

function populateLists() {
    while (document.querySelector('.tasklists').firstChild) {
        document.querySelector('.tasklists').firstChild.remove();
    }
    
    for (let i = 0; i< taskControl.lists.length; i++) {
        let newListDiv = document.createElement('div');
        let newList = document.createElement('li');
        newListDiv.className = 'listnames'
        newListDiv.id = i;
        newList.textContent = taskControl.lists[i].name;

        let newListButton = document.createElement('button');
        newListButton.textContent = 'X';
        newListButton.addEventListener('click', deleteList);

        newListDiv.appendChild(newList);
        newListDiv.appendChild(newListButton);
        document.querySelector('.tasklists').appendChild(newListDiv);
        newListDiv.addEventListener('click', () =>  populateTaskPage(newListDiv.id));
    }
}

function deleteList() {
    listIndex = this.parentNode.id;
    taskControl.lists.splice(listIndex, 1);
    updateStorage();
    populateLists();
}

function populateTaskPage(listIndex) {
    while (document.querySelector('.list').firstChild) {
        document.querySelector('.list').firstChild.remove();
    }

    let taskDiv = document.querySelector('.tasktitle');

    while (taskDiv.firstChild) {
        taskDiv.firstChild.remove();
    }

    let taskHeader = document.createElement ('h1');
    taskHeader.textContent = `${taskControl.lists[listIndex].name}`;

    let addTaskButton = document.createElement('button');
    addTaskButton.textContent = 'Add Task +';
    addTaskButton.addEventListener('click', () => createTaskPrompt(listIndex));

    taskDiv.appendChild(taskHeader);
    taskDiv.appendChild(addTaskButton);
    populateTasks(listIndex);
}

function createTaskPrompt(listIndex) {

    //listItem, taskName, taskDesc, taskDue
    let taskFormDiv = document.createElement('div');
    taskFormDiv.className = 'taskformdiv';

    let taskForm = document.createElement('form');
    taskForm.className = 'taskform';

    let taskHeader = document.createElement('h1');
    taskHeader.textContent = 'Add Task to List:';

    let taskNameInputLabel = document.createElement('label');
    taskNameInputLabel.for = 'taskname';
    taskNameInputLabel.textContent = 'Task Name: ';

    let taskNameInput = document.createElement('input');
    taskNameInput.type = 'text';
    taskNameInput.id = 'taskname';
    taskNameInput.name = 'taskname';
    taskNameInputLabel.appendChild(taskNameInput)

    let taskDescInputLabel = document.createElement('label');
    taskDescInputLabel.for = 'taskdesc';
    taskDescInputLabel.textContent = 'Task Description: ';

    let taskDescInput = document.createElement('input');
    taskDescInput.type = 'text';
    taskDescInput.id = 'taskdesc';
    taskDescInput.name = 'taskdesc';
    taskDescInputLabel.appendChild(taskDescInput)

    let taskDueInputLabel = document.createElement('label');
    taskDueInputLabel.for = 'taskdue';
    taskDueInputLabel.textContent = 'Task Due Date: ';

    let taskDueInput = document.createElement('input');
    taskDueInput.type = 'date';
    taskDueInput.id = 'taskdue';
    taskDueInput.name = 'taskdue';
    taskDueInputLabel.appendChild(taskDueInput)

    let submitButton = document.createElement('button');
    submitButton.textContent = 'Add';
    submitButton.addEventListener('click', () => {
        event.preventDefault();
        taskControl.addTask(listIndex, taskNameInput.value, taskDescInput.value, taskDueInput.value);
        updateStorage();
        populateTaskPage(listIndex);
        taskForm.reset();
        document.querySelector('.page').id = '';
        taskFormDiv.remove();
    });



    taskFormDiv.appendChild(taskHeader);
    taskForm.appendChild(taskNameInputLabel);
    taskForm.appendChild(taskDescInputLabel);
    taskForm.appendChild(taskDueInputLabel);
    taskForm.appendChild(submitButton);
    taskFormDiv.appendChild(taskForm);

    document.querySelector('body').appendChild(taskFormDiv);

    document.querySelector('.page').id = 'blur';


}

function populateTasks(listIndex) {
    while (document.querySelector('.tasks')) {
        document.querySelector('.tasks').remove();
    }
    

    for (let i = 0; i < (taskControl.lists[listIndex].tasks.length); i++) {
        let newTaskDiv = document.createElement('div');
        newTaskDiv.id = i;
        newTaskDiv.className = 'tasks';

        let newTaskHeader = document.createElement('h3');
        newTaskHeader.textContent = taskControl.lists[listIndex].tasks[i].name;
        newTaskDiv.appendChild(newTaskHeader);

        let newTaskDesc = document.createElement('p');
        newTaskDesc.textContent = taskControl.lists[listIndex].tasks[i].desc;
        newTaskDiv.appendChild(newTaskDesc);

        let newTaskDue = document.createElement('p');
        newTaskDue.textContent = `Due by: ${taskControl.lists[listIndex].tasks[i].due}`;
        newTaskDiv.appendChild(newTaskDue);

        let newTaskButton = document.createElement('button');
        newTaskButton.textContent = 'X';
        newTaskButton.className = 'taskDeleteButton';
        newTaskButton.addEventListener('click', () => deleteTask(listIndex, i));

        let taskEditButton = document.createElement('button');
        taskEditButton.textContent = 'Edit';
        taskEditButton.className = 'taskEditButton';
        taskEditButton.addEventListener('click', () => createEditTaskPrompt(listIndex, i));

        let buttonDiv = document.createElement('div');
        buttonDiv.className = 'buttondiv';
        buttonDiv.appendChild(taskEditButton);
        buttonDiv.appendChild(newTaskButton);
        newTaskDiv.appendChild(buttonDiv);

        document.querySelector('.list').appendChild(newTaskDiv);

    }

    
}

function deleteTask(listIndex, taskIndex) {
    taskControl.lists[listIndex].tasks.splice(taskIndex, 1);
    updateStorage();
    populateTasks(listIndex);
}

function createEditTaskPrompt(listIndex, taskIndex) {
    let taskFormDiv = document.createElement('div');
    taskFormDiv.className = 'taskformdiv';

    let taskForm = document.createElement('form');
    taskForm.className = 'taskform';

    let taskHeader = document.createElement('h1');
    taskHeader.textContent = 'Edit Task:';

    let taskNameInputLabel = document.createElement('label');
    taskNameInputLabel.for = 'taskname';
    taskNameInputLabel.textContent = 'Task Name: ';

    let taskNameInput = document.createElement('input');
    taskNameInput.type = 'text';
    taskNameInput.id = 'taskname';
    taskNameInput.name = 'taskname';
    taskNameInput.defaultValue = taskControl.lists[listIndex].tasks[taskIndex].name
    taskNameInputLabel.appendChild(taskNameInput);

    let taskDescInputLabel = document.createElement('label');
    taskDescInputLabel.for = 'taskdesc';
    taskDescInputLabel.textContent = 'Task Description: ';

    let taskDescInput = document.createElement('input');
    taskDescInput.type = 'text';
    taskDescInput.id = 'taskdesc';
    taskDescInput.name = 'taskdesc';
    taskDescInput.defaultValue = taskControl.lists[listIndex].tasks[taskIndex].desc
    taskDescInputLabel.appendChild(taskDescInput);

    let taskDueInputLabel = document.createElement('label');
    taskDueInputLabel.for = 'taskdue';
    taskDueInputLabel.textContent = 'Task Due Date: ';

    let taskDueInput = document.createElement('input');
    taskDueInput.type = 'date';
    taskDueInput.id = 'taskdue';
    taskDueInput.name = 'taskdue';
    taskDueInput.defaultValue = taskControl.lists[listIndex].tasks[taskIndex].due
    taskDueInputLabel.appendChild(taskDueInput);

    let submitButton = document.createElement('button');
    submitButton.textContent = 'Update task';
    submitButton.addEventListener('click', () => {
        event.preventDefault();
        taskControl.lists[listIndex].tasks[taskIndex].name = taskNameInput.value;
        taskControl.lists[listIndex].tasks[taskIndex].desc = taskDescInput.value;
        taskControl.lists[listIndex].tasks[taskIndex].due = taskDueInput.value;
        updateStorage();
        populateTaskPage(listIndex);
        taskForm.reset();
        document.querySelector('.page').id = '';
        taskFormDiv.remove();
    });



    taskFormDiv.appendChild(taskHeader);
    taskForm.appendChild(taskNameInputLabel);
    taskForm.appendChild(taskDescInputLabel);
    taskForm.appendChild(taskDueInputLabel);
    taskForm.appendChild(submitButton);
    taskFormDiv.appendChild(taskForm);

    document.querySelector('body').appendChild(taskFormDiv);

    document.querySelector('.page').id = 'blur';
}

document.querySelector('.addlistbutton').addEventListener('click', () => createListPrompt());

if (localStorage.getItem('lists')) {
    updateFromStorage();
    populateLists();
    populateTaskPage(0);
}
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUVBOztBQUVBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSx3QkFBd0I7QUFDdkM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiw2QkFBNkI7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnQ0FBZ0Msa0NBQWtDOztBQUVsRTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7Ozs7QUFJTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7OztBQUdBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW9CLGlEQUFpRDtBQUNyRTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDRDQUE0QywwQ0FBMEM7QUFDdEY7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOzs7O0FBSUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsibGV0IHRhc2tDb250cm9sID0gKCgpID0+IHtcblxuICAgIGxldCBsaXN0cyA9IFtdO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlTGlzdChuYW1lKSB7XG4gICAgICAgIGxpc3RzLnB1c2goe25hbWUsXG4gICAgICAgICAgICB0YXNrczogW11cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkVGFzayhsaXN0SXRlbSwgdGFza05hbWUsIHRhc2tEZXNjLCB0YXNrRHVlLCkge1xuICAgICAgICBsaXN0c1tsaXN0SXRlbV0udGFza3MucHVzaCh7XG4gICAgICAgICAgICBuYW1lOiB0YXNrTmFtZSxcbiAgICAgICAgICAgIGRlc2M6IHRhc2tEZXNjLFxuICAgICAgICAgICAgZHVlOiB0YXNrRHVlXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgY3JlYXRlTGlzdCxcbiAgICAgICAgbGlzdHMsXG4gICAgICAgIGFkZFRhc2ssXG4gICAgfVxuXG59KSgpO1xuXG5mdW5jdGlvbiB1cGRhdGVTdG9yYWdlKCkge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdsaXN0cycsIEpTT04uc3RyaW5naWZ5KHRhc2tDb250cm9sLmxpc3RzKSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUZyb21TdG9yYWdlKCkge1xuICAgIGxldCBzdG9yZWRMaXN0cyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xpc3RzJykpO1xuICAgIGZvcihpID0gMDsgaSA8IHN0b3JlZExpc3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRhc2tDb250cm9sLmxpc3RzLnB1c2goc3RvcmVkTGlzdHNbaV0pO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlTGlzdFByb21wdCgpIHtcbiAgICBsZXQgbGlzdEZvcm1EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGxpc3RGb3JtRGl2LmNsYXNzTmFtZSA9ICdsaXN0Zm9ybWRpdic7XG5cbiAgICBsZXQgbGlzdEZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XG4gICAgbGlzdEZvcm0uY2xhc3NOYW1lID0gJ2xpc3Rmb3JtJztcblxuICAgIGxldCBsaXN0SGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgICBsaXN0SGVhZGVyLnRleHRDb250ZW50ID0gJ0FkZCBMaXN0Oic7XG5cbiAgICBsZXQgbGlzdElucHV0TGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgIGxpc3RJbnB1dExhYmVsLmZvciA9ICdsaXN0bmFtZSdcbiAgICBsaXN0SW5wdXRMYWJlbC50ZXh0Q29udGVudCA9ICdMaXN0IE5hbWU6ICdcblxuICAgIGxldCBsaXN0SW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIGxpc3RJbnB1dC50eXBlID0gJ3RleHQnO1xuICAgIGxpc3RJbnB1dC5pZCA9ICdsaXN0bmFtZSc7XG4gICAgbGlzdElucHV0Lm5hbWUgPSAnbGlzdG5hbWUnO1xuXG4gICAgbGV0IHN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIHN1Ym1pdEJ1dHRvbi50ZXh0Q29udGVudCA9ICdBZGQnO1xuICAgIHN1Ym1pdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhZ2UnKS5pZCA9ICcnO1xuICAgICAgICBpZiAobGlzdElucHV0LnZhbHVlICE9ICcnKSB7XG4gICAgICAgICAgICB0YXNrQ29udHJvbC5jcmVhdGVMaXN0KGxpc3RJbnB1dC52YWx1ZSk7XG4gICAgICAgICAgICB1cGRhdGVTdG9yYWdlKCk7XG4gICAgICAgICAgICBwb3B1bGF0ZUxpc3RzKCk7XG4gICAgICAgIH1cbiAgICAgICAgbGlzdEZvcm0ucmVzZXQoKTtcbiAgICAgICAgbGlzdEZvcm1EaXYucmVtb3ZlKCk7XG4gICAgfSk7XG5cbiAgICBsaXN0SW5wdXRMYWJlbC5hcHBlbmRDaGlsZChsaXN0SW5wdXQpO1xuICAgIGxpc3RGb3JtLmFwcGVuZENoaWxkKGxpc3RIZWFkZXIpO1xuICAgIGxpc3RGb3JtLmFwcGVuZENoaWxkKGxpc3RJbnB1dExhYmVsKTtcbiAgICBsaXN0Rm9ybS5hcHBlbmRDaGlsZChzdWJtaXRCdXR0b24pO1xuICAgIGxpc3RGb3JtRGl2LmFwcGVuZENoaWxkKGxpc3RGb3JtKTtcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5hcHBlbmRDaGlsZChsaXN0Rm9ybURpdik7XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFnZScpLmlkID0gJ2JsdXInO1xuICAgIFxufVxuXG5mdW5jdGlvbiBwb3B1bGF0ZUxpc3RzKCkge1xuICAgIHdoaWxlIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFza2xpc3RzJykuZmlyc3RDaGlsZCkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFza2xpc3RzJykuZmlyc3RDaGlsZC5yZW1vdmUoKTtcbiAgICB9XG4gICAgXG4gICAgZm9yIChsZXQgaSA9IDA7IGk8IHRhc2tDb250cm9sLmxpc3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCBuZXdMaXN0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxldCBuZXdMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgICAgbmV3TGlzdERpdi5jbGFzc05hbWUgPSAnbGlzdG5hbWVzJ1xuICAgICAgICBuZXdMaXN0RGl2LmlkID0gaTtcbiAgICAgICAgbmV3TGlzdC50ZXh0Q29udGVudCA9IHRhc2tDb250cm9sLmxpc3RzW2ldLm5hbWU7XG5cbiAgICAgICAgbGV0IG5ld0xpc3RCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgbmV3TGlzdEJ1dHRvbi50ZXh0Q29udGVudCA9ICdYJztcbiAgICAgICAgbmV3TGlzdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGRlbGV0ZUxpc3QpO1xuXG4gICAgICAgIG5ld0xpc3REaXYuYXBwZW5kQ2hpbGQobmV3TGlzdCk7XG4gICAgICAgIG5ld0xpc3REaXYuYXBwZW5kQ2hpbGQobmV3TGlzdEJ1dHRvbik7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrbGlzdHMnKS5hcHBlbmRDaGlsZChuZXdMaXN0RGl2KTtcbiAgICAgICAgbmV3TGlzdERpdi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+ICBwb3B1bGF0ZVRhc2tQYWdlKG5ld0xpc3REaXYuaWQpKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRlbGV0ZUxpc3QoKSB7XG4gICAgbGlzdEluZGV4ID0gdGhpcy5wYXJlbnROb2RlLmlkO1xuICAgIHRhc2tDb250cm9sLmxpc3RzLnNwbGljZShsaXN0SW5kZXgsIDEpO1xuICAgIHVwZGF0ZVN0b3JhZ2UoKTtcbiAgICBwb3B1bGF0ZUxpc3RzKCk7XG59XG5cbmZ1bmN0aW9uIHBvcHVsYXRlVGFza1BhZ2UobGlzdEluZGV4KSB7XG4gICAgd2hpbGUgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saXN0JykuZmlyc3RDaGlsZCkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGlzdCcpLmZpcnN0Q2hpbGQucmVtb3ZlKCk7XG4gICAgfVxuXG4gICAgbGV0IHRhc2tEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFza3RpdGxlJyk7XG5cbiAgICB3aGlsZSAodGFza0Rpdi5maXJzdENoaWxkKSB7XG4gICAgICAgIHRhc2tEaXYuZmlyc3RDaGlsZC5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICBsZXQgdGFza0hlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgKCdoMScpO1xuICAgIHRhc2tIZWFkZXIudGV4dENvbnRlbnQgPSBgJHt0YXNrQ29udHJvbC5saXN0c1tsaXN0SW5kZXhdLm5hbWV9YDtcblxuICAgIGxldCBhZGRUYXNrQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgYWRkVGFza0J1dHRvbi50ZXh0Q29udGVudCA9ICdBZGQgVGFzayArJztcbiAgICBhZGRUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gY3JlYXRlVGFza1Byb21wdChsaXN0SW5kZXgpKTtcblxuICAgIHRhc2tEaXYuYXBwZW5kQ2hpbGQodGFza0hlYWRlcik7XG4gICAgdGFza0Rpdi5hcHBlbmRDaGlsZChhZGRUYXNrQnV0dG9uKTtcbiAgICBwb3B1bGF0ZVRhc2tzKGxpc3RJbmRleCk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVRhc2tQcm9tcHQobGlzdEluZGV4KSB7XG5cbiAgICAvL2xpc3RJdGVtLCB0YXNrTmFtZSwgdGFza0Rlc2MsIHRhc2tEdWVcbiAgICBsZXQgdGFza0Zvcm1EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0YXNrRm9ybURpdi5jbGFzc05hbWUgPSAndGFza2Zvcm1kaXYnO1xuXG4gICAgbGV0IHRhc2tGb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICAgIHRhc2tGb3JtLmNsYXNzTmFtZSA9ICd0YXNrZm9ybSc7XG5cbiAgICBsZXQgdGFza0hlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJyk7XG4gICAgdGFza0hlYWRlci50ZXh0Q29udGVudCA9ICdBZGQgVGFzayB0byBMaXN0Oic7XG5cbiAgICBsZXQgdGFza05hbWVJbnB1dExhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICB0YXNrTmFtZUlucHV0TGFiZWwuZm9yID0gJ3Rhc2tuYW1lJztcbiAgICB0YXNrTmFtZUlucHV0TGFiZWwudGV4dENvbnRlbnQgPSAnVGFzayBOYW1lOiAnO1xuXG4gICAgbGV0IHRhc2tOYW1lSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIHRhc2tOYW1lSW5wdXQudHlwZSA9ICd0ZXh0JztcbiAgICB0YXNrTmFtZUlucHV0LmlkID0gJ3Rhc2tuYW1lJztcbiAgICB0YXNrTmFtZUlucHV0Lm5hbWUgPSAndGFza25hbWUnO1xuICAgIHRhc2tOYW1lSW5wdXRMYWJlbC5hcHBlbmRDaGlsZCh0YXNrTmFtZUlucHV0KVxuXG4gICAgbGV0IHRhc2tEZXNjSW5wdXRMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgdGFza0Rlc2NJbnB1dExhYmVsLmZvciA9ICd0YXNrZGVzYyc7XG4gICAgdGFza0Rlc2NJbnB1dExhYmVsLnRleHRDb250ZW50ID0gJ1Rhc2sgRGVzY3JpcHRpb246ICc7XG5cbiAgICBsZXQgdGFza0Rlc2NJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgdGFza0Rlc2NJbnB1dC50eXBlID0gJ3RleHQnO1xuICAgIHRhc2tEZXNjSW5wdXQuaWQgPSAndGFza2Rlc2MnO1xuICAgIHRhc2tEZXNjSW5wdXQubmFtZSA9ICd0YXNrZGVzYyc7XG4gICAgdGFza0Rlc2NJbnB1dExhYmVsLmFwcGVuZENoaWxkKHRhc2tEZXNjSW5wdXQpXG5cbiAgICBsZXQgdGFza0R1ZUlucHV0TGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgIHRhc2tEdWVJbnB1dExhYmVsLmZvciA9ICd0YXNrZHVlJztcbiAgICB0YXNrRHVlSW5wdXRMYWJlbC50ZXh0Q29udGVudCA9ICdUYXNrIER1ZSBEYXRlOiAnO1xuXG4gICAgbGV0IHRhc2tEdWVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgdGFza0R1ZUlucHV0LnR5cGUgPSAnZGF0ZSc7XG4gICAgdGFza0R1ZUlucHV0LmlkID0gJ3Rhc2tkdWUnO1xuICAgIHRhc2tEdWVJbnB1dC5uYW1lID0gJ3Rhc2tkdWUnO1xuICAgIHRhc2tEdWVJbnB1dExhYmVsLmFwcGVuZENoaWxkKHRhc2tEdWVJbnB1dClcblxuICAgIGxldCBzdWJtaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBzdWJtaXRCdXR0b24udGV4dENvbnRlbnQgPSAnQWRkJztcbiAgICBzdWJtaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRhc2tDb250cm9sLmFkZFRhc2sobGlzdEluZGV4LCB0YXNrTmFtZUlucHV0LnZhbHVlLCB0YXNrRGVzY0lucHV0LnZhbHVlLCB0YXNrRHVlSW5wdXQudmFsdWUpO1xuICAgICAgICB1cGRhdGVTdG9yYWdlKCk7XG4gICAgICAgIHBvcHVsYXRlVGFza1BhZ2UobGlzdEluZGV4KTtcbiAgICAgICAgdGFza0Zvcm0ucmVzZXQoKTtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhZ2UnKS5pZCA9ICcnO1xuICAgICAgICB0YXNrRm9ybURpdi5yZW1vdmUoKTtcbiAgICB9KTtcblxuXG5cbiAgICB0YXNrRm9ybURpdi5hcHBlbmRDaGlsZCh0YXNrSGVhZGVyKTtcbiAgICB0YXNrRm9ybS5hcHBlbmRDaGlsZCh0YXNrTmFtZUlucHV0TGFiZWwpO1xuICAgIHRhc2tGb3JtLmFwcGVuZENoaWxkKHRhc2tEZXNjSW5wdXRMYWJlbCk7XG4gICAgdGFza0Zvcm0uYXBwZW5kQ2hpbGQodGFza0R1ZUlucHV0TGFiZWwpO1xuICAgIHRhc2tGb3JtLmFwcGVuZENoaWxkKHN1Ym1pdEJ1dHRvbik7XG4gICAgdGFza0Zvcm1EaXYuYXBwZW5kQ2hpbGQodGFza0Zvcm0pO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmFwcGVuZENoaWxkKHRhc2tGb3JtRGl2KTtcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWdlJykuaWQgPSAnYmx1cic7XG5cblxufVxuXG5mdW5jdGlvbiBwb3B1bGF0ZVRhc2tzKGxpc3RJbmRleCkge1xuICAgIHdoaWxlIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFza3MnKSkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFza3MnKS5yZW1vdmUoKTtcbiAgICB9XG4gICAgXG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8ICh0YXNrQ29udHJvbC5saXN0c1tsaXN0SW5kZXhdLnRhc2tzLmxlbmd0aCk7IGkrKykge1xuICAgICAgICBsZXQgbmV3VGFza0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBuZXdUYXNrRGl2LmlkID0gaTtcbiAgICAgICAgbmV3VGFza0Rpdi5jbGFzc05hbWUgPSAndGFza3MnO1xuXG4gICAgICAgIGxldCBuZXdUYXNrSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcbiAgICAgICAgbmV3VGFza0hlYWRlci50ZXh0Q29udGVudCA9IHRhc2tDb250cm9sLmxpc3RzW2xpc3RJbmRleF0udGFza3NbaV0ubmFtZTtcbiAgICAgICAgbmV3VGFza0Rpdi5hcHBlbmRDaGlsZChuZXdUYXNrSGVhZGVyKTtcblxuICAgICAgICBsZXQgbmV3VGFza0Rlc2MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgIG5ld1Rhc2tEZXNjLnRleHRDb250ZW50ID0gdGFza0NvbnRyb2wubGlzdHNbbGlzdEluZGV4XS50YXNrc1tpXS5kZXNjO1xuICAgICAgICBuZXdUYXNrRGl2LmFwcGVuZENoaWxkKG5ld1Rhc2tEZXNjKTtcblxuICAgICAgICBsZXQgbmV3VGFza0R1ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgbmV3VGFza0R1ZS50ZXh0Q29udGVudCA9IGBEdWUgYnk6ICR7dGFza0NvbnRyb2wubGlzdHNbbGlzdEluZGV4XS50YXNrc1tpXS5kdWV9YDtcbiAgICAgICAgbmV3VGFza0Rpdi5hcHBlbmRDaGlsZChuZXdUYXNrRHVlKTtcblxuICAgICAgICBsZXQgbmV3VGFza0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBuZXdUYXNrQnV0dG9uLnRleHRDb250ZW50ID0gJ1gnO1xuICAgICAgICBuZXdUYXNrQnV0dG9uLmNsYXNzTmFtZSA9ICd0YXNrRGVsZXRlQnV0dG9uJztcbiAgICAgICAgbmV3VGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IGRlbGV0ZVRhc2sobGlzdEluZGV4LCBpKSk7XG5cbiAgICAgICAgbGV0IHRhc2tFZGl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIHRhc2tFZGl0QnV0dG9uLnRleHRDb250ZW50ID0gJ0VkaXQnO1xuICAgICAgICB0YXNrRWRpdEJ1dHRvbi5jbGFzc05hbWUgPSAndGFza0VkaXRCdXR0b24nO1xuICAgICAgICB0YXNrRWRpdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IGNyZWF0ZUVkaXRUYXNrUHJvbXB0KGxpc3RJbmRleCwgaSkpO1xuXG4gICAgICAgIGxldCBidXR0b25EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYnV0dG9uRGl2LmNsYXNzTmFtZSA9ICdidXR0b25kaXYnO1xuICAgICAgICBidXR0b25EaXYuYXBwZW5kQ2hpbGQodGFza0VkaXRCdXR0b24pO1xuICAgICAgICBidXR0b25EaXYuYXBwZW5kQ2hpbGQobmV3VGFza0J1dHRvbik7XG4gICAgICAgIG5ld1Rhc2tEaXYuYXBwZW5kQ2hpbGQoYnV0dG9uRGl2KTtcblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGlzdCcpLmFwcGVuZENoaWxkKG5ld1Rhc2tEaXYpO1xuXG4gICAgfVxuXG4gICAgXG59XG5cbmZ1bmN0aW9uIGRlbGV0ZVRhc2sobGlzdEluZGV4LCB0YXNrSW5kZXgpIHtcbiAgICB0YXNrQ29udHJvbC5saXN0c1tsaXN0SW5kZXhdLnRhc2tzLnNwbGljZSh0YXNrSW5kZXgsIDEpO1xuICAgIHVwZGF0ZVN0b3JhZ2UoKTtcbiAgICBwb3B1bGF0ZVRhc2tzKGxpc3RJbmRleCk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUVkaXRUYXNrUHJvbXB0KGxpc3RJbmRleCwgdGFza0luZGV4KSB7XG4gICAgbGV0IHRhc2tGb3JtRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGFza0Zvcm1EaXYuY2xhc3NOYW1lID0gJ3Rhc2tmb3JtZGl2JztcblxuICAgIGxldCB0YXNrRm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcbiAgICB0YXNrRm9ybS5jbGFzc05hbWUgPSAndGFza2Zvcm0nO1xuXG4gICAgbGV0IHRhc2tIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuICAgIHRhc2tIZWFkZXIudGV4dENvbnRlbnQgPSAnRWRpdCBUYXNrOic7XG5cbiAgICBsZXQgdGFza05hbWVJbnB1dExhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICB0YXNrTmFtZUlucHV0TGFiZWwuZm9yID0gJ3Rhc2tuYW1lJztcbiAgICB0YXNrTmFtZUlucHV0TGFiZWwudGV4dENvbnRlbnQgPSAnVGFzayBOYW1lOiAnO1xuXG4gICAgbGV0IHRhc2tOYW1lSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIHRhc2tOYW1lSW5wdXQudHlwZSA9ICd0ZXh0JztcbiAgICB0YXNrTmFtZUlucHV0LmlkID0gJ3Rhc2tuYW1lJztcbiAgICB0YXNrTmFtZUlucHV0Lm5hbWUgPSAndGFza25hbWUnO1xuICAgIHRhc2tOYW1lSW5wdXQuZGVmYXVsdFZhbHVlID0gdGFza0NvbnRyb2wubGlzdHNbbGlzdEluZGV4XS50YXNrc1t0YXNrSW5kZXhdLm5hbWVcbiAgICB0YXNrTmFtZUlucHV0TGFiZWwuYXBwZW5kQ2hpbGQodGFza05hbWVJbnB1dCk7XG5cbiAgICBsZXQgdGFza0Rlc2NJbnB1dExhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICB0YXNrRGVzY0lucHV0TGFiZWwuZm9yID0gJ3Rhc2tkZXNjJztcbiAgICB0YXNrRGVzY0lucHV0TGFiZWwudGV4dENvbnRlbnQgPSAnVGFzayBEZXNjcmlwdGlvbjogJztcblxuICAgIGxldCB0YXNrRGVzY0lucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICB0YXNrRGVzY0lucHV0LnR5cGUgPSAndGV4dCc7XG4gICAgdGFza0Rlc2NJbnB1dC5pZCA9ICd0YXNrZGVzYyc7XG4gICAgdGFza0Rlc2NJbnB1dC5uYW1lID0gJ3Rhc2tkZXNjJztcbiAgICB0YXNrRGVzY0lucHV0LmRlZmF1bHRWYWx1ZSA9IHRhc2tDb250cm9sLmxpc3RzW2xpc3RJbmRleF0udGFza3NbdGFza0luZGV4XS5kZXNjXG4gICAgdGFza0Rlc2NJbnB1dExhYmVsLmFwcGVuZENoaWxkKHRhc2tEZXNjSW5wdXQpO1xuXG4gICAgbGV0IHRhc2tEdWVJbnB1dExhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICB0YXNrRHVlSW5wdXRMYWJlbC5mb3IgPSAndGFza2R1ZSc7XG4gICAgdGFza0R1ZUlucHV0TGFiZWwudGV4dENvbnRlbnQgPSAnVGFzayBEdWUgRGF0ZTogJztcblxuICAgIGxldCB0YXNrRHVlSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIHRhc2tEdWVJbnB1dC50eXBlID0gJ2RhdGUnO1xuICAgIHRhc2tEdWVJbnB1dC5pZCA9ICd0YXNrZHVlJztcbiAgICB0YXNrRHVlSW5wdXQubmFtZSA9ICd0YXNrZHVlJztcbiAgICB0YXNrRHVlSW5wdXQuZGVmYXVsdFZhbHVlID0gdGFza0NvbnRyb2wubGlzdHNbbGlzdEluZGV4XS50YXNrc1t0YXNrSW5kZXhdLmR1ZVxuICAgIHRhc2tEdWVJbnB1dExhYmVsLmFwcGVuZENoaWxkKHRhc2tEdWVJbnB1dCk7XG5cbiAgICBsZXQgc3VibWl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgc3VibWl0QnV0dG9uLnRleHRDb250ZW50ID0gJ1VwZGF0ZSB0YXNrJztcbiAgICBzdWJtaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRhc2tDb250cm9sLmxpc3RzW2xpc3RJbmRleF0udGFza3NbdGFza0luZGV4XS5uYW1lID0gdGFza05hbWVJbnB1dC52YWx1ZTtcbiAgICAgICAgdGFza0NvbnRyb2wubGlzdHNbbGlzdEluZGV4XS50YXNrc1t0YXNrSW5kZXhdLmRlc2MgPSB0YXNrRGVzY0lucHV0LnZhbHVlO1xuICAgICAgICB0YXNrQ29udHJvbC5saXN0c1tsaXN0SW5kZXhdLnRhc2tzW3Rhc2tJbmRleF0uZHVlID0gdGFza0R1ZUlucHV0LnZhbHVlO1xuICAgICAgICB1cGRhdGVTdG9yYWdlKCk7XG4gICAgICAgIHBvcHVsYXRlVGFza1BhZ2UobGlzdEluZGV4KTtcbiAgICAgICAgdGFza0Zvcm0ucmVzZXQoKTtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhZ2UnKS5pZCA9ICcnO1xuICAgICAgICB0YXNrRm9ybURpdi5yZW1vdmUoKTtcbiAgICB9KTtcblxuXG5cbiAgICB0YXNrRm9ybURpdi5hcHBlbmRDaGlsZCh0YXNrSGVhZGVyKTtcbiAgICB0YXNrRm9ybS5hcHBlbmRDaGlsZCh0YXNrTmFtZUlucHV0TGFiZWwpO1xuICAgIHRhc2tGb3JtLmFwcGVuZENoaWxkKHRhc2tEZXNjSW5wdXRMYWJlbCk7XG4gICAgdGFza0Zvcm0uYXBwZW5kQ2hpbGQodGFza0R1ZUlucHV0TGFiZWwpO1xuICAgIHRhc2tGb3JtLmFwcGVuZENoaWxkKHN1Ym1pdEJ1dHRvbik7XG4gICAgdGFza0Zvcm1EaXYuYXBwZW5kQ2hpbGQodGFza0Zvcm0pO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmFwcGVuZENoaWxkKHRhc2tGb3JtRGl2KTtcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWdlJykuaWQgPSAnYmx1cic7XG59XG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGRsaXN0YnV0dG9uJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBjcmVhdGVMaXN0UHJvbXB0KCkpO1xuXG5pZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xpc3RzJykpIHtcbiAgICB1cGRhdGVGcm9tU3RvcmFnZSgpO1xuICAgIHBvcHVsYXRlTGlzdHMoKTtcbiAgICBwb3B1bGF0ZVRhc2tQYWdlKDApO1xufSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==