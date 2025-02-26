import TodoSection from './TodoSection'

const TodoContainer = () => {
  return (
    <div className="container m-10 mx-auto grid max-w-6xl grid-cols-3 justify-between gap-5">
      <TodoSection status="pending" />
      <TodoSection status="in-progress" />
      <TodoSection status="completed" />
    </div>
  )
}

export default TodoContainer
