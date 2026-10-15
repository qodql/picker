import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';


const Slide = () => {

  const swiperRef = useRef(null);


  // transition을 transform/filter에만 건다.
  // 전체(all)에 걸면 화면 크기가 바뀔 때 슬라이드 width까지 0.3초 동안 애니메이션되어
  // Swiper가 중간 크기로 위치를 계산해 버린다.
  let [speed,setSpeed] = useState('none');
  const resizeTimer = useRef(null);

  useEffect(()=>{
    const timer = setTimeout(()=>setSpeed('transform 0.5s ease, opacity 0.5s ease'),100);
    return ()=>{
      clearTimeout(timer);
      clearTimeout(resizeTimer.current);
    };
  },[])

  // 화면 크기 변경이 끝난 뒤 한 번만 슬라이드 크기/위치를 다시 계산
  const fixPosition = (swiper)=>{
    clearTimeout(resizeTimer.current);
    resizeTimer.current = setTimeout(()=>{
      if (swiper.destroyed) return;
      // 모바일(slidesPerView: 1)에서 Swiper가 넣어둔 인라인 width를 지워야
      // 데스크탑에서 CSS의 1400px이 다시 적용된다
      if (swiper.params.slidesPerView === 'auto'){
        swiper.slides.forEach(slide => { slide.style.width = ''; });
      }
      swiper.update();
      swiper.slideToLoop(swiper.realIndex, 0, false);
    }, 150);
  }

  return (
    <div className='main-slide'>
       <Swiper
          spaceBetween={60}
          slidesPerView={'auto'}
          centeredSlides={true}
          loop={true}
          speed={500}  // 슬라이드 이동 시간과 크기 변화 시간(0.5s)을 맞춘다
          navigation={true}
          modules={[Navigation]}
          ref={swiperRef}
          // 1400px 이하: CSS에서 슬라이드가 100% 폭이 되므로 1장씩 보여준다
          // 1401px 이상: 1400px 슬라이드 + 양옆 미리보기
          breakpoints={{
            0:{
              slidesPerView: 1,
              spaceBetween: 0,
            },
            1401:{
              slidesPerView:'auto',
              spaceBetween: 60,
            }
          }}
          // 화면 크기가 바뀌면 슬라이드 폭을 다시 계산하고 현재 슬라이드로 위치를 맞춘다
          onBreakpoint={(swiper)=>fixPosition(swiper)}
          onResize={(swiper)=>fixPosition(swiper)}
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