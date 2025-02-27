import TodoSection from './TodoSection'

const TodoContainer = () => {
  return (
    <div className="container m-10 mx-auto grid w-[min(90%,1200px)] auto-rows-fr grid-cols-1 justify-between gap-5 md:grid-cols-2 lg:grid-cols-3">
      <TodoSection status="pending" />
      <TodoSection status="in-progress" />
      <TodoSection status="completed" />
    </div>
  )
}

export default TodoContainer
