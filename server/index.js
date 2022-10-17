const express = require('express');
const app = express();
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const http = require('http').Server(app);
const cors = require('cors');

const { taskDragged, createTask, addComment, fetchComments, pushNotifications } = require('./socket');
const tasks = require("./data-mockup");

app.use(cors());

// app.get("/api", (req, res) => {
//     res.json({
//         message: "Hello world!"
//     });
// });

//socket
const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
})
socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

    taskDragged("taskDragged", socket);
    createTask("createTask", socket);
    addComment("addComment", socket);
    fetchComments("fetchComments", socket);
    pushNotifications("addComment", socket);
    // console.log(taskDragged);

    socket.on('disconnect', () => {
        socket.disconnect();
        console.log('🔥: A user disconnected');
    })
})

//👇🏻 host the tasks object via the /api route
app.get("/api", (req, res) => {
    res.json(tasks);
});

// app.listen(PORT, () => {
//     console.log(`Server listening on ${PORT}`);
// })
http.listen(PORT, () => {
    console.log(`Server listening on ${PORT} (HTTP)`);
});