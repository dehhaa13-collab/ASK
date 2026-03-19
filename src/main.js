import './style.css'

const form = document.getElementById('lead-form');
const formContainer = document.getElementById('form-container');
const successContainer = document.getElementById('success-container');
const submitBtn = document.getElementById('submit-btn');
const resetBtn = document.getElementById('reset-btn');
const btnText = document.querySelector('.btn-text');
const spinner = document.querySelector('.spinner');

// СЮДА ВСТАВИТЬ URL ВЫПОЛНЕНОГО СКРИПТА GOOGLE APPS SCRIPT
// Если оставить пустым, форма симулирует успешную отправку
const SCRIPT_URL = '';

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // 1. Анимация загрузки на кнопке
  btnText.classList.add('hide');
  spinner.classList.remove('hide');
  submitBtn.disabled = true;

  const formData = new FormData(form);
  // Конвертируем FormData в URLSearchParams:
  // Google Apps Script корректно считывает e.parameter только если данные отправляются в формате URL-encoded
  const data = new URLSearchParams(formData);

  try {
    if (SCRIPT_URL) {
      // Отправляем данные в Google Sheets
      await fetch(SCRIPT_URL, {
        method: 'POST',
        body: data,
        mode: 'no-cors' // важно для обхода CORS в Google Script
      });
    } else {
      // Имитация сети, если URL пока не настроен
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
    
    // 2. Плавный переход на экран "Спасибо"
    formContainer.classList.add('fade-out');
    
    setTimeout(() => {
      formContainer.classList.add('hide');
      formContainer.classList.remove('fade-out');
      
      successContainer.classList.remove('hide');
      
      // Запускаем перерисовку для анимации
      void successContainer.offsetWidth; 
      successContainer.classList.add('fade-in');
    }, 400); // 400мс - длительность CSS transition
    
  } catch (error) {
    console.error('Помилка при відправленні!', error);
    alert('Сталася помилка мережі. Будь ласка, спробуйте пізніше.');
  } finally {
    // Возвращаем кнопку в исходное состояние
    btnText.classList.remove('hide');
    spinner.classList.add('hide');
    submitBtn.disabled = false;
  }
});

// Кнопка возврата (для повторного тестирования)
resetBtn.addEventListener('click', () => {
    successContainer.classList.remove('fade-in');
    successContainer.classList.add('fade-out');

    setTimeout(() => {
        successContainer.classList.add('hide');
        successContainer.classList.remove('fade-out');

        form.reset(); // Очищаем форму

        formContainer.classList.remove('hide');
        void formContainer.offsetWidth; // Reflow
        formContainer.classList.add('fade-in');
        
        setTimeout(() => {
            formContainer.classList.remove('fade-in');
        }, 400);

    }, 400);
});
