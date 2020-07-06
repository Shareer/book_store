import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [books, setBook] = useState([]);
  const notify = () =>toast.warn('Book Deleted Successfully!', {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: true
    });
  const sortTable = (table, col, reverse) => {
    var tb = table.tBodies[0], // use `<tbody>` to ignore `<thead>` and `<tfoot>` rows
      tr = Array.prototype.slice.call(tb.rows, 0), // put rows into array
      i;
    reverse = -(+reverse || -1);
    tr = tr.sort(function (a, b) {
      // sort rows
      return (
        reverse * // `-1 *` if want opposite order
        a.cells[col].textContent
          .trim() // using `.textContent.trim()` for test
          .localeCompare(b.cells[col].textContent.trim())
      );
    });
    for (i = 0; i < tr.length; ++i) tb.appendChild(tr[i]); // append each row in order
  };

  const makeSortable = useCallback((table) => {
    var th = table.tHead,
      i;
    th && (th = th.rows[0]) && (th = th.cells);
    if (th) i = th.length;
    else return; // if no `<thead>` then do nothing
    while (--i >= 0)
      (function (i) {
        var dir = 1;
        th[i].addEventListener("click", function () {
          sortTable(table, i, (dir = 1 - dir));
        });
      })(i);
  }, []);

  const makeAllSortable = useCallback(
    (parent) => {
      parent = parent || document.body;
      var t = parent.getElementsByTagName("table"),
        i = t.length;
      while (--i >= 0) makeSortable(t[i]);
    },
    [makeSortable]
  );

  const loadBooks = async () => {
    const result = await axios.get("http://localhost:3003/books");
    setBook(result.data.reverse());
  };

  useEffect(() => {
    loadBooks();
    makeAllSortable();
  }, [makeAllSortable]);

  const deleteBook = async (id) => {
    await axios.delete(`http://localhost:3003/books/${id}`);
    loadBooks();
    notify();
  };

  const searchList = () => {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("bookTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  };

  return (
    <div className="container">
      <div className="py-4">
        <div>
          <ToastContainer/>
        </div>
        <div className="top-container">
          <h4 className="w-50 float-left">Book List</h4>
          <input
            type="text"
            id="searchInput"
            onChange={() => searchList()}
            placeholder="Search for books.."
            className="form-control mb-3 float-right w-25"
          ></input>
        </div>
        <table className="table border shadow" id="bookTable">
          <thead className="thead-dark">
            <tr>
              <th scope="col">
                Book Name
                <i className="fa fa-sort sort-icon" aria-hidden="true"></i>
              </th>
              <th scope="col">
                Auther Name
                <i className="fa fa-sort sort-icon" aria-hidden="true"></i>
              </th>
              <th scope="col">
                Created Date
                <i className="fa fa-sort sort-icon" aria-hidden="true"></i>
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={book.id}>
                <td>{book.bookName}</td>
                <td>{book.authorName}</td>
                <td>{book.createdDate}</td>
                <td>
                  <Link
                    className="btn btn-info mr-2"
                    to={`/books/edit/${book.id}`}
                  >
                    <i
                      className="fa fa-pencil-square-o"
                      aria-hidden="true"
                      title="Edit Book"
                    ></i>
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteBook(book.id)}
                  >
                    <i
                      className="fa fa-trash"
                      aria-hidden="true"
                      title="Delete Book"
                    ></i>{" "}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <div className="alert alert-success" role="alert">
          Book Deleted Successfully
        </div> */}
      </div>
    </div>
  );
};

export default Home;
