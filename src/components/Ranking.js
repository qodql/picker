import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Ranking = ({state}) => {

    const navigate = useNavigate();

    const moveDetail = (id)=>{
        navigate(`/details/${id}`);
        window.scrollTo(0,0);
  }


    let listThumb = 'https://image.tmdb.org/t/p/w500/';

    let animeRanking = state.animation.map((v,i)=> {
        return i < 3 ?(
            <li key={v.id} className='list-contents' onClick={()=>moveDetail(v.id)}>
                <p className='list-thumb-cont'>
                    <img className='list-thumb' src={listThumb+v.backdrop_path} alt='ranking-list'/>
                </p>
            </li>
        ):''
    })

    let romanceRanking = state.romance.map((v,i)=> {
        return i < 3 ?(
            <li key={v.id} className='list-contents' onClick={()=>moveDetail(v.id)}>
                <p className='list-thumb-cont'>
                    <img className='list-thumb' src={listThumb+v.backdrop_path} alt='ranking-list'/>
                </p>
            </li>
        ):''
    })

    let actionRanking = state.action.map((v,i)=> {
        return i < 3 ?(
            <li key={v.id} className='list-contents' onClick={()=>moveDetail(v.id)}>
                <p className='list-thumb-cont'>
                    <img className='list-thumb' src={listThumb+v.backdrop_path} alt='ranking-list'/>
                </p>
            </li>
        ):''
    })

    let playingRanking = state.playing.map((v,i)=> {
        return i < 3 ?(
            <li key={v.id} className='list-contents' onClick={()=>moveDetail(v.id)}>
                <p className='list-thumb-cont'>
                    <img className='list-thumb' src={listThumb+v.backdrop_path} alt='ranking-list'/>
                </p>
            </li>
        ):''
    })

    const tabData = [
        { id: 1, button: "#신작", content:playingRanking},
        { id: 2, button: "#로맨스", content:romanceRanking},
        { id: 3, button: "#액션", content:actionRanking},
        { id: 4, button: "#애니메이션", content:animeRanking}
      ]; 

      const [activeTab, setActiveTab] = useState(tabData[0].id);


  return (
    <div className='ranking-tab'>
       <div className='hashtag'>
       {tabData.map((tab) => (
          <button
            key={tab.id}
            data-active={activeTab === tab.id ? "true" : "false"}
            onClick={() => setActiveTab(tab.id)}
            className={activeTab === tab.id ? "active":''}
            >
            {tab.button}
          </button>
        ))}
       </div>
       <ul className='ranking-list-inner list-inner'>
        {tabData.find((tab) => tab.id === activeTab)?.content}
       </ul>
    </div>
  )
}

export default Ranking