import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditBook = () => {
  let history = useHistory();
  const { id } = useParams();
  const [book, setBook] = useState({
    bookName: "",
    authorName: "",
    createdDate: "",
  });
  // Function to display toaster
  const notify = () =>
    toast.success("Book Updated Successfully!", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: true,
    });
  const { bookName, authorName, createdDate } = book;
  const onInputChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  // Function to load the details of the book to be edited
  const loadBook = useCallback(async () => {
    const result = await axios.get(`http://localhost:3003/books/${id}`);
    setBook(result.data);
  }, [id]);

  useEffect(() => {
    loadBook();
  }, [loadBook]);

  // Function to update the book
  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:3003/books/${id}`, book);
    notify();
    setTimeout(() => {
      history.push("/");
    }, 1000);
  };

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5 mt-5">
        <ToastContainer />
        <h2 className="text-center mb-4">Edit Book</h2>
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
              <span className="input-group-text">Created Date</span>
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
          <button className="btn add-book w-25 float-right">Update</button>
        </form>
      </div>
    </div>
  );
};

export default EditBook;
