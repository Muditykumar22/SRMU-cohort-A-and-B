import React from 'react'
import PropTypes from 'prop-types'

// Props demonstration component for statistics
const StatsCard = ({ 
  title, 
  value, 
  icon, 
  color = '#667eea',
  trend = null,
  subtitle = '',
  onClick,
  clickable = false,
  size = 'medium',
  variant = 'default'
}) => {
  const handleClick = () => {
    if (clickable && onClick) {
      onClick({ title, value, trend })
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { padding: '1rem', fontSize: '0.9rem' }
      case 'large':
        return { padding: '2rem', fontSize: '1.2rem' }
      default:
        return { padding: '1.5rem', fontSize: '1rem' }
    }
  }

  const getVariantStyles = () => {
    switch (variant) {
      case 'outlined':
        return { 
          border: `2px solid ${color}`,
          backgroundColor: 'transparent',
          color: color
        }
      case 'filled':
        return { 
          backgroundColor: color,
          color: 'white'
        }
      default:
        return { 
          backgroundColor: '#f8f9fa',
          color: '#333',
          borderLeft: `4px solid ${color}`
        }
    }
  }

  return (
    <div 
      className={`stats-card ${clickable ? 'clickable' : ''} ${variant}`}
      style={{
        ...getSizeStyles(),
        ...getVariantStyles(),
        cursor: clickable ? 'pointer' : 'default'
      }}
      onClick={handleClick}
    >
      <div className="stats-header">
        {icon && <span className="stats-icon">{icon}</span>}
        <h3 className="stats-title">{title}</h3>
      </div>
      
      <div className="stats-value" style={{ color: variant === 'default' ? color : 'inherit' }}>
        {value}
      </div>
      
      {subtitle && (
        <div className="stats-subtitle">{subtitle}</div>
      )}
      
      {trend && (
        <div className="stats-trend">
          <span className={`trend-arrow ${trend.direction}`}>
            {trend.direction === 'up' ? '↗️' : '↘️'}
          </span>
          <span className="trend-value">{trend.value}</span>
        </div>
      )}
    </div>
  )
}

// PropTypes validation
StatsCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.string,
  color: PropTypes.string,
  trend: PropTypes.shape({
    direction: PropTypes.oneOf(['up', 'down']).isRequired,
    value: PropTypes.string.isRequired
  }),
  subtitle: PropTypes.string,
  onClick: PropTypes.func,
  clickable: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  variant: PropTypes.oneOf(['default', 'outlined', 'filled'])
}

// Default props
StatsCard.defaultProps = {
  color: '#667eea',
  subtitle: '',
  clickable: false,
  size: 'medium',
  variant: 'default'
}

export default StatsCard
