import React, { Suspense, useContext, useEffect, useMemo } from 'react';
import { useState } from 'react';
import { Await, Link, useLoaderData } from 'react-router-dom';
import { Api } from '../../utils/DataLoader';
import { UserContext } from '../../components/UserContextProvider';
import { User } from '../../utils/Validation';

function Notes() {
  const [notesPromise, setNotes] = useState(new Promise(() => {}));
  const { user } = useContext(UserContext);

  const fetchNotes = () => {
    try {
      setNotes(Api.getNotes({ id: user.id }));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleDeleteNote = async (id) => {
    try {
      await Api.deleteNote({ id });
      fetchNotes();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col justify-center">
      <header className="prose mx-auto my-4 flex justify-center">
        <h1 className="">Notes</h1>
      </header>
      <main>
        <button className="w-40 m-4  bg-slate-300">
          <Link to="/home/newNote" className="prose prose-lg">
            Add new note
          </Link>
        </button>
        <Suspense fallback={<div>Loading...</div>}>
          <Await
            resolve={notesPromise}
            errorElement={<div>You don't have notes</div>}
          >
            {(notes) => {
              return (
                <div className="flex flex-col gap-2">
                  {notes.length > 0 ? (
                    notes.map((note) => (
                      <div
                        className="flex flex-row bg-slate-300 w-4/5 justify-between m-auto px-1 py-0.5 min-h-[3rem]"
                        key={note.id}
                      >
                        <article className="flex flex-row gap-2 my-auto">
                          <h4 className="font-bold">{note.title}</h4>
                          <h4 className="font-light">
                            {new Date(note.date).toLocaleString('ru-Ru')}
                          </h4>
                        </article>
                        <div className="flex flex-row gap-4">
                          <button>
                            <Link
                              to={`/home/notes/${note.id}`}
                              className="prose"
                            >
                              <h4>Edit</h4>
                            </Link>
                          </button>

                          <button
                            onClick={() => handleDeleteNote(note.id)}
                            className="prose"
                          >
                            <h4>Remove</h4>
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div>You don't have notes</div>
                  )}
                </div>
              );
            }}
          </Await>
        </Suspense>
      </main>
    </div>
  );
}

export default Notes;

/*
  const fetchNotes = () => {
    try {
      const response = Api.getNotes({ id: user.id });
      setNotes(response);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchNotes = () => {
    try {
      // Имитируем задержку запроса с помощью setTimeout
      setTimeout(async () => {
        const response = await Api.getNotes({ id: user.id });
        console.log(response);
        setNotes(response);
      }, 1000); // 1000 миллисекунд = 1 секунда
    } catch (error) {
      console.error(error);
    }
  };

*/

{
  /* 
<div className="flex flex-col gap-2">
          {notes.length > 0 ? (
            notes.map((note) => (
              <div
                className="flex flex-row bg-slate-400 w-4/5 justify-between m-auto px-1 py-0.5 min-h-[3rem]"
                key={note.id}
              >
                <article className="flex flex-row gap-2 my-auto">
                  <h4 className="font-bold">{note.title}</h4>
                  <h4 className="font-light">
                    {new Date(note.date).toLocaleString('ru-Ru')}
                  </h4>
                </article>
                <div className="flex flex-row gap-4">
                  <button>
                    <Link to={`/home/notes/${note.id}`}>
                      <h4>Edit</h4>
                    </Link>
                  </button>

                  <button onClick={() => handleDeleteNote(note.id)}>
                    <h4>Remove</h4>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div>You don't have notes</div>
          )}
        </div> 
      */
}

// export const loader = async () => {
//   try {
//     const notes = await Api.getNotes({ id: 1 });
//     console.log(notes);
//     return { notes };
//   } catch (error) {
//     console.error(error);
//     throw new Response('', { status: 404 });
//   }
// };

// function Notes() {
//   const { notes } = useLoaderData();

//   const handleDeleteNote = async (id) => {
//     try {
//       await Api.deleteNote({ id });

//       setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="flex flex-col justify-center">
//       <header className="prose mx-auto my-4 flex justify-center">
//         <h1 className="">Notes</h1>
//       </header>
//       <main>
//         <button>
//           <Link to="/home/newNote">Add new note</Link>
//         </button>
//         <div className="flex-col">
//           {notes.length > 0
//             ? notes.map((note) => {
//                 return (
//                   <div
//                     className="flex flex-row bg-slate-400 w-4/5 justify-between m-auto px-1 py-0.5 min-h-[3rem]"
//                     key={note.id}
//                   >
//                     <article className="flex flex-row gap-2">
//                       <h4 className="font-bold">{note.title}</h4>
//                       <h4 className="font-light">
//                         {new Date(note.date).toLocaleString('ru-Ru')}
//                       </h4>
//                     </article>
//                     <div className="flex flex-row gap-4">
//                       <Link to={`/home/notes/${note.id}`}>
//                         <h4>Edit</h4>
//                       </Link>
//                       <button onClick={() => handleDeleteNote(note.id)}>
//                         <h4>Remove</h4>
//                       </button>
//                     </div>
//                   </div>
//                 );
//               })
//             : () => {
//                 return <div>You don't have notes</div>;
//               }}
//         </div>
//       </main>
//     </div>
//   );
// }

// export default React.memo(Notes);

//const [viewNotes, setViewNotes] = useEffect(null);
//const [loading, setLoading] = useEffect(true);

// useEffect(() => {
//   setViewNotes(notes);
//   console.log(viewNotes);
// }, [notes]);

// if (loading) {
//   return <div>Loading...</div>;
// }

{
  /* <Suspense fallback={<div>Loading...</div>}>
            <Await
              resolve={notesPromise}
              errorElement={<div>Ooops, something goes wrong!</div>}
            >
              {(notes) => {
                notes.map((note) => {
                  console.log(notes)
                  return (
                    <div
                      className="flex flex-row bg-slate-400 w-4/5 justify-between m-auto px-1 py-0.5 min-h-[2rem]"
                      key={note.id}
                    >
                      <article className="flex flex-row gap-2">
                        <h4 className="font-bold">{note.title}</h4>
                        <h4 className="font-light">
                          {new Date(note.date).toLocaleString('ru-Ru')}
                        </h4>
                      </article>
                      <div className="flex flex-row gap-4">
                        <Link to={`/home/notes/${note.id}`}>
                          <h4>Edit</h4>
                        </Link>
                        <Link>
                          <h4>Remove</h4>
                        </Link>
                      </div>
                    </div>
                  );
                });
              }}
            </Await>
          </Suspense> */
}
