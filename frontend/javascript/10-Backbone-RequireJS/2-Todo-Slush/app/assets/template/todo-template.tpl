{{#if done}}
  <div class="view">
    <label>
      <input type="checkbox" name="task-item" checked class="toggle"><span class="overlay"></span>
    </label>
    <label class="task-title done">{{title}}</label>
    <input class="edit-todo hide">
    <button class="destroy"></button>
  </div>
  
  {{else}}
  <div class="view">
    <label>
      <input type="checkbox" name="task-item" class="toggle"><span class="overlay"></span>
    </label>
    <label class="task-title">{{title}}</label>
    <input class="edit-todo hide">
    <button class="destroy"></button>
  </div>
{{/if}}