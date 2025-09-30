/**
 * [UserListViews constructor]
 * @param {array of objects} userList [list of user object]
 */
var UserListViews = function(userList) {
  this.userList = userList;
  this.rootElement = $('#users-content');
}

/**
 * [renderAll userView base on userList]
 * @return {}
 */
UserListViews.prototype.renderAll = function() {
  this.rootElement.html('');
  var i = 0,
    self = this,
      userView,
      len = this.userList.length;
  for(; i < len; i ++) {
    userView = new UserView(this.userList[i], self);
    this.rootElement.append(userView.render());
  }
}

/**
 * [renderSearchResult description]
 * @param  {string} searchContent [searchContent which user type to search]
 * @return {}
 */
UserListViews.prototype.renderSearchResult = function(searchContent) {
  var userView,
    self = this;
  this.rootElement.html('');

  _.forEach(this.userList, function(n) {
    if(n.name.indexOf(searchContent) !== -1) {
      userView = new UserView(n, self);
      self.rootElement.append(userView.render());
    }
  }).value();
}