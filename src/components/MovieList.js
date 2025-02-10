import React from 'react'
import { useNavigate } from 'react-router-dom';

const List = ({state}) => {

    const navigate = useNavigate();

    const moveDetail = (id)=>{
        navigate(`/details/${id}`);
        window.scrollTo(0,0);
      }
    
      const veteran = state.veteran[0].id;
      const physiognomy = state.physiognomy[0].id;
      const exit = state.exit[1].id;
      const exhum = state.exhum[0].id;



    let movieThumb = 'https://image.tmdb.org/t/p/w400/';

    return (
        <>
            <ul className='list-inner'>
                <li className='list-contents' onClick={()=>moveDetail(veteran)}>
                    <p className='list-thumb-cont'>
                        <img className='list-thumb' src={movieThumb+state.veteran[0].backdrop_path} alt='moive-list'/>
                        <span className='list-logo left veteran'></span>
                    </p>
                </li>
                <li className='list-contents'>
                    <p className='list-thumb-cont' onClick={()=>moveDetail(physiognomy)}>
                        <img className='list-thumb' src={movieThumb+state.physiognomy[0].backdrop_path} alt='moive-list'/>
                        <span className='list-logo center physiognomy'></span>
                    </p>
                </li>
                <li className='list-contents'>
                    <p className='list-thumb-cont' onClick={()=>moveDetail(exit)}>
                        <img className='list-thumb' src={movieThumb+state.exit[0].backdrop_path} alt='moive-list'/>
                        <span className='list-logo left exit'></span>
                    </p>
                </li>
                <li className='list-contents'>
                    <p className='list-thumb-cont' onClick={()=>moveDetail(exhum)}>
                        <img className='list-thumb' src={movieThumb+state.exhum[0].backdrop_path} alt='moive-list'/>
                        <span className='list-logo center exhum'></span>
                    </p>
                </li>
            </ul>
        </>
      )


}

export default List