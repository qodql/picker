import axios from 'axios';

const instant = axios.create({
    baseURL:'https://api.themoviedb.org/3',
    params:{
      api_key:'f89a6c1f22aca3858a4ae7aef10de967',
      language:'ko-kr',
    }
  })

  //search
  export async function search(keyword){
    return await instant.get(`search/movie?query=${keyword}`)
  }

  //detail
  export async function detail(id){
    return await instant.get(`/movie/${id}?append_to_response=release_dates`)
  }

  //tv detail
  export async function tvdetail(id){
    return await instant.get(`/tv/${id}?append_to_response=content_ratings`)
  }

  // 한국 관람등급 가져오기 (TMDB의 adult 값은 성인물 전용이라 19금 영화도 false로 옴)
  // 영화: release_dates, TV: content_ratings 에서 KR 등급을 찾는다. 없으면 null
  export function getAge(data){
    const krMovie = data.release_dates?.results?.find(r => r.iso_3166_1 === 'KR');
    let cert = krMovie?.release_dates?.map(d => d.certification).find(Boolean);
    if (!cert) cert = data.content_ratings?.results?.find(r => r.iso_3166_1 === 'KR')?.rating;
    if (!cert) return data.adult ? '19+' : null;
    if (/^all$/i.test(cert)) return 'ALL';
    if (['18', '19', '청소년관람불가'].includes(cert)) return '19+';
    return `${cert}+`;
  }

  // 등급별 배지 색상 클래스 (12세 이하 파랑 / 15세 노랑 / 19세 빨강)
  export function ageClass(age){
    if (age === '19+') return 'age-19';
    if (age === '15+') return 'age-15';
    return 'age-12';
  }


  // 검색 결과 중 원하는 작품을 제목(부분일치)·연도로 골라낸다.
  // 후보를 순서대로 시도하고, 하나도 안 맞으면 이미지가 있는 첫 결과를 쓴다.
  // 컴포넌트에서 state.xxx[0] 으로 쓰고 있으므로 배열 형태로 반환한다.
  const normalize = (s) => (s || '').replace(/\s/g, '');

  function pick(results, candidates){
    const withImg = results.filter(r => r.backdrop_path);
    for (const { title, year } of candidates){
      const found = withImg.find(r => {
        const names = normalize((r.title || r.name) + (r.original_title || r.original_name));
        const date = r.release_date || r.first_air_date || '';
        return names.includes(normalize(title)) && (!year || date.startsWith(year));
      });
      if (found) return [found];
    }
    return withImg.length ? withImg : results;
  }

  export async function main(){
    let [ popular, tvseries,
          veteran, physiognomy, exit, exhum,
          slayer, idol, jujutsu, frieren,
          animation, romance, action, playing
        ] 
        = await Promise.all(
            [
                instant.get('/movie/popular'),
                instant.get('/tv/popular'),
                instant.get('search/movie?query=베테랑'),
                instant.get('search/movie?query=관상'),
                instant.get('search/movie?query=엑시트'),
                instant.get('search/movie?query=파묘'),
                instant.get('search/movie?query=귀멸'),
                instant.get('search/tv?query=최애'),
                instant.get('search/movie?query=주술회전'),
                instant.get('search/tv?query=장송'),
                instant.get('discover/movie?with_genres=16'),
                instant.get('discover/movie?with_genres=10749,10751'),
                instant.get('discover/movie?with_genres=28'),
                instant.get('movie/now_playing?region=KR')
            ]
        );


    popular = popular.data.results;
    tvseries = tvseries.data.results.filter(obj=>obj.poster_path);
    // 바꾸고 싶으면 title(제목 일부)과 year(개봉연도)만 수정하면 된다.
    veteran     = pick(veteran.data.results,     [{ title:'베테랑', year:'2015' }]);
    physiognomy = pick(physiognomy.data.results, [{ title:'관상', year:'2013' }]);
    exit        = pick(exit.data.results,        [{ title:'엑시트', year:'2019' }]);
    exhum       = pick(exhum.data.results,       [{ title:'파묘', year:'2024' }]);
    slayer      = pick(slayer.data.results,      [{ title:'무한성' }, { title:'귀멸의칼날' }]);
    idol        = pick(idol.data.results,        [{ title:'최애의아이' }]);
    // 로고가 '회옥·옥절'이라 극장판 총집편(2025)을 먼저 찾고, 없으면 주술회전 0(2021)
    jujutsu     = pick(jujutsu.data.results,     [{ title:'회옥' }, { title:'懐玉' }, { title:'주술회전', year:'2021' }, { title:'주술회전' }]);
    frieren     = pick(frieren.data.results,     [{ title:'장송의프리렌' }]);
    animation = animation.data.results;
    romance = romance.data.results;
    action = action.data.results;
    playing = playing.data.results;

    

    return {  popular, tvseries,
              veteran, physiognomy, exit, exhum,
              slayer, idol, jujutsu, frieren,
              animation, romance, action, playing
            }
  }
