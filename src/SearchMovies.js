import React, {useState} from 'react';
import './style.css';
import MovieCard from './MovieCard';


export default function SearchMovies(){

    const[query, setQuery] = useState('');
    const[movies, setMovies] = useState([]);

    const searchMovies = async (e) =>{
        e.preventDefault();
        const api_url = `https://api.themoviedb.org/3/search/movie?api_key=c955d1f32acc589511fd4a15dfcfbe03&language=en-US&query=${query}&page=1&include_adult=false`;
        
        try{
        const res = await fetch(api_url);
        const data = await res.json();
        console.log(data);
        setMovies(data.results);
        }catch(err){
            console.log(err);
        }
    }

    return(
        <>
            <form className="form" onSubmit={searchMovies} >
                <label className="label" htmlFor="query">Movie Name</label>
                <input className="input" type="text" name="query" 
                placeholder="enter the movie name" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                />
                <button className="button" type="submit"> Search</button>
            </form>
            <div className="card-list">
                {/* to filter out the movies which has the movie path and then map the array*/}
                {movies.filter(movie => movie.poster_path).map(movie => (
                    <MovieCard movie={movie}  key={movie.id}/>
                ))}
            </div>
        </>

    );
}