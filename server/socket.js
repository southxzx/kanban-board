const tasks = require("./data-mockup");
const fetchID = () => Math.random().toString(36).substring(2, 10);

const taskDragged = (name, socket) => {
  return socket.on(name, (data) => {
    const { source, destination } = data;

    const itemMoved = {
      ...tasks[source.droppableId].items[source.index],
    };
    console.log("DraggedItem>>> ", itemMoved);

    //👇🏻 Removes the item from the its source
    tasks[source.droppableId].items.splice(source.index, 1);

    //👇🏻 Add the item to its destination using its destination index
    tasks[destination.droppableId].items.splice(destination.index, 0, itemMoved);

    //👇🏻 Sends the updated tasks object to the React app
    socket.emit("tasks", tasks);
  });
}

const createTask = (name, socket) => {
  return socket.on(name, (data) => {
    // 👇🏻 Constructs an object according to the data structure
    const newTask = { id: fetchID(), title: data.task, comments: [] };
    // 👇🏻 Adds the task to the pending category
    tasks["pending"].items.push(newTask);
    /* 
    👇🏻 Fires the tasks event for update
     */
    socket.emit("tasks", tasks);
  });
}

const addComment = (name, socket) => {
  return socket.on(name, (data) => {
    const { category, userId, comment, id } = data;
    //👇🏻 Gets the items in the task's category
    const taskItems = tasks[category].items;
    //👇🏻 Loops through the list of items to find a matching ID
    for (let i = 0; i < taskItems.length; i++) {
      if (taskItems[i].id === id) {
        //👇🏻 Then adds the comment to the list of comments under the item (task)
        taskItems[i].comments.push({
          name: userId,
          text: comment,
          id: fetchID(),
        });
        //👇🏻 sends a new event to the React app
        socket.emit("comments", taskItems[i].comments);
      }
    }
  });
}

const fetchComments = (name, socket) => {
  return socket.on(name, (data) => {
    const { category, id } = data;
    const taskItems = tasks[category].items;
    for (let i = 0; i < taskItems.length; i++) {
      if (taskItems[i].id === id) {
        socket.emit("comments", taskItems[i].comments);
      }
    }
  });
}

module.exports = {
  taskDragged,
  createTask,
  addComment,
  fetchComments
}