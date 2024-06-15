import React, { Component } from "react";
import $ from "jquery"; // Ensure jQuery is available

const API_URL = "http://localhost:7195/api/";
const PHOTO_URL = "http://localhost:7195/Photos/";

export class Book extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      books: [],
      modalTitle: "",
      BookId: 0,
      BookName: "",
      CategoryName: "",
      DateOfAdding: "",
      CoverPicture: "anonymous.png",
      PhotoPath: PHOTO_URL,
    };
  }

  refreshList() {
    $.ajax({
      url: API_URL + "Book",
      method: "GET",
      dataType: "json",
      success: (data) => {
        this.setState({ books: data });
      },
      error: (error) => {
        console.error("There was a problem with the AJAX operation:", error);
      },
    });

    $.ajax({
      url: API_URL + "Category",
      method: "GET",
      dataType: "json",
      success: (data) => {
        this.setState({ categories: data });
      },
      error: (error) => {
        console.error("There was a problem with the AJAX operation:", error);
      },
    });
  }

  componentDidMount() {
    this.refreshList();
  }

  changeBookName = (e) => {
    this.setState({ BookName: e.target.value });
  };

  changeCategoryName = (e) => {
    this.setState({ CategoryName: e.target.value });
  };

  changeDateOfAdding = (e) => {
    this.setState({ DateOfAdding: e.target.value });
  };

  addClick() {
    this.setState({
      modalTitle: "Dodaj książkę",
      BookId: 0,
      BookName: "",
      CategoryName: "",
      DateOfAdding: "",
      CoverPicture: "anonymous.png",
    });
  }

  editClick(emp) {
    this.setState({
      modalTitle: "Edytuj książkę",
      BookId: emp.BookId,
      BookName: emp.BookName,
      CategoryName: emp.CategoryName,
      DateOfAdding: emp.DateOfAdding,
      CoverPicture: emp.CoverPicture,
    });
  }

  createClick() {
    $.ajax({
      url: API_URL + "Book",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        BookName: this.state.BookName,
        CategoryName: this.state.CategoryName,
        DateOfAdding: this.state.DateOfAdding,
        CoverPicture: this.state.CoverPicture,
      }),
      success: (result) => {
        alert(result);
        this.refreshList();
      },
      error: (error) => {
        alert("Nie udało się stworzyć książki");
        console.error("Create error:", error);
      },
    });
  }

  updateClick() {
    $.ajax({
      url: API_URL + "Book/" + this.state.BookId,
      method: "PUT",
      contentType: "application/json",
      data: JSON.stringify({
        BookId: this.state.BookId,
        BookName: this.state.BookName,
        CategoryName: this.state.CategoryName,
        DateOfAdding: this.state.DateOfAdding,
        CoverPicture: this.state.CoverPicture,
      }),
      success: (result) => {
        alert(result);
        this.refreshList();
      },
      error: (error) => {
        alert("Nie udało się edytować książki");
        console.error("Update error:", error);
      },
    });
  }

  deleteClick(id) {
    if (window.confirm("Czy na pewno?")) {
      $.ajax({
        url: API_URL + "Book/" + id,
        method: "DELETE",
        contentType: "application/json",
        success: (result) => {
          alert(result);
          this.refreshList();
        },
        error: (error) => {
          alert("Nie udało się dodać książki");
          console.error("Delete error:", error);
        },
      });
    }
  }

  imageUpload = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", e.target.files[0], e.target.files[0].name);

    $.ajax({
      url: API_URL + "Book/savefile",
      method: "POST",
      processData: false,
      contentType: false,
      data: formData,
      success: (data) => {
        this.setState({ CoverPicture: data });
      },
      error: (error) => {
        console.error("Image upload error:", error);
      },
    });
  };

  render() {
    const {
      categories,
      books,
      modalTitle,
      BookId,
      BookName,
      CategoryName,
      DateOfAdding,
      PhotoPath,
      CoverPicture,
    } = this.state;

    return (
      <div>
        <button
          type="button"
          className="btn btn-primary m-2 float-end"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={() => this.addClick()}
        >
          Dodaj książkę
        </button>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nazwa Książki</th>
              <th>Kategoria</th>
              <th>Data Dodania</th>
              <th>Opcje</th>
            </tr>
          </thead>
          <tbody>
            {books.map(emp => (
              <tr key={emp.BookId}>
                <td>{emp.BookId}</td>
                <td>{emp.BookName}</td>
                <td>{emp.CategoryName}</td>
                <td>{emp.DateOfAdding}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.editClick(emp)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pencil-square"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path
                        fillRule="evenodd"
                        d="M1 13.5V16h2.5L14.37 5.13l-2-2L1 11.5zm13.854-1.354a.5.5 0 0 0-.708-.708L10.5 14.293l.707.707 3.646-3.647z"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    onClick={() => this.deleteClick(emp.BookId)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.5 1a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1V2h3.5a.5.5 0 0 1 0 1h-.5v11a2.5 2.5 0 0 1-2.5 2.5H3A2.5 2.5 0 0 1 .5 14V3H0a.5.5 0 0 1 0-1H2.5V1zM5.5 1.5a.5.5 0 0 0-.5.5V2h6v-.5a.5.5 0 0 0-.5-.5h-5zM4 4a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 4zm0 1.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 5.5zm0 1.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 7z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modalTitle}</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="d-flex flex-row bd-highlight mb-3">
                  <div className="p-2 w-50 bd-highlight">
                    <div className="input-group mb-3">
                      <span className="input-group-text">Nazwa książki</span>
                      <input
                        type="text"
                        className="form-control"
                        value={BookName}
                        onChange={this.changeBookName}
                      />
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text">Kategoria</span>
                      <select
                        className="form-select"
                        onChange={this.changeCategoryName}
                        value={CategoryName}
                      >
                        {categories.map(dep => (
                          <option key={dep.CategoryName}>
                            {dep.CategoryName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text">Data Dodania</span>
                      <input
                        type="date"
                        className="form-control"
                        value={DateOfAdding}
                        onChange={this.changeDateOfAdding}
                      />
                    </div>
                  </div>
                  <div className="p-2 w-50 bd-highlight">
                    <img
                      width="250px"
                      height="250px"
                      src={PhotoPath + CoverPicture}
                    />
                    <input
                      className="m-2"
                      type="file"
                      onChange={this.imageUpload}
                    />
                  </div>
                </div>
                {BookId === 0 ? (
                  <button
                    type="button"
                    className="btn btn-primary float-start"
                    onClick={() => this.createClick()}
                  >
                    Stwórz
                  </button>
                ) : null}
                {BookId !== 0 ? (
                  <button
                    type="button"
                    className="btn btn-primary float-start"
                    onClick={() => this.updateClick()}
                  >
                    Zaktualizuj
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
