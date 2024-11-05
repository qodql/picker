import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';


const Slide = () => {

  const swiperRef = useRef(null);


  let [speed,setSpeed] = useState('0s');
  useEffect(()=>{
    setTimeout(()=>setSpeed('0.3s'),100);
  })

  return (
    <div className='main-slide'>
       <Swiper
          spaceBetween={60}
          slidesPerView={'auto'}
          centeredSlides={true}
          loop={true}
          navigation={true}
          modules={[Navigation]}
          ref={swiperRef}
          breakpoints={{
            // 1400:{
            //   slidesPerView: 1
            // },
            1401:{
              slidesPerView:'auto',
            }
          }}
      >
        <SwiperSlide style={{transition:speed}}>
          <img src={require('../assets/img/main/main-moonlight.jpg')} alt='main-slide01'/>
          <section className='slide-logo-section'>
            <div className='slide-logo-section-inner'>
              <div className='logo-div logo-div-first'></div>
              <span>인류 최초 달 착륙 프로젝트<br/>성공하거나, 성공으로 속이거나</span>
            </div>
          </section>
        </SwiperSlide>
        <SwiperSlide style={{transition:speed}}>
          <img src={require('../assets/img/main/main-seoul.jpg')} alt='main-slide02'/>
          <section className='slide-logo-section'>
            <div className='slide-logo-section-inner'>
              <div className='logo-div logo-div-second'></div>
              <span>서울 군사반란 발생 그날,<br/>대한민국의 운명이 바뀌었다</span>
            </div>
          </section>
        </SwiperSlide>
        <SwiperSlide style={{transition:speed}}>
          <img src={require('../assets/img/main/main-sigol.jpg')} alt='main-slide03'/>
          <section className='slide-logo-section'>
            <div className="slide-logo-section-inner">
              <div className='logo-div logo-div-third'></div>
              <span>도시에서 온 Z 대표 연예인들이<br/>시골Z로 거듭나는 ‘힙트로’ 버라이어티</span>
            </div>
          </section>
        </SwiperSlide>
        <SwiperSlide style={{transition:speed}}>
          <img src={require('../assets/img/main/main-pilot.jpg')} alt='main-slide04'/>
          <section className='slide-logo-section'>
            <div className="slide-logo-section-inner">
              <div className='logo-div logo-div-fourth'></div>
              <span>하루 아침에 인생 추락한 스타<br/>파일럿 제 2의 인생 이륙 준비 중</span>
            </div>
          </section>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default Slide