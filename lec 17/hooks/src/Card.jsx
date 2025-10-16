import React, {usecontext, usestate, useEffect, useMemo} from 'react'
import './Card.css'
import { TodoContext } from './TodoContext'
import UserCard from './components/UserCard'
import StatsCard from './components/StatsCard'
 const Card = () => {
    const todoContext = usecontext(TodoContext)
    const [user, setUsers] = useState([
        {
            "id":1,
            "name": "aakit",
            "age": 50,
            "state": "kashmir"
        },
        {
            "id":3,
            "name": "abiket",
            "age": 55,
            "state": "pakistan"
        },
        {
            "id":2,
            "name": "anshyu",
            "age": 53,
            "state": "UP"
        },
        {
            "id":4,
            "name": "Deepak",
            "age": 52,
            "state": "Jharkhand"
        }

    ])
    const [searchTerm, setSearchTerm] = useState('')
    const [sortBy, setSortBy] = useState('name') 
    
    // useEffect hook - for side effects
    useEffect(() => {
        console.log('Card component mounted or users changed')
        
        // Cleanup function
        return () => {
            console.log('Card component cleanup')
        }
    }, [users])
    
    useEffect(() => {
        // This effect runs when searchTerm changes
        console.log(`Searching for: ${searchTerm}`)
    }, [searchTerm])
    
    // useMemo hook - for expensive calculations (filtering and sorting)
    const filteredAndSortedUsers = useMemo(() => {
        console.log('Filtering and sorting users...') // Only logs when dependencies change
        
        let filtered = users.filter(user => 
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.state.toLowerCase().includes(searchTerm.toLowerCase())
        )
        
        // Sort users
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'age':
                    return a.age - b.age
                case 'state':
                    return a.state.localeCompare(b.state)
                default:
                    return a.name.localeCompare(b.name)
            }
        })
        
        return filtered
    }, [users, searchTerm, sortBy])
    
    // useMemo hook - for calculating user statistics
    const userStats = useMemo(() => {
        return {
            totalUsers: users.length,
            averageAge: users.reduce((sum, user) => sum + user.age, 0) / users.length,
            uniqueStates: [...new Set(users.map(user => user.state))].length
        }
    }, [users])
    
    const handleUserToggle = (id) => {
        setUsers(prev => prev.map(user => 
            user.id === id ? { ...user, isActive: !user.isActive } : user
        ))
    }

    const handleStatsClick = (statsData) => {
        console.log('Stats clicked:', statsData)
        alert(`You clicked on ${statsData.title}: ${statsData.value}`)
    }
    
    return (
        <div className="card-container">
            <h2>User Profiles with React Hooks Demo</h2>
            
            {/* Search and Sort Controls */}
            <div className="controls">
                <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                
                <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)}
                    className="sort-select"
                >
                    <option value="name">Sort by Name</option>
                    <option value="age">Sort by Age</option>
                    <option value="state">Sort by State</option>
                </select>
            </div>
            
            {/* Statistics with Props Demo */}
            <div className="stats">
                <StatsCard
                    title="Total Users"
                    value={userStats.totalUsers}
                    icon="👥"
                    color="#667eea"
                    clickable={true}
                    onClick={handleStatsClick}
                    size="medium"
                    variant="default"
                />
                <StatsCard
                    title="Average Age"
                    value={userStats.averageAge.toFixed(1)}
                    icon="📊"
                    color="#4CAF50"
                    clickable={true}
                    onClick={handleStatsClick}
                    size="medium"
                    variant="outlined"
                />
                <StatsCard
                    title="Unique States"
                    value={userStats.uniqueStates}
                    icon="🗺️"
                    color="#ff9800"
                    trend={{ direction: 'up', value: '+2' }}
                    clickable={true}
                    onClick={handleStatsClick}
                    size="medium"
                    variant="filled"
                />
            </div>
            
            {/* Todo Context Demo */}
            {todoContext && (
                <div className="context-demo">
                    <h3>Context Hook Demo (from Parent)</h3>
                    <p>Total Todos: {todoContext.todos.length}</p>
                    <p>Completed Todos: {todoContext.todos.filter(todo => todo.completed).length}</p>
                </div>
            )}
            
            {/* User Cards with Props Demo */}
            <div className="user-grid">
                {filteredAndSortedUsers.map((user, index) => (
                    <UserCard
                        key={user.id}
                        user={user}
                        onToggle={handleUserToggle}
                        theme={index % 2 === 0 ? 'light' : 'dark'}
                        showAge={true}
                        showState={true}
                        className={`user-card-${index + 1}`}
                        customStyle={{
                            transform: `rotate(${index * 2}deg)`,
                            transition: 'transform 0.3s ease'
                        }}
                    >
                        {/* Children prop demonstration */}
                        <div className="user-extra-info">
                            <small>User ID: {user.id}</small>
                            <small>Status: {user.isActive ? 'Active' : 'Inactive'}</small>
                        </div>
                    </UserCard>
                ))}
            </div>
            
            {filteredAndSortedUsers.length === 0 && (
                <p className="no-results">No users found matching your search.</p>
            )}
        </div>
    );
}

export default Card;
