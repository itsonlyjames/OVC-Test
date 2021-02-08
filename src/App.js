import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setusers] = useState([]);
  const [search, setsearch] = useState("");
  const [lightboxData, setlightboxData] = useState([]);
  const [lightbox, setlightbox] = useState(false);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setusers(data));
  }, []);

  const handleInputSearch = (e) => {
    setsearch(e.target.value);
  };

  const handleRowClick = (id) => {
    setlightbox(true);

    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
      .then((res) => res.json())
      .then((data) => setlightboxData(data));
  };

  const handleLightboxClose = () => {
    setlightbox(false);
    setlightboxData([]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <input type="text" onChange={(e) => handleInputSearch(e)} />
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>City</th>
              <th>Company</th>
            </tr>
            {users &&
              users
                .filter((user) => user.name.toLowerCase().includes(search))
                .map((user) => (
                  <tr key={user.id} onClick={() => handleRowClick(user.id)}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.address.city}</td>
                    <td>{user.company.name}</td>
                  </tr>
                ))}
          </tbody>
        </table>
        {lightbox && (
          <div className="lightbox">
            <span
              className="lightbox--close"
              onClick={() => handleLightboxClose()}
            >
              Close
            </span>
            <table>
              <tbody>
                <tr>
                  <td>Title</td>
                  <td>Body</td>
                </tr>
                {lightboxData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>{item.body}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
