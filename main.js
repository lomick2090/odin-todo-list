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

function deleteList() {
    listIndex = this.parentNode.id;
    taskControl.lists.splice(listIndex, 1);
    populateLists();
}

function populateLists() {
    while (document.querySelector('.tasklists').firstChild) {
        document.querySelector('.tasklists').firstChild.remove()
    }

    for (let i = 0; i< taskControl.lists.length; i++) {
        let newListDiv = document.createElement('div');
        let newList = document.createElement('li');
        newListDiv.className = 'listnames'
        newListDiv.id = i
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

function deleteTask(listIndex, taskIndex) {
    taskControl.lists[listIndex].tasks.splice(taskIndex, 1);
    populateTasks(listIndex);
}

function editTask(listIndex, taskIndex) {
    let taskFormDiv = document.createElement('div')
    taskFormDiv.className = 'taskformdiv';

    let taskForm = document.createElement('form');
    taskForm.className = 'taskform';

    let taskHeader = document.createElement('h1');
    taskHeader.textContent = 'Edit Task:';

    let taskNameInputLabel = document.createElement('label');
    taskNameInputLabel.for = 'taskname'
    taskNameInputLabel.textContent = 'Task Name: '

    let taskNameInput = document.createElement('input');
    taskNameInput.type = 'text';
    taskNameInput.id = 'taskname';
    taskNameInput.name = 'taskname';
    taskNameInputLabel.appendChild(taskNameInput)

    let taskDescInputLabel = document.createElement('label');
    taskDescInputLabel.for = 'taskdesc'
    taskDescInputLabel.textContent = 'Task Description: '

    let taskDescInput = document.createElement('input');
    taskDescInput.type = 'text';
    taskDescInput.id = 'taskdesc';
    taskDescInput.name = 'taskdesc';
    taskDescInputLabel.appendChild(taskDescInput)

    let taskDueInputLabel = document.createElement('label');
    taskDueInputLabel.for = 'taskdue'
    taskDueInputLabel.textContent = 'Task Due Date: '

    let taskDueInput = document.createElement('input');
    taskDueInput.type = 'date';
    taskDueInput.id = 'taskdue';
    taskDueInput.name = 'taskdue';
    taskDueInputLabel.appendChild(taskDueInput)

    let submitButton = document.createElement('button');
    submitButton.textContent = 'Add';
    submitButton.addEventListener('click', () => {
        event.preventDefault();
        console.log(listIndex)
        console.log(taskIndex)
        console.log(taskControl.lists[listIndex].tasks[taskIndex])
        taskControl.lists[listIndex].tasks[taskIndex].name = taskNameInput.value;
        taskControl.lists[listIndex].tasks[taskIndex].desc = taskDescInput.value
        taskControl.lists[listIndex].tasks[taskIndex].due = taskDueInput.value
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
        document.querySelector('.tasks').remove()
    }
    

    for (let i = 0; i < (taskControl.lists[listIndex].tasks.length); i++) {
        let newTaskDiv = document.createElement('div');
        newTaskDiv.id = i;
        newTaskDiv.className = 'tasks'

        let newTaskHeader = document.createElement('h3');
        newTaskHeader.textContent = taskControl.lists[listIndex].tasks[i].name
        newTaskDiv.appendChild(newTaskHeader);

        let newTaskDesc = document.createElement('p');
        newTaskDesc.textContent = taskControl.lists[listIndex].tasks[i].desc
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
        taskEditButton.addEventListener('click', () => editTask(listIndex, i));

        let buttonDiv = document.createElement('div');
        buttonDiv.className = 'buttondiv';
        buttonDiv.appendChild(taskEditButton);
        buttonDiv.appendChild(newTaskButton);
        newTaskDiv.appendChild(buttonDiv);

        document.querySelector('.list').appendChild(newTaskDiv);

    }

    
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
    addTaskButton.addEventListener('click', () => {

        //listItem, taskName, taskDesc, taskDue
        let taskFormDiv = document.createElement('div')
        taskFormDiv.className = 'taskformdiv';
    
        let taskForm = document.createElement('form');
        taskForm.className = 'taskform';
    
        let taskHeader = document.createElement('h1');
        taskHeader.textContent = 'Add Task to List:';

        let taskNameInputLabel = document.createElement('label');
        taskNameInputLabel.for = 'taskname'
        taskNameInputLabel.textContent = 'Task Name: '
    
        let taskNameInput = document.createElement('input');
        taskNameInput.type = 'text';
        taskNameInput.id = 'taskname';
        taskNameInput.name = 'taskname';
        taskNameInputLabel.appendChild(taskNameInput)

        let taskDescInputLabel = document.createElement('label');
        taskDescInputLabel.for = 'taskdesc'
        taskDescInputLabel.textContent = 'Task Description: '
    
        let taskDescInput = document.createElement('input');
        taskDescInput.type = 'text';
        taskDescInput.id = 'taskdesc';
        taskDescInput.name = 'taskdesc';
        taskDescInputLabel.appendChild(taskDescInput)

        let taskDueInputLabel = document.createElement('label');
        taskDueInputLabel.for = 'taskdue'
        taskDueInputLabel.textContent = 'Task Due Date: '
    
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
    

    })

    taskDiv.appendChild(taskHeader);
    taskDiv.appendChild(addTaskButton);
    populateTasks(listIndex);
}

document.querySelector('.addlistbutton').addEventListener('click', () => {
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
})


// console.log(taskControl.lists);
// taskControl.createList('hello')
// taskControl.addTask(0, 'Do Laundry', 'Wash and fold laundry', "today");
// console.log(taskControl.lists[0].tasks[0])
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUVBOztBQUVBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW9CLDZCQUE2QjtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7OztBQUlMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW9CLGlEQUFpRDtBQUNyRTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDRDQUE0QywwQ0FBMEM7QUFDdEY7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdDQUFnQyxrQ0FBa0M7O0FBRWxFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7OztBQUlUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLENBQUM7OztBQUdEO0FBQ0E7QUFDQTtBQUNBLDZDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsibGV0IHRhc2tDb250cm9sID0gKCgpID0+IHtcblxuICAgIGxldCBsaXN0cyA9IFtdO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlTGlzdChuYW1lKSB7XG4gICAgICAgIGxpc3RzLnB1c2goe25hbWUsXG4gICAgICAgICAgICB0YXNrczogW11cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkVGFzayhsaXN0SXRlbSwgdGFza05hbWUsIHRhc2tEZXNjLCB0YXNrRHVlLCkge1xuICAgICAgICBsaXN0c1tsaXN0SXRlbV0udGFza3MucHVzaCh7XG4gICAgICAgICAgICBuYW1lOiB0YXNrTmFtZSxcbiAgICAgICAgICAgIGRlc2M6IHRhc2tEZXNjLFxuICAgICAgICAgICAgZHVlOiB0YXNrRHVlXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgY3JlYXRlTGlzdCxcbiAgICAgICAgbGlzdHMsXG4gICAgICAgIGFkZFRhc2ssXG4gICAgfVxuXG59KSgpO1xuXG5mdW5jdGlvbiBkZWxldGVMaXN0KCkge1xuICAgIGxpc3RJbmRleCA9IHRoaXMucGFyZW50Tm9kZS5pZDtcbiAgICB0YXNrQ29udHJvbC5saXN0cy5zcGxpY2UobGlzdEluZGV4LCAxKTtcbiAgICBwb3B1bGF0ZUxpc3RzKCk7XG59XG5cbmZ1bmN0aW9uIHBvcHVsYXRlTGlzdHMoKSB7XG4gICAgd2hpbGUgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrbGlzdHMnKS5maXJzdENoaWxkKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrbGlzdHMnKS5maXJzdENoaWxkLnJlbW92ZSgpXG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGk8IHRhc2tDb250cm9sLmxpc3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCBuZXdMaXN0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxldCBuZXdMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgICAgbmV3TGlzdERpdi5jbGFzc05hbWUgPSAnbGlzdG5hbWVzJ1xuICAgICAgICBuZXdMaXN0RGl2LmlkID0gaVxuICAgICAgICBuZXdMaXN0LnRleHRDb250ZW50ID0gdGFza0NvbnRyb2wubGlzdHNbaV0ubmFtZTtcblxuICAgICAgICBsZXQgbmV3TGlzdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBuZXdMaXN0QnV0dG9uLnRleHRDb250ZW50ID0gJ1gnO1xuICAgICAgICBuZXdMaXN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZGVsZXRlTGlzdCk7XG5cbiAgICAgICAgbmV3TGlzdERpdi5hcHBlbmRDaGlsZChuZXdMaXN0KTtcbiAgICAgICAgbmV3TGlzdERpdi5hcHBlbmRDaGlsZChuZXdMaXN0QnV0dG9uKTtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2tsaXN0cycpLmFwcGVuZENoaWxkKG5ld0xpc3REaXYpO1xuICAgICAgICBuZXdMaXN0RGl2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gIHBvcHVsYXRlVGFza1BhZ2UobmV3TGlzdERpdi5pZCkpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZGVsZXRlVGFzayhsaXN0SW5kZXgsIHRhc2tJbmRleCkge1xuICAgIHRhc2tDb250cm9sLmxpc3RzW2xpc3RJbmRleF0udGFza3Muc3BsaWNlKHRhc2tJbmRleCwgMSk7XG4gICAgcG9wdWxhdGVUYXNrcyhsaXN0SW5kZXgpO1xufVxuXG5mdW5jdGlvbiBlZGl0VGFzayhsaXN0SW5kZXgsIHRhc2tJbmRleCkge1xuICAgIGxldCB0YXNrRm9ybURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgdGFza0Zvcm1EaXYuY2xhc3NOYW1lID0gJ3Rhc2tmb3JtZGl2JztcblxuICAgIGxldCB0YXNrRm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcbiAgICB0YXNrRm9ybS5jbGFzc05hbWUgPSAndGFza2Zvcm0nO1xuXG4gICAgbGV0IHRhc2tIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuICAgIHRhc2tIZWFkZXIudGV4dENvbnRlbnQgPSAnRWRpdCBUYXNrOic7XG5cbiAgICBsZXQgdGFza05hbWVJbnB1dExhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICB0YXNrTmFtZUlucHV0TGFiZWwuZm9yID0gJ3Rhc2tuYW1lJ1xuICAgIHRhc2tOYW1lSW5wdXRMYWJlbC50ZXh0Q29udGVudCA9ICdUYXNrIE5hbWU6ICdcblxuICAgIGxldCB0YXNrTmFtZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICB0YXNrTmFtZUlucHV0LnR5cGUgPSAndGV4dCc7XG4gICAgdGFza05hbWVJbnB1dC5pZCA9ICd0YXNrbmFtZSc7XG4gICAgdGFza05hbWVJbnB1dC5uYW1lID0gJ3Rhc2tuYW1lJztcbiAgICB0YXNrTmFtZUlucHV0TGFiZWwuYXBwZW5kQ2hpbGQodGFza05hbWVJbnB1dClcblxuICAgIGxldCB0YXNrRGVzY0lucHV0TGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgIHRhc2tEZXNjSW5wdXRMYWJlbC5mb3IgPSAndGFza2Rlc2MnXG4gICAgdGFza0Rlc2NJbnB1dExhYmVsLnRleHRDb250ZW50ID0gJ1Rhc2sgRGVzY3JpcHRpb246ICdcblxuICAgIGxldCB0YXNrRGVzY0lucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICB0YXNrRGVzY0lucHV0LnR5cGUgPSAndGV4dCc7XG4gICAgdGFza0Rlc2NJbnB1dC5pZCA9ICd0YXNrZGVzYyc7XG4gICAgdGFza0Rlc2NJbnB1dC5uYW1lID0gJ3Rhc2tkZXNjJztcbiAgICB0YXNrRGVzY0lucHV0TGFiZWwuYXBwZW5kQ2hpbGQodGFza0Rlc2NJbnB1dClcblxuICAgIGxldCB0YXNrRHVlSW5wdXRMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgdGFza0R1ZUlucHV0TGFiZWwuZm9yID0gJ3Rhc2tkdWUnXG4gICAgdGFza0R1ZUlucHV0TGFiZWwudGV4dENvbnRlbnQgPSAnVGFzayBEdWUgRGF0ZTogJ1xuXG4gICAgbGV0IHRhc2tEdWVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgdGFza0R1ZUlucHV0LnR5cGUgPSAnZGF0ZSc7XG4gICAgdGFza0R1ZUlucHV0LmlkID0gJ3Rhc2tkdWUnO1xuICAgIHRhc2tEdWVJbnB1dC5uYW1lID0gJ3Rhc2tkdWUnO1xuICAgIHRhc2tEdWVJbnB1dExhYmVsLmFwcGVuZENoaWxkKHRhc2tEdWVJbnB1dClcblxuICAgIGxldCBzdWJtaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBzdWJtaXRCdXR0b24udGV4dENvbnRlbnQgPSAnQWRkJztcbiAgICBzdWJtaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGxpc3RJbmRleClcbiAgICAgICAgY29uc29sZS5sb2codGFza0luZGV4KVxuICAgICAgICBjb25zb2xlLmxvZyh0YXNrQ29udHJvbC5saXN0c1tsaXN0SW5kZXhdLnRhc2tzW3Rhc2tJbmRleF0pXG4gICAgICAgIHRhc2tDb250cm9sLmxpc3RzW2xpc3RJbmRleF0udGFza3NbdGFza0luZGV4XS5uYW1lID0gdGFza05hbWVJbnB1dC52YWx1ZTtcbiAgICAgICAgdGFza0NvbnRyb2wubGlzdHNbbGlzdEluZGV4XS50YXNrc1t0YXNrSW5kZXhdLmRlc2MgPSB0YXNrRGVzY0lucHV0LnZhbHVlXG4gICAgICAgIHRhc2tDb250cm9sLmxpc3RzW2xpc3RJbmRleF0udGFza3NbdGFza0luZGV4XS5kdWUgPSB0YXNrRHVlSW5wdXQudmFsdWVcbiAgICAgICAgcG9wdWxhdGVUYXNrUGFnZShsaXN0SW5kZXgpO1xuICAgICAgICB0YXNrRm9ybS5yZXNldCgpO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFnZScpLmlkID0gJyc7XG4gICAgICAgIHRhc2tGb3JtRGl2LnJlbW92ZSgpO1xuICAgIH0pO1xuXG5cblxuICAgIHRhc2tGb3JtRGl2LmFwcGVuZENoaWxkKHRhc2tIZWFkZXIpO1xuICAgIHRhc2tGb3JtLmFwcGVuZENoaWxkKHRhc2tOYW1lSW5wdXRMYWJlbCk7XG4gICAgdGFza0Zvcm0uYXBwZW5kQ2hpbGQodGFza0Rlc2NJbnB1dExhYmVsKTtcbiAgICB0YXNrRm9ybS5hcHBlbmRDaGlsZCh0YXNrRHVlSW5wdXRMYWJlbCk7XG4gICAgdGFza0Zvcm0uYXBwZW5kQ2hpbGQoc3VibWl0QnV0dG9uKTtcbiAgICB0YXNrRm9ybURpdi5hcHBlbmRDaGlsZCh0YXNrRm9ybSk7XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuYXBwZW5kQ2hpbGQodGFza0Zvcm1EaXYpO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhZ2UnKS5pZCA9ICdibHVyJztcbn1cblxuZnVuY3Rpb24gcG9wdWxhdGVUYXNrcyhsaXN0SW5kZXgpIHtcbiAgICB3aGlsZSAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2tzJykpIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2tzJykucmVtb3ZlKClcbiAgICB9XG4gICAgXG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8ICh0YXNrQ29udHJvbC5saXN0c1tsaXN0SW5kZXhdLnRhc2tzLmxlbmd0aCk7IGkrKykge1xuICAgICAgICBsZXQgbmV3VGFza0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBuZXdUYXNrRGl2LmlkID0gaTtcbiAgICAgICAgbmV3VGFza0Rpdi5jbGFzc05hbWUgPSAndGFza3MnXG5cbiAgICAgICAgbGV0IG5ld1Rhc2tIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xuICAgICAgICBuZXdUYXNrSGVhZGVyLnRleHRDb250ZW50ID0gdGFza0NvbnRyb2wubGlzdHNbbGlzdEluZGV4XS50YXNrc1tpXS5uYW1lXG4gICAgICAgIG5ld1Rhc2tEaXYuYXBwZW5kQ2hpbGQobmV3VGFza0hlYWRlcik7XG5cbiAgICAgICAgbGV0IG5ld1Rhc2tEZXNjID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICBuZXdUYXNrRGVzYy50ZXh0Q29udGVudCA9IHRhc2tDb250cm9sLmxpc3RzW2xpc3RJbmRleF0udGFza3NbaV0uZGVzY1xuICAgICAgICBuZXdUYXNrRGl2LmFwcGVuZENoaWxkKG5ld1Rhc2tEZXNjKTtcblxuICAgICAgICBsZXQgbmV3VGFza0R1ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgbmV3VGFza0R1ZS50ZXh0Q29udGVudCA9IGBEdWUgYnk6ICR7dGFza0NvbnRyb2wubGlzdHNbbGlzdEluZGV4XS50YXNrc1tpXS5kdWV9YDtcbiAgICAgICAgbmV3VGFza0Rpdi5hcHBlbmRDaGlsZChuZXdUYXNrRHVlKTtcblxuICAgICAgICBsZXQgbmV3VGFza0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBuZXdUYXNrQnV0dG9uLnRleHRDb250ZW50ID0gJ1gnO1xuICAgICAgICBuZXdUYXNrQnV0dG9uLmNsYXNzTmFtZSA9ICd0YXNrRGVsZXRlQnV0dG9uJztcbiAgICAgICAgbmV3VGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IGRlbGV0ZVRhc2sobGlzdEluZGV4LCBpKSk7XG5cbiAgICAgICAgbGV0IHRhc2tFZGl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIHRhc2tFZGl0QnV0dG9uLnRleHRDb250ZW50ID0gJ0VkaXQnO1xuICAgICAgICB0YXNrRWRpdEJ1dHRvbi5jbGFzc05hbWUgPSAndGFza0VkaXRCdXR0b24nO1xuICAgICAgICB0YXNrRWRpdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IGVkaXRUYXNrKGxpc3RJbmRleCwgaSkpO1xuXG4gICAgICAgIGxldCBidXR0b25EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYnV0dG9uRGl2LmNsYXNzTmFtZSA9ICdidXR0b25kaXYnO1xuICAgICAgICBidXR0b25EaXYuYXBwZW5kQ2hpbGQodGFza0VkaXRCdXR0b24pO1xuICAgICAgICBidXR0b25EaXYuYXBwZW5kQ2hpbGQobmV3VGFza0J1dHRvbik7XG4gICAgICAgIG5ld1Rhc2tEaXYuYXBwZW5kQ2hpbGQoYnV0dG9uRGl2KTtcblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGlzdCcpLmFwcGVuZENoaWxkKG5ld1Rhc2tEaXYpO1xuXG4gICAgfVxuXG4gICAgXG59XG5cbmZ1bmN0aW9uIHBvcHVsYXRlVGFza1BhZ2UobGlzdEluZGV4KSB7XG4gICAgd2hpbGUgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saXN0JykuZmlyc3RDaGlsZCkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGlzdCcpLmZpcnN0Q2hpbGQucmVtb3ZlKCk7XG4gICAgfVxuXG4gICAgbGV0IHRhc2tEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFza3RpdGxlJyk7XG5cbiAgICB3aGlsZSAodGFza0Rpdi5maXJzdENoaWxkKSB7XG4gICAgICAgIHRhc2tEaXYuZmlyc3RDaGlsZC5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICBsZXQgdGFza0hlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgKCdoMScpO1xuICAgIHRhc2tIZWFkZXIudGV4dENvbnRlbnQgPSBgJHt0YXNrQ29udHJvbC5saXN0c1tsaXN0SW5kZXhdLm5hbWV9YDtcblxuICAgIGxldCBhZGRUYXNrQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgYWRkVGFza0J1dHRvbi50ZXh0Q29udGVudCA9ICdBZGQgVGFzayArJztcbiAgICBhZGRUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXG4gICAgICAgIC8vbGlzdEl0ZW0sIHRhc2tOYW1lLCB0YXNrRGVzYywgdGFza0R1ZVxuICAgICAgICBsZXQgdGFza0Zvcm1EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICB0YXNrRm9ybURpdi5jbGFzc05hbWUgPSAndGFza2Zvcm1kaXYnO1xuICAgIFxuICAgICAgICBsZXQgdGFza0Zvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XG4gICAgICAgIHRhc2tGb3JtLmNsYXNzTmFtZSA9ICd0YXNrZm9ybSc7XG4gICAgXG4gICAgICAgIGxldCB0YXNrSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgICAgICAgdGFza0hlYWRlci50ZXh0Q29udGVudCA9ICdBZGQgVGFzayB0byBMaXN0Oic7XG5cbiAgICAgICAgbGV0IHRhc2tOYW1lSW5wdXRMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgIHRhc2tOYW1lSW5wdXRMYWJlbC5mb3IgPSAndGFza25hbWUnXG4gICAgICAgIHRhc2tOYW1lSW5wdXRMYWJlbC50ZXh0Q29udGVudCA9ICdUYXNrIE5hbWU6ICdcbiAgICBcbiAgICAgICAgbGV0IHRhc2tOYW1lSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICB0YXNrTmFtZUlucHV0LnR5cGUgPSAndGV4dCc7XG4gICAgICAgIHRhc2tOYW1lSW5wdXQuaWQgPSAndGFza25hbWUnO1xuICAgICAgICB0YXNrTmFtZUlucHV0Lm5hbWUgPSAndGFza25hbWUnO1xuICAgICAgICB0YXNrTmFtZUlucHV0TGFiZWwuYXBwZW5kQ2hpbGQodGFza05hbWVJbnB1dClcblxuICAgICAgICBsZXQgdGFza0Rlc2NJbnB1dExhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICAgICAgdGFza0Rlc2NJbnB1dExhYmVsLmZvciA9ICd0YXNrZGVzYydcbiAgICAgICAgdGFza0Rlc2NJbnB1dExhYmVsLnRleHRDb250ZW50ID0gJ1Rhc2sgRGVzY3JpcHRpb246ICdcbiAgICBcbiAgICAgICAgbGV0IHRhc2tEZXNjSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICB0YXNrRGVzY0lucHV0LnR5cGUgPSAndGV4dCc7XG4gICAgICAgIHRhc2tEZXNjSW5wdXQuaWQgPSAndGFza2Rlc2MnO1xuICAgICAgICB0YXNrRGVzY0lucHV0Lm5hbWUgPSAndGFza2Rlc2MnO1xuICAgICAgICB0YXNrRGVzY0lucHV0TGFiZWwuYXBwZW5kQ2hpbGQodGFza0Rlc2NJbnB1dClcblxuICAgICAgICBsZXQgdGFza0R1ZUlucHV0TGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgICB0YXNrRHVlSW5wdXRMYWJlbC5mb3IgPSAndGFza2R1ZSdcbiAgICAgICAgdGFza0R1ZUlucHV0TGFiZWwudGV4dENvbnRlbnQgPSAnVGFzayBEdWUgRGF0ZTogJ1xuICAgIFxuICAgICAgICBsZXQgdGFza0R1ZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgdGFza0R1ZUlucHV0LnR5cGUgPSAnZGF0ZSc7XG4gICAgICAgIHRhc2tEdWVJbnB1dC5pZCA9ICd0YXNrZHVlJztcbiAgICAgICAgdGFza0R1ZUlucHV0Lm5hbWUgPSAndGFza2R1ZSc7XG4gICAgICAgIHRhc2tEdWVJbnB1dExhYmVsLmFwcGVuZENoaWxkKHRhc2tEdWVJbnB1dClcblxuICAgICAgICBsZXQgc3VibWl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIHN1Ym1pdEJ1dHRvbi50ZXh0Q29udGVudCA9ICdBZGQnO1xuICAgICAgICBzdWJtaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGFza0NvbnRyb2wuYWRkVGFzayhsaXN0SW5kZXgsIHRhc2tOYW1lSW5wdXQudmFsdWUsIHRhc2tEZXNjSW5wdXQudmFsdWUsIHRhc2tEdWVJbnB1dC52YWx1ZSk7XG4gICAgICAgICAgICBwb3B1bGF0ZVRhc2tQYWdlKGxpc3RJbmRleCk7XG4gICAgICAgICAgICB0YXNrRm9ybS5yZXNldCgpO1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhZ2UnKS5pZCA9ICcnO1xuICAgICAgICAgICAgdGFza0Zvcm1EaXYucmVtb3ZlKCk7XG4gICAgICAgIH0pO1xuXG5cblxuICAgICAgICB0YXNrRm9ybURpdi5hcHBlbmRDaGlsZCh0YXNrSGVhZGVyKTtcbiAgICAgICAgdGFza0Zvcm0uYXBwZW5kQ2hpbGQodGFza05hbWVJbnB1dExhYmVsKTtcbiAgICAgICAgdGFza0Zvcm0uYXBwZW5kQ2hpbGQodGFza0Rlc2NJbnB1dExhYmVsKTtcbiAgICAgICAgdGFza0Zvcm0uYXBwZW5kQ2hpbGQodGFza0R1ZUlucHV0TGFiZWwpO1xuICAgICAgICB0YXNrRm9ybS5hcHBlbmRDaGlsZChzdWJtaXRCdXR0b24pO1xuICAgICAgICB0YXNrRm9ybURpdi5hcHBlbmRDaGlsZCh0YXNrRm9ybSk7XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmFwcGVuZENoaWxkKHRhc2tGb3JtRGl2KTtcblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFnZScpLmlkID0gJ2JsdXInO1xuICAgIFxuXG4gICAgfSlcblxuICAgIHRhc2tEaXYuYXBwZW5kQ2hpbGQodGFza0hlYWRlcik7XG4gICAgdGFza0Rpdi5hcHBlbmRDaGlsZChhZGRUYXNrQnV0dG9uKTtcbiAgICBwb3B1bGF0ZVRhc2tzKGxpc3RJbmRleCk7XG59XG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGRsaXN0YnV0dG9uJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgbGV0IGxpc3RGb3JtRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBsaXN0Rm9ybURpdi5jbGFzc05hbWUgPSAnbGlzdGZvcm1kaXYnO1xuXG4gICAgbGV0IGxpc3RGb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICAgIGxpc3RGb3JtLmNsYXNzTmFtZSA9ICdsaXN0Zm9ybSc7XG5cbiAgICBsZXQgbGlzdEhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJyk7XG4gICAgbGlzdEhlYWRlci50ZXh0Q29udGVudCA9ICdBZGQgTGlzdDonO1xuXG4gICAgbGV0IGxpc3RJbnB1dExhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICBsaXN0SW5wdXRMYWJlbC5mb3IgPSAnbGlzdG5hbWUnXG4gICAgbGlzdElucHV0TGFiZWwudGV4dENvbnRlbnQgPSAnTGlzdCBOYW1lOiAnXG5cbiAgICBsZXQgbGlzdElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBsaXN0SW5wdXQudHlwZSA9ICd0ZXh0JztcbiAgICBsaXN0SW5wdXQuaWQgPSAnbGlzdG5hbWUnO1xuICAgIGxpc3RJbnB1dC5uYW1lID0gJ2xpc3RuYW1lJztcblxuICAgIGxldCBzdWJtaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBzdWJtaXRCdXR0b24udGV4dENvbnRlbnQgPSAnQWRkJztcbiAgICBzdWJtaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWdlJykuaWQgPSAnJztcbiAgICAgICAgaWYgKGxpc3RJbnB1dC52YWx1ZSAhPSAnJykge1xuICAgICAgICAgICAgdGFza0NvbnRyb2wuY3JlYXRlTGlzdChsaXN0SW5wdXQudmFsdWUpO1xuICAgICAgICAgICAgcG9wdWxhdGVMaXN0cygpO1xuICAgICAgICB9XG4gICAgICAgIGxpc3RGb3JtLnJlc2V0KCk7XG4gICAgICAgIGxpc3RGb3JtRGl2LnJlbW92ZSgpO1xuICAgIH0pO1xuXG4gICAgbGlzdElucHV0TGFiZWwuYXBwZW5kQ2hpbGQobGlzdElucHV0KTtcbiAgICBsaXN0Rm9ybS5hcHBlbmRDaGlsZChsaXN0SGVhZGVyKTtcbiAgICBsaXN0Rm9ybS5hcHBlbmRDaGlsZChsaXN0SW5wdXRMYWJlbCk7XG4gICAgbGlzdEZvcm0uYXBwZW5kQ2hpbGQoc3VibWl0QnV0dG9uKTtcbiAgICBsaXN0Rm9ybURpdi5hcHBlbmRDaGlsZChsaXN0Rm9ybSk7XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuYXBwZW5kQ2hpbGQobGlzdEZvcm1EaXYpO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhZ2UnKS5pZCA9ICdibHVyJztcbn0pXG5cblxuLy8gY29uc29sZS5sb2codGFza0NvbnRyb2wubGlzdHMpO1xuLy8gdGFza0NvbnRyb2wuY3JlYXRlTGlzdCgnaGVsbG8nKVxuLy8gdGFza0NvbnRyb2wuYWRkVGFzaygwLCAnRG8gTGF1bmRyeScsICdXYXNoIGFuZCBmb2xkIGxhdW5kcnknLCBcInRvZGF5XCIpO1xuLy8gY29uc29sZS5sb2codGFza0NvbnRyb2wubGlzdHNbMF0udGFza3NbMF0pIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9