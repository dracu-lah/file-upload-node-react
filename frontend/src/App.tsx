import  { useState } from 'react';
import '@picocss/pico'
const App = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e:any) => {
    setFile(e.target.files[0]);
  };

  const handleFormSubmit = (e:any) => {
    e.preventDefault();

    const formData:any = new FormData();
    formData.append('file', file);

    fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: formData
    })
    .then(response => response.text())
    .then(data => {
      alert(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <div className="container">
      <h1>File Upload</h1>
      <form onSubmit={handleFormSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default App;
