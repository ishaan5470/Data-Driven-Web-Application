import React, {useState} from 'react';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CircularProgress from '@mui/material/CircularProgress';
import {useNavigate} from 'react-router-dom';
import Papa from  'papaparse';
import './App.css';



function Home({loading, setLoading, data, setData}) {
    const navigate=useNavigate();
    const [fileName, setFileName] = useState('');
    function handleChange(event){
 
      setLoading(true);
      const file = event.target.files[0];
      setFileName(file.name);
      Papa.parse(event.target.files[0],{
        header:true,
        skipEmptyLines:true,
        complete:function(result){
          setData(result.data);
          setLoading(false);
          alert('File Uploaded! Now Click on the Generate CSV button')
        }
      })
    }
    function handleClick(){
        console.log(data)
        navigate('/user-details')
      }
  return (loading?<h2>Loading... {loading && <CircularProgress style={{fontSize:40}} thickness={40} />}</h2>:
   ( <div className="App">
    <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#555',
          opacity: '0.7',
        }}
      >
        CSV Parser
      </div>
        <div className="inputDiv">
            <label id="uploadLabel" htmlFor="fileUpload"><UploadFileIcon id="uploadLabelIcon"  />Upload CSV File</label>
            <input id="fileUpload" type="file" name="file" accept=".csv" onChange={handleChange}/>
            {fileName && <p>Uploaded File: {fileName}</p>}
        </div>
        <div>
            <button id="generateBtn" onClick={handleClick}>Generate CSV</button>
        </div>
    </div>)
  );
}

export default Home;
