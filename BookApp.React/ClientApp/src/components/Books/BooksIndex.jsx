import React, { Component } from 'react';
import axios from 'axios';

export class BooksIndex extends Component {
    constructor(props) {
        super(props);

        this.state = {
            books: [],
            loading: true
        };

        this.goCreatePage = this.goCreatePage.bind(this); 
        this.editBy = this.editBy.bind(this);
        this.deleteBy = this.deleteBy.bind(this); 
    }

    // OnInitialized() 
    componentDidMount() {
        //this.populateBooksData();
        //this.populateBooksDataWithAxios();
        this.populateBooksDataWithAxiosAsync();
    }

    // 책 리스트 테이블 출력
    renderBooksTable(books) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Created</th>
                        <th>Action, Admin</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book =>
                        <tr key={book.id}>
                            <td>{book.id}</td>
                            <td>{book.title}</td>
                            <td>{book.description}</td>
                            <td>{book.created ? new Date(book.created).toLocaleDateString() : "-" }</td>
                            <td className="text-nowrap">
                                <button className="btn btn-sm btn-primary" onClick={() => this.editBy(book.id)}>Edit</button>
                                &nbsp;
                                <button className="btn btn-sm btn-danger" onClick={() => this.deleteBy(book.id)}>Delete</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    goCreatePage() {
        //console.log("Create");
        const { history } = this.props;
        history.push('/Books/Create');
    }

    editBy(id) {
        //console.log("Edit by " + id);
        const { history } = this.props;
        history.push("/Books/Edit/" + id);
    }

    deleteBy(id) {
        //console.log("Delete by " + id);
        const { history } = this.props;
        history.push("/Books/Delete/" + id);
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading....</em></p>
            : this.renderBooksTable(this.state.books);

        return (
            <div>
                <h1>My Books <button onClick={this.goCreatePage} className="btn btn-primary"><span className="fa fa-plus">+</span></button></h1>
                <h2>제가 집필한 책입니다.</h2> 
                {contents}
            </div>
        );
    }

    // Fetch API 
    async populateBooksData() {
        const response = await fetch('/api/Books');
        const data = await response.json();
        this.setState({ books: data, loading: false });
    }

    // Axios + Async
    populateBooksDataWithAxios() {
        axios.get("/api/Books").then(response => {
            const data = response.data;
            this.setState({ books: data, loading: false });
        });
    }

    // Axios + Async
    async populateBooksDataWithAxiosAsync() {
        const response = await axios.get("/api/Books");
        const data = response.data;
        this.setState({ books: data, loading: false });
    }
}
