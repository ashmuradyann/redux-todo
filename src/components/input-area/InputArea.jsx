import { useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"

import { deleteFile, uploadFileAndGetUrl } from "../../utils/firebase"
import createAction from "../../store/createAction"

import { ACTIONS_TYPES } from "../../store/action-types"

import './InputArea.scss'

const InputArea = () => {
    const fileRef = useRef(null)

    const [fileObj, setFileObj] = useState(null)

    const dispatch = useDispatch()
    const { todos, title, text, file, editingTodoId, editMode } = useSelector(state => state)

    const handleChange = (e) => {
        const { name, value } = e.target
        dispatch(createAction(ACTIONS_TYPES.INPUT_HANDLE_CHANGE, { name, value }))
    }

    const addTodo = async () => {
        if (title === "") return
        if (text === "") return

        const url = fileObj && await uploadFileAndGetUrl(fileObj.name, fileObj)

        dispatch(createAction(
            ACTIONS_TYPES.ADD_TODO,
            {
                id: Math.random(),
                title,
                text,
                completed: false,
                finishedDate: "",
                file: fileObj && {
                    url,
                    name: fileObj.name
                }
            }
        ))
        fileRef.current.value = ""
        setFileObj(null)
    }

    const updateTodo = async () => {
        const url = fileObj && await uploadFileAndGetUrl(fileObj.name, fileObj)
        dispatch(createAction(
            ACTIONS_TYPES.UPDATE_TODO,
            {
                id: editingTodoId,
                title,
                text,
                file: fileObj && {
                    url,
                    name: fileObj.name
                }
            }))
    }

    const deletefile = () => {
        dispatch(createAction(ACTIONS_TYPES.DELETE_FILE_LINK))
        file && deleteFile(file.name)
    }

    const clearCompleted = () => {
        dispatch(createAction(ACTIONS_TYPES.CLEAR_COMPLETED))
        todos.filter(todo => todo.completed)
            .map(todo => todo.file && todo.file.name)
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
                    ? <>
                        <button onClick={updateTodo}>Update</button>
                        {!file && <>
                            <input className="file" ref={fileRef} type="file" onChange={(e) => setFileObj(e.target.files[0])} />
                        </>
                        }
                        <div>
                            {file && <>
                                <a href={file.url} download><img src="https://img.icons8.com/fluency-systems-filled/37/ffe89d/new-by-copy.png" alt="file" /></a>
                                <p onClick={deletefile}>Delete</p>
                            </>
                            }
                        </div>
                    </>
                    : <>
                        <button onClick={addTodo}>Add</button>
                        <button onClick={clearCompleted}>Clear Completed</button>
                    </>}
            </div>
            {!editMode && <input className="file" ref={fileRef} type="file" onChange={(e) => setFileObj(e.target.files[0])} />}
        </div>
    </div>
}

export default InputArea