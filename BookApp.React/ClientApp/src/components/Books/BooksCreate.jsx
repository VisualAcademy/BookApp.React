import React, { Component } from 'react';
import axios from 'axios';

export class BooksCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            created: null,
        };

        // 이벤트 바인딩
        this.handleChangeTitle = this.handleChangeTitle.bind(this); 
        //this.handleChangeDescription = this.handleChangeDescription.bind(this); 
        this.handleSubmit = this.handleSubmit.bind(this);
        this.goIndex = this.goIndex.bind(this); 
    }

    //[1] 함수로 이벤트 처리기 만들고 생성자에서 바인딩
    handleChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    //[2] 화살표 함수(람다 식)로 이벤트 핸들러 바인딩
    handleChangeDescription = (event) => {
        this.setState({
            description: event.target.value
        });
    }

    goIndex() {
        const { history } = this.props;
        history.push("/Books");
    }

    handleSubmit(e) {
        e.preventDefault();

        let bookDto = {
            title: this.state.title,
            description: this.state.description,
        };

        axios.post("/api/Books", bookDto).then(result => {
            this.goIndex();
        });
    }

    render() {
        return (
            <>
                <h3>Create</h3>

                <div className="row">
                    <div className="col-md-8">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label>Title</label>
                                <input type="text" className="form-control"
                                    placeholder="Enter Title"
                                    value={this.state.title}
                                    onChange={this.handleChangeTitle}
                                />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <input type="text" className="form-control"
                                    placeholder="Enter Description"
                                    value={this.state.description}
                                    onChange={this.handleChangeDescription}
                                />
                            </div>

                            <div className="form-group">
                                <button type="submit" className="btn btn-primary">Submit</button>
                                &nbsp;
                                <button className="btn btn-secondary" onClick={this.goIndex}>List</button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        );
    }
}
