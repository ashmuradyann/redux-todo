import { useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"

import { deleteFile, uploadFileAndGetUrl } from "../../utils/firebase"
import createAction from "../../store/createAction"

import { ACTIONS_TYPES } from "../../store/action-types"

import './InputArea.scss'

const InputArea = () => {
    const fileRef = useRef(null)
    
    const [file, setFile] = useState(null)
    
    const dispatch = useDispatch()
    const { todos, title, text, editingTodoId, editMode } = useSelector(state => state)

    const handleChange = (e) => {
        const {name, value} = e.target
        dispatch(createAction(ACTIONS_TYPES.INPUT_HANDLE_CHANGE, { inputType: name, value: value }))
    }
    
    const addTodo = async () => {
        if (title === "") return
        if (text === "") return

        const url = file && await uploadFileAndGetUrl(file.name, file)

        dispatch(createAction(
            ACTIONS_TYPES.ADD_TODO,
            {
                id: Math.random(),
                title: title,
                text: text,
                completed: false,
                finishedDate: "",
                file: file && {
                    url: url,
                    name: file.name
                }
            }
        ))
        fileRef.current.value = ""
        setFile(null)
    }

    const updateTodo = () => {
        dispatch(createAction(ACTIONS_TYPES.UPDATE_TODO, { id: editingTodoId, title: title, text: text }))
    }

    const clearCompleted = () => {
        dispatch(createAction(ACTIONS_TYPES.CLEAR_COMPLETED))
        todos.filter(file => file.completed)
            .map(file => file.file && file.file.name)
            .forEach(file => deleteFile(file))
    }
    
    const onEnterDown = (e) => e.code === "Enter" && addTodo()

    return <div className="input-todo">
        <div className="inputs">
            <input name="title" type="title" value={title} onKeyDown={onEnterDown} onChange={handleChange} placeholder="title" />
            <textarea name="text" value={text} onChange={handleChange} placeholder="type..." />
        </div>
        <div className="buttons">
            <div>
                <p>{todos.filter(({ completed }) => completed === true).length}/{todos.length}</p>
                {editMode
                    ? <button onClick={updateTodo}>Update</button>
                    : <>
                        <button onClick={addTodo}>Add</button>
                        <button onClick={clearCompleted}>Clear Completed</button>
                    </>}
            </div>
            {!editMode && <input className="file" ref={fileRef} type="file" onChange={(e) => setFile(e.target.files[0])} />}
        </div>
    </div>
}

export default InputArea