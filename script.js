document.addEventListener('DOMContentLoaded', () => {
    // Разбиваем заголовок на буквы
    const title = document.querySelector('h1');
    const text = title.textContent;
    title.textContent = '';
    
    // Создаем span для каждой буквы
    text.split('').forEach(char => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char; // Используем неразрывный пробел для пробелов
        title.appendChild(span);
    });

    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');
    
    // Получаем ссылки на аудио элементы
    const addSound = document.getElementById('addSound');
    const completeSound = document.getElementById('completeSound');
    const deleteSound = document.getElementById('deleteSound');
    const siuSound = document.getElementById('siuSound');

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

        // Обновляем обработчик для переключения состояния задачи
        li.addEventListener('click', (e) => {
            if (e.target.tagName !== 'BUTTON') {
                li.classList.toggle('completed');
                // Воспроизводим SIUUU вместо обычного звука завершения
                if (li.classList.contains('completed')) {
                    playSound(siuSound);
                } else {
                    playSound(completeSound);
                }
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

    // Добавляем Санту
    const santa = document.createElement('div');
    santa.className = 'santa';
    document.body.appendChild(santa);

    // Функция для создания снежинок
    function createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.style.left = Math.random() * 100 + 'vw';
        snowflake.style.opacity = Math.random();
        snowflake.style.animation = `snowfall ${Math.random() * 3 + 2}s linear infinite`;
        document.body.appendChild(snowflake);

        // Удаляем снежинку после завершения анимации
        setTimeout(() => {
            snowflake.remove();
        }, 5000);
    }

    // Создаем снежинки с интервалом
    setInterval(createSnowflake, 100);

    // Добавляем звук колокольчиков при пролете Санты
    const bellSound = new Audio('https://www.soundjay.com/misc/sounds/sleigh-bells-01.mp3');
    bellSound.volume = 0.2;

    santa.addEventListener('animationiteration', () => {
        bellSound.currentTime = 0;
        bellSound.play().catch(err => console.log('Звук не может быть воспроизведен автоматически'));
    });
}); 