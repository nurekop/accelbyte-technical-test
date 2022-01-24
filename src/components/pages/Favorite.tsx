import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Link } from 'react-router-dom';

import '../../assets/scss/Favorite.scss';

interface FavoriteProps {

}

const Favorite: React.FC<FavoriteProps> = () => {
  const state = useSelector((state: RootState) => state.activity);

  const favorites = [...state['favorites']];


  return (
    <section className='container favorite'>
      <div className='favorite__list'>
        {
          favorites.length > 0 ?
            favorites.map((favorite, index) => {
              return (
                <div className='favorite-card' key={index}>
                  <img className='favorite-card__image' src={favorite['url']} alt={favorite['title']} />
                  <h1 className='favorite-card__title'>{favorite['title']}</h1>
                  <p className='favorite-card__user'>
                    Created by : 
                    <Link to={`/user/${favorite['userId']}`}>
                      {favorite['username']}
                    </Link>
                  </p>
                </div>
              )
            }) : 
            <div className='favorite-empty'>
              <h1>There is no Favorite Photos yet.</h1>
            </div>
        }
      </div>
    </section>
  );
}

export default Favorite;