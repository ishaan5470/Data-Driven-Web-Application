import React, {useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import UserDetails from './UserDetails';

function App() {
  const [data,setData]=useState([]);
  const [loading,setLoading]=useState(false);
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
        <Route path='/'>
        <Route index element={<Home data={data} setData={setData} loading={loading} setLoading={setLoading}/>}/>
        <Route path='user-details'>
          <Route index element={<UserDetails rows={data} loading={loading} setLoading={setLoading}/>}/>
        </Route>
      </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
