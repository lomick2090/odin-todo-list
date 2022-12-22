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
    let newTask = document.createElement('div');
    newTask.id = `${taskControl.lists.length -1}`
    newTask.textContent = taskControl.lists[(taskControl.lists.length - 1)].name;
    document.querySelector('.tasklists').appendChild(newTask);
    newTask.addEventListener('click', () => {console.log(newTask.id); populateTaskPage(newTask.id)});
}

function populateTaskPage(listIndex) {
    while (document.querySelector('.list').firstChild) {
        document.querySelector('.list').firstChild.remove();
    }

    let taskDiv = document.createElement('div');
    taskDiv.className = 'taskDiv';

    let taskHeader = document.createElement ('h1');
    taskHeader.textContent = `${taskControl.lists[listIndex].name}`;

    taskDiv.appendChild(taskHeader);
    document.querySelector('.list').appendChild(taskDiv);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUVBOztBQUVBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDOzs7QUFHRDtBQUNBO0FBQ0Esb0JBQW9CLDRCQUE0QjtBQUNoRDtBQUNBO0FBQ0EsNkNBQTZDLHlCQUF5Qiw2QkFBNkI7QUFDbkc7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGdDQUFnQyxrQ0FBa0M7O0FBRWxFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsQ0FBQzs7O0FBR0Q7QUFDQTtBQUNBO0FBQ0EsNkMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgdGFza0NvbnRyb2wgPSAoKCkgPT4ge1xuXG4gICAgbGV0IGxpc3RzID0gW107XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVMaXN0KG5hbWUpIHtcbiAgICAgICAgbGlzdHMucHVzaCh7bmFtZSxcbiAgICAgICAgICAgIHRhc2tzOiBbXVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRUYXNrKGxpc3RJdGVtLCB0YXNrTmFtZSwgdGFza0Rlc2MsIHRhc2tEdWUsKSB7XG4gICAgICAgIGxpc3RzW2xpc3RJdGVtXS50YXNrcy5wdXNoKHtcbiAgICAgICAgICAgIG5hbWU6IHRhc2tOYW1lLFxuICAgICAgICAgICAgZGVzYzogdGFza0Rlc2MsXG4gICAgICAgICAgICBkdWU6IHRhc2tEdWVcbiAgICAgICAgfSlcbiAgICB9XG5cblxuXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjcmVhdGVMaXN0LFxuICAgICAgICBsaXN0cyxcbiAgICAgICAgYWRkVGFzayxcbiAgICB9XG5cbn0pKCk7XG5cblxuZnVuY3Rpb24gcG9wdWxhdGVMaXN0cygpIHtcbiAgICBsZXQgbmV3VGFzayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIG5ld1Rhc2suaWQgPSBgJHt0YXNrQ29udHJvbC5saXN0cy5sZW5ndGggLTF9YFxuICAgIG5ld1Rhc2sudGV4dENvbnRlbnQgPSB0YXNrQ29udHJvbC5saXN0c1sodGFza0NvbnRyb2wubGlzdHMubGVuZ3RoIC0gMSldLm5hbWU7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2tsaXN0cycpLmFwcGVuZENoaWxkKG5ld1Rhc2spO1xuICAgIG5ld1Rhc2suYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7Y29uc29sZS5sb2cobmV3VGFzay5pZCk7IHBvcHVsYXRlVGFza1BhZ2UobmV3VGFzay5pZCl9KTtcbn1cblxuZnVuY3Rpb24gcG9wdWxhdGVUYXNrUGFnZShsaXN0SW5kZXgpIHtcbiAgICB3aGlsZSAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpc3QnKS5maXJzdENoaWxkKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saXN0JykuZmlyc3RDaGlsZC5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICBsZXQgdGFza0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRhc2tEaXYuY2xhc3NOYW1lID0gJ3Rhc2tEaXYnO1xuXG4gICAgbGV0IHRhc2tIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50ICgnaDEnKTtcbiAgICB0YXNrSGVhZGVyLnRleHRDb250ZW50ID0gYCR7dGFza0NvbnRyb2wubGlzdHNbbGlzdEluZGV4XS5uYW1lfWA7XG5cbiAgICB0YXNrRGl2LmFwcGVuZENoaWxkKHRhc2tIZWFkZXIpO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saXN0JykuYXBwZW5kQ2hpbGQodGFza0Rpdik7XG59XG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGRsaXN0YnV0dG9uJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgbGV0IGxpc3RGb3JtRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBsaXN0Rm9ybURpdi5jbGFzc05hbWUgPSAnbGlzdGZvcm1kaXYnO1xuXG4gICAgbGV0IGxpc3RGb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICAgIGxpc3RGb3JtLmNsYXNzTmFtZSA9ICdsaXN0Zm9ybSc7XG5cbiAgICBsZXQgbGlzdEhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJyk7XG4gICAgbGlzdEhlYWRlci50ZXh0Q29udGVudCA9ICdBZGQgTGlzdDonO1xuXG4gICAgbGV0IGxpc3RJbnB1dExhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICBsaXN0SW5wdXRMYWJlbC5mb3IgPSAnbGlzdG5hbWUnXG4gICAgbGlzdElucHV0TGFiZWwudGV4dENvbnRlbnQgPSAnTGlzdCBOYW1lOiAnXG5cbiAgICBsZXQgbGlzdElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBsaXN0SW5wdXQudHlwZSA9ICd0ZXh0JztcbiAgICBsaXN0SW5wdXQuaWQgPSAnbGlzdG5hbWUnO1xuICAgIGxpc3RJbnB1dC5uYW1lID0gJ2xpc3RuYW1lJztcblxuICAgIGxldCBzdWJtaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBzdWJtaXRCdXR0b24udGV4dENvbnRlbnQgPSAnQWRkJztcbiAgICBzdWJtaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWdlJykuaWQgPSAnJztcbiAgICAgICAgaWYgKGxpc3RJbnB1dC52YWx1ZSAhPSAnJykge1xuICAgICAgICAgICAgdGFza0NvbnRyb2wuY3JlYXRlTGlzdChsaXN0SW5wdXQudmFsdWUpO1xuICAgICAgICAgICAgcG9wdWxhdGVMaXN0cygpO1xuICAgICAgICB9XG4gICAgICAgIGxpc3RGb3JtLnJlc2V0KCk7XG4gICAgICAgIGxpc3RGb3JtRGl2LnJlbW92ZSgpO1xuICAgIH0pO1xuXG4gICAgbGlzdElucHV0TGFiZWwuYXBwZW5kQ2hpbGQobGlzdElucHV0KTtcbiAgICBsaXN0Rm9ybS5hcHBlbmRDaGlsZChsaXN0SGVhZGVyKTtcbiAgICBsaXN0Rm9ybS5hcHBlbmRDaGlsZChsaXN0SW5wdXRMYWJlbCk7XG4gICAgbGlzdEZvcm0uYXBwZW5kQ2hpbGQoc3VibWl0QnV0dG9uKTtcbiAgICBsaXN0Rm9ybURpdi5hcHBlbmRDaGlsZChsaXN0Rm9ybSk7XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuYXBwZW5kQ2hpbGQobGlzdEZvcm1EaXYpO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhZ2UnKS5pZCA9ICdibHVyJztcbn0pXG5cblxuLy8gY29uc29sZS5sb2codGFza0NvbnRyb2wubGlzdHMpO1xuLy8gdGFza0NvbnRyb2wuY3JlYXRlTGlzdCgnaGVsbG8nKVxuLy8gdGFza0NvbnRyb2wuYWRkVGFzaygwLCAnRG8gTGF1bmRyeScsICdXYXNoIGFuZCBmb2xkIGxhdW5kcnknLCBcInRvZGF5XCIpO1xuLy8gY29uc29sZS5sb2codGFza0NvbnRyb2wubGlzdHNbMF0udGFza3NbMF0pIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9