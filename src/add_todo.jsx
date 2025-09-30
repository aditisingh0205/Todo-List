import { useState, useRef } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useDispatch } from "react-redux";
import { addTask } from "./store/todoSlice";

function Add_todo() {
  const [task, setTask] = useState("");
  const refDate = useRef(null);
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (!task.trim()) return;

    const newTask = {
      id: Date.now(), // temporary unique id for Redux
      chores: task,
      completed: false,
      date: refDate.current?.value || new Date().toISOString().split("T")[0],
    };

    // Dispatch Redux action
    dispatch(addTask(newTask));

    // Reset input fields
    setTask("");
    if (refDate.current) refDate.current.value = "";
  };

  return (
    <div className="todo-row">
      {/* Task input */}
      <input
        type="text"
        value={task}
        placeholder="Enter task here"
        className="todo-input"
        onChange={(e) => setTask(e.target.value)}
      />

      {/* Date input */}
      <div className="todo-date-wrapper">
        <label htmlFor="task-date">Due Date:</label>
        <input
          type="date"
          id="task-date"
          className="todo-date"
          ref={refDate}
          defaultValue={new Date().toISOString().split("T")[0]}
        />
      </div>

      {/* Add button */}
      <button type="button" className="todo-button" onClick={handleAddTask}>
        <IoIosAddCircleOutline size={22} />
      </button>
    </div>
  );
}

export default Add_todo;
