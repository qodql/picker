import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Animation = () => {

  const state = useSelector((state) => state);

  const navigate = useNavigate();


  const moveDetail = (id)=>{
    navigate(`/details/${id}`);
    window.scrollTo(0,0);
  }


    let listThumb = 'https://image.tmdb.org/t/p/w300/';

    let animationList = state.animation && state.animation.map((v)=>{
        return(
        <li key={v.id} className='list-contents' onClick={()=>moveDetail(v.id)}>
            <p className='list-thumb-cont'>
                <img className='list-thumb' src={listThumb+v.poster_path} alt='animation-list'/>
            </p>
        </li>
        )
    })



  return (
    <>
        <ul className='search-list sub-list'>
            {animationList}
      </ul>
    </>
  )
}

export default Animation