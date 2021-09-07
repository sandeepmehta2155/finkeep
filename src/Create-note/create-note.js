import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { NotesImg } from "./notes-img";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const NoteIconContext = createContext();

export const CreateNote = () => {
  function playAudio() {
    const audioEl = document.getElementsByClassName("audio-element")[0];
    audioEl.play();
  }

  const [noteActive, setNoteActive] = useState("none");
  const [notePassive, setNotePassive] = useState("block");
  const [pinned, setPinned] = useState(false);

  const [note, setNote] = useState({
    title: "",
    notes: "",
    backgroundColor: "#FFFFFF"
  });

  const addNotes = () =>
    toast.success("Adding note...", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });

  const removeNotes = () =>
    toast.success("Removing note...", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });

  const { username } = JSON.parse(localStorage.getItem("username")) || {
    username: null
  };
  const navigate = useNavigate();

  const [noteArray, setNoteArray] = useState([]);

  const [classReq, setClass] = useState("active");

  async function RemoveNote(_id) {
    const response = await axios.get(
      `https://finkeep-backend.sandeepmehta215.repl.co/removenote/${username}?noteid=${_id}`
    );

    setNoteArray(response.data.userUpdatedNote);
  }

  async function CallNotes() {
    const response = await axios.get(
      `https://finkeep-backend.sandeepmehta215.repl.co/addnotes/${username}?gettitle=${note.title}&getnotes=${note.notes}&getbgcolor=${note.backgroundColor}`
    );

    setNoteArray(response.data.userUpdatedNote);
    playAudio();
  }

  useEffect(async () => {
    username !== null ? navigate("/") : navigate("/login");
    const response = await axios.get(
      `https://finkeep-backend.sandeepmehta215.repl.co/addnotes/${username}`
    );

    setNoteArray(response.data.userUpdatedNote);
  }, []);

  return (
    <>
      <ToastContainer />
      <div
        className="createNotes"
        onClick={() => {
          setNoteActive("block");
          setNotePassive("none");
        }}
      >
        <audio className="audio-element">
          <source src="https://assets.coderrocketfuel.com/pomodoro-times-up.mp3"></source>
        </audio>
        <div className="createNotesInput">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi-palette-fill"
            viewBox="0 0 16 16"
            style={{ display: noteActive }}
          >
            <path d="M12.433 10.07C14.133 10.585 16 11.15 16 8a8 8 0 1 0-8 8c1.996 0 1.826-1.504 1.649-3.08-.124-1.101-.252-2.237.351-2.92.465-.527 1.42-.237 2.433.07zM8 5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm4.5 3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM5 6.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm.5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
          </svg>{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi-bell-fill"
            viewBox="0 0 16 16"
            style={{ display: noteActive }}
          >
            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
          </svg>
          <div className="profile">
            <div className="content">
              <div
                className="btn"
                onClick={() =>
                  classReq === "box open"
                    ? setClass("active")
                    : setClass("box open")
                }
              ></div>
            </div>
            <div className={classReq}>
              <i
                className="fa fa-codepen"
                onClick={() => setNote({ ...note, backgroundColor: "D3D3D3" })}
              ></i>
              <i
                className="fa fa-facebook"
                onClick={() => setNote({ ...note, backgroundColor: "FFC0CB" })}
              ></i>
              <i
                className="fa fa-github"
                onClick={() => setNote({ ...note, backgroundColor: "adeb67" })}
              ></i>
              <i
                className="fa fa-reddit"
                onClick={() => setNote({ ...note, backgroundColor: "ff4301" })}
              ></i>
              <i
                className="fa fa-twitter"
                onClick={() => setNote({ ...note, backgroundColor: "1da1f2" })}
              ></i>
            </div>
          </div>
          <input
            className="createNotesTitle"
            placeholder="Title"
            style={{
              display: noteActive,
              backgroundColor: `#${note.backgroundColor}`
            }}
            value={note.title}
            onChange={(e) => setNote({ ...note, title: e.target.value })}
          />
          <textarea
            value={note.note}
            className="createTakeaNote"
            placeholder="Take a note..."
            onChange={(e) => setNote({ ...note, notes: e.target.value })}
            style={{
              display: noteActive,
              backgroundColor: `#${note.backgroundColor}`
            }}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            style={{ display: notePassive }}
            className="bi-file-earmark-check"
            viewBox="0 0 16 16"
          >
            <path d="M10.854 7.854a.5.5 0 0 0-.708-.708L7.5 9.793 6.354 8.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z" />
            <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
          </svg>{" "}
          <span className="takeNote" style={{ display: notePassive }}>
            {" "}
            Take Note...
          </span>
        </div>
        {!pinned ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            style={{ display: noteActive }}
            onClick={() => setPinned(true)}
            className="bi-pin-angle"
            viewBox="0 0 16 16"
          >
            <path d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a5.927 5.927 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707-.195-.195.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a5.922 5.922 0 0 1 1.013.16l3.134-3.133a2.772 2.772 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146zm.122 2.112v-.002.002zm0-.002v.002a.5.5 0 0 1-.122.51L6.293 6.878a.5.5 0 0 1-.511.12H5.78l-.014-.004a4.507 4.507 0 0 0-.288-.076 4.922 4.922 0 0 0-.765-.116c-.422-.028-.836.008-1.175.15l5.51 5.509c.141-.34.177-.753.149-1.175a4.924 4.924 0 0 0-.192-1.054l-.004-.013v-.001a.5.5 0 0 1 .12-.512l3.536-3.535a.5.5 0 0 1 .532-.115l.096.022c.087.017.208.034.344.034.114 0 .23-.011.343-.04L9.927 2.028c-.029.113-.04.23-.04.343a1.779 1.779 0 0 0 .062.46z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi-pin-angle-fill"
            viewBox="0 0 16 16"
            onClick={() => setPinned(false)}
          >
            <path d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a5.927 5.927 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707-.195-.195.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a5.922 5.922 0 0 1 1.013.16l3.134-3.133a2.772 2.772 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146z" />
          </svg>
        )}
      </div>
      <button
        className="closeButton"
        onClick={() => {
          setNoteActive("none");
          setNotePassive("block");
          setClass("active");
        }}
        style={{ display: noteActive }}
      >
        {" "}
        Close{" "}
      </button>
      <button
        className="addButton"
        onClick={() => {
          setNoteActive("none");
          setNotePassive("block");
          setClass("active");
          addNotes();
          CallNotes();
        }}
        style={{ display: noteActive }}
      >
        Add
      </button>
      {noteArray.length <= 0 && <NotesImg />}

      <ul className="displayNotes">
        {noteArray.map((key) => (
          <li
            className="noteTemplate"
            key={key._id}
            style={{
              backgroundColor: `#${key.bgcolor}`
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi-x-circle"
              viewBox="0 0 16 16"
              onClick={() => {
                removeNotes();
                RemoveNote(key._id);
              }}
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
            <h2>{key.title}</h2>
            <span>{key.notes}</span>
          </li>
        ))}
      </ul>
    </>
  );
};
