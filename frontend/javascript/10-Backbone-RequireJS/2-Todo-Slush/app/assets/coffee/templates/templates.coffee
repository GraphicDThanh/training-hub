define (require) ->
  Handlebars = require('handlebars')
  _todoTemplate = require('text!../../template/todo-template.tpl')
  _footerTemplate = require('text!../../template/footer-template.tpl')

  # Define helper compare
  Handlebars.registerHelper 'compare', (valueA, valueB, options) ->
    if arguments.length < 3
      throw new Error('Handlebars Helper "compare" needs 2 parameters')
    operator = options.hash.operator or '=='
    operators =
      '==': (a, b) ->
        a == b
      '===': (a, b) ->
        a == b
      '!=': (a, b) ->
        a != b
      '<': (a, b) ->
        a < b
      '>': (a, b) ->
        a > b
      '<=': (a, b) ->
        a <= b
      '>=': (a, b) ->
        a >= b
      'typeof': (a, b) ->
        typeof a == b
    if !operators[operator]
      throw new Error('Handlebars Helper "compare" doesn\'t know the operator ' + operator)
    result = operators[operator](valueA, valueB)
    if result
      options.fn this
    else
      options.inverse this

  ###
  # Given a template and an optional arguments object, return
  # the compile template, or, if a context is passed, invokes the compiled
  # template with the given context
  ###

  _compiled = (tpl, context) ->
    compiled = Handlebars.compile(tpl)
    if context then compiled(context) else compiled

  {
    todoTemplate: ->
      _compiled _todoTemplate, arguments[0]
    footerTemplate: ->
      _compiled _footerTemplate, arguments[0]

  }