import React, { Component } from 'react';
import axios from 'axios';

export class BooksEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            created: null,
        };

        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.navigateToIndex = this.navigateToIndex.bind(this);
    }

    componentDidMount() {
        //[!] id Parameter 받기
        const { id } = this.props.match.params;

        //[!] id 값에 해당하는 단일 데이터를 Web API로부터 읽어오기
        axios.get("/api/Books/" + id).then(response => {
            const data = response.data;

            this.setState({
                title: data.title,
                description: data.description,
                created: data.created ? new Date(data.created).toISOString().slice(0, 10) : null
            });
        });
    }

    handleChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }
    handleChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    navigateToIndex() {
        const { history } = this.props;
        history.push("/Books");
    }

    handleSubmit(e) {
        e.preventDefault(); // 이벤트 기본 작업 방지: 버튼, 링크 등의 고유 기능을 제거하고 React 기능만 사용

        const { id } = this.props.match.params;

        let bookDto = {
            title: this.state.title,
            description: this.state.description,
            created: this.state.created, // Created는 처음 가져온 것 그대로 설정 
        };

        axios.put("/api/Books/" + id, bookDto).then(result => {
            this.navigateToIndex();
        });
    }

    render() {
        return (
            <>
                <h3>Edit</h3>

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
                                <button className="btn btn-secondary" onClick={this.navigateToIndex}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        );
    }
}
