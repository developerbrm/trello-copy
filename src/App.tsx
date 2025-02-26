import TodoContainer from './components/TodoContainer'
import DragAndDropProvider from './Providers/DragAndDropProvider'

const App = () => {
  return (
    <main className="relative">
      <DragAndDropProvider>
        <TodoContainer />
      </DragAndDropProvider>

      <div className="bg-container"></div>
    </main>
  )
}

export default App
