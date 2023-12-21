import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';


const Movie = ({ item }) => {

  // State variable to track whether the user has liked the movie
  const [like, setLike] = useState(false);

  // State variable to track whether the movie is saved
  const [saved, setSaved] = useState(false);

  // Retrieve user information from the authentication context
  const { user } = UserAuth();

  // Document reference for the user's movie collection in Firestore
  const movieID = doc(db, 'users', `${user?.email}`);

  // Save the movie to the user's collection in Firestore
  const saveShow = async () => {

    // Check if the user is authenticated
    if (user?.email) {

      // Toggle the like state and set the movie as saved
      setLike(!like);
      setSaved(true);

      // Update the user's movie collection in Firestore with the new saved show
      await updateDoc(movieID, {
        savedShows: arrayUnion({
          id: item.id,
          title: item.title,
          img: item.backdrop_path,
        }),
      });

    } else {
      // Alert the user to log in if not authenticated
      alert('Please log in to save a movie');
    }

  };

  return (
    <div className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2'>
      <img
        className='w-full h-auto block'
        src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
        alt={item?.title}
      />
      <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white'>
        <p className='white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>
          {item?.title}
        </p>
        <p onClick={saveShow}>
          {like ? (
            <FaHeart className='absolute top-4 left-4 text-gray-300' />
          ) : (
            <FaRegHeart className='absolute top-4 left-4 text-gray-300' />
          )}
        </p>
      </div>
    </div>
  );
};

export default Movie;