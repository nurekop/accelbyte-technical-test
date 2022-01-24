import React from 'react'
import { Link } from 'react-router-dom';

import { ReactComponent as FolderIcon } from '../../assets/image/folder_icon.svg';

import '../../assets/scss/Album.scss';

interface AlbumCardProps {
  album: {
    userId: string,
    id: number,
    title: string,
    username?: string
  }
}

const AlbumCard: React.FC<AlbumCardProps> = ({album}) => {
    return (
      <div className='album-card'>
        <div className='album-card__image'>
          <FolderIcon className='album-card__icon' />
        </div>
        <div className='album-card__meta'>
          <h2 className='album-card__meta-title'>
            <Link to={`/album/${album['id']}`}>
              {album['title']}
            </Link>
          </h2>
          {
            album['username'] &&
            <p className='album-card__meta-user'>
              Created By : 
              <Link to={`/user/${album['userId']}`}>
                {album['username']}
              </Link>
            </p> 
          }
        </div>
      </div>
    );
}

export default AlbumCard;