import './App.css';
import Header from './components/Header'
import AddStudent from './components/AddStudent';
import AllStudents from './components/AllStudents';
import UpdateStudent from './components/UpdateStudent';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"


function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/add" element={<AddStudent/>}/>
        <Route path="/update/:id" element={<UpdateStudent/>}/>
        <Route path="/" element={<AllStudents/>}/>
      </Routes>
    </Router>
  );
}

export default App;
   