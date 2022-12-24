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


function populateLists() {
    let newList = document.createElement('li');
    newList.className = 'listnames'
    newList.id = `${taskControl.lists.length -1}`
    newList.textContent = taskControl.lists[(taskControl.lists.length - 1)].name;
    document.querySelector('.tasklists').appendChild(newList);
    newList.addEventListener('click', () =>  populateTaskPage(newList.id));
}

function populateTasks(listIndex) {
    if (document.querySelector('.tasks')) {
        document.querySelector('.tasks').remove()
    }
    let newTaskDiv = document.createElement('div');
    newTaskDiv.className = 'tasks'

    for (let i = 0; i < (taskControl.lists[listIndex].tasks.length); i++) {
        let newTaskHeader = document.createElement('h3');
        newTaskHeader.textContent = taskControl.lists[listIndex].tasks[i].name
        newTaskDiv.appendChild(newTaskHeader);

        let newTaskDesc = document.createElement('p');
        newTaskDesc.textContent = taskControl.lists[listIndex].tasks[i].desc
        newTaskDiv.appendChild(newTaskDesc);

        let newTaskDue = document.createElement('p');
        newTaskDue.textContent = `Due by: ${taskControl.lists[listIndex].tasks[i].due}`;
        newTaskDiv.appendChild(newTaskDue);

    }

    document.querySelector('.list').appendChild(newTaskDiv);
}

function populateTaskPage(listIndex) {
    while (document.querySelector('.list').firstChild) {
        document.querySelector('.list').firstChild.remove();
    }

    let taskDiv = document.createElement('div');
    taskDiv.className = 'taskDiv';

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
    document.querySelector('.list').appendChild(taskDiv);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUVBOztBQUVBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDOzs7QUFHRDtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsNEJBQTRCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvQkFBb0IsaURBQWlEO0FBQ3JFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw0Q0FBNEMsMENBQTBDO0FBQ3RGOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGdDQUFnQyxrQ0FBa0M7O0FBRWxFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7OztBQUlUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsQ0FBQzs7O0FBR0Q7QUFDQTtBQUNBO0FBQ0EsNkMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgdGFza0NvbnRyb2wgPSAoKCkgPT4ge1xuXG4gICAgbGV0IGxpc3RzID0gW107XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVMaXN0KG5hbWUpIHtcbiAgICAgICAgbGlzdHMucHVzaCh7bmFtZSxcbiAgICAgICAgICAgIHRhc2tzOiBbXVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRUYXNrKGxpc3RJdGVtLCB0YXNrTmFtZSwgdGFza0Rlc2MsIHRhc2tEdWUsKSB7XG4gICAgICAgIGxpc3RzW2xpc3RJdGVtXS50YXNrcy5wdXNoKHtcbiAgICAgICAgICAgIG5hbWU6IHRhc2tOYW1lLFxuICAgICAgICAgICAgZGVzYzogdGFza0Rlc2MsXG4gICAgICAgICAgICBkdWU6IHRhc2tEdWVcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjcmVhdGVMaXN0LFxuICAgICAgICBsaXN0cyxcbiAgICAgICAgYWRkVGFzayxcbiAgICB9XG5cbn0pKCk7XG5cblxuZnVuY3Rpb24gcG9wdWxhdGVMaXN0cygpIHtcbiAgICBsZXQgbmV3TGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgbmV3TGlzdC5jbGFzc05hbWUgPSAnbGlzdG5hbWVzJ1xuICAgIG5ld0xpc3QuaWQgPSBgJHt0YXNrQ29udHJvbC5saXN0cy5sZW5ndGggLTF9YFxuICAgIG5ld0xpc3QudGV4dENvbnRlbnQgPSB0YXNrQ29udHJvbC5saXN0c1sodGFza0NvbnRyb2wubGlzdHMubGVuZ3RoIC0gMSldLm5hbWU7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2tsaXN0cycpLmFwcGVuZENoaWxkKG5ld0xpc3QpO1xuICAgIG5ld0xpc3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiAgcG9wdWxhdGVUYXNrUGFnZShuZXdMaXN0LmlkKSk7XG59XG5cbmZ1bmN0aW9uIHBvcHVsYXRlVGFza3MobGlzdEluZGV4KSB7XG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrcycpKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrcycpLnJlbW92ZSgpXG4gICAgfVxuICAgIGxldCBuZXdUYXNrRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbmV3VGFza0Rpdi5jbGFzc05hbWUgPSAndGFza3MnXG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8ICh0YXNrQ29udHJvbC5saXN0c1tsaXN0SW5kZXhdLnRhc2tzLmxlbmd0aCk7IGkrKykge1xuICAgICAgICBsZXQgbmV3VGFza0hlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XG4gICAgICAgIG5ld1Rhc2tIZWFkZXIudGV4dENvbnRlbnQgPSB0YXNrQ29udHJvbC5saXN0c1tsaXN0SW5kZXhdLnRhc2tzW2ldLm5hbWVcbiAgICAgICAgbmV3VGFza0Rpdi5hcHBlbmRDaGlsZChuZXdUYXNrSGVhZGVyKTtcblxuICAgICAgICBsZXQgbmV3VGFza0Rlc2MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgIG5ld1Rhc2tEZXNjLnRleHRDb250ZW50ID0gdGFza0NvbnRyb2wubGlzdHNbbGlzdEluZGV4XS50YXNrc1tpXS5kZXNjXG4gICAgICAgIG5ld1Rhc2tEaXYuYXBwZW5kQ2hpbGQobmV3VGFza0Rlc2MpO1xuXG4gICAgICAgIGxldCBuZXdUYXNrRHVlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICBuZXdUYXNrRHVlLnRleHRDb250ZW50ID0gYER1ZSBieTogJHt0YXNrQ29udHJvbC5saXN0c1tsaXN0SW5kZXhdLnRhc2tzW2ldLmR1ZX1gO1xuICAgICAgICBuZXdUYXNrRGl2LmFwcGVuZENoaWxkKG5ld1Rhc2tEdWUpO1xuXG4gICAgfVxuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpc3QnKS5hcHBlbmRDaGlsZChuZXdUYXNrRGl2KTtcbn1cblxuZnVuY3Rpb24gcG9wdWxhdGVUYXNrUGFnZShsaXN0SW5kZXgpIHtcbiAgICB3aGlsZSAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpc3QnKS5maXJzdENoaWxkKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saXN0JykuZmlyc3RDaGlsZC5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICBsZXQgdGFza0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRhc2tEaXYuY2xhc3NOYW1lID0gJ3Rhc2tEaXYnO1xuXG4gICAgbGV0IHRhc2tIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50ICgnaDEnKTtcbiAgICB0YXNrSGVhZGVyLnRleHRDb250ZW50ID0gYCR7dGFza0NvbnRyb2wubGlzdHNbbGlzdEluZGV4XS5uYW1lfWA7XG5cbiAgICBsZXQgYWRkVGFza0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGFkZFRhc2tCdXR0b24udGV4dENvbnRlbnQgPSAnQWRkIFRhc2sgKyc7XG4gICAgYWRkVGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblxuICAgICAgICAvL2xpc3RJdGVtLCB0YXNrTmFtZSwgdGFza0Rlc2MsIHRhc2tEdWVcbiAgICAgICAgbGV0IHRhc2tGb3JtRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgdGFza0Zvcm1EaXYuY2xhc3NOYW1lID0gJ3Rhc2tmb3JtZGl2JztcbiAgICBcbiAgICAgICAgbGV0IHRhc2tGb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICAgICAgICB0YXNrRm9ybS5jbGFzc05hbWUgPSAndGFza2Zvcm0nO1xuICAgIFxuICAgICAgICBsZXQgdGFza0hlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJyk7XG4gICAgICAgIHRhc2tIZWFkZXIudGV4dENvbnRlbnQgPSAnQWRkIFRhc2sgdG8gTGlzdDonO1xuXG4gICAgICAgIGxldCB0YXNrTmFtZUlucHV0TGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgICB0YXNrTmFtZUlucHV0TGFiZWwuZm9yID0gJ3Rhc2tuYW1lJ1xuICAgICAgICB0YXNrTmFtZUlucHV0TGFiZWwudGV4dENvbnRlbnQgPSAnVGFzayBOYW1lOiAnXG4gICAgXG4gICAgICAgIGxldCB0YXNrTmFtZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgdGFza05hbWVJbnB1dC50eXBlID0gJ3RleHQnO1xuICAgICAgICB0YXNrTmFtZUlucHV0LmlkID0gJ3Rhc2tuYW1lJztcbiAgICAgICAgdGFza05hbWVJbnB1dC5uYW1lID0gJ3Rhc2tuYW1lJztcbiAgICAgICAgdGFza05hbWVJbnB1dExhYmVsLmFwcGVuZENoaWxkKHRhc2tOYW1lSW5wdXQpXG5cbiAgICAgICAgbGV0IHRhc2tEZXNjSW5wdXRMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgIHRhc2tEZXNjSW5wdXRMYWJlbC5mb3IgPSAndGFza2Rlc2MnXG4gICAgICAgIHRhc2tEZXNjSW5wdXRMYWJlbC50ZXh0Q29udGVudCA9ICdUYXNrIERlc2NyaXB0aW9uOiAnXG4gICAgXG4gICAgICAgIGxldCB0YXNrRGVzY0lucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgdGFza0Rlc2NJbnB1dC50eXBlID0gJ3RleHQnO1xuICAgICAgICB0YXNrRGVzY0lucHV0LmlkID0gJ3Rhc2tkZXNjJztcbiAgICAgICAgdGFza0Rlc2NJbnB1dC5uYW1lID0gJ3Rhc2tkZXNjJztcbiAgICAgICAgdGFza0Rlc2NJbnB1dExhYmVsLmFwcGVuZENoaWxkKHRhc2tEZXNjSW5wdXQpXG5cbiAgICAgICAgbGV0IHRhc2tEdWVJbnB1dExhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICAgICAgdGFza0R1ZUlucHV0TGFiZWwuZm9yID0gJ3Rhc2tkdWUnXG4gICAgICAgIHRhc2tEdWVJbnB1dExhYmVsLnRleHRDb250ZW50ID0gJ1Rhc2sgRHVlIERhdGU6ICdcbiAgICBcbiAgICAgICAgbGV0IHRhc2tEdWVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgIHRhc2tEdWVJbnB1dC50eXBlID0gJ2RhdGUnO1xuICAgICAgICB0YXNrRHVlSW5wdXQuaWQgPSAndGFza2R1ZSc7XG4gICAgICAgIHRhc2tEdWVJbnB1dC5uYW1lID0gJ3Rhc2tkdWUnO1xuICAgICAgICB0YXNrRHVlSW5wdXRMYWJlbC5hcHBlbmRDaGlsZCh0YXNrRHVlSW5wdXQpXG5cbiAgICAgICAgbGV0IHN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBzdWJtaXRCdXR0b24udGV4dENvbnRlbnQgPSAnQWRkJztcbiAgICAgICAgc3VibWl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRhc2tDb250cm9sLmFkZFRhc2sobGlzdEluZGV4LCB0YXNrTmFtZUlucHV0LnZhbHVlLCB0YXNrRGVzY0lucHV0LnZhbHVlLCB0YXNrRHVlSW5wdXQudmFsdWUpO1xuICAgICAgICAgICAgcG9wdWxhdGVUYXNrUGFnZShsaXN0SW5kZXgpO1xuICAgICAgICAgICAgdGFza0Zvcm0ucmVzZXQoKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWdlJykuaWQgPSAnJztcbiAgICAgICAgICAgIHRhc2tGb3JtRGl2LnJlbW92ZSgpO1xuICAgICAgICB9KTtcblxuXG5cbiAgICAgICAgdGFza0Zvcm1EaXYuYXBwZW5kQ2hpbGQodGFza0hlYWRlcik7XG4gICAgICAgIHRhc2tGb3JtLmFwcGVuZENoaWxkKHRhc2tOYW1lSW5wdXRMYWJlbCk7XG4gICAgICAgIHRhc2tGb3JtLmFwcGVuZENoaWxkKHRhc2tEZXNjSW5wdXRMYWJlbCk7XG4gICAgICAgIHRhc2tGb3JtLmFwcGVuZENoaWxkKHRhc2tEdWVJbnB1dExhYmVsKTtcbiAgICAgICAgdGFza0Zvcm0uYXBwZW5kQ2hpbGQoc3VibWl0QnV0dG9uKTtcbiAgICAgICAgdGFza0Zvcm1EaXYuYXBwZW5kQ2hpbGQodGFza0Zvcm0pO1xuXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5hcHBlbmRDaGlsZCh0YXNrRm9ybURpdik7XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhZ2UnKS5pZCA9ICdibHVyJztcbiAgICBcblxuICAgIH0pXG5cbiAgICB0YXNrRGl2LmFwcGVuZENoaWxkKHRhc2tIZWFkZXIpO1xuICAgIHRhc2tEaXYuYXBwZW5kQ2hpbGQoYWRkVGFza0J1dHRvbik7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpc3QnKS5hcHBlbmRDaGlsZCh0YXNrRGl2KTtcbiAgICBwb3B1bGF0ZVRhc2tzKGxpc3RJbmRleCk7XG59XG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGRsaXN0YnV0dG9uJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgbGV0IGxpc3RGb3JtRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBsaXN0Rm9ybURpdi5jbGFzc05hbWUgPSAnbGlzdGZvcm1kaXYnO1xuXG4gICAgbGV0IGxpc3RGb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICAgIGxpc3RGb3JtLmNsYXNzTmFtZSA9ICdsaXN0Zm9ybSc7XG5cbiAgICBsZXQgbGlzdEhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJyk7XG4gICAgbGlzdEhlYWRlci50ZXh0Q29udGVudCA9ICdBZGQgTGlzdDonO1xuXG4gICAgbGV0IGxpc3RJbnB1dExhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICBsaXN0SW5wdXRMYWJlbC5mb3IgPSAnbGlzdG5hbWUnXG4gICAgbGlzdElucHV0TGFiZWwudGV4dENvbnRlbnQgPSAnTGlzdCBOYW1lOiAnXG5cbiAgICBsZXQgbGlzdElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBsaXN0SW5wdXQudHlwZSA9ICd0ZXh0JztcbiAgICBsaXN0SW5wdXQuaWQgPSAnbGlzdG5hbWUnO1xuICAgIGxpc3RJbnB1dC5uYW1lID0gJ2xpc3RuYW1lJztcblxuICAgIGxldCBzdWJtaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBzdWJtaXRCdXR0b24udGV4dENvbnRlbnQgPSAnQWRkJztcbiAgICBzdWJtaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWdlJykuaWQgPSAnJztcbiAgICAgICAgaWYgKGxpc3RJbnB1dC52YWx1ZSAhPSAnJykge1xuICAgICAgICAgICAgdGFza0NvbnRyb2wuY3JlYXRlTGlzdChsaXN0SW5wdXQudmFsdWUpO1xuICAgICAgICAgICAgcG9wdWxhdGVMaXN0cygpO1xuICAgICAgICB9XG4gICAgICAgIGxpc3RGb3JtLnJlc2V0KCk7XG4gICAgICAgIGxpc3RGb3JtRGl2LnJlbW92ZSgpO1xuICAgIH0pO1xuXG4gICAgbGlzdElucHV0TGFiZWwuYXBwZW5kQ2hpbGQobGlzdElucHV0KTtcbiAgICBsaXN0Rm9ybS5hcHBlbmRDaGlsZChsaXN0SGVhZGVyKTtcbiAgICBsaXN0Rm9ybS5hcHBlbmRDaGlsZChsaXN0SW5wdXRMYWJlbCk7XG4gICAgbGlzdEZvcm0uYXBwZW5kQ2hpbGQoc3VibWl0QnV0dG9uKTtcbiAgICBsaXN0Rm9ybURpdi5hcHBlbmRDaGlsZChsaXN0Rm9ybSk7XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuYXBwZW5kQ2hpbGQobGlzdEZvcm1EaXYpO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhZ2UnKS5pZCA9ICdibHVyJztcbn0pXG5cblxuLy8gY29uc29sZS5sb2codGFza0NvbnRyb2wubGlzdHMpO1xuLy8gdGFza0NvbnRyb2wuY3JlYXRlTGlzdCgnaGVsbG8nKVxuLy8gdGFza0NvbnRyb2wuYWRkVGFzaygwLCAnRG8gTGF1bmRyeScsICdXYXNoIGFuZCBmb2xkIGxhdW5kcnknLCBcInRvZGF5XCIpO1xuLy8gY29uc29sZS5sb2codGFza0NvbnRyb2wubGlzdHNbMF0udGFza3NbMF0pIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9