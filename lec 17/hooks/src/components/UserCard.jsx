import react, { Children } from 'react'
import PropTypes from 'prop-types'
const UserCard =({
    user,
    onToggle,
    theme = 'light',
    showAge = true,
    showState = true,
    customStyle = {},
    className = '',
    Children
}) => {
    const cardStyle = {
    ...customStyle,
    backgroundColor: theme === 'dark' ? '#333' : '#fff',
    color: theme === 'dark' ? '#fff' : '#333'
    }
    return (
        <div 
      className={`user-card ${className} ${user.isActive ? 'active' : ''}`}
      style={cardStyle}>
        <h3> {user.name}</h3>
        {showAge && (
            <p><strong>Age:</strong>{user.age}</p>
        )}
        {showState &&(
            <p><strong>Age:</strong>{user.state}</p>
        )}
        <button onClick={()=> onToggle(user.id)}
        className='toggle-btn' >{user.isActive ? 'Deactivate' : 'Activate'}
        </button>
        {
            Children && (
                <div className='user-card-childer'> {childern}</div>
            )
        }

      </div>
    )
}
UserCard.PropTypes={
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name:  PropTypes.string.isRequired,
        age: PropTypes.number.isRequired,
        state: PropTypes.string.isRequired,
        isActive: PropTypes.bool
    }).isRequired,
     onToggle: PropTypes.func.isRequired,
  theme: PropTypes.oneOf(['light', 'dark']),
  showAge: PropTypes.bool,
  showState: PropTypes.bool,
  customStyle: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node
}
UserCard.defaultProps = {
  theme: 'light',
  showAge: true,
  showState: true,
  customStyle: {},
  className: ''
}
export default UserCard