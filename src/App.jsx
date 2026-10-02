import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching tasks:", error);
      return;
    }

    setTasks(data);
  };

  const addTask = async () => {
    if (task.trim() === "") return;

    const { data, error } = await supabase
      .from("tasks")
      .insert([
        {
          title: task.trim(),
          completed: false,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error adding task:", error);
      return;
    }

    setTasks([...tasks, data]);
    setTask("");
  };

  const toggleTask = async (id, completed) => {
    const { error } = await supabase
      .from("tasks")
      .update({ completed: !completed })
      .eq("id", id);

    if (error) {
      console.error("Error updating task:", error);
      return;
    }

    setTasks(
      tasks.map((item) =>
        item.id === id
          ? { ...item, completed: !completed }
          : item
      )
    );
  };

  const deleteTask = async (id) => {
    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting task:", error);
      return;
    }

    setTasks(tasks.filter((item) => item.id !== id));
  };

  return (
    <div className="app">
      <div className="container">
        <h1>☁️ Cloud Task Manager</h1>

        <p className="subtitle">
          Manage your student tasks efficiently
        </p>

        <div className="input-section">
          <input
            type="text"
            placeholder="Enter a task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addTask();
            }}
          />

          <button onClick={addTask}>Add Task</button>
        </div>

        <div className="task-list">
          {tasks.length === 0 ? (
            <p className="empty">
              No tasks yet. Add your first task!
            </p>
          ) : (
            tasks.map((item) => (
              <div className="task" key={item.id}>
                <span
                  className={item.completed ? "completed" : ""}
                  onClick={() =>
                    toggleTask(item.id, item.completed)
                  }
                >
                  {item.title}
                </span>

                <div>
                  <button
                    className="complete-btn"
                    onClick={() =>
                      toggleTask(item.id, item.completed)
                    }
                  >
                    {item.completed ? "Undo" : "Complete"}
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteTask(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="footer">
          <p>
            Tasks: <strong>{tasks.length}</strong>
          </p>

          <p>
            Completed:{" "}
            <strong>
              {tasks.filter((item) => item.completed).length}
            </strong>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;