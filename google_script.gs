// Скрипт для приема данных с сайта в Google Sheets

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Получаем текущую дату и время
    const date = new Date();
    
    // Извлекаем данные из POST запроса
    // Важно: в e.parameter ключи должны точно совпадать с атрибутом 'name' в input формы HTML
    const name = e.parameter.name || 'Не указано';
    const contact = e.parameter.contact || 'Не указано';
    const task = e.parameter.task || 'Не указано';
    const readiness = e.parameter.readiness || 'Не указано';
    
    // Добавляем новую строку в таблицу с данными
    sheet.appendRow([date, name, contact, task, readiness]);
    
    // Возвращаем успешный ответ обратно на сайт
    return ContentService.createTextOutput(JSON.stringify({"result": "success", "data": e.parameter}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Если произошла ошибка
    return ContentService.createTextOutput(JSON.stringify({"result": "error", "error": error.message}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
