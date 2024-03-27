import "./App.css";
import TaskBoard from "./components/TaskBoard";


function App() {
  return (
    <div className="bg-gradient-to-br from-purple-200 via-purple-300 to-blue-200 flex flex-col items-center min-h-screen w-screen">
      <b className="text-3xl text-center p-2 border-b border-black w-full mb-4">Task Board</b>
      <TaskBoard />
    </div>
  );
}

export default App;
