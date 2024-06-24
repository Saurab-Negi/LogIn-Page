import { useEffect, useState } from 'react';
import './App.css'

function App() {
  const [form, setForm]= useState({}); // To store form data

  const [users, setUsers]= useState([]);

  const handleForm= (e) =>{
    // console.log(e.target.value, e.target.name);

    setForm({
      ...form, // Destructuring to avoid override of username & pass
      // Stroing it as key : value pair
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit= async (e) =>{
    e.preventDefault(); // To stop the default behaviour
    const res= await fetch('http://localhost:3000/demo',{ //Fetch is an asynchronous operation
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data= await res.json();
    console.log(data)
  }

  const getUsers= async () =>{
    const res= await fetch('http://localhost:3000/demo',{ //Fetch is an asynchronous operation
      method: 'GET',
    })
    const data= await res.json();
    setUsers(data);
  }

  useEffect(() =>{
    getUsers();
  },[])

  return (
    <>
  <form action="" onSubmit={handleSubmit}>
    <h2>{JSON.stringify(form)}</h2> {/* converting the obj into string */}

    <label htmlFor="">Usrename</label>
    <input type="text" name="username" onChange={(handleForm)} /><br></br>

    <label htmlFor="">Password</label>
    <input type="text" name="password" onChange={(handleForm)} /><br></br>

    <button type='submit'>Log In</button>
  </form>

  <div className="">
    <ul>
      {
        users.map(user =>
        <li key={user._id}>{user.username}, {user.password}</li>)
      }
    </ul>
  </div>
    </>
  )
}

export default App