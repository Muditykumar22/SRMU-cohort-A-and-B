import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import './App.css'
import Card from './Card'
import { TodoContext } from './TodoContext'
import TodoItem from './components/TodoItem'
function App(){
  const[todos, setTodos] = useState([])
  const[inputValue, setInputValue] = usestate('')
  const [filter, setFilter] = useState('all')
  const inputRef = useRef(null)
  useEffect(() => {
    const saveTodos = localStorage.storage.getItem('todos')
    if (savedTodos){
      setTodos(JSON.parse(saveTodos))
    }
  }, [])
  useEffect(()=> {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])
  useEffect(()=>{
    if (inputRef.current){
      inputRef.current.focus()
    }
  },[])
  const addTodo = useCallback(()=>{
    if(inputValue.trim()){
      const newTodo ={
        id: Date.now(),
        text:inputValue.trim(),
        completed: false,
        createdAt: new Date().toLocaleString()
      }
      setTodos(prev => [...prev, newTodo])
      setInputValue('')
    }
  }, [inputValue])
const toggleTodo = useCallback((id) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }, [])

  const deleteTodo = useCallback((id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }, [])

  // useMemo hook - for expensive calculations (filtering todos)
  const filteredTodos = useMemo(() => {
    console.log('Filtering todos...') // This will only log when dependencies change
    switch (filter) {
      case 'completed':
        return todos.filter(todo => todo.completed)
      case 'pending':
        return todos.filter(todo => !todo.completed)
      default:
        return todos
    }
  }, [todos, filter])

  // useMemo hook - for calculating statistics
  const todoStats = useMemo(() => {
    return {
      total: todos.length,
      completed: todos.filter(todo => todo.completed).length,
      pending: todos.filter(todo => !todo.completed).length
    }
  }, [todos])

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo()
    }
  }

  const handleEditTodo = (id) => {
    const newText = prompt('Edit todo:', todos.find(todo => todo.id === id)?.text)
    if (newText && newText.trim()) {
      setTodos(prev => prev.map(todo => 
        todo.id === id ? { ...todo, text: newText.trim() } : todo
      ))
    }
  }

  const getTodoPriority = (index) => {
    const priorities = ['low', 'normal', 'medium', 'high']
    return priorities[index % priorities.length]
  }

  const getTodoSize = (index) => {
    const sizes = ['small', 'medium', 'large']
    return sizes[index % sizes.length]
  }

  return (
    <TodoContext.Provider value={{ todos, addTodo, toggleTodo, deleteTodo }}>
      <div className="app">
        <h1>React Hooks Demo - Todo App</h1>
        
        {/* Input Section */}
        <div className="input-section">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a new todo..."
            className="todo-input"
          />
          <button onClick={addTodo} className="add-btn">Add Todo</button>
        </div>

        {/* Filter Section */}
        <div className="filter-section">
          <button 
            onClick={() => setFilter('all')} 
            className={filter === 'all' ? 'active' : ''}
          >
            All ({todoStats.total})
          </button>
          <button 
            onClick={() => setFilter('pending')} 
            className={filter === 'pending' ? 'active' : ''}
          >
            Pending ({todoStats.pending})
          </button>
          <button 
            onClick={() => setFilter('completed')} 
            className={filter === 'completed' ? 'active' : ''}
          >
            Completed ({todoStats.completed})
          </button>
        </div>

        {/* Todo List with Props Demo */}
        <div className="todo-list">
          {filteredTodos.map((todo, index) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={handleEditTodo}
              showDate={true}
              priority={getTodoPriority(index)}
              size={getTodoSize(index)}
              editable={true}
              customActions={(todo) => (
                <button 
                  onClick={() => alert(`Custom action for: ${todo.text}`)}
                  className="custom-action-btn"
                  title="Custom Action"
                >
                  ⭐
                </button>
              )}
            />
          ))}
        </div>

        {/* Display Card component */}
        <Card />
      </div>
    </TodoContext.Provider>
  )
}

export default App

