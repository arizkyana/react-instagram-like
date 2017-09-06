import React, {Component} from 'react';
import moment from 'moment';

import logo from './logo.svg';


import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-default navbar-fixed-top">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#">
                            <img alt="Brand" src="..."/>
                        </a>
                    </div>
                </div>
            </nav>
        );
    }
}
class Footer extends Component {
    render() {
        return (
            <nav className="navbar navbar-default navbar-fixed-bottom">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#">
                            <img alt="Brand" src="..."/>
                        </a>
                    </div>
                </div>
            </nav>
        );
    }
}

class ModalComment extends Component {
    render(){
        return(
            <div className="modal fade" role="dialog" id={this.props.modalId}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title">Modal {this.props.modalId}</h4>
                        </div>
                        <div className="modal-body">
                            <p>One fine body&hellip;</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class PostLikeCommentButtons extends Component {

    constructor(props){
        super(props);

        this.onClickLike = this.onClickLike.bind(this);
    }

    componentWillMount(){
        this.setState({
            likes: this.props.likes
        });
    }

    onClickLike(){
        let currentLikes = this.state.likes;
        currentLikes++;

        this.setState({
            likes: currentLikes
        });
    }



    render(){
        const modalId = "comment" + this.props.postId;
        const target = "#" + modalId;
        return(
            <div className="post-like-comment-buttons">
                <div className="btn-group">
                    <a className="btn btn-link" role="button" onClick={this.onClickLike}><i
                        className="glyphicon glyphicon-heart"></i><span className="badge">{this.state.likes}</span></a>
                    <a className="btn btn-link" role="button" data-toggle="modal" data-target={target}><i
                        className="glyphicon glyphicon-comment"></i></a>
                </div>

                {/*modal add comment*/}
                <ModalComment modalId={modalId}/>
                {/*/modal add comment*/}

            </div>
        );
    }
}

class LastComments extends Component {

    componentDidMount(){
        console.log("lastComments");
        console.log(this.props.lastComments);
    }

    render(){

        const mapLastComments = this.props.lastComments.map((comment)=>{
           return  <div key={comment.id}><span><strong>{comment.user.username}</strong> {comment.content}</span></div>
        });

        return(
            <div className="lastComments">
                {mapLastComments}
            </div>
        );
    }
}

class Caption extends Component {

    componentWillMount(){
        console.log("caption content", this.props);
    }

    render(){
        return(
            <div>
                <div className="caption">
                    <span>{this.props.content.caption}</span>
                    <LastComments lastComments={this.props.content.lastComments} />
                    <PostLikeCommentButtons postId={this.props.content.id} likes={this.props.content.likes} />
                </div>


            </div>
        );
    }
}
class PostImage extends Component {
    render() {
        return (
            <div className="post-image">
                <img className="img-responsive" src={this.props.img} alt="Post Photo"/>
            </div>
        );
    }
}
class Post extends Component {
    render() {
        return (
            <div className="post">
                {/*post image*/}
                <PostImage img={this.props.post.img.url} />
                {/*/post image*/}

                {/*caption*/}
                <Caption content={this.props.post} />
                {/*/caption*/}
            </div>
        );
    }
}
class UserProfile extends Component {

    constructor(props){
        super(props);
    }

    componentDidMount(){
        console.log(this.props);
    }

    render() {
        return (
            <div className="user-profile">
                <div className="pull-left user-desc">
                    <span><strong>{this.props.user.username}</strong></span> <br />
                    <small><i>{this.props.postTime}</i></small>
                </div>

                <img src={logo} className="App-logo img-circle img-responsive pull-right" alt=""/>

            </div>
        );
    }
}
class ThumbnailPost extends Component {
    render() {

        return (
            <div className="thumbnail">
                {/*user profile*/}
                <UserProfile user={this.props.user} postTime={this.props.post.postTime} />
                {/*/user profile*/}

                {/*post*/}
                <Post post={this.props.post} />
                {/*/post*/}

            </div>
        );
    }
}

class Timelines extends Component {

    constructor(props){
        super(props);

    }

    render(){
        return(
            <div className="row" >
                <div className="col-sm-12 col-md-12">

                    {/*thumbnail post*/}
                    <ThumbnailPost user={this.props.content.user} post={this.props.content.post} />
                    {/*/thumbnail post*/}
                </div>
            </div>
        );
    }
}

class Content extends Component {

    constructor(props){
        super(props);

    }

    componentDidMount(){

    }

    render() {

        let timelines = [];

        this.props.timelines.forEach((timeline)=>{
            timelines.push(
              <Timelines content={timeline} key={timeline.id} />
            );
        });

        return (
            <div className="container-fluid">
                {timelines}
            </div>
        );
    }
}

// main component
class App extends Component {
    render() {

        const style = {
            wrapper: {
                paddingTop: '60px'
            }
        };

        // sample data
        const timelines = [
            {
                id: 1,
                user: {
                    id: 1,
                    username: 'John Doe',
                },
                post : {
                    id: 1,
                    postTime: moment().format('Y/m/D'),
                    img: {
                        url: 'https://www.aspenchamber.org/sites/default/files/images/Beach.stockimage.jpg'
                    },
                    caption: 'Happy Holiday',
                    likes: 90,
                    comments: 50,
                    lastComments: [
                        {
                            id: 1,
                            user: {
                                id: 3,
                                username: 'Doe John'
                            },
                            content: 'Ok!'
                        },
                        {
                            id: 2,
                            user: {
                                id: 5,
                                username: 'Doe John Jr'
                            },
                            content: 'Cool!'
                        }
                    ]
                }

            },
            {
                id: 2,
                user: {
                    id: 2,
                    username: 'John Doe Jr',
                },
                post : {
                    id: 2,
                    postTime: moment().format('Y/m/D'),
                    img: {
                        url: 'http://cdn.osxdaily.com/wp-content/uploads/2017/06/macos-high-sierra-default-wallpaper-fall-mountain-scene-1.jpg'
                    },
                    caption: 'High Sierra',
                    likes: 2403,
                    comments: 50,
                    lastComments: [
                        {
                            id: 1,
                            user: {
                                id: 3,
                                username: 'Doe John'
                            },
                            content: 'Ok!'
                        },
                        {
                            id: 2,
                            user: {
                                id: 5,
                                username: 'Doe John Jr'
                            },
                            content: 'Cool!'
                        }
                    ]
                }

            }
        ];

        return (
            <div style={style.wrapper}>
                {/*navbar*/}
                <Navbar />
                {/*/navbar*/}

                {/*content*/}
                <Content timelines={timelines}/>
                {/*/content*/}

                {/*footer*/}

                {/*/footer*/}
            </div>
        );
    }
}

export default App;
