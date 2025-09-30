/**
 * TodoView class
 * Using to manage Todo Object
 * @param {Obj} todoObj
 */
var TodoView = function(todoObj, todoListViews) {
  this.todoObj = todoObj;
  this.rootElement = $('<li class="task-wrapper"></li>');
  //parent attribute use to create relative with TodoListViews to get todoList
  this.parent = todoListViews;
}

/**
 * Render TodoView
 * @param {Obj} todoObj
 */
TodoView.prototype.render = function () {
  var i = 0,
    self = this,
    done = self.todoObj.done,
    content = self.todoObj.content,
    todoList = self.parent.todoList,
    lenTodoList = todoList.length,
    $btnDestroy = $('<button class="destroy">' + '</button>'),
    $checkbox = done ? $('<input type="checkbox" name="task-item" class="toggle" checked>')
      : $('<input type="checkbox" name="task-item" class="toggle">'),
    $tasktitle = done ? $('<label class="task-title completed"></label>') : $('<label class="task-title"></label>'),
    $tasktitle = $tasktitle.append(content);
    $view = $('<div class="view"><label><span class="overlay"></span></label></div>');
    $editBox = $('<input class="edit-todo hide"></input>');
    $view = $view.append($tasktitle).append($editBox);

  $view = $view.append($tasktitle).append($btnDestroy);
  $view.children(':first').prepend($checkbox);
  this.rootElement.append($view);

  // add event for button Destroy
  $btnDestroy.click(function() {

    // remove UI
    self.destroyUI();
    if (self.parent.rootElement.children().length == 0) {
      $('.main-content').addClass('hide');
      $('.footer-content').addClass('hide');
    }
    
    //remove data
    var taskIdDestroy = self.todoObj.id;
    for (; i < lenTodoList; i++) {
      if (todoList[i].id === taskIdDestroy){
        todoList.splice(i,1);
        $('#todo-count strong').text(counterActiveTodo(self.parent.todoList));
        break;
      }
    }

    // Update data for storage
    saveDataToLocalStorage(self.parent.todoList);
  });

  // add event for checkbox
  $checkbox.change(function() {
    $checkbox.parent().siblings('.task-title').toggleClass("completed", this.checked);

    // update data for local Storage
    self.todoObj.toogleStatus();

    // counter active task 
    $('#todo-count strong').text(counterActiveTodo(self.parent.todoList));
    saveDataToLocalStorage(self.parent.todoList);

    // Handle when in active tab
    if($('#active-task').hasClass('selected') && !self.rootElement.find('.toggle').is('checked')) {
      self.rootElement.addClass('hide');
    }
  });

  // edit content
  $tasktitle.dblclick(function() {
    self.rootElement.find('.edit-todo').removeClass('hide').val($(this).text()).select();
    $(this).addClass('hide');
  });

  // apply after change content
  $editBox.keypress(function () {
    var keycode = event.keyCode;
    if (keycode === 13) {
      $(this).addClass('hide');
      
      // UI content
      self.rootElement.find('.task-title').removeClass('hide').text($(this).val());

      //data content
      self.todoObj.content = $(this).val();
      saveDataToLocalStorage(self.parent.todoList);
    }
  });

  return self.rootElement;
}

TodoView.prototype.destroyUI = function () {
  this.rootElement.remove();
}