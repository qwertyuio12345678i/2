import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { Api } from '../../utils/DataLoader';
import { useContext, useState } from 'react';
import { UserContext } from '../../components/UserContextProvider';
import { Note } from '../../utils/Validation';

//export const loader = () => {};

export const loader = async ({ params: id }) => {
  try {
    const note = await Api.getNote(id);
    console.log(note);
    return { note };
  } catch (error) {
    console.error(error);
    throw new Response('', { status: 404 });
  }
};

function EditNote() {
  const { note } = useLoaderData();

  const navigate = useNavigate();

  const [errors, setErrors] = useState(null);
  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);

  const handleUpdateNote = async () => {
    try {
      const newNote = Note.parse({
        title: title,
        text: text,
        authorId: note.authorId,
        date: note.date,
      });
      console.log(newNote);

      await Api.updateNote({ newNote, id: note.id });
      console.log('Handle update success');
      navigate(`/home/notes`);
    } catch (err) {
      setErrors(err.format());
      console.log('Handle update error:', err.message);
    }
  };

  return (
    <>
      <header className="grid grid-cols-6">
        <button className="col-span-1">
          <Link to="/home/notes">Back</Link>
        </button>
        <div className="prose col-span-4 flex justify-center m-auto">
          <h1>Edit note</h1>
        </div>
      </header>
      <main className="flex flex-col gap-4 w-4/5 m-auto">
        <input
          type="text"
          name=""
          id=""
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setErrors(null);
          }}
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

        <button onClick={handleUpdateNote}>
          {/* <Link to="/home/notes">Save</Link> */}
          Save
        </button>
        <div className="text-red-500 h-8">
          {errors?.title && errors.title._errors}
        </div>
      </main>
    </>
  );
}

export default EditNote;
