const hardcodedId = 'Ankit_K123';
    const hardcodedPass = '123321';
    let todos = [];

    function showSignUp() {
      document.getElementById('auth-section').classList.add('hidden');
      document.getElementById('signup-section').classList.remove('hidden');
    }

    function showSignIn() {
      document.getElementById('signup-section').classList.add('hidden');
      document.getElementById('auth-section').classList.remove('hidden');
    }

    function signUp() {
      const id = document.getElementById('newUser').value;
      const pass = document.getElementById('newPass').value;
      if (id === hardcodedId && pass === hardcodedPass) {
        alert('Account created! Now sign in.');
        showSignIn();
      } else {
        alert('You must use the hardcoded credentials.');
      }
    }

    function signIn() {
      const id = document.getElementById('userId').value;
      const pass = document.getElementById('userPass').value;
      if (id === hardcodedId && pass === hardcodedPass) {
        document.getElementById('auth-section').classList.add('hidden');
        document.getElementById('todo-section').classList.remove('hidden');
      } else {
        alert('Invalid credentials!');
      }
    }

    function signOut() {
      document.getElementById('todo-section').classList.add('hidden');
      document.getElementById('auth-section').classList.remove('hidden');
    }

    function addTodo() {
      const input = document.getElementById('todoInput');
      const timeInput=document.getElementById('todoTime');
      const text = input.value.trim();
      const time=timeInput.value.trim();
      if (text === '' || time === '') {
        alert('Please enter a task and time.');
        return;
      } 
      todos.push({text,time});
      input.value = '';
      timeInput.value='';
      renderTodos();
    }

    function deleteTodo(index){
      todos.splice(index, 1);
      renderTodos();
    }

    function editTodo(index){
      const newText=prompt("Edit your todo:",todos[index].text);
      if(newText!==null && newText.trim()!==''){
        todos[index].text=newText.trim();
        renderTodos();
      }
    }

    function renderTodos() {
      const list = document.getElementById('todoList');
      list.innerHTML = '';
      todos.forEach((todo,i) => {
        const li = document.createElement('li');
        li.innerHTML = `
        <div>
          <div class="todo-text">${todo.text}</div>
          <div class="todo-time">Set for : ${todo.time}</div>
        </div>
        <div>
          <button class="btn-small btn-update" onClick="editTodo(${i})">Update</button>
          <button class="btn-small btn-delete" onClick="deleteTodo(${i})">Delete</button>
        </div>`;
        list.appendChild(li);
      });
    }
        