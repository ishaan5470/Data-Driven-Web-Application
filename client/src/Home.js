import React, {useState} from 'react';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CircularProgress from '@mui/material/CircularProgress';
import {useNavigate} from 'react-router-dom';
import Papa from  'papaparse';
import './App.css';
const imageurl= "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/2b4f62d606d1b2bfba9ba9e5386fabb7"


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
          alert('File Uploaded! Now Click on the parse CSV button')
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
          fontSize: '27px',
          fontWeight: 'bold',
          color: 'white',
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
            <button id="generateBtn" onClick={handleClick}>Parse CSV</button>
            <img src={imageurl} alt="image" style={{width:100, height:100}}/>
        </div>
    </div>)
  );
}

export default Home;
