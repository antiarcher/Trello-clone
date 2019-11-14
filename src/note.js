const Note = {
  idCounter: 8, //текуший айдишник lkz элемента note
  dragged: null, //элемент который мы перетаскиваем
  //добавляет возможность редактировать текст(добавляет/убирает атрибут contenteditable)
  proces (noteElement) { //функция обрабатывает карточки
    noteElement.addEventListener('dblclick', function(event) {
      noteElement.setAttribute('contenteditable', true) // задаем элементу возможность редактироваться
      noteElement.removeAttribute('draggable')
      // noteElement.parentElement.parentElement.removeAttribute('draggable')
      noteElement.closest('.column').removeAttribute('draggable') //closest - ищет не по дочерним элементам а по родительским querySelector
      noteElement.focus() //и переводим на него фокус
    })
  
    noteElement.addEventListener('blur', function (event) { //возникает когда элемент теряет фокус
      noteElement.removeAttribute('contenteditable') 
      noteElement.setAttribute('draggable', true)
      noteElement.parentElement.parentElement.setAttribute('draggable', true)
  
      if (!noteElement.textContent.trim().length) {
        noteElement.remove()
      }
    }) 
  
  //drag and drop event
  //для элементов который берут
  //dragstart - кого перетаскивают//взяли и ташим
  //dragend  - кого перетаскивают//отпустили того кого ташили
  
  //для элементов над которым таскают
  //dragenter - над чем водят //
  //dragover - над чем водят
  //dragleave - над чем водят
  //drop - над чем водят
  
  noteElement.addEventListener('dragstart', Note.dragstart)
  noteElement.addEventListener('dragend', Note.dragend)
  noteElement.addEventListener('dragenter', Note.dragenter)
  noteElement.addEventListener('dragover', Note.dragover)
  noteElement.addEventListener('dragleave',  Note.dragleave)
  noteElement.addEventListener('drop',  Note.drop)
  },
  
  dragstart(event) {
    Note.dragged = this   //над кем перетаскиваем
    this.classList.add('dragged') //так как при захвате обьекта он присутсвует и возле мышки и на старом месте , то придаем клас скрывающий элемент на старом месте
  },

    dragend (event) {
    Note.dragged = null
    this.classList.remove('dragged')
  },

  dragenter (event) {
    if (this === Note.dragged) {//если перетаскивавемый и тот над кем таскают один и тотже элемент то отменяем дальнейшую обработку события
      return 
    }
    this.classList.add('under')
},

  dragover (event) {
    event.preventDefault() //отменить обработку события по умолчанию и тогда заработает drop
    if (this === Note.dragged) {
      return 
    }
  },

  dragleave(event) {
    if (this === Note.dragged) {
      return 
    }
    this.classList.remove('under')
  },

  drop (event) { //когда отпускаем мышку над какимто элементом
    event.stopPropagation()
    
    if (this === Note.dragged || Note.dragged == null) {
      return 
    }
    this.classList.remove('under')

    if (this.classList.contains('column-header')){
      this.parentElement.querySelector('[data-notes]').append(Note.dragged)
      return
    }
    
    if (this.parentElement === Note.dragged.parentElement) { //Если переносимый элемент в одной колонке с тем куда переносим, то хотим поменять местами
      //находим порядок элемента, и если более рапний мы таши в них то значит хотим его опустить
      const note = Array.from(this.parentElement.querySelectorAll('.note')) //создаем массив всех заметок в этом родительском элементе
      const indexA = note.indexOf(this) //находим индекс в масиве note элемента this , Note.dragged
      const indexB = note.indexOf(Note.dragged)

      if ( indexA < indexB) { //если то где я бросил ниже того что я бросил то будем вызывать //поставить выше обьекта
        this.parentElement.insertBefore(Note.dragged, this)
      } 

      else {
        this.parentElement.insertBefore(Note.dragged, this.nextElementSibling) //после его братского элемента
      }
    }

    else { //если в разных то перенос из одного сталбца в другой
      this.parentElement.insertBefore(Note.dragged, this) //вставить перед тем местом на котоым отпустим//что вставить .. куда вставить
    }
  },


}







