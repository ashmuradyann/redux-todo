import InputArea from './components/input-area/InputArea'
import TodosList from './components/todos-list/TodosList'

import './App.scss'

const App = () => {
  return (
    <div className="todos">
      <h1>Todo List with React {"&"} Redux</h1>
      <InputArea />
      <TodosList />
    </div>
  )
}

export default App
