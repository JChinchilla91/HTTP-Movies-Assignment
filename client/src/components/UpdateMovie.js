import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import axios from 'axios';

const initialMovie = {
    title: '',
    director: '',
    metascore: '',
    stars: []
}

const UpdateMovie = props => {
    const [movie, setMovie] = useState(initialMovie);
    const params = useParams();
    const { push } = useHistory();

    useEffect(() => {
        const movieToEdit = props.movies.find(
            e => `${e.id}` === props.match.params.id
        );
        console.log(props.movies, movieToEdit)
        if(movieToEdit) {
            setMovie(movieToEdit);
        }
    }, [props.movies, props.match.params.id]);

    const changeHandler = e => {
        
        let value = e.target.value
        console.log(value)

        setMovie({
            ...movie,
            [e.target.name]: value
        });
    };

    const handleStars = e => {
        setMovie({
            ...movie,
            stars: e.target.value.split(',')
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        axios
          .put(`http://localhost:5000/api/movies/${params.id}`, movie)
          .then(res => {
              setMovie(res.data)
              props.history.push(`/movies/${params.id}`)
          })
          .catch(err => console.error(err.message))
    }

    return(
        <div className='movie-card'>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <input
                 type='text'
                 name='title'
                 onChange={changeHandler}
                 value={movie.title}
                 />

                <input
                  type='text'
                  name='director'
                  onChange={changeHandler}
                  value={movie.director}
                />

                <input
                 type="number" 
                 name="metascore"
                 placeholder= "Metascore"
                 onChange={changeHandler}
                 value={movie.metascore}
                />

                <input
                 type="string"
                 name="stars"
                 placeholder= "Stars"
                 onChange={handleStars}
                 value={movie.stars}
                />

                <button>Update!</button>
            </form>
        </div>
    )
}

export default UpdateMovie;