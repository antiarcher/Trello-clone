//contenteditable -атрибут ответсвеный за возможность редактирования контента(переписать содержимое)

//создать новый ряд(новую задачу)
document
        .querySelectorAll('.column') //находим все элементы с тегом (это список колонок)  
        .forEach(Column.process) //перебирает колонки и вешает событие и создает ряд по нажатию

//создать колонку        
document
        .querySelector('[data-action-addColumn]')
        .addEventListener('click', function (event) {
          const columnElement = document.createElement('div')
          columnElement.classList.add('column')
          columnElement.setAttribute('draggable', true)
          columnElement.setAttribute('data-column-id', Column.idCounter)
          
          Column.idCounter++

          columnElement.innerHTML = 
          `<p class="column-header" >В плане</p>
          <div data-notes>

          </div>
          <p class="column-footer">
            <span data-action-addNote class="action">+ Добавить карточку</span>
          </p>`

          document.querySelector('.columns').append(columnElement)

          Column.process(columnElement) //функция проверяющая наличие кнопки добавить ряд при создании новой колонки автоматом обрабатывается и вешает событие
          Note.proces(columnElement.querySelector('.column-header'))
        })

//======добавляем возможность редактировать
document
        .querySelectorAll('.note')
        .forEach(Note.proces) //задаем редактируемость текста наших заметок

document
        .querySelectorAll('.column-header')
        .forEach(Note.proces)
//======







