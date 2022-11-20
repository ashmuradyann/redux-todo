import { useSelector } from 'react-redux';

import Todo from '../todo/Todo';

import './TodosList.scss'

const TodosList = () => {
    const { todos } = useSelector(state => state)
    
    return <div className="todos-list">
        {todos.length === 0 ? <h2>List is empty</h2> : todos.map(el => <Todo key={el.id} el={el} />)}
    </div>
}

export default TodosList