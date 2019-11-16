class Note {
  constructor(id = null, content = '') {
    const element = this.element = document.createElement('div') //создадим элемент и присвоим ему класс и атрибуты(но пока виртуально не отрисовывая)
      
    element.classList.add('note')
    element.setAttribute('draggable', true)
    element.textContent = content

    if (id) {
      element.setAttribute('data-note-id', id)
    }
    else {
      element.setAttribute('data-note-id', Note.idCounter)
      Note.idCounter++
    }

    element.addEventListener('dblclick', function(event) {
      element.setAttribute('contenteditable', true) // задаем элементу возможность редактироваться
      element.removeAttribute('draggable')
      // element.parentElement.parentElement.removeAttribute('draggable')
      element.closest('.column').removeAttribute('draggable') //closest - ищет не по дочерним элементам а по родительским querySelector
      Label.setCarriage(element)
      element.focus() //и переводим на него фокус
    })
  
    element.addEventListener('blur', function (event) { //возникает когда элемент теряет фокус
      element.removeAttribute('contenteditable') 
      element.setAttribute('draggable', true)
      element.parentElement.parentElement.setAttribute('draggable', true)
      element.textContent = element.textContent.trim()
      
      if (!element.textContent.trim().length) {
        element.remove()
      }
      Application.save()
    }) 
    
    element.addEventListener('dragstart', this.dragstart.bind(this))
    element.addEventListener('dragend', this.dragend.bind(this))
    element.addEventListener('dragenter', this.dragenter.bind(this))
    element.addEventListener('dragover', this.dragover.bind(this))
    element.addEventListener('dragleave',  this.dragleave.bind(this))
    element.addEventListener('drop',  this.drop.bind(this))
  }

  
  dragstart(event) {
    event.stopPropagation()
    Note.dragged = this.element   //над кем перетаскиваем
    this.element.classList.add('dragged') //так как при захвате обьекта он присутсвует и возле мышки и на старом месте , то придаем клас скрывающий элемент на старом месте
  }

  dragend (event) {
    event.stopPropagation()
    Note.dragged = null
    this.element.classList.remove('dragged')

    Application.save()
  }

  dragenter (event) {
    event.stopPropagation()
    if (this.element === Note.dragged || !Note.dragged) {//если перетаскивавемый и тот над кем таскают один и тотже элемент то отменяем дальнейшую обработку события
      return 
    }
    this.element.classList.add('under')
}

  dragover (event) {
    event.preventDefault() //отменить обработку события по умолчанию и тогда заработает drop
    if (this.element === Note.dragged || !Note.dragged) {
      return 
    }
  }

  dragleave(event) {
    event.stopPropagation()
    
    if (this.element === Note.dragged || !Note.dragged) {
      return 
    }
    this.element.classList.remove('under')
  }

  drop (event) { //когда отпускаем мышку над какимто элементом
    event.stopPropagation()
    
    if (this.element === Note.dragged || !Note.dragged) {
      return 
    }
    this.element.classList.remove('under')
    
    if (this.element.parentElement === Note.dragged.parentElement) { //Если переносимый элемент в одной колонке с тем куда переносим, то хотим поменять местами
      //находим порядок элемента, и если более рапний мы таши в них то значит хотим его опустить
      const note = Array.from(this.element.parentElement.querySelectorAll('.note')) //создаем массив всех заметок в этом родительском элементе
      const indexA = note.indexOf(this.element) //находим индекс в масиве note элемента this , Note.dragged
      const indexB = note.indexOf(Note.dragged)

      if ( indexA < indexB) { //если то где я бросил ниже того что я бросил то будем вызывать //поставить выше обьекта
        this.element.parentElement.insertBefore(Note.dragged, this.element)
      } 

      else {
        this.element.parentElement.insertBefore(Note.dragged, this.element.nextElementSibling) //после его братского элемента
      }
    }

    else { //если в разных то перенос из одного сталбца в другой
      this.element.parentElement.insertBefore(Note.dragged, this.element) //вставить перед тем местом на котоым отпустим//что вставить .. куда вставить
    }
  }
}

Note.idCounter = 8
Note.dragged = null