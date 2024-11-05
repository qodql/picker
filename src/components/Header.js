import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { search } from '../api/tmdb';

const Header = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const [searchValue, setSearchValue] = useState();
  const [searchActive, setSearchActive] = useState(false);
  const [searchActive2, setSearchActive2] = useState(false);
  const searchRef = useRef();

  //onChange
  const searchChange = (e)=>{
    setSearchValue(e.target.value);

    if(e.target.value){
      setSearchActive2(true);
    }else if(!e.target.value){
      setSearchActive2(false);
    }
  }

  //onFocus
  const searchFocus = (e)=>{
    setSearchActive(true);

    if(!e.target.value){
      setSearchActive2(false);
    }else if(e.target.value){
      setSearchActive2(true);
    }
  }

  //onBlur
  const searchBlur = (e)=>{
    if(e.target.value === ''){
      setSearchActive(false)
      setSearchActive2(false);
    }
  }

  //clear
  const searchClear = ()=>{
    searchRef.current.focus();
  }

  async function searchForm(e){
    e.preventDefault();
    let searchData = await search(searchValue);
    searchData = searchData.data.results.filter(obj=>obj.poster_path)
    
    dispatch({
      type:'search',
      data:searchData
    })

    navigator('/search');
  }

  
  const moveLogin = ()=>{
    navigator('/login');
  }


  return (
    <>
      <header>
        <nav className='nav'>
            <h1 className='logo'>
                <Link to="/"></Link>
            </h1>
            <Link to="/">홈</Link>
            <Link to="/movie">영화</Link>
            <Link to="/tvseries">TV 시리즈</Link>
        </nav>
        <div className='nav-right'>
          <form onSubmit={searchForm}>
            <div className={`search-box ${searchActive ? 'active':''}`}>
              <input type='text' className='search-btn' 
              placeholder='검색어를 입력하세요' 
              ref={searchRef}
              onChange={searchChange}
              onFocus={searchFocus}
              onBlur={searchBlur}>
              </input>
              <button type='reset' className={`search-clear ${searchActive2 ? 'active':''}`} 
              onClick={searchClear}>x</button>
            </div>
          </form>
          <button className='login-btn' onClick={moveLogin}>로그인</button>
        </div>
      </header>
    </>
  )
}

export default Header