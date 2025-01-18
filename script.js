document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');
    
    // Получаем ссылки на аудио элементы
    const addSound = document.getElementById('addSound');
    const completeSound = document.getElementById('completeSound');
    const deleteSound = document.getElementById('deleteSound');

    // Функция для воспроизведения звука с проверкой
    function playSound(audio) {
        audio.currentTime = 0; // Сбрасываем время воспроизведения
        audio.volume = 0.3; // Устанавливаем громкость на 30%
        
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log("Воспроизведение звука отложено");
            });
        }
    }

    addTaskButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        const li = document.createElement('li');
        li.className = 'task-item';
        
        li.innerHTML = `
            <span>${taskText}</span>
            <button class="delete-btn">Удалить</button>
        `;

        // Добавляем обработчик для переключения состояния задачи
        li.addEventListener('click', (e) => {
            if (e.target.tagName !== 'BUTTON') {
                li.classList.toggle('completed');
                // Воспроизводим звук завершения задачи
                playSound(completeSound);
            }
        });

        // Добавляем обработчик для кнопки удаления
        li.querySelector('.delete-btn').addEventListener('click', () => {
            // Воспроизводим звук удаления
            playSound(deleteSound);
            
            li.style.animation = 'slideOut 0.5s ease forwards';
            setTimeout(() => {
                li.remove();
            }, 500);
        });

        taskList.appendChild(li);
        // Воспроизводим звук добавления
        playSound(addSound);
        
        taskInput.value = '';
    }
}); 