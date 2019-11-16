class Column {
  constructor(id = null, title = 'Новая заметка') {
    const element = this.element = document.createElement('div')
          element.classList.add('column')
          element.setAttribute('draggable', true)

          if (id) {
            element.setAttribute('data-column-id', id)
          }
          else {
            element.setAttribute('data-column-id', Column.idCounter)
            Column.idCounter++
          }
          

          element.innerHTML = 
          `<p class="column-header" >${title}</p>
          <div data-notes>

          </div>
          <p class="column-footer">
            <span data-action-addNote class="action">+ Добавить карточку</span>
          </p>`

    const spanAction_addNote = element.querySelector('[data-action-addNote]') //в колонке находим строку добавить карточку по такому атрибуту
    
    spanAction_addNote.addEventListener('click', function (event)  {
      //создаем элемент
      const note = new Note

      //отрисуем элемент
      element.querySelector('[data-notes').append(note.element)  //находим место куда добавить элемент
      
    
      note.element.setAttribute('contenteditable', true)
      note.element.focus()
    })

    const headerElement = element.querySelector('.column-header')

		headerElement.addEventListener('dblclick', function (event) {
      headerElement.setAttribute('contenteditable', true)
      Label.setCarriage(headerElement)
      headerElement.focus()
		})

		headerElement.addEventListener('blur', function (event) {
      headerElement.removeAttribute('contenteditable', true)
      headerElement.textContent = headerElement.textContent.trim()
      if (!headerElement.textContent.trim().length) {
        headerElement.textContent = 'Новая заметка'
      }
      Application.save()
		})

    element.addEventListener('dragover', function (event) {
        event.preventDefault()
    })

    element.addEventListener('drop', function (event) {
      if (Note.dragged) {
          return element.querySelector('[data-notes]').append(Note.dragged)
      }
    })

        element.addEventListener('dragstart', this.dragstart.bind(this))
        element.addEventListener('dragend', this.dragend.bind(this))
        
        element.addEventListener('dragover', this.dragover.bind(this))
        element.addEventListener('drop', this.drop.bind(this))
  }

  
  dragstart (event) {
    Column.dragged = this.element
    Column.dragged.classList.add('dragged')

    event.stopPropagation()

    document
            .querySelectorAll('.note')
            .forEach(noteElement => noteElement.removeAttribute('draggable'))
  }

  dragend (event) {
    Column.dragged.classList.remove('dragged')
    Column.dragged = null
    Column.droped = null

    document
            .querySelectorAll('.note')
            .forEach(noteElement => noteElement.setAttribute('draggable', true))
  
            Application.save()
  }

  dragover (event) {
      event.preventDefault()
      event.stopPropagation()

      if (Column.dragged === this.element) {
        if (Column.dropped) {
          Column.dropped.classList.remove('under')
        }

        Column.dropped = null
      }

      if (!Column.dragged||this.element === Column.dragged) {
          return
      }

      Column.dropped = this.element

      this.element.classList.add('under')

      document
              .querySelectorAll('.column')
              .forEach(columnElement =>columnElement.classList.remove('under'))

              this.element.classList.add('under')
  }

  drop() {
    
    if (Column.dragged) {
      const children = Array.from(document.querySelectorAll('.column'))
      const indexA = children.indexOf(this.element)
      const indexB = children.indexOf(Column.dragged)

      if (indexA < indexB) {
          document.querySelector('.columns').insertBefore(Column.dragged, this.element)        
      }

      else { 
          document.querySelector('.columns').insertBefore(Column.dragged, this.element.nextElementSibling)
      }
      document
              .querySelectorAll('.column')
              .forEach(columnElement =>columnElement.classList.remove('under'))
    }
  }
}

  Column.idCounter = 1
  Column.dragged = null
  Column.dropped = null