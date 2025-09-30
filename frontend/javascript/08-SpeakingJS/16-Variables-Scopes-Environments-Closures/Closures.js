var outerValue = 'ninja';

/**
 * Declare an empty value that we'll use later.
 * See how to proper naming helping us understand what something is used for?
 */
var later;

function outerFunction() {

  /**
   * Declares a value inside the function. This variable's scope
   * is limited to the function and cannot be accessed from outside the function
   */
  var innerValue = 'samurai';

  /**
   * Declare an inner function within the outer function.
   * Note that innerValue is in scope when we declare this function
   * @return {} [description]
   */
  function innerFunction() {
    console.log(outerValue);
    console.log(innerValue);
  }

  /**
   * Stores a reference to the inner function in the later variable.
   * Because later is in the global scope, it will allow us to call the function later
   * @type {[type]}
   */
  later = innerFunction();
}

/**
 * Invoke the outer function, which causes the inner 
 * function to be declared and its reference assigned to later
 */
outerFunction();

/**
 * Invoke the inner function through later.
 * We can't invoke it directly because its scope (along with innerValue) is limited to within outerFunction()
 */
later();



/**
 * when should we use CLOSURE
 */
// use like getter and setter
/**
 * Define a constructor for a Ninja
 */
function Ninja() {
  /**
   * Declare a variable inside function (constructor)
   * Because the scope of the variable is limited to inside the constructor,
   * it's a 'private' variable. We'll use it to count how many the ninja has feinted
   */
  var feints = 0;

  /**
   * Create an accessor method for the feints counter. As the variable is not accessible
   * to code outside the constructor, this is a commmon way to give read-only access to the value
   */
  this.getFeints = function() {
    return feints;
  };

  /**
   * Declares the increment method for the value. 
   * Because the value is private, no one can screw it up behind our backs; thay are limited to the
   * access that we give them vis methods
   */
  this.feint = function() {
    feints ++;
  };

  /**
   * Now for testing, first we counstruct an instance of Ninja
   */
  var ninja = new Ninja();

  /**
   * Cal the feint() method which increments the count of the
   * number of times that our ninja has feinted
   */
  ninja.feint();

  /**
   * Vertify that we can't get the variable directly
   */
  assert(ninja.getFeints() == 1, 'We are able to accsee the internal feint count');

  /**
   * Show that we have caused the value in increment to 1, even though we had no direct access to it. 
   * We can affect the feints value because, even though the constructor in which it's declared has finished exciting
   * and gone out of the scope, the feints variable is bound into the closure(think protective bubble)
   * create by the declaration of the feint() method, and is variable to that method
   * @type {[type]}
   */
  assert(ninja.feints = undefined, 'And the private data is inaccessable for us');
}

//http://ktmt.github.io/blog/2013/05/12/closure-va-scope-cua-javascript/
//example
// scope
function outside(x) {
  function inside(y) {
    return x + y;
  }
  return inside;
}

fn_inside = outside(3);
result = fn_inside(5); // result 8
result1 = outside(3)(5); // result 8

