document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    let tasks = [];
    let isEditing = false;
    let editingId = null;

    taskForm.addEventListener('click', (e) => {
        const vti = taskInput.value.trim();
        if (vti != '') {
            if (isEditing) {
                tasks = tasks.map(task => task.id === editingId ? {
                    ...task, text: vti
                } : task);

                isEditing = false;
                editingId = null;
                taskForm.innerText = "agregar"
            }
            else {
                const task = {
                    id: Date.now(),
                    text: vti,
                    complete: false
                };
                tasks.push(task);
                console.log(tasks);
            }
            renderTasks();
            taskInput.value = '';
        }
        //alert("se enviò el formulario " + vti);
    });

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = "flex justify-between items-center bg-gray-100 px-4 py-2 rounded"
            li.style.backgroundColor = task.complete ? 'lightgreen' : '';
            // Contenido del texto
            let content = '<span>' + task.text + '</span>';
            // Solo mostrar botones si la tarea no está completada
            if (!task.complete) {
                content +=
                    '<div>' +
                    '<button class="text-blue-600 hover:underline" onclick="editTask(' + task.id + ')">Editar</button>&nbsp;' +
                    '<button class="text-red-600 hover:underline" onclick="deleteTask(' + task.id + ')">Eliminar</button>&nbsp;' +
                    '<button class="text-green-600 hover:underline" onclick="okTask(' + task.id + ')">Completado</button>' +
                    '</div>';
            }
            li.innerHTML = content;
            taskList.appendChild(li);
        });
    }

    window.deleteTask = function (id) {
        tasks = tasks.filter(task => task.id !== id);
        renderTasks();
    }


    window.editTask = function (id) {
        const et = tasks.find(t => t.id === id);
        if (et) {
            taskInput.value = et.text;
            taskForm.innerText = "Guardar";
            isEditing = true;
            editingId = et.id;
        }
    }

    window.okTask = function (id) {
        tasks = tasks.map(task =>
            task.id === id ? { ...task, complete: true } : task
        ); // Deshabilita todos los botones
        renderTasks();
    }


});



