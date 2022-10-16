import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Comments from './components/Comment';
import Task from './components/Task';
import Login from './components/Login';

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
