const Column = {
  idCounter : 4,
  dragged: null,
  dropped: null,
  
  
  
  process(columnElement) { //функция создаем новый столбик
    const spanAction_addNote = columnElement.querySelector('[data-action-addNote]') //в колонке находим строку добавить карточку по такому атрибуту
    
    spanAction_addNote.addEventListener('click', function (event)  {
      //создаем элемент
      const note = new Note

      //отрисуем элемент
      columnElement.querySelector('[data-notes').append(note.element)  //находим место куда добавить элемент
      
    
      note.element.setAttribute('contenteditable', true)
      note.element.focus()
    })

    const headerElement = columnElement.querySelector('.column-header')

		headerElement.addEventListener('dblclick', function (event) {
			headerElement.setAttribute('contenteditable', true)
			headerElement.focus()
		})

		headerElement.addEventListener('blur', function (event) {
      headerElement.removeAttribute('contenteditable', true)
      Application.save()
		})

    columnElement.addEventListener('dragover', function (event) {
        event.preventDefault()
    })

    columnElement.addEventListener('drop', function (event) {
      if (Note.dragged) {
          return columnElement.querySelector('[data-notes]').append(Note.dragged)
      }
    })

        columnElement.addEventListener('dragstart', Column.dragstart)
        columnElement.addEventListener('dragend', Column.dragend)
        // columnElement.addEventListener('dragenter', Column.dragenter)
        columnElement.addEventListener('dragover', Column.dragover)
        // columnElement.addEventListener('dragleave', Column.dragleave)
        columnElement.addEventListener('drop', Column.drop)
  },

  create(id = null, title = 'Новая заметка') {
    const columnElement = document.createElement('div')
          columnElement.classList.add('column')
          columnElement.setAttribute('draggable', true)

          if (id) {
            columnElement.setAttribute('data-column-id', id)
          }
          else {
            columnElement.setAttribute('data-column-id', Column.idCounter)
            Column.idCounter++
          }
          

          columnElement.innerHTML = 
          `<p class="column-header" >${title}</p>
          <div data-notes>

          </div>
          <p class="column-footer">
            <span data-action-addNote class="action">+ Добавить карточку</span>
          </p>`

          Column.process(columnElement) //функция проверяющая наличие кнопки добавить ряд при создании новой колонки автоматом обрабатывается и вешает событие
          return columnElement
  },

  dragstart (event) {
    Column.dragged = this
    Column.dragged.classList.add('dragged')

    event.stopPropagation()

    document
            .querySelectorAll('.note')
            .forEach(noteElement => noteElement.removeAttribute('draggable'))
  },

  dragend (event) {
    Column.dragged.classList.remove('dragged')
    Column.dragged = null
    Column.droped = null

    document
            .querySelectorAll('.note')
            .forEach(noteElement => noteElement.setAttribute('draggable', true))
  
            Application.save()
  },
    
  // dragenter (event) {
  //   if (!Column.dragged||this === Column.dragged) {
  //       return
  //   }
  //   this.classList.add('under')

  // },

  dragover (event) {
      event.preventDefault()
      event.stopPropagation()

      if (Column.dragged === this) {
        if (Column.dropped) {
          Column.dropped.classList.remove('under')
        }

        Column.dropped = null
      }

      if (!Column.dragged||this === Column.dragged) {
          return
      }

      Column.dropped = this

      this.classList.add('under')

      document
              .querySelectorAll('.column')
              .forEach(columnElement =>columnElement.classList.remove('under'))

      this.classList.add('under')
  },

  // dragleave (event) {
  //     if (!Column.dragged||this === Column.dragged) {
  //         return
  //     }
  //     document.querySelectorAll('.column').forEach(x =>x.classList.remove('under'))
  // },

  // drop (event) {
  //     event.stopPropagation()

  //     if (!Column.dragged||this === Column.dragged) {
  //         return
  //     }

  //     this.classList.remove('under')
      

  //     const col = Array.from(document.querySelector('.columns').children)
  //     const indexA = col.indexOf(this)
  //     const indexB = col.indexOf(Column.dragged)
  //     

  //     if (indexA < indexB) {
  //       document.querySelector('.columns').insertBefore(Column.dragged, this)        
  //     }
      
  //     else {
  //       document.querySelector('.columns').insertBefore(Column.dragged, this.nextElementSibling)
  //     }
  // },

  drop() {
    // if (Note.dragged) {
    //   return this.querySelector('[data-notes]').append(Note.drragged)
    // }
    if (Column.dragged) {
      const children = Array.from(document.querySelectorAll('.column'))
      const indexA = children.indexOf(this)
      const indexB = children.indexOf(Column.dragged)

      if (indexA < indexB) {
          document.querySelector('.columns').insertBefore(Column.dragged, this)        
      }

      else { 
          document.querySelector('.columns').insertBefore(Column.dragged, this.nextElementSibling)
      }
      document
              .querySelectorAll('.column')
              .forEach(columnElement =>columnElement.classList.remove('under'))
    }
  }
}
