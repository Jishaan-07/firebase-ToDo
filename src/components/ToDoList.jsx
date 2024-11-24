import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, query, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { List, ListItem, ListItemText, Checkbox, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from Firestore
  useEffect(() => {
    const q = query(collection(db, "tasks"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasksData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(tasksData);
    });
    return unsubscribe;
  }, []);

  // Function to toggle task completion
  const toggleTaskCompletion = async (taskId, completed) => {
    try {
      const taskRef = doc(db, "tasks", taskId);
      await updateDoc(taskRef, {
        completed: !completed,
      });
    } catch (error) {
      console.error("Error updating task: ", error);
    }
  };

  // Function to delete a task from Firestore
  const deleteTask = async (taskId) => {
    try {
      const taskRef = doc(db, "tasks", taskId);
      await deleteDoc(taskRef);  // Delete the document from Firestore
      console.log("Task deleted successfully!");
    } catch (error) {
      console.error("Error deleting task: ", error);
    }
  };

  // Function to extract plain text from HTML
  const extractPlainText = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  return (
    <div style={{ maxWidth: 400, margin: "20px auto" }}>
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id} divider>
            <Checkbox
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task.id, task.completed)}
            />
            <ListItemText
              primary={task.task}  // Display task title
              secondary={
                task.description && (
                  <Typography variant="body2" color="textSecondary">
                    {extractPlainText(task.description)}  {/* Display plain text */}
                  </Typography>
                )
              }  // Display plain text of description
            />
            <IconButton onClick={() => deleteTask(task.id)} edge="end">
              <DeleteIcon /> {/* Display Delete icon */}
            </IconButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default TodoList;
