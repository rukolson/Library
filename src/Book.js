import React, { Component } from "react";

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
      Category: "",
      DateOfAdding: "",
      CoverPicture: "anonymous.png",
      PhotoPath: PHOTO_URL,
    };
  }

  refreshList() {
    fetch(API_URL + "Book")
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        this.setState({ books: data });
      })
      .catch(error => {
        console.error("There was a problem with the fetch operation:", error);
      });

    fetch(API_URL + "Category")
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        this.setState({ categories: data });
      })
      .catch(error => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }

  componentDidMount() {
    this.refreshList();
  }

  changeBookName = (e) => {
    this.setState({ BookName: e.target.value });
  };
  changeCategory = (e) => {
    this.setState({ Category: e.target.value });
  };
  changeDateOfAdding = (e) => {
    this.setState({ DateOfAdding: e.target.value });
  };

  addClick() {
    this.setState({
      modalTitle: "Dodaj książkę",
      BookId: 0,
      BookName: "",
      Category: "",
      DateOfAdding: "",
      CoverPicture: "anonymous.png",
    });
  }

  editClick(emp) {
    this.setState({
      modalTitle: "Edytuj książkę",
      BookId: emp.BookId,
      BookName: emp.BookName,
      Category: emp.Category,
      DateOfAdding: emp.DateOfAdding,
      CoverPicture: emp.CoverPicture,
    });
  }

  createClick() {
    fetch(API_URL + "Book", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        BookName: this.state.BookName,
        Category: this.state.Category,
        DateOfAdding: this.state.DateOfAdding,
        CoverPicture: this.state.CoverPicture,
      }),
    })
      .then(res => res.json())
      .then(
        (result) => {
          alert(result);
          this.refreshList();
        },
        (error) => {
          alert("Nie udało się stworzyć książki");
          console.error("Create error:", error);
        }
      );
  }

  updateClick() {
    fetch(API_URL + "Book", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        BookId: this.state.BookId,
        BookName: this.state.BookName,
        Category: this.state.Category,
        DateOfAdding: this.state.DateOfAdding,
        CoverPicture: this.state.CoverPicture,
      }),
    })
      .then(res => res.json())
      .then(
        (result) => {
          alert(result);
          this.refreshList();
        },
        (error) => {
          alert("Nie udało się edytować książki");
          console.error("Update error:", error);
        }
      );
  }

  deleteClick(id) {
    if (window.confirm("Czy na pewno?")) {
      fetch(API_URL + "Book/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then(res => res.json())
        .then(
          (result) => {
            alert(result);
            this.refreshList();
          },
          (error) => {
            alert("Nie udało się dodać książki");
            console.error("Delete error:", error);
          }
        );
    }
  }

  imageUpload = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", e.target.files[0], e.target.files[0].name);

    fetch(API_URL + "Book/savefile", {
      method: "POST",
      body: formData,
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ CoverPicture: data });
      })
      .catch(error => {
        console.error("Image upload error:", error);
      });
  };

  render() {
    const {
      categories,
      books,
      modalTitle,
      BookId,
      BookName,
      Category,
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
                <td>{emp.Category}</td>
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
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
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
                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
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
                        onChange={this.changeCategory}
                        value={Category}
                      >
                        {categories.map(dep => (
                          <option key={dep.CategoryId}>
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
