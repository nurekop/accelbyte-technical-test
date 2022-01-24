import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios';

import AlbumCard from '../common/AlbumCard';

import '../../assets/scss/User.scss';

interface UserProps {

}

interface AlbumParams {
  userId?: string
}

interface UserState {
  id: number,
  name: string,
  username: string,
  email: string,
  address: {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
      lat: string,
      lng: string
    }
  },
  phone: string,
  website: string,
  company: {
    name: string,
    catchPhrase: string,
    bs: string
  }
}

const User: React.FC<UserProps> = () => {
  const { userId } = useParams<AlbumParams>();

  const [user, setUser] = useState<UserState | undefined>();
  const [albums, setAlbums] =useState([]);

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`)
		.then((response) => {
      setUser(response.data);

      axios.get(`https://jsonplaceholder.typicode.com/users/${userId}/albums`)
		  .then((response) => {
        setAlbums(response.data);
      })
    })
  }, [userId]);
  
  return (
    <section className='container user'>
      <div className='user-information'>
        <h1 className='user-information__name'>{user?.name}</h1>
        <div className='user-information__info'>
          <p className='user-information__info-text'>Email: {user?.email}</p>
          <p className='user-information__info-text'>Phone: {user?.phone}</p>
          <p className='user-information__info-text'>
            Website: {user?.website}
          </p>
          <p className='user-information__info-text'>
            Address: {user?.address.street},{user?.address.suite},{user?.address.city} {user?.address.zipcode}
          </p>
        </div>
      </div>
      <div className='user-albums'>
        <div className='user-albums__list'>
          {
            albums.map((album, index) => {
              return (
                <AlbumCard album={album} key={index} />
              );
            })
          }
        </div>
      </div>
    </section>
  );
}


export default User;