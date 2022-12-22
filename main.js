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
    let newList = document.createElement('div');
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
        taskDueInputLabel.textContent = 'Task Description: '
    
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUVBOztBQUVBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDOzs7QUFHRDtBQUNBO0FBQ0Esb0JBQW9CLDRCQUE0QjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW9CLGlEQUFpRDtBQUNyRTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNENBQTRDLDBDQUEwQztBQUN0Rjs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxnQ0FBZ0Msa0NBQWtDOztBQUVsRTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7Ozs7QUFJVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLENBQUM7OztBQUdEO0FBQ0E7QUFDQTtBQUNBLDZDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsibGV0IHRhc2tDb250cm9sID0gKCgpID0+IHtcblxuICAgIGxldCBsaXN0cyA9IFtdO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlTGlzdChuYW1lKSB7XG4gICAgICAgIGxpc3RzLnB1c2goe25hbWUsXG4gICAgICAgICAgICB0YXNrczogW11cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkVGFzayhsaXN0SXRlbSwgdGFza05hbWUsIHRhc2tEZXNjLCB0YXNrRHVlLCkge1xuICAgICAgICBsaXN0c1tsaXN0SXRlbV0udGFza3MucHVzaCh7XG4gICAgICAgICAgICBuYW1lOiB0YXNrTmFtZSxcbiAgICAgICAgICAgIGRlc2M6IHRhc2tEZXNjLFxuICAgICAgICAgICAgZHVlOiB0YXNrRHVlXG4gICAgICAgIH0pXG4gICAgfVxuXG5cblxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgY3JlYXRlTGlzdCxcbiAgICAgICAgbGlzdHMsXG4gICAgICAgIGFkZFRhc2ssXG4gICAgfVxuXG59KSgpO1xuXG5cbmZ1bmN0aW9uIHBvcHVsYXRlTGlzdHMoKSB7XG4gICAgbGV0IG5ld0xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBuZXdMaXN0LmlkID0gYCR7dGFza0NvbnRyb2wubGlzdHMubGVuZ3RoIC0xfWBcbiAgICBuZXdMaXN0LnRleHRDb250ZW50ID0gdGFza0NvbnRyb2wubGlzdHNbKHRhc2tDb250cm9sLmxpc3RzLmxlbmd0aCAtIDEpXS5uYW1lO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrbGlzdHMnKS5hcHBlbmRDaGlsZChuZXdMaXN0KTtcbiAgICBuZXdMaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gIHBvcHVsYXRlVGFza1BhZ2UobmV3TGlzdC5pZCkpO1xufVxuXG5mdW5jdGlvbiBwb3B1bGF0ZVRhc2tzKGxpc3RJbmRleCkge1xuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFza3MnKSkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFza3MnKS5yZW1vdmUoKVxuICAgIH1cbiAgICBsZXQgbmV3VGFza0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIG5ld1Rhc2tEaXYuY2xhc3NOYW1lID0gJ3Rhc2tzJ1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAodGFza0NvbnRyb2wubGlzdHNbbGlzdEluZGV4XS50YXNrcy5sZW5ndGgpOyBpKyspIHtcbiAgICAgICAgbGV0IG5ld1Rhc2tIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xuICAgICAgICBuZXdUYXNrSGVhZGVyLnRleHRDb250ZW50ID0gdGFza0NvbnRyb2wubGlzdHNbbGlzdEluZGV4XS50YXNrc1tpXS5uYW1lXG4gICAgICAgIG5ld1Rhc2tEaXYuYXBwZW5kQ2hpbGQobmV3VGFza0hlYWRlcik7XG5cbiAgICAgICAgbGV0IG5ld1Rhc2tEZXNjID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICBuZXdUYXNrRGVzYy50ZXh0Q29udGVudCA9IHRhc2tDb250cm9sLmxpc3RzW2xpc3RJbmRleF0udGFza3NbaV0uZGVzY1xuICAgICAgICBuZXdUYXNrRGl2LmFwcGVuZENoaWxkKG5ld1Rhc2tEZXNjKTtcblxuICAgICAgICBsZXQgbmV3VGFza0R1ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgbmV3VGFza0R1ZS50ZXh0Q29udGVudCA9IGBEdWUgYnk6ICR7dGFza0NvbnRyb2wubGlzdHNbbGlzdEluZGV4XS50YXNrc1tpXS5kdWV9YDtcbiAgICAgICAgbmV3VGFza0Rpdi5hcHBlbmRDaGlsZChuZXdUYXNrRHVlKTtcblxuICAgIH1cblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saXN0JykuYXBwZW5kQ2hpbGQobmV3VGFza0Rpdik7XG59XG5cbmZ1bmN0aW9uIHBvcHVsYXRlVGFza1BhZ2UobGlzdEluZGV4KSB7XG4gICAgd2hpbGUgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saXN0JykuZmlyc3RDaGlsZCkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGlzdCcpLmZpcnN0Q2hpbGQucmVtb3ZlKCk7XG4gICAgfVxuXG4gICAgbGV0IHRhc2tEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0YXNrRGl2LmNsYXNzTmFtZSA9ICd0YXNrRGl2JztcblxuICAgIGxldCB0YXNrSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCAoJ2gxJyk7XG4gICAgdGFza0hlYWRlci50ZXh0Q29udGVudCA9IGAke3Rhc2tDb250cm9sLmxpc3RzW2xpc3RJbmRleF0ubmFtZX1gO1xuXG4gICAgbGV0IGFkZFRhc2tCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBhZGRUYXNrQnV0dG9uLnRleHRDb250ZW50ID0gJ0FkZCBUYXNrICsnO1xuICAgIGFkZFRhc2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cbiAgICAgICAgLy9saXN0SXRlbSwgdGFza05hbWUsIHRhc2tEZXNjLCB0YXNrRHVlXG4gICAgICAgIGxldCB0YXNrRm9ybURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIHRhc2tGb3JtRGl2LmNsYXNzTmFtZSA9ICd0YXNrZm9ybWRpdic7XG4gICAgXG4gICAgICAgIGxldCB0YXNrRm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcbiAgICAgICAgdGFza0Zvcm0uY2xhc3NOYW1lID0gJ3Rhc2tmb3JtJztcbiAgICBcbiAgICAgICAgbGV0IHRhc2tIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuICAgICAgICB0YXNrSGVhZGVyLnRleHRDb250ZW50ID0gJ0FkZCBUYXNrIHRvIExpc3Q6JztcblxuICAgICAgICBsZXQgdGFza05hbWVJbnB1dExhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICAgICAgdGFza05hbWVJbnB1dExhYmVsLmZvciA9ICd0YXNrbmFtZSdcbiAgICAgICAgdGFza05hbWVJbnB1dExhYmVsLnRleHRDb250ZW50ID0gJ1Rhc2sgTmFtZTogJ1xuICAgIFxuICAgICAgICBsZXQgdGFza05hbWVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgIHRhc2tOYW1lSW5wdXQudHlwZSA9ICd0ZXh0JztcbiAgICAgICAgdGFza05hbWVJbnB1dC5pZCA9ICd0YXNrbmFtZSc7XG4gICAgICAgIHRhc2tOYW1lSW5wdXQubmFtZSA9ICd0YXNrbmFtZSc7XG4gICAgICAgIHRhc2tOYW1lSW5wdXRMYWJlbC5hcHBlbmRDaGlsZCh0YXNrTmFtZUlucHV0KVxuXG4gICAgICAgIGxldCB0YXNrRGVzY0lucHV0TGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgICB0YXNrRGVzY0lucHV0TGFiZWwuZm9yID0gJ3Rhc2tkZXNjJ1xuICAgICAgICB0YXNrRGVzY0lucHV0TGFiZWwudGV4dENvbnRlbnQgPSAnVGFzayBEZXNjcmlwdGlvbjogJ1xuICAgIFxuICAgICAgICBsZXQgdGFza0Rlc2NJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgIHRhc2tEZXNjSW5wdXQudHlwZSA9ICd0ZXh0JztcbiAgICAgICAgdGFza0Rlc2NJbnB1dC5pZCA9ICd0YXNrZGVzYyc7XG4gICAgICAgIHRhc2tEZXNjSW5wdXQubmFtZSA9ICd0YXNrZGVzYyc7XG4gICAgICAgIHRhc2tEZXNjSW5wdXRMYWJlbC5hcHBlbmRDaGlsZCh0YXNrRGVzY0lucHV0KVxuXG4gICAgICAgIGxldCB0YXNrRHVlSW5wdXRMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgIHRhc2tEdWVJbnB1dExhYmVsLmZvciA9ICd0YXNrZHVlJ1xuICAgICAgICB0YXNrRHVlSW5wdXRMYWJlbC50ZXh0Q29udGVudCA9ICdUYXNrIERlc2NyaXB0aW9uOiAnXG4gICAgXG4gICAgICAgIGxldCB0YXNrRHVlSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICB0YXNrRHVlSW5wdXQudHlwZSA9ICdkYXRlJztcbiAgICAgICAgdGFza0R1ZUlucHV0LmlkID0gJ3Rhc2tkdWUnO1xuICAgICAgICB0YXNrRHVlSW5wdXQubmFtZSA9ICd0YXNrZHVlJztcbiAgICAgICAgdGFza0R1ZUlucHV0TGFiZWwuYXBwZW5kQ2hpbGQodGFza0R1ZUlucHV0KVxuXG4gICAgICAgIGxldCBzdWJtaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgc3VibWl0QnV0dG9uLnRleHRDb250ZW50ID0gJ0FkZCc7XG4gICAgICAgIHN1Ym1pdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0YXNrQ29udHJvbC5hZGRUYXNrKGxpc3RJbmRleCwgdGFza05hbWVJbnB1dC52YWx1ZSwgdGFza0Rlc2NJbnB1dC52YWx1ZSwgdGFza0R1ZUlucHV0LnZhbHVlKTtcbiAgICAgICAgICAgIHBvcHVsYXRlVGFza1BhZ2UobGlzdEluZGV4KTtcbiAgICAgICAgICAgIHRhc2tGb3JtLnJlc2V0KCk7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFnZScpLmlkID0gJyc7XG4gICAgICAgICAgICB0YXNrRm9ybURpdi5yZW1vdmUoKTtcbiAgICAgICAgfSk7XG5cblxuXG4gICAgICAgIHRhc2tGb3JtRGl2LmFwcGVuZENoaWxkKHRhc2tIZWFkZXIpO1xuICAgICAgICB0YXNrRm9ybS5hcHBlbmRDaGlsZCh0YXNrTmFtZUlucHV0TGFiZWwpO1xuICAgICAgICB0YXNrRm9ybS5hcHBlbmRDaGlsZCh0YXNrRGVzY0lucHV0TGFiZWwpO1xuICAgICAgICB0YXNrRm9ybS5hcHBlbmRDaGlsZCh0YXNrRHVlSW5wdXRMYWJlbCk7XG4gICAgICAgIHRhc2tGb3JtLmFwcGVuZENoaWxkKHN1Ym1pdEJ1dHRvbik7XG4gICAgICAgIHRhc2tGb3JtRGl2LmFwcGVuZENoaWxkKHRhc2tGb3JtKTtcblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuYXBwZW5kQ2hpbGQodGFza0Zvcm1EaXYpO1xuXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWdlJykuaWQgPSAnYmx1cic7XG4gICAgXG5cbiAgICB9KVxuXG4gICAgdGFza0Rpdi5hcHBlbmRDaGlsZCh0YXNrSGVhZGVyKTtcbiAgICB0YXNrRGl2LmFwcGVuZENoaWxkKGFkZFRhc2tCdXR0b24pO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saXN0JykuYXBwZW5kQ2hpbGQodGFza0Rpdik7XG4gICAgcG9wdWxhdGVUYXNrcyhsaXN0SW5kZXgpO1xufVxuXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkbGlzdGJ1dHRvbicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGxldCBsaXN0Rm9ybURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgbGlzdEZvcm1EaXYuY2xhc3NOYW1lID0gJ2xpc3Rmb3JtZGl2JztcblxuICAgIGxldCBsaXN0Rm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcbiAgICBsaXN0Rm9ybS5jbGFzc05hbWUgPSAnbGlzdGZvcm0nO1xuXG4gICAgbGV0IGxpc3RIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuICAgIGxpc3RIZWFkZXIudGV4dENvbnRlbnQgPSAnQWRkIExpc3Q6JztcblxuICAgIGxldCBsaXN0SW5wdXRMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgbGlzdElucHV0TGFiZWwuZm9yID0gJ2xpc3RuYW1lJ1xuICAgIGxpc3RJbnB1dExhYmVsLnRleHRDb250ZW50ID0gJ0xpc3QgTmFtZTogJ1xuXG4gICAgbGV0IGxpc3RJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgbGlzdElucHV0LnR5cGUgPSAndGV4dCc7XG4gICAgbGlzdElucHV0LmlkID0gJ2xpc3RuYW1lJztcbiAgICBsaXN0SW5wdXQubmFtZSA9ICdsaXN0bmFtZSc7XG5cbiAgICBsZXQgc3VibWl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgc3VibWl0QnV0dG9uLnRleHRDb250ZW50ID0gJ0FkZCc7XG4gICAgc3VibWl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFnZScpLmlkID0gJyc7XG4gICAgICAgIGlmIChsaXN0SW5wdXQudmFsdWUgIT0gJycpIHtcbiAgICAgICAgICAgIHRhc2tDb250cm9sLmNyZWF0ZUxpc3QobGlzdElucHV0LnZhbHVlKTtcbiAgICAgICAgICAgIHBvcHVsYXRlTGlzdHMoKTtcbiAgICAgICAgfVxuICAgICAgICBsaXN0Rm9ybS5yZXNldCgpO1xuICAgICAgICBsaXN0Rm9ybURpdi5yZW1vdmUoKTtcbiAgICB9KTtcblxuICAgIGxpc3RJbnB1dExhYmVsLmFwcGVuZENoaWxkKGxpc3RJbnB1dCk7XG4gICAgbGlzdEZvcm0uYXBwZW5kQ2hpbGQobGlzdEhlYWRlcik7XG4gICAgbGlzdEZvcm0uYXBwZW5kQ2hpbGQobGlzdElucHV0TGFiZWwpO1xuICAgIGxpc3RGb3JtLmFwcGVuZENoaWxkKHN1Ym1pdEJ1dHRvbik7XG4gICAgbGlzdEZvcm1EaXYuYXBwZW5kQ2hpbGQobGlzdEZvcm0pO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmFwcGVuZENoaWxkKGxpc3RGb3JtRGl2KTtcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWdlJykuaWQgPSAnYmx1cic7XG59KVxuXG5cbi8vIGNvbnNvbGUubG9nKHRhc2tDb250cm9sLmxpc3RzKTtcbi8vIHRhc2tDb250cm9sLmNyZWF0ZUxpc3QoJ2hlbGxvJylcbi8vIHRhc2tDb250cm9sLmFkZFRhc2soMCwgJ0RvIExhdW5kcnknLCAnV2FzaCBhbmQgZm9sZCBsYXVuZHJ5JywgXCJ0b2RheVwiKTtcbi8vIGNvbnNvbGUubG9nKHRhc2tDb250cm9sLmxpc3RzWzBdLnRhc2tzWzBdKSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==