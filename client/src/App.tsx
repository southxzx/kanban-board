import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Comments from './components/Comment';
import Login from './components/Login';
import Task from './components/Task';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/tasks" element={<Task />} />
        <Route path="/comments/:category/:id" element={<Comments />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
