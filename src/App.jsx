import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskChart from "./components/TaskChart";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("Tous");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleSaveTask = (task) => {
    if (editId !== null) {
      setTasks(tasks.map((t) => (t.id === editId ? task : t)));
      setEditId(null);
    } else {
      setTasks([...tasks, task]);
    }
  };

  const modifierTache = (task) => {
    setEditId(task.id);
  };

  const supprimerTache = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
    if (editId === id) {
      setEditId(null);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  const aFaireCount = tasks.filter((t) => t.status === "À faire").length;
  const enCoursCount = tasks.filter((t) => t.status === "En cours").length;
  const termineeCount = tasks.filter((t) => t.status === "Terminée").length;
  const enRetardCount = tasks.filter(
    (t) => t.endDate < today && t.status !== "Terminée"
  ).length;

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.responsable.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "Tous" || task.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const editTaskData = tasks.find((t) => t.id === editId) || null;

  return (
    <main className="container">
      <header className="header">
        <div className="logo">✓</div>
        <div>
          <h1>Task Manager</h1>
          <p>Organisez vos tâches, avancez sereinement.</p>
        </div>
      </header>

      <section className="stats">
        <div className="stat">
          <span>Total des tâches</span>
          <strong>{tasks.length}</strong>
        </div>
        <div className="stat">
          <span>À faire</span>
          <strong>{aFaireCount}</strong>
        </div>
        <div className="stat">
          <span>En cours</span>
          <strong>{enCoursCount}</strong>
        </div>
        <div className="stat">
          <span>Terminées</span>
          <strong>{termineeCount}</strong>
        </div>
        <div className="stat">
          <span>En retard</span>
          <strong style={{ color: "#ef4444" }}>{enRetardCount}</strong>
        </div>
      </section>

      <TaskChart 
        tasks={tasks} 
        aFaireCount={aFaireCount} 
        enCoursCount={enCoursCount} 
        termineeCount={termineeCount} 
      />

      <TaskForm
        onSave={handleSaveTask}
        editTask={editTaskData}
        onCancel={() => setEditId(null)}
      />

      <TaskList
        tasks={tasks}
        filteredTasks={filteredTasks}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        modifierTache={modifierTache}
        supprimerTache={supprimerTache}
        today={today}
      />
    </main>
  );
}

export default App;


