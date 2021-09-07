import { TrashSvg } from "./trash-svg";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const TrashPage = () => {
  const removeNotes = () =>
    toast.success("Deleting note...", {
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

  const { notearray } = JSON.parse(localStorage.getItem("notearray")) || {
    notearray: []
  };

  const [noteArray, setNoteArray] = useState(notearray);

  useEffect(async () => {
    // username === null ? navigate("/") : navigate("/login");

    const response = await axios.get(
      `https://finkeep-backend.sandeepmehta215.repl.co/addnotes/${username}`
    );

    setNoteArray(response.data.userUpdatedNote);
  }, []);

  async function RemoveNote(_id) {
    const response = await axios.get(
      `https://finkeep-backend.sandeepmehta215.repl.co/removenote/${username}?noteid=${_id}`
    );

    localStorage.setItem(
      "notearray",
      JSON.stringify({ notearray: response.data.userUpdatedNote })
    );

    setNoteArray(response.data.userUpdatedNote);
  }

  return (
    <>
      {noteArray.filter((key) => key.intrash === true).length === 0 && (
        <TrashSvg />
      )}
      <ToastContainer />
      {noteArray.length > 0 && (
        <ul className="displayNotesAtTrashPage">
          {noteArray
            .filter((key) => key.intrash === true)
            .map((key) => (
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
      )}
    </>
  );
};
