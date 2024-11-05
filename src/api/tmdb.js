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
    return await instant.get(`/movie/${id}`)
  }

  //tv detail
  export async function tvdetail(id){
    return await instant.get(`/tv/${id}`)
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
                instant.get('search/movie?query=주술'),
                instant.get('search/tv?query=장송'),
                instant.get('discover/movie?with_genres=16'),
                instant.get('discover/movie?with_genres=10749,10751'),
                instant.get('discover/movie?with_genres=28'),
                instant.get('movie/now_playing?region=KR')
            ]
        );


    popular = popular.data.results;
    tvseries = tvseries.data.results.filter(obj=>obj.poster_path);
    veteran = veteran.data.results;
    physiognomy = physiognomy.data.results;
    exit = exit.data.results;
    exhum = exhum.data.results;
    slayer = slayer.data.results;
    idol = idol.data.results;
    jujutsu = jujutsu.data.results;
    frieren = frieren.data.results;
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
