import React from 'react'
import PropTypes from 'prop-types'
const TodoItem =({
    todo,
    ontoggle,
    OnDelete,
    showdate = true,
    priority ='normal',
    size = 'medium',
    onEdit,
    editable =false,
    customActions
}) => {
    const getPriorityColor =(priority) => {
        switch (priority){
            case 'high': return '#ff4757'
            case 'medium': return '#ffa502'
            case 'low': return '#2ed573'
            default: return '#747d8c'
        }
    }
    const getSizeClass = (size) => {
    switch (size) {
      case 'small': return 'todo-small'
      case 'large': return 'todo-large'
      default: return 'todo-medium'
    }
  }
  
  return (
    <div 
      className={`todo-item ${todo.completed ? 'completed' : ''} ${getSizeClass(size)}`}
      style={{ borderLeft: `4px solid ${getPriorityColor(priority)}` }}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="todo-checkbox"
      />
      
      <div className="todo-content">
        <span className="todo-text">{todo.text}</span>
        
        {showDate && todo.createdAt && (
          <span className="todo-date">{todo.createdAt}</span>
        )}
        
        {priority !== 'normal' && (
          <span className="priority-badge" style={{ backgroundColor: getPriorityColor(priority) }}>
            {priority.toUpperCase()}
          </span>
        )}
      </div>
      
      <div className="todo-actions">
        {editable && onEdit && (
          <button 
            onClick={() => onEdit(todo.id)}
            className="edit-btn"
            title="Edit todo"
          >
            hii
          </button>
        )}
        
        <button 
          onClick={() => onDelete(todo.id)}
          className="delete-btn"
          title="Delete todo"
        >
         byee
        </button>
        
        {/* Custom actions prop */}
        {customActions && (
          <div className="custom-actions">
            {customActions(todo)}
          </div>
        )}
      </div>
    </div>
  )
}
TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    createdAt: PropTypes.string
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func,
  showDate: PropTypes.bool,
  priority: PropTypes.oneOf(['low', 'normal', 'medium', 'high']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  editable: PropTypes.bool,
  customActions: PropTypes.func
}
TodoItem.defaultProps ={
    showDate: true,
    priority: 'normal',
    size: 'medium',
    editable: false
}
export default TodoItem