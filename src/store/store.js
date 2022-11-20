import { legacy_createStore as createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { ACTIONS_TYPES } from './action-types'

const INITIAL_STATE = {
    title: "",
    text: "",
    editingTodoId: null,
    editMode: null,
    todos: []
}

const todosReducer = (state = INITIAL_STATE, action) => {
    const { todos } = state
    const { type, payload } = action
    switch (type) {
        case ACTIONS_TYPES.INPUT_HANDLE_CHANGE:
            return {
                ...state,
                [payload.inputType]: payload.value,
            }
        case ACTIONS_TYPES.EDITITING_TODO_ID:
            return {
                ...state,
                editingTodoId: payload.id,
                editMode: true,
                title: payload.title,
                text: payload.text
            }
        case ACTIONS_TYPES.SET_EDIT_MODE:
            return {
                ...state,
                editMode: payload.editMode,
            }
        case ACTIONS_TYPES.ADD_TODO:
            return {
                ...state,
                todos: [
                    {
                        id: payload.id,
                        title: payload.title,
                        text: payload.text,
                        completed: payload.completed,
                        finishedDate: payload.finishedDate,
                        file: payload.file
                    },
                    ...todos
                ],
                title: "",
                text: ""
            }
        case ACTIONS_TYPES.UPDATE_TODO:
            return {
                ...state,
                todos: todos.map(el => el.id === payload.id ? { ...el, title: payload.title, text: payload.text } : el),
                editMode: false,
                title: "",
                text: ""
            }
        case ACTIONS_TYPES.DELETE_TODO:
            return {
                ...state,
                todos: todos.filter(({ id }) => id !== payload.id),
                editMode: false,
                title: "",
                text: ""
            }
        case ACTIONS_TYPES.SET_COMPLETE_TODO:
            return {
                ...state,
                todos: todos.map(el => el.id === payload.id ? { ...el, completed: !el.completed, finishedDate: payload.finishedDate } : el),
            }
        case ACTIONS_TYPES.CLEAR_COMPLETED:
            return {
                ...state,
                todos: todos.filter(({ completed }) => completed === false)
            }
        default:
            return state
    }
}

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user']
}

const persistedReducer = persistReducer(persistConfig, todosReducer)

export const store = createStore(persistedReducer)

export const persistor = persistStore(store)