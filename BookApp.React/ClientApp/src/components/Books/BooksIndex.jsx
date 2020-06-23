import React, { Component } from 'react';
import axios from 'axios';

export class BooksIndex extends Component {
    constructor(props) {
        super(props);

        this.state = {
            books: [],
            loading: true
        };
    }

    // OnInitialized() 
    componentDidMount() {
        //this.populateBooksData();
        //this.populateBooksDataWithAxios();
        this.populateBooksDataWithAxiosAsync();
    }

    // 책 리스트 테이블 출력
    static renderBooksTable(books) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>-</th>
                        <th>-</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book =>
                        <tr key={book.id}>
                            <td>{book.id}</td>
                            <td>{book.title}</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading....</em></p>
            : BooksIndex.renderBooksTable(this.state.books);

        return (
            <div>
                <h1>My Books</h1>
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

    // Axios + Sync
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
