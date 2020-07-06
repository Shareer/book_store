import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddBook = () => {
  let history = useHistory();
  const [book, setBook] = useState({
    bookName: "",
    authorName: "",
    createdDate: "",
  });
  const notify = () =>toast.success('Book Added Successfully!', {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: true
    });
  const { bookName, authorName, createdDate } = book;
  const onInputChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3003/books", book);
    notify();
    setTimeout(() => {
      history.push("/");
    }, 1000);
  };

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5 mt-5">
      <ToastContainer   
          />
        <h2 className="text-center mb-4">Add Book</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Book Name"
              name="bookName"
              value={bookName}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Author Name"
              name="authorName"
              value={authorName}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="input-group mb-3 input-group-lg">
            <div className="input-group-prepend">
              <span className="input-group-text">
                Created Date
              </span>
            </div>
            <input
              type="date"
              className="form-control form-control-lg"
              placeholder="Enter Created Date"
              name="createdDate"
              value={createdDate}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <button className="btn add-book w-25 float-right">Add </button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
