import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { actionCreators, RootState } from '../../store';
import { Link } from 'react-router-dom';

import { ReactComponent as FolderIcon } from '../../assets/image/folder_icon.svg';
import { ReactComponent as LoveIcon } from '../../assets/image/love_icon.svg';

import '../../assets/scss/Album.scss';

interface AlbumProps {

}

interface AlbumParams {
  albumId?: string
}

interface UserState {
  id: number,
  name: string,
  username: string,
  email: string
}

const Album: React.FC<AlbumProps> = () => {
  const { albumId } = useParams<AlbumParams>();

  const dispatch = useDispatch();
  const { addComment, addFavorite, removeFavorite } = bindActionCreators(actionCreators, dispatch);
  const state = useSelector((state: RootState) => state.activity);

  const [photos, setPhotos] = useState([]);
  const [album, setAlbum] = useState<string>('');
  const [user, setUser] = useState<UserState>({
    id: 0,
    name: '',
    username: '',
    email: ''
  });

  //This value will contain all comments
  const comments = [...state['comments']];
  const favorites = [...state['favorites']];

  useEffect(() => {
    // Get photos inside album
    axios.get(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`)
		.then((response) => {
      setPhotos(response.data);

      //Get album information to get 
      axios.get(`https://jsonplaceholder.typicode.com/albums/${albumId}`)
		  .then((response) => {
        setAlbum(response.data.title);

        //Get user informations
        axios.get(`https://jsonplaceholder.typicode.com/users/${response.data.userId}`)
        .then((response) => {
          setUser({
            id: response.data.id,
            name: response.data.name,
            username: response.data.username,
            email: response.data.email
          });
        })
      })
    });
  }, [albumId]);

  const handleLikeImage = (id: number, title: string, album: string, url: string) => {
    const likedPhoto = favorites.filter(favorite => favorite['id'] === id)

    if (likedPhoto.length < 1) {
      addFavorite({
        id,
        title,
        username: user.name,
        album,
        url,
        userId: user.id
      })
    } else {
      removeFavorite(id)
    }
  }

  const handleSubmitComments = (photoId: number, event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      comment: { value: string };
    };
    let text = target.comment.value;

    if (text.length > 0) {
      addComment({
        idPhoto: photoId,
        comment: text
      })
      
      target.comment.value = '';
    }
  }

  const isLiked = (photoId: number) => {
    return favorites.some((favorite) => {
      return favorite['id'] === photoId;
    }); 
  }

  const filterComments = (photoId: number) => {
    const filterdComments = comments.filter(comment => comment['idPhoto'] === photoId);

    return (
      filterdComments.length > 0 ?
      filterdComments.map((comment, index) => {
        return (
          <p className='comment-card' key={index}>
            {comment['comment']}
          </p>
        )
      }) : 
      <p className='comment-card__empty'>There is no comments yet</p>
    )
  }

  return (
    <section className="container album">
      <div className="album__info">
        <div className='album__info-image'>
          <FolderIcon />
        </div>
        <div className='album__info-meta'>
          <h1 className='album__info-meta-title'>{album}</h1>
          <p className='album__info-meta-user'>
            Created by : 
            <Link to={`/user/${user.id}`}>
              {user.name}
            </Link> ({user.email})
          </p>
        </div>
      </div>
      <div className='album__list'>
        {
          photos.map((photo, index) => {
            return(
              <div className='photo-card' key={index}>
                <div className='photo-card__image'>
                  <LoveIcon
                    className='photo-card__image-like'
                    style={isLiked(photo['id']) ? {fill: 'red'} : {}}
                    onClick={() => handleLikeImage(
                      photo['id'],
                      photo['title'],
                      photo['albumId'],
                      photo['url']
                    )}
                  />
                  <img
                    src={photo['url']}
                    alt={photo['title']}
                  />
                </div>
                <div className='photo-card__meta'>
                  <h1 className='photo-card__meta-title'>{photo['title']}</h1>
                  <div className='photo-card__meta-comments'>
                    {filterComments(photo['id'])}
                  </div>
                  <form onSubmit={(event) => handleSubmitComments(photo['id'], event) }>
                    <textarea 
                      name='comment'
                      className='photo-card__meta-comment-input'
                      placeholder='Write a comment'
                    ></textarea>
                    <button className='photo-card__meta-comment-btn'>
                      Add Comment
                    </button>
                  </form>
                </div>
              </div>
            );
          })
        }
      </div>
    </section>
  );
}

export default Album;