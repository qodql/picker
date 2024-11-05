
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import './App.css';
import './assets/css/main.scss';


import Header from './components/Header';
import Main from './pages/Main';
import Movie from './pages/Movie';
import Tvseries from './pages/Tvseries';
import { main } from './api/tmdb';
import Search from './components/Search';
import Footer from './components/Footer';
import Animation from './pages/Animation';
import Details from './pages/Details';
import Tvdetail from './pages/Tvdetail';
import Login from './pages/Login';


function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
    (async function(){
      let res = await main();
      dispatch({type:"get", data:res})
    }())
  },[])

  
  return (
    <div className='wrap'>
      <Router>
        <Header/>
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='/movie' element={<Movie/>}/>
          <Route path='/tvseries' element={<Tvseries/>}/>
          <Route path='/search' element={<Search/>}/>
          <Route path='/animation' element={<Animation/>}/>
          <Route path='/details/:id' element={<Details/>}/>
          <Route path='/tvdetail/:id' element={<Tvdetail/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path="/auth/naver/callback" element={<Main />} />
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
