Application.load()

//создать колонку        
document
        .querySelector('[data-action-addColumn]')
        .addEventListener('click', function (event) {
          const column = new Column()
          document.querySelector('.columns').append(column.element)

          column.element.querySelector('.column-header').setAttribute('contenteditable', true)
		      column.element.querySelector('.column-header').focus()
        
          //сохраняем состояние в локал сторэйдж когда создаем колонку
          Application.save() 
        }) 



//contenteditable -атрибут ответсвеный за возможность редактирования контента(переписать содержимое)

//создать новый ряд(новую задачу)
// document
//         .querySelectorAll('.column') //находим все элементы с тегом (это список колонок)  
//         .forEach(Column.process) //перебирает колонки и вешает событие и создает ряд по нажатию
//======добавляем возможность редактировать
// document
//         .querySelectorAll('.note')
//         .forEach(Note.proces) //задаем редактируемость текста наших заметок

// document.querySelector('.columns').addEventListener('dragover', function (event) {
//           event.preventDefault()
//         })
// document
//         .querySelectorAll('.column-header')
//         .forEach(Note.proces)
// //======







