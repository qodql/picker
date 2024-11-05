import React from 'react'
import Slide from '../components/Slide'
import MovieList from '../components/MovieList'
import AnimeList from '../components/AnimeList'
import Ranking from '../components/Ranking'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'


const Main = () => {
  const state = useSelector((state) => state);

  if(!state.popular) return <></>;

  const movieLink =()=>{
    window.scrollTo(0,0);
  }
  

  return (
    <main className='main'>
         <Slide/>
         <section className='movie-list-section list-section'>
          <div className='list-tit-section'>
            <h5 className='list-tit'>영화</h5>
            <span onClick={movieLink}><Link to='/movie'>더 보기</Link></span>
          </div>
          <MovieList state={state}/>
         </section>
         <section className='anime-list-section list-section'>
         <div className='list-tit-section'>
            <h5 className='list-tit'>애니메이션</h5>
            <span onClick={movieLink}><Link to='/animation'>더 보기</Link></span>
          </div>
          <AnimeList state={state}/>
         </section>
         <section className='ranking-list-section list-section'>
          <Ranking state={state}/>
         </section>
    </main>
  )
}

export default Main