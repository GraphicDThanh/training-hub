(function() {
  'use trict';

  var self = this,
    todoList = [],
    todoListViews;

  // DOM already to use
  $(document).ready(function () {

    // check local Storage and do with it first
    checkAndGetLocalStorageAndRender();
    
    // use enter to create task
    initTodoTaskWithEnterAndRender();

    // check-all
    $('#toggle-all').change(toogleAll);

    // change toggle class with filter select (UI)
    $("#filters a").click(toogleClassForFilterButton);

    $('#clear-completed').click(function() {
      clearCompleted();
    });
  });

  function checkAndGetLocalStorageAndRender() {
    var currentTodosObject = helper.getLocalStorage().todoList;
    if (currentTodosObject !== null && currentTodosObject !== undefined) {

      // convert to Todo object
      currentTodosObject = JSON.parse(currentTodosObject);

      // Build UI and event from local Storage data
      currentTodosObject.forEach(function(todo) {
        todoList.push(new Todo(todo));
      });

      // list view
      buildAndUpdateData();

      // count
      $('#todo-count strong').text(counterActiveTodo(todoList));

      // toogle footer
      toogleContent();
     }
  }

  function initTodoTaskWithEnterAndRender() {
    var i = 0,
        todo,
        todoView,
        $toggleAll = $('#toggle-all');
    $('#new-todo').keypress(function(e) {
      if (e.which === 13 && $(this).val() != '') {
        var new_todo = {
          content: $(this).val(),
          id: new Date().getUTCMilliseconds(),
          done: false
        };

        // create Todo object and add to todoList array
        todo = new Todo(new_todo);
        todoList.push(todo);

        // count
        $('#todo-count strong').text(counterActiveTodo(todoList));

        // save data to localStorage
        saveDataToLocalStorage(todoList);

        // handle event with toggle-all if it checked
        if($toggleAll.is(':checked')) {
          $toggleAll.prop('checked', false);
        }

        // list view
        buildAndUpdateData();

        // toogleContent
        toogleContent();

        //handle when add task in filter tab
        addTodoAfterFilter();

        // return input val to ''
        $(this).val('');
      }
    });
  }

  function clearCompleted() {
    var len = todoList.length,
      i = len - 1,
      todoListViews;

    for(; i >= 0; i--) {
      if (todoList[i].done === true) {
        todoList.splice(i,1);
      }
    }

    // rebuild list view
    buildAndUpdateData();

    // save data after clear
    saveDataToLocalStorage(todoList);

    // toogle footer
    toogleContent();
    
    // hide button clear-completed
    $(this).addClass('hide');
  }

  function toogleClassForFilterButton() {

    // remove classes from all
    $("#filters a").removeClass("selected");

    // add class to the one we clicked
    $(this).addClass("selected");
  }

  function toogleAll() {
    if($(this).is(':checked')) {
      $(".task-wrapper input.toggle:not(:checked)").trigger("click");
    } else {
      $(".task-wrapper input.toggle:checked").trigger("click");
    }
  }

  function toogleContent() {
    if (todoList.length === 0) {
      $('.footer-content').addClass('hide');
      $('.main-content').addClass('hide');
    } else {
      $('.footer-content').removeClass('hide');
      $('.main-content').removeClass('hide');
    }
  }

  function buildAndUpdateData() {
    todoListViews = new TodoListViews(todoList);
    todoListViews.render('all');
    renderBySort(todoListViews);
  }

  function renderBySort(todoListViews) {
    $('#active-task').click(function() {
      todoListViews.render('active');
    });

    $('#completed-task').click(function() {
      todoListViews.render('completed');
    });

    $('#all-task').click(function() {
      todoListViews.render();
    });
  }

  function addTodoAfterFilter() {
    if($('#active-task').hasClass('selected')) {
      todoListViews.render('active');
    } else if($('#completed-task').hasClass('selected')) {
      todoListViews.render('completed');
    }
  }
}).call(this);

function counterActiveTodo(todoList) {
  var i = 0,
      len = todoList.length,
      counter = 0;
  for (; i < len; i++) {
    if (todoList[i].done === false) {
      counter ++;
    }
  }

  if (counter < len) {
    $('#clear-completed').removeClass('hide');
  } else {
    $('#clear-completed').addClass('hide');
  }
  return counter;
}

function saveDataToLocalStorage(todoList) {
  helper.getLocalStorage().setItem('todoList', JSON.stringify(todoList));
}
