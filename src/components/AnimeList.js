import React from 'react'
import { useNavigate } from 'react-router-dom';

const List = ({state}) => {

    const navigate = useNavigate();

    const moveDetail = (id)=>{
        navigate(`/details/${id}`);
        window.scrollTo(0,0);
    }

      const moveDetail2 = (id)=>{
        navigate(`/tvdetail/${id}`);
        window.scrollTo(0,0);
      }
    
      const slayer = state.slayer[0].id;
      const idol = state.idol[0].id;
      const jujutsu = state.jujutsu[0].id;
      const frieren = state.frieren[0].id;



    let listThumb = 'https://image.tmdb.org/t/p/w400/';

    return (
        <>
            <ul className='list-inner'>
                <li className='list-contents' onClick={()=>moveDetail(slayer)}>
                    <p className='list-thumb-cont'>
                        <img className='list-thumb' src={listThumb+state.slayer[0].backdrop_path} alt='moive-list'/>
                        <span className='list-logo right slayer'></span>
                    </p>
                </li>
                <li className='list-contents' onClick={()=>moveDetail2(idol)}>
                    <p className='list-thumb-cont'>
                        <img className='list-thumb' src={listThumb+state.idol[0].backdrop_path} alt='moive-list'/>
                        <span className='list-logo center idol'></span>
                    </p>
                </li>
                <li className='list-contents' onClick={()=>moveDetail(jujutsu)}>
                    <p className='list-thumb-cont'>
                        <img className='list-thumb' src={listThumb+state.jujutsu[0].backdrop_path} alt='moive-list'/>
                        <span className='list-logo left jujutsu'></span>
                    </p>
                </li>
                <li className='list-contents' onClick={()=>moveDetail2(frieren)}>
                    <p className='list-thumb-cont'>
                        <img className='list-thumb' src={listThumb+state.frieren[0].backdrop_path} alt='moive-list'/>
                        <span className='list-logo center frieren'></span>
                    </p>
                </li>
            </ul>
        </>
      )
}

export default List