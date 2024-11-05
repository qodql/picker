import React, { useEffect, useState } from 'react'
import { detail } from '../api/tmdb';
import { useParams } from 'react-router-dom';

const Details = () => {
    const {id} = useParams();
    const [res, setRes] = useState();

    
    useEffect(()=>{
        (async function(){
            setRes(await detail(id));
        }())
    },[])
    
    if(!res) return<>준비중..</>;
    
  
    //console.log(res);

    let detailThumb = 'https://image.tmdb.org/t/p/w1280/';
    let episodeThumb = 'https://image.tmdb.org/t/p/w300/';

    let grade = res.data.vote_average.toFixed(1);



  return (
    <div className='detail'>
        <div className='detail-wrap'>
            <div className='detail-info'>
                <div className='detail-info-inner'>
                    <h5 className='detail-tit'>{res.data.title}</h5>
                    <ul>
                        <li className='detail-age'><span>{res.data.adult === 'false' ? "19+":"15+"}</span></li>
                        <li className='detail-grade'><span>{grade}</span></li>
                        <li className='detail-date'><span>{res.data.release_date}</span></li>
                        <li className='detail-runningtime'><span>{res.data.runtime}분</span></li>
                        <li className='detail-genre'><span>{res.data.genres[0].name}</span></li>
                    </ul>
                    <div className='detail-description'>
                        <p>{res.data.overview}</p>
                        <button>더 보기</button>
                    </div>
                </div>
                <p className='detail-thumb'>
                    <img src={detailThumb+res.data.backdrop_path}/>
                </p>
            </div>
            <div className='detail-episode'>
                <p>회차</p>
                <ul>
                    <li>
                        <div className='episode-info'>
                            <img src={episodeThumb+res.data.backdrop_path}/>
                            <span>1화</span>
                            <span>{res.data.title}</span>
                        </div>
                        <div className='episode-runtime'>
                            <p>{res.data.runtime}분</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Details