// Выбор кнопки
const navTaskListButton = document.querySelector('#nav_taskList'); // Кнопка для отображения списка задач
const nav_empl_list = document.querySelector('#nav_empl_list'); // Кнопка для отображения списка сотрудников
const btn_addTasks = document.querySelector('#btn_addTasks'); // Кнопка для добавления задачи
const btn_addEmpl = document.querySelector('#btn_addEmpl'); // Кнопка для добавления сотрудника
const nav_ComTask = document.querySelector('#nav_ComTask'); // Кнопка для отображения завершенных задач
const nav_Notasks = document.querySelector('#nav_Notasks'); // Кнопка для отображения незавершенных задач
const containerJobTable = document.querySelector('.container_job_table'); // Контейнер для отображения таблицы
// const searchForm = document.querySelector('form[role="search"]');
// const searchInput = searchForm.querySelector('input[type="search"]');



/**
 * Обновляет отображение списка задач на основе отфильтрованных данных.
 * @param {Array} tasks - Массив отфильтрованных задач.
 */
function updateTaskList(tasks) {
    const taskListHtml = tasks.map(task => `
        <div class="task">
            <h4>${task.name}</h4>
            <p>${task.description}</p>
            <p><strong>Department:</strong> ${task.department}</p>
            <p><strong>Completed on:</strong> ${task.completedDate}</p>
        </div>
    `).join('');

    // Предполагается, что контейнер для отображения задач имеет id 'taskList'.
    document.getElementById('taskList').innerHTML = taskListHtml;
}





// Функция для обработки клика по кнопке списка задач
function handleNavTaskListClick(event) {
    event.preventDefault(); // Standart amalni oldini olish (href)
    showTaskList();
}

// Функция для обработки клика по кнопке списка сотрудников
function howEmplyClick(event) {
    event.preventDefault();
    showEmplyList();
}

// Функция для обработки клика по кнопке добавления сотрудника
function AddEmployClick(event) {
    event.preventDefault();
    showAddEmploy();
}

// Функция для обработки клика по кнопке добавления задачи
function AddTasksClick(event) {
    event.preventDefault();
    showAddTask();
}

// Функция для обработки клика по кнопке завершенных задач
function ComTasks(event) {
    event.preventDefault();
    showComTask();
}

// Функция для обработки клика по кнопке незавершенных задач
function Notasks(event) {
    event.preventDefault();
    showNoTasks();
}

// Функция для отображения списка задач
function showTaskList() {
    const tasks = getTasksFromLocalStorage(); 
    let taskListHtml = '';

    tasks.forEach((task, index) => {
        if (task && task.employeeName) {
            taskListHtml += `
                <div class="col-md-4 mb-3">
                    <div class="card mb-4 rounded-3 shadow-sm">
                        <div class="card-header py-3">
                            <h4 class="my-0 fw-normal">${task.employeeName}</h4>
                        </div>
                        <div class="card-body">
                            <ul class="list-unstyled mt-3 mb-4">
                                <li class="fs-6 d-flex justify-content-between align-items-center gap-2">
                                    Задача: <span>${task.task}</span>
                                </li>
                                <hr>
                                <li class="fs-6 d-flex justify-content-between align-items-center gap-2">
                                    Отдел: <span>${task.department}</span>
                                </li>
                                <hr>
                                <li class="fs-6 d-flex justify-content-between align-items-center gap-2">
                                    Дата выполнения: <span>${task.startDate}</span>
                                </li>
                                <hr>
                                <li class="fs-6 d-flex justify-content-between align-items-center gap-2">
                                    Дата окончания: <span>${task.endDate}</span>
                                </li>
                                <hr>
                                <li class="d-flex align-items-center gap-2">
                                    <input type="radio" name="status-${index}" ${task.completed ? 'checked' : ''} onclick="updateTaskStatus(${index}, true)">Не Сделана
                                </li>
                                <hr>
                                <li class="d-flex align-items-center gap-2">
                                    <input type="radio" name="status-${index}" ${!task.completed ? 'checked' : ''} onclick="updateTaskStatus(${index}, false)"> Сделана
                                </li>
                            </ul>
                            <button type="button" class="btn btn-primary" onclick="handlePrimaryButtonClick(${index})">Primary</button>
                        </div>
                    </div>
                </div>
            `;
            return task;
        } 
    });

    // Обновляем содержимое контейнера
    containerJobTable.innerHTML = `
        <div class="row">
            ${taskListHtml}
        </div>
    `;
}

// Функция для отображения списка сотрудников
function showEmplyList(employ) {
    const employees = getEmployeesFromLocalStorage(); // Получаем список сотрудников из localStorage
    let employListHtml = '';

    // Проходим по каждому сотруднику и создаем HTML
    employees.forEach(employ => {
        employListHtml += `
            <div class="col mb-4">
                <div class="card h-100">
                    <div class="card-header">
                        <h4 class="my-0">${employ.fullName}</h4>
                    </div>
                    <div class="card-body">
                        <ul class="list-unstyled">
                            <li class="fs-6 mb-2"><strong>Email:</strong> <span>${employ.email}</span></li>
                            <li class="fs-6 mb-2"><strong>Дата рождения:</strong> <span>${employ.brithday}</span></li>
                            <li class="fs-6 mb-2"><strong>Отдел:</strong> <span>${employ.department}</span></li>
                            <li class="fs-6 mb-2"><strong>Должность:</strong> <span>${employ.post}</span></li>
                            <li class="fs-6 mb-2"><strong>Мобильный номер:</strong> <span>${employ.mobile}</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    });

    // Обновляем содержимое контейнера
    containerJobTable.innerHTML = `
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            ${employListHtml}
        </div>
    `;
}

// Функция для отображения завершенных задач
function showComTask() {
    const tasks = getTasksFromLocalStorage(); 
    let ComTasksHtml = '';
    tasks.forEach((task, index) => {
        if (task && task.employeeName && task.completed) {
            ComTasksHtml += `
                <main>
                    <div class="container">
                        <div class="row mb-3 text-center align-items-center">
                            <div class="col-3 themed-grid-col">
                                <div class="">Имя сотрудника</div>
                                <div>${task.employeeName}</div>
                            </div>
                            <div class="col-3 themed-grid-col">
                                <div>Задача</div>
                                <div>${task.task}</div>
                            </div>
                            <div class="col-3 themed-grid-col">
                                <div>Дата окончания задания</div>
                                <div>${task.endDate}</div>
                            </div>
                            <div class="col-3 themed-grid-col">
                                <button type="button" class="btn btn-danger" onclick="deleteTask(${index})">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </main>`;
        }
    });

    containerJobTable.innerHTML = ComTasksHtml;
}

// Функция для отображения незавершенных задач
function showNoTasks() {
    const tasks = getTasksFromLocalStorage(); 
    let NoTasksHtml = '';
    tasks.forEach((task, index) => {
        if (task && task.employeeName && !task.completed) {
            NoTasksHtml += `
                <main>
                    <div class="container">
                        <div class="row mb-3 text-center">
                            <div class="col-3 themed-grid-col">
                                <div class="">Имя сотрудника</div>
                                <div>${task.employeeName}</div>
                            </div>
                            <div class="col-3 themed-grid-col">
                                <div>Задача</div>
                                <div>${task.task}</div>
                            </div>
                            <div class="col-3 themed-grid-col">
                                <div>Дата окончания задания</div>
                                <div>${task.endDate}</div>
                            </div>
                            <div class="col-3 themed-grid-col d-flex justify-content-center align-items-center">
                                <button type="button" class="btn btn-success" onclick="deleteTask(${index})">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
                                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            `;
        }
    });

    containerJobTable.innerHTML = NoTasksHtml;
}


// Функция для отображения формы добавления сотрудника
function showAddEmploy(event) {
    const addEmployHtml = 
        `<div class="row g-3 add_emplys">
            <div class="col-sm-4">
                <label for="fullName" class="form-label">Ф.И.О</label>
                <input type="text" class="form-control" id="fullName" placeholder="" value="" required="">
            </div>
            <div class="col-sm-4">
                <label for="brithday" class="form-label">Дата рождения</label>
                <input type="date" class="form-control" id="brithday" placeholder="" value="" required="">
            </div>
            <div class="col-4">
                <label for="email" class="form-label">Email</label>
                <div class="input-group has-validation">
                    <span class="input-group-text">@</span>
                    <input type="email" class="form-control" id="email" placeholder="email" required="">
                </div>
            </div>
            <div class="col-4">
                <label for="department" class="form-label">Отдел сотрудников</label>
                <input type="text" class="form-control" id="department" placeholder="Отдел продаж">
            </div>
            <div class="col-4">
                <label for="post" class="form-label">Должность</label>
                <input type="text" class="form-control" id="post" placeholder="менеджер по продажам" required="">
            </div>
            <div class="col-4">
                <label for="mobile" class="form-label">Мобильный телефон</label>
                <input type="tel" class="form-control" id="mobile" placeholder="+99" required="">
            </div>
            <div class="col-12">
                <label for="address" class="form-label">Адрес сотрудника</label>
                <input type="text" class="form-control" id="address" placeholder="">
            </div>
            <button class="w-100 btn btn-primary btn-lg" type="submit" id="submitEmploy">Добавить в список</button>
        </div>`

        containerJobTable.innerHTML = '';
        containerJobTable.innerHTML = addEmployHtml;

        document.querySelector('#submitEmploy').addEventListener('click', (event) => {
            event.preventDefault();
            const employ = updateEmployObject();            
            saveEmployToLocalStorage(employ);
            showEmplyList();
        });

}

// Функция для отображения формы добавления задачи
function showAddTask() {
    const employees = getEmployeesFromLocalStorage();
    const employeeOptions = employees.map(emp => `
        <p class="dropdown-item" data-id="${emp.id}">${emp.fullName}</p>
    `).join('');

    const addTaskHtml = `
        <div class="row g-3 add_task">
            <div class="col-sm-4 dropdown">
                <button id="employeeDropdownButton" class="nav-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Выбрать из списка сотрудника
                </button>
                <ul id="employeeDropdown" class="dropdown-menu text-small shadow Zindex">
                    ${employeeOptions}                
                </ul>
            </div>
            <div class="col-sm-4">
                <label for="startDate" class="form-label">Дата Срок с:</label>
                <input type="date" class="form-control" id="startDate" placeholder="" value="" required="">
            </div>
            <div class="col-sm-4">
                <label for="endDate" class="form-label">Дата Срок по:</label>
                <input type="date" class="form-control" id="endDate" placeholder="" value="" required="">
            </div>
            <div class="col-4" id="departmentContainer">
                <label for="task" class="form-label">Отдел:</label>
                <p id="departmentOptions"></p>
            </div>
            <div class="col-6">
                <label for="task" class="form-label">Задача для сотрудника</label>
                <input type="text" class="form-control" id="task" placeholder="напишите задачу" required="">
            </div>
            <button class="w-100 btn btn-primary btn-lg" type="submit" id="submitTask">Добавить в список</button>
        </div>
    `;
    containerJobTable.innerHTML = addTaskHtml;

    // Attach event listener to dropdown items
    document.getElementById('employeeDropdown').addEventListener('click', function(event) {
        if (event.target.matches('.dropdown-item')) {
            selectEmployee(event.target.getAttribute('data-id'));
        }
    });

    // Handle task submission
    document.getElementById('submitTask').addEventListener('click', (event) => {
        event.preventDefault();
        const task = {
            id: Date.now(), // Generate unique ID for the task
            employeeId: document.getElementById('employeeDropdownButton').getAttribute('data-id'),
            employeeName: document.getElementById('employeeDropdownButton').textContent,
            startDate: document.getElementById('startDate').value,
            endDate: document.getElementById('endDate').value,
            department: document.getElementById('departmentOptions').textContent,
            task: document.getElementById('task').value,
            completed: false
        };
        saveTaskToLocalStorage(task);
        showTaskList(); // Show the updated task list
    });
}

// Primary tugmasi bosilganda qo'llanadigan funksiya
function handlePrimaryButtonClick(index) {
    const tasks = getTasksFromLocalStorage();
    if (tasks[index]) {
        if (tasks[index].completed) {
            showComTask();
        } else {
            showNoTasks();
        }
    }
}

/**
 * Сохраняет массив задач в localStorage.
 * @param {Array} tasks - Массив задач, который нужно сохранить.
 */
function setTasksToLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

/**
 * Выбирает сотрудника по его идентификатору и обновляет элементы интерфейса,
 * такие как текст кнопки и атрибуты.
 * @param {number} id - Идентификатор сотрудника.
 */
function selectEmployee(id) {
    // Получаем информацию о сотруднике из localStorage по его идентификатору.
    const employee = getEmployeeFromLocalStorage(id);
    
    // Обновляем текст кнопки с именем сотрудника.
    document.getElementById('employeeDropdownButton').textContent = employee.fullName;
    
    // Устанавливаем идентификатор сотрудника в атрибут data-id кнопки.
    document.getElementById('employeeDropdownButton').setAttribute('data-id', employee.id);
    
    // Обновляем текст отдела сотрудника.
    document.getElementById('departmentOptions').textContent = employee.department;
}

/**
 * Отображает завершенные задачи в контейнере таблицы задач.
 * Обновляет HTML-контент контейнера, чтобы отобразить все завершенные задачи.
 */
function showComTasks() {
    // Получаем завершенные задачи из localStorage.
    const completedTasks = getCompletedTasksFromLocalStorage();
    
    // Формируем HTML-код для отображения завершенных задач.
    const completedTasksHtml = completedTasks.map(task => `
        <div class="task-completed">
            <h4>${task.name}</h4>
            <p>${task.description}</p>
            <p><strong>Department:</strong> ${task.department}</p>
            <p><strong>Completed on:</strong> ${task.completedDate}</p>
        </div>
    `).join('');
    
    // Обновляем содержимое контейнера с завершенными задачами.
    containerJobTable.innerHTML = completedTasksHtml;
}

/**
 * Создает объект сотрудника на основе значений из полей формы.
 * @returns {Object} - Объект сотрудника с данными из формы.
 */
function updateEmployObject() {
    return {
        id: Date.now(), // Пример уникального ID, в производственной версии нужно использовать более надежный метод.
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        brithday: document.getElementById('brithday').value,
        department: document.getElementById('department').value,
        post: document.getElementById('post').value,
        mobile: document.getElementById('mobile').value,
    };
}

/**
 * Получает информацию о сотруднике из localStorage по его идентификатору.
 * @param {number} id - Идентификатор сотрудника.
 * @returns {Object} - Информация о сотруднике, или пустой объект, если не найден.
 */
function getEmployeeFromLocalStorage(id) {
    // Получаем всех сотрудников из localStorage.
    const employees = getEmployeesFromLocalStorage();
    
    // Ищем сотрудника по его идентификатору.
    return employees.find(emp => emp.id == id) || {};
}

/**
 * Получает завершенные задачи из localStorage.
 * @returns {Array} - Массив завершенных задач, или пустой массив, если нет данных.
 */
function getCompletedTasksFromLocalStorage() {
    return JSON.parse(localStorage.getItem('completedTasks')) || [];
}


// Функция для удаления задачи по индексу
function deleteTask(index) {
    const tasks = getTasksFromLocalStorage();
    const task = tasks[index];
    tasks.splice(index, 1);
    saveTaskToLocalStorage(tasks);
    
    // Determine which function to call based on task completion status
    if (task.completed) {
        showComTask();
    } else {
        showNoTasks();
    }
}

// Функция для обновления статуса задачи
function updateTaskStatus(index, completed) {
    const tasks = getTasksFromLocalStorage();
    if (tasks[index]) {
        tasks[index].completed = completed;
        setTasksToLocalStorage(tasks);
        showTaskList(); 
    }
}


// Функция для получения задач из localStorage
function getTasksFromLocalStorage() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

// Функция для получения сотрудников из localStorage
function getEmployeesFromLocalStorage() {
    return JSON.parse(localStorage.getItem('employees')) || [];
}

// Функция для сохранения сотрудника в localStorage
function saveEmployToLocalStorage(employ) {
    const employees = getEmployeesFromLocalStorage();
    employees.push(employ);
    localStorage.setItem('employees', JSON.stringify(employees));
}


// Функция для сохранения задачи в localStorage         
function saveTaskToLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);// Добавляем новую задачу
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


// Инициализация событий
navTaskListButton.addEventListener('click', handleNavTaskListClick);
btn_addTasks.addEventListener('click', showAddTask);
btn_addEmpl.addEventListener('click', showAddEmploy);
nav_ComTask.addEventListener('click', ComTasks);
nav_Notasks.addEventListener('click', Notasks);
nav_empl_list.addEventListener('click', howEmplyClick);




// // Функция для поиска
// function search() {
//     const searchValue = searchInput.value.toLowerCase();
//     const tasks = getTasksFromLocalStorage(); // LocalStorage dan barcha vazifalarni olish

//     // Qidiruv qiymati bo‘yicha vazifalarni filtrlash
//     const filteredTasks = tasks.filter(task => 
//         task.employeeName.toLowerCase().includes(searchValue) ||
//         task.task.toLowerCase().includes(searchValue) ||
//         task.department.toLowerCase().includes(searchValue)
//     );

//     // Vazifalarni yangilash
//     showTaskList(filteredTasks);
// }
// searchInput.addEventListener('input', search);
