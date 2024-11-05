import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Tvseries = () => {
  const state = useSelector((state) => state);

  const navigate = useNavigate();

  const moveDetail = (id)=>{
    navigate(`/tvdetail/${id}`);
    window.scrollTo(0,0);
  }







  let listThumb = 'https://image.tmdb.org/t/p/w300/'


  let tvList = state.tvseries && state.tvseries.map((v)=>{
    return(
      <li key={v.id} className='list-contents' onClick={()=>moveDetail(v.id)}>
          <p className='list-thumb-cont'>
              <img className='list-thumb' src={listThumb+v.poster_path} alt='moive-list'/>
          </p>
      </li>
    )
  })


  return (
    <>
      <ul className='search-list sub-list'>
        {tvList}
      </ul>
    </>
  )
}

export default Tvseries