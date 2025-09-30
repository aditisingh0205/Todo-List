import Add_todo from "./add_todo";
import Heading from "./heading";
import Work_list from "./work_list";
import "./App.css";
import { motion } from "framer-motion";


import { useReducer, useEffect, useState } from "react";

import { AiFillSun } from "react-icons/ai";
import { BsMoonStarsFill } from "react-icons/bs";
import { IoOptionsSharp } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import {addTask,setTasks,clearAll,toggleCompleted,} from "./store/todoSlice";

function App() {
  const choresList = useSelector((state) => state.todos); // get todos from Redux store
  const dispatch = useDispatch(); // dispatch actions
  const [theme, setTheme] = useState("light");
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    document.body.className = theme; // sets body class to "light" or "dark"
  }, [theme]);

  useEffect(() => {
    async function fetchTodos() {
      try {
        const res = await fetch("https://dummyjson.com/todos?limit=10");
        const data = await res.json();

      const todos = data.todos.map(todo => ({
        id: todo.id,
        chores: todo.todo,
        date: "2025-09-25",
        completed: false,
      }));

      dispatch(setTasks(todos));
      } catch (error) {
        console.log("Error fetching todos:", error);
      }
    }

    fetchTodos();
  }, [dispatch]);

  const sortByDate = () => {
    const sorted = [...choresList].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    dispatch(setTasks(sorted));
    setMenuIsOpen(false);
  };

  const sortByStatus = () => {
    const sorted = [...choresList].sort((a, b) => {
      const ca = !!a.completed;
      const cb = !!b.completed;
      if (ca && !cb) return 1;
      if (!ca && cb) return -1;
      return 0;
    });
    dispatch(setTasks(sorted));
    setMenuIsOpen(false);
  };

  const clearAll2 = () => {
    dispatch(clearAll());
    setMenuIsOpen(false);
  };

  return (
    
      <motion.div className={`todo-container ${theme}`}
       key={theme} // important: forces re-render for animation
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.5 }}>
        {/* Top Bar */}
        <div className="top-bar">
          <button
            className="menu-btn"
            onClick={() => setMenuIsOpen(!menuIsOpen)}
          >
            <IoOptionsSharp size={22} />
          </button>
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === "light" ? (
              <BsMoonStarsFill size={22} />
            ) : (
              <AiFillSun size={25} />
            )}
          </button>
        </div>

        {/* Sliding Menu Overlay */}
        {menuIsOpen && (
          <div className="overlay" onClick={() => setMenuIsOpen(false)}></div>
        )}

        {/* Sliding Panel */}
        {menuIsOpen && (
          <motion.div 
           initial={{ x: "50%" }}
  animate={{ x: 0 }}
  exit={{ x: "-50%" }}
  transition={{ duration: 0.1 }}className="side-panel">
            <button onClick={sortByDate}>Sort by Date</button>
            <button onClick={sortByStatus}>Sort by Completed</button>
            <button onClick={clearAll2}>Clear All</button>
          </motion.div>
        )}

        {/* Heading and Add Todo */}
        <Heading font="Poppins">Get Things Done</Heading>
        <Add_todo />

        {/* Tasks List */}
        <motion.div className="wrapper"
        >
          {choresList.length === 0 ? (
            <p className="empty-list">No tasks yet. Add one!</p>
          ) : (
            choresList.map((task, index) => (
               <motion.div
    key={`${task.id}-${index}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.05 }}
  >
    <Work_list
      id={task.id}
      chores={task.chores}
      date={task.date}
      completed={task.completed}
    />
  </motion.div>
            ))
          )}
        </motion.div>
      </motion.div>
  
  );
}

export default App;
