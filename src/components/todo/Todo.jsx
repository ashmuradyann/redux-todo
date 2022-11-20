import { useDispatch } from 'react-redux';

import createAction from '../../store/createAction';
import { deleteFile } from '../../utils/firebase';

import { ACTIONS_TYPES } from '../../store/action-types';

import './Todo.scss'

const Todo = ({ el }) => {
    const { title, text, file, id, completed, finishedDate } = el

    const dispatch = useDispatch()

    const editTodo = (id) => {
        dispatch(createAction(ACTIONS_TYPES.EDITITING_TODO_ID, { id: id, title, text }))
    }
    
    const deleteTodo = (id) => {
        dispatch(createAction(ACTIONS_TYPES.DELETE_TODO, { id: id }))
        file && deleteFile(file.name)
    }

    const setCompletedTodo = (id) => {
        const date = new Date()
        const now = date.getUTCMonth() + 1
            + "." + date.getUTCDate()
            + "." + date.getUTCFullYear()
            + " " + String(date.getHours()).padStart(2, '0')
            + ':' + String(date.getMinutes()).padStart(2, '0')

        dispatch(createAction(ACTIONS_TYPES.SET_COMPLETE_TODO, { id: id, finishedDate: now }))
    }

    return <div className="todo" key={id}>
        <div>
            <input type="checkbox" className="custom-checkbox" id={id} name={id} checked={completed} onChange={() => setCompletedTodo(id)} />
            <label htmlFor={id}></label>
            <div>
                <div>
                    <div>
                        <h3>{title}</h3>
                        {completed && <>
                            <p>&middot;</p>
                            <p>{finishedDate}</p>
                        </>}
                    </div>
                    <p>{text}</p>
                </div>
            </div>
        </div>
        <div>
            {file ? <a href={file.url} download><img src="https://img.icons8.com/fluency-systems-filled/37/ffe89d/new-by-copy.png" alt="file" /></a> : null}
            <p>{file && file.name}</p>
            <button onClick={() => editTodo(id, text)}>Edit</button>
            <button onClick={() => deleteTodo(id)}>Delete</button>
        </div>
    </div>
}

export default Todo