import React, { createContext, useEffect, useState } from 'react';
import { Api } from '../utils/DataLoader';

export const UserContext = createContext(null);

function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const id = localStorage.getItem('userId');
    if (id) {
      fetch(`http://localhost:5001/users?id=${id}`)
        .then((r) => r.json())
        .then((users) => users[0])
        .then((user) => {
          setUser(user);
          setLoading(false);
        });
    } else setLoading(false);
  }, []);

  useEffect(() => {
    if (user?.id) {
      localStorage.setItem('userId', user.id);
    }
  }, [user?.id]);

  return (
    <UserContext.Provider value={{ user, onChange: setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;

// useEffect(() => {
//   setLoading(true);
//   const id = localStorage.getItem('userId');
//   if (id) {
//     fetch(`http://localhost:5001/users?id=${id}`)
//       .then((r) => r.json())
//       .then((users) => users[0])
//       .then((user) => {
//         setUser(user);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setLoading(false);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   } else setLoading(false);
// }, [loading]);

// fetch(`http://localhost:5001/notes?authorId=${id}`)
//   .then((r) => r.json())
//   .then(async (notes) => setNotes(notes))
//   .catch((err) => {
//     console.error(err);
//     throw new Response('', { status: 404 });
//   });

// console.log(notes);
