import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import ReactQuill from "react-quill"; // Import React Quill
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

// Define the TodoForm component
const TodoForm = () => {
  const [task, setTask] = useState(""); // Task description
  const [description, setDescription] = useState(""); // Description (using React Quill)

  // Handle adding new task to Firestore
  const handleAddTask = async () => {
    if (!task) {
      alert("Please enter a task.");
      return;
    }

    try {
      await addDoc(collection(db, "tasks"), {
        task,
        description,  // Add the description field
        completed: false, // Set default to false
      });
      setTask(""); // Clear task input
      setDescription(""); // Clear the editor
    } catch (error) {
      alert("Error adding task: " + error.message);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "20px auto" }}>
      <TextField
        label="New Task"
        fullWidth
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      
      <div style={{ marginTop: "10px" }}>
        <ReactQuill
          value={description} // Bind the description to React Quill
          onChange={setDescription} // Update the state when content changes
          placeholder="Enter task details here..."
        />
      </div>
      
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddTask}
        style={{ marginTop: "10px" }}
      >
        Add Task
      </Button>
    </div>
  );
};

export default TodoForm;
