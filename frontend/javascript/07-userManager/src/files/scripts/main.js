(function() {
  // Use strict mode
  'use trict';

  var userList = [],
    userListViews;

  $(document).ready(function() {
    autoRenderData();

    // Add new user
    $('#add-user').click(function() {
      addNewUser();
      $('#add-name').val('');
      $('#add-email').val('');
      $('#add-occupation').val('');
    });

    $('#btn-search').click(function() {
      var searchContent = $('#search-content').val();
      if(_.isString(searchContent) && searchContent !== '') {
        var userListViews = new UserListViews(userList);
        userListViews.renderSearchResult(searchContent);
      } else {
        alert('Please enter string for search by name!');
      }
      $('#search-content').val('');
    });
  });

  function addNewUser() {
    var user,
      name = $('#add-name').val(),
      email = $('#add-email').val(),
      occupation = $('#add-occupation').val();

    if(name === '' || email === '' || occupation == '') {
      alert('Invalid form! Please add again!');
      return false;
    } else {
      var newUser = {
        id: _.uniqueId(new Date().getUTCMilliseconds()),
        name: name,
        email: email,
        occupation: occupation
      };

      user = new User(newUser);
      userList.push(user);

      buildUserFromData();
      saveDataToLocalStorage(userList);
    }
  }

  function autoRenderData() {
    var currentUsers = helper.getLocalStorage().userList;
    if (_.isNull(currentUsers) || _.isUndefined(currentUsers) || currentUsers.length === 2) {
      autoCreateUser();
      buildUserFromData();
      saveDataToLocalStorage(userList);
    } else {
      currentUsers = JSON.parse(currentUsers);

      // Build UI and event from local Storage data
      currentUsers.forEach(function(user) {
        userList.push(new User(user));
      })

      buildUserFromData();
    }
  }

  function buildUserFromData() {
    var userListViews = new UserListViews(userList);
    userListViews.renderAll();
  }

  function autoCreateUser() {
    _.range(50).map(function() {
        this.id = _.uniqueId(new Date().getUTCMilliseconds());
        this.name = faker.name.findName();
        this.email = faker.internet.email();
        this.occupation = faker.lorem.words();
        var user = new User(this);
        userList.push(user);
        return userList;
    });
  }
}).call(this);

function saveDataToLocalStorage(userList) {
  helper.getLocalStorage().setItem('userList', JSON.stringify(userList));
}