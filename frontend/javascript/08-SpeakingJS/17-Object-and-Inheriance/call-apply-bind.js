function abc() {
  this.x = 100;
  setTimeout(function() {
    console.log(this.x);// undefined
  }, 1000);
}

// use bind to reset context
function abc() {
  this.x = 100;
  setTimeout(function() {
    console.log(this.x);// luc nay this con se la this cha do bind gan' vao`
  }.bind(this), 1000);
}

// use call and apply to reset context
// change code to
function abc() {
  this.x = 100;
  setTimeout(def, 1000);
}

function def() {
  console.log(this.x);
}

// apply
function abc() {
  this.x = 100;
  setTimeout(def, 1000);
  // call
  def.call(this, 100, 200);// tham so co dinh, truyen du la vo mat lien
  //apply
  def.apply(this, [100, 200, 300]);// tham so linh hoat, truyen du cung khong sao
}

function def() {
  console.log(this.x + b);
}