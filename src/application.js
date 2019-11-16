const Application = {
  save() { //хранить наши записи в локал стораже
    const object = {
      columns: {
        idCounter: Column.idCounter,
        items: []
      },
      notes: {
        idCounter: Note.idCounter,
        items: []
      }
    }

    document
            .querySelectorAll('.column')
            .forEach(columnElement => {
              const column = {
                title: columnElement.querySelector('.column-header').textContent,
                id: parseInt(columnElement.getAttribute('data-column-id')),
                noteIds:[]
              }
              //проходим по всем заметкам в нашей колонке
              columnElement
                      .querySelectorAll('.note')
                      .forEach(noteElement => {
                        column.noteIds.push(parseInt(noteElement.getAttribute('data-note-id')))
                      })

              object.columns.items.push(column)
            })
    document
            .querySelectorAll('.note')
            .forEach(noteElement => {
              const note = {
                id: parseInt(noteElement.getAttribute('data-note-id')),
                content: noteElement.textContent //содержимое элемента
              }

              object.notes.items.push(note)
            })
    
        const json = JSON.stringify(object)
            
        localStorage.setItem('trello', json)
  },

  //загружает из локал стореджа данные
  load() { //загружать данные
    if (!localStorage.trello) {
      return
    }

    const mountPoint = document.querySelector('.columns')
    mountPoint.innerHTML = ''

    const object = JSON.parse(localStorage.getItem('trello'))
    //пробегаемся по notes и находим записи соответсвеные айди
    const getNoteById = id => object.notes.items.find(note => note.id === id)
    
    // перебираем обьект из localStorage создаем колонки
    for (const {id, noteIds, title} of object.columns.items) {
      const column = new Column(id, title)
      
      
      //вставляем колонки
      mountPoint.append(column.element)

      //вставляем в колонки записи
      for (const noteId of noteIds ) {
        const {id, content} = getNoteById(noteId)

        const note = new Note(id, content)
        column.element.querySelector('[data-notes]').append(note.element)
      }
    }
  }
}