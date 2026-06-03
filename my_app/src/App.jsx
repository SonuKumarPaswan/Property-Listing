import axios from "axios";
import { useState } from "react";

const App = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChnage = (e) => {
    const {name, value} = e.target;
    setForm({...form, [name]: value});
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    try {
      const res = await axios.post("http://localhost:8085/users");
      console.log(res.data)

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1> Form </h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={form.name}
          onChange={handleChnage}
          name="name"
          required
        /> <br /> <br />
        <input
          type="email"
          value={form.email}
          onChange={handleChnage}
          name="email"
          required
        /> <br /><br />
        <input
          type="password"
          value={form.password}
          onChange={handleChnage}
          name="password"
        /> <br /><br />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default App;
