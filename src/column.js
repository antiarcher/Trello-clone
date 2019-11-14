const Column = {
  idCounter : 4, //clumns id
  process(columnElement) { //функция создаем новый столбик
    const spanAction_addNote = columnElement.querySelector('[data-action-addNote]') //в колонке находим строку добавить карточку по такому атрибуту
    spanAction_addNote.addEventListener('click', function (event)  {
      const noteElement = document.createElement('div') //создадим элемент и присвоим ему класс и атрибуты(но пока виртуально не отрисовывая)
      noteElement.classList.add('note')
      noteElement.setAttribute('draggable', true)
      noteElement.setAttribute('data-note-id', Note.idCounter)
      
      Note.idCounter++

      //отрисуем элемент
      columnElement.querySelector('[data-notes').append(noteElement)  //находим место куда добавить элемент
      Note.proces(noteElement)  //добавляем созданому ряду событие на редактирование
    
      noteElement.setAttribute('contenteditable', true)
      noteElement.focus()
    })

    columnElement.addEventListener('dragover', function (event) {
        event.preventDefault()
    })

    columnElement.addEventListener('drop', function (event) {
      if (Note.dragged) {
          return columnElement.querySelector('[data-notes]').append(Note.dragged)
        }
    })
  },
}
