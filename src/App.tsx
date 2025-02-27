import TodoContainer from './components/TodoContainer'
import DragAndDropProvider from './Providers/DragAndDropProvider'
import ToastProvider from './Providers/ToastProvider'

const App = () => {
  return (
    <main className="relative">
      <DragAndDropProvider>
        <TodoContainer />
      </DragAndDropProvider>

      <ToastProvider />
      <div className="bg-container"></div>
    </main>
  )
}

export default App
