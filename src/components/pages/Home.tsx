import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';

import AlbumCard from '../common/AlbumCard';

import '../../assets/scss/Home.scss';

interface HomeProps {

}

interface payload { 
   [index:number]:string 
}

interface posts { 
  userId: number,
  id: number,
  title: string
}

interface albums {
  id: number,
  title: string,
  userId: number,
  username: string
}

const Home: React.FC<HomeProps> = () => {

  const [filter, setFilter] = useState< string | undefined >('');
  const [albums, setAlbums] = useState([]);

  const filterRef = useRef<HTMLSelectElement>(null);

  const SortAlbum = (x:albums, y:albums) =>{
    return x.title.localeCompare(y.title);
  }

  const SortUser = (x:albums, y:albums) =>{
    return x.username.localeCompare(y.username);
  }

  const buildUsersPayload = (users: []) => {
    let payload:payload = {}
    users.forEach((user: {id: number, name: string}, index: number) => {
      payload[user.id] = user.name
    })

    return payload
  }

  const buildPostsPayload = (posts: [], users: payload) => {
    let payload:any = []
    posts.forEach((post:posts,index)=>{
      payload.push({
        ...post,
        username : users[post.userId]
      })
    })

    return payload;
  }

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/users`)
		.then((response) => {
			let users = buildUsersPayload(response.data);

			axios.get(`https://jsonplaceholder.typicode.com/albums`)
			.then((response) => {
				let albums = buildPostsPayload(response.data, users);
        setAlbums(albums);
        setFilter('album');
			})
			.catch((error) => {
        console.error(error);
			})
		})
		.catch((error) => {
       console.error(error);
    })
  }, []);

  useEffect(() => {
    const sortingMethod = filter === 'album' ?  SortUser : SortAlbum;
    albums.sort(sortingMethod);
  },[filter, albums]);

  const handleChange = () => {
    setFilter(filterRef.current?.value);
  }

  return (
    <section className="container home">
      <div className="home__filter">
        Filter Album by : 
        <select ref={filterRef} onChange={handleChange} className="home__filter-select">
          <option value="album">Album Name</option>
          <option value="user">User Name</option>
        </select>
      </div>
      <div className="home__list">
        {
          albums.map((album, index) => {
            return (
              <AlbumCard album={album} key={index} />
            );
          })
        }
      </div>
    </section>
  );
}

export default Home;