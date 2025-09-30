/**
 * UserView class
 * Using to manage User
 * @param {Obj} todoObj
 */
var UserView = function(User, UserListViews) {
  this.user = User;
  this.rootElement = $('<div>', {class: 'row user-view'});
  this.parent = UserListViews;
}

/**
 * Render userView which its event
 * @return {this.rootElement}
 */
UserView.prototype.render = function() {
  var i = 0,
    self = this,
    $uniqueSave,
    $btnEdit = $('<button>', {
      class: 'btn btn-default btn-sm',
      id: 'btn-edit',
      'data-toggle': 'modal',
      'data-target': '#edit-modal',
      text: 'Edit'
    }),
    $btnRemove = $('<button>', {
      class: 'btn btn-danger btn-sm',
      id: 'btn-remove',
      text: 'Remove'
    }),
    $btnGroup = $('<div>', {
      class: 'col-xs-2 btngroup-action text-center'
    }),
    $btnGroup = $btnGroup.append($btnEdit),
    $btnGroup = $btnGroup.append($btnRemove),
    $id = $('<div>', { class: 'col-xs-1', text: this.user.id}),
    $name = $('<div>', { class: 'col-xs-3 ellipsis user-name', text: this.user.name }),
    $email = $('<div>', { class: 'col-xs-3 ellipsis user-email', text: this.user.email }),
    $occupation = $('<div>', { class: 'col-xs-3 ellipsis user-occupation', text: this.user.occupation });
    arrElements = [$id, $name, $email, $occupation, $btnGroup];

  // append arrElements to rootElement
  arrElements.forEach(function(index) {
    self.rootElement.append(index);
  });

  // show model edit-content when click button edit
  $btnEdit.click(function() {
    $('.modal-edit').modal('show')
    self.viewEditUser();

    $('.modal-edit').attr('id', self.user.id);

    $uniqueSave = $('#' + self.user.id + ' .save-change');
    $uniqueSave.click(function() {
      $('.modal-edit').modal('hide')
      var uniqueEditName = $('#' + self.user.id + ' #edit-name').val(),
          uniqueEditEmail = $('#' + self.user.id + ' #edit-email').val(),
          uniqueEditOccupation = $('#' + self.user.id + ' #edit-occupation').val();
      if(!_.isEmpty(uniqueEditName) && !_.isEmpty(uniqueEditEmail) && !_.isEmpty(uniqueEditOccupation)) {
        // edit UI
        $name.text(uniqueEditName);
        $email.text(uniqueEditEmail);
        $occupation.text(uniqueEditOccupation);

        // save data
        var userList = self.parent.userList,
          length = userList.length,
          i = 0,
          editId = self.user.id;
        for(; i < length; i++) {
          if(userList[i].id === editId) {
            userList[i].name = uniqueEditName;
            userList[i].email = uniqueEditEmail;
            userList[i].occupation = uniqueEditOccupation;
            saveDataToLocalStorage(userList);
            break;
          }
        }
      }
    });
  });

  // remove user
  $btnRemove.click(function() {
    // remove UI
    self.destroyUserUI();

    var userList = self.parent.userList;
    if(!_.isNull(userList) && !_.isUndefined(userList)) {
      var i = 0,
        userIdDestroy = self.user.id,
        lengthUserList = userList.length;
      for(; i < lengthUserList; i++) {
        if(userList[i].id === userIdDestroy) {
          userList.splice(i, 1);
          break;
        }
      }
    } else {
      console.log('userList is null or undefined!');
    }
    saveDataToLocalStorage(userList);
  });

  return this.rootElement;
}

/**
 * Handle view exist text for input in model edit
 * @return {}
 */
UserView.prototype.viewEditUser = function() {
  $('#edit-name').val(this.user.name);
  $('#edit-email').val(this.user.email);
  $('#edit-occupation').val(this.user.occupation);
}

/**
 * [destroyUserUI when click remove button]
 * @return {}
 */
UserView.prototype.destroyUserUI = function() {
  this.rootElement.remove();
}