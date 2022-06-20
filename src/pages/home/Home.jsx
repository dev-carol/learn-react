import React, { useEffect, useState } from "react";
import { Card } from "../../components/Card";
import "./styles.css";

function Home() {
  const [studentName, setStudentName] = useState("");
  const [listStudents, setListStudents] = useState([]);
  const [user, setUser] = useState({name: '', avatar: ''})

  function handleAddStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleDateString("pt-br", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    };

    setListStudents((prevState) => [...prevState, newStudent]);
  }
  
  useEffect(() =>{
    async function fetchData() {
      const response = await fetch('https://api.github.com/users/dev-carol')
      const data = await response.json();
      setUser({
       name: data.name,
       avatar: data.avatar_url
      })
    }
  fetchData()

  },[]);
  

  return (
    <div className="container">
      <header>
        <h1>Lista de presença</h1>
        <div>
          <img src={user.avatar} alt="Foto de perfil" />
          <strong>{user.name}</strong>
        </div>
      </header>

      <input
        type="text"
        placeholder="Digite o nome..."
        onChange={(e) => setStudentName(e.target.value)}
      ></input>
      <button type="button" onClick={handleAddStudent}>
        Adicionar
      </button>
      {listStudents.map((student) => (
        <Card key={student.time} name={student.name} time={student.time} />
      ))}
    </div>
  );
}

export default Home;
