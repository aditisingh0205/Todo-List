import { useState } from "react";
import { useDispatch } from "react-redux";
import { MdDelete, MdEdit } from "react-icons/md";
import { toggleCompleted, deleteTask, updateTask } from "./store/todoSlice";
import { motion } from "framer-motion";

function Work_list({ chores, date, id, completed }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(chores);

  // Toggle completed
  const handleToggle = () => dispatch(toggleCompleted(id));

  // Delete task
  const handleDelete = () => dispatch(deleteTask(id));

  // Update task
  const handleUpdate = () => {
    if (!editText.trim()) return; // prevent empty task
    dispatch(updateTask({ id, newTask: editText }));
    setIsEditing(false);
  };

  return (
    <motion.div
  className={`task-row ${completed ? "completed" : ""}`}
  initial={{ opacity: 0, y: -20 }}    // start slightly above and invisible
  animate={{ opacity: 1, y: 0 }}      // fade in and slide to position
  exit={{ opacity: 0, y: 20 }}        // when removed, fade out and slide down
  layout                              // animates position changes smoothly
>
      <div className="task-col task-name">
        {isEditing ? (
          <motion.input
          initial={{ scale: 0.9, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ duration: 0.3}}
            type="text"
            className="editInput"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
        ) : (
          chores
        )}
      </div>

      <div className="task-col task-date">{date}</div>

      <div className="task-col task-actions">
        <input
          type="checkbox"
          className="custom-checkbox"
          checked={completed}
          onChange={handleToggle}
        />
        <button className="list-button" onClick={handleDelete}>
          <MdDelete />
        </button>
        {isEditing ? (
          <button className="list-button" onClick={handleUpdate}>
            Save
          </button>
        ) : (
          <button className="list-button" onClick={() => setIsEditing(true)}>
            <MdEdit />
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default Work_list;
