import React from 'react';
import axios from 'axios';

export class BooksDelete extends React.Component {
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
        //[!] id Parameter 받기: 쿼리스트링으로 넘어온 값 받기 
        const { id } = this.props.match.params;

        //[!] id 값에 해당하는 단일 데이터를 Web API로부터 읽어오기
        axios.get("/api/Books/" + id).then(response => {
            const data = response.data;

            this.setState({
                title: data.title,
                description: data.description,
                created: data.created
            });
        });
    }

    componentDidUpdate() {
        console.log("컴포넌트 업데이트");
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

    // 삭제 버튼 클릭
    handleSubmit(e) {
        e.preventDefault(); // 이벤트 기본 작업 방지: 버튼, 링크 등의 고유 기능을 제거하고 React 기능만 사용

        if (window.confirm("정말로 삭제하시겠습니까?")) {
            const { id } = this.props.match.params;

            axios.delete("/api/Books/" + id).then(result => {
                this.navigateToIndex();
            });
        }
        else {
            return false; 
        }
    }

    render() {
        return (
            <>
                <h3>Delete</h3>

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
                                <button type="submit" className="btn btn-danger">Delete</button>
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
