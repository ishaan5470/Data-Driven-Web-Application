import React from 'react';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import {useNavigate} from 'react-router-dom';
import Papa from  'papaparse';
import './App.css';


function Home({loading, setLoading, data, setData}) {
    const navigate=useNavigate();
    function handleChange(event){
      alert('file uploaded!')
      setLoading(true);
      Papa.parse(event.target.files[0],{
        header:true,
        skipEmptyLines:true,
        complete:function(result){
          setData(result.data);
          setLoading(false);
        }
      })
    }
    function handleClick(){
        console.log(data)
        navigate('/user-details')
      }
  return (loading?<h2>Loading...</h2>:
   ( <div className="App">
        <div className="inputDiv">
            <label id="uploadLabel" htmlFor="fileUpload"><UploadFileIcon id="uploadLabelIcon"  />Upload CSV File</label>
            <input id="fileUpload" type="file" name="file" accept=".csv" onChange={handleChange}/>
        </div>
        <div>
            <button id="generateBtn" onClick={handleClick}>Generate PDF</button>
        </div>
    </div>)
  );
}

export default Home;
