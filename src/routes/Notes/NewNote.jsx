import React, { useContext, useState } from 'react';
import { Api } from '../../utils/DataLoader';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../components/UserContextProvider';
import { Note } from '../../utils/Validation';

function NewNote() {
  const { user } = useContext(UserContext);

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [errors, setErrors] = useState(null);

  const navigate = useNavigate();

  const handleSetNote = async () => {
    try {
      const newNote = Note.parse({
        title: title,
        text: text,
        authorId: user.id,
        date: Date.now(),
      });

      console.log(title, text);

      await Api.setNote({ note: newNote });
      console.log('Handle update success');
      navigate(`/home/notes`);
    } catch (err) {
      setErrors(err.format());
      console.error('Handle update error:', err.message);
    }
  };

  return (
    <>
      <header className="grid grid-cols-6 mb-4">
        <button className="col-span-1">
          <Link to="/home/notes">Back</Link>
        </button>
        <div className="prose col-span-4 flex justify-center m-auto">
          <h1>Create new note</h1>
        </div>
      </header>
      <main className="flex flex-col gap-4 w-4/5 m-auto">
        <input
          type="text"
          name=""
          id=""
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Name"
        />

        <textarea
          id="story"
          name="story"
          placeholder="Note text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows="5"
          cols="33"
        ></textarea>

        <button
          onClick={handleSetNote}
          className="mx-auto w-32 bg-slate-300 h-10"
        >
          <h2 className="prose text-xl no-underline">Save</h2>
        </button>

        <div className="text-red-500 h-8">
          {errors?.title && errors.title._errors}
        </div>
      </main>
    </>
  );
}

export default NewNote;
