import React, { useEffect, useState } from 'react'
import { tvdetail } from '../api/tmdb';
import { useParams } from 'react-router-dom';

const Tvdetail = () => {
    const {id} = useParams();
    const [res, setRes] = useState();

    
    useEffect(()=>{
        (async function(){
            setRes(await tvdetail(id));
        }())
    },[id])
    
    if(!res) return<>준비중..</>;
    


    let detailThumb = 'https://image.tmdb.org/t/p/w1280/';
    let episodeThumb = 'https://image.tmdb.org/t/p/w300/';

    let grade = res.data.vote_average.toFixed(1);



  return (
    <div className='detail'>
        <div className='detail-wrap'>
            <div className='detail-info'>
                <div className='detail-info-inner'>
                    <h5 className='detail-tit'>{res.data.name}</h5>
                    <ul>
                        <li className='detail-age'><span>{res.adult === 'false' ? "19+":"12+"}</span></li>
                        <li className='detail-grade'><span>{grade}</span></li>
                        <li className='detail-date'><span>{res.data.first_air_date}</span></li>
                        <li className='detail-runningtime'><span>{res.data.episode_run_time[0]}분</span></li>
                        <li className='detail-genre'><span>{res.data.genres[0].name}</span></li>
                    </ul>
                    <div className='detail-description'>
                        <p>{res.data.overview}</p>
                        <button>더 보기</button>
                    </div>
                </div>
                <p className='detail-thumb'>
                    <img src={detailThumb+res.data.backdrop_path} alt='detail-thumb'/>
                </p>
            </div>
            <div className='detail-episode'>
                <p>회차</p>
                <ul>
                    <li>
                        <div className='episode-info'>
                            <img src={episodeThumb+res.data.backdrop_path} alt='detail-thumb'/>
                            <span>1화</span>
                            <span>{res.data.title}</span>
                        </div>
                        <div className='episode-runtime'>
                            <p>{res.data.episode_run_time[0]}분</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Tvdetail