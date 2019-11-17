 import React,{Component, Fragment} from 'react';
 import './BlogPost.css';
 import Post from '../../component/Post/Post';
 import axios from 'axios';

class BlogPost extends Component {
    state = {
        post:[],
        formBlogPost: {
            id: 1,
            title: '',
            body: '',
            Id: 1
        },
        isUpdate: false
    }

    getPostAPI = () => {
        axios.get('http://localhost:3004/posts?_sort=id&_order=desc')
        .then((result)=> {
            this.setState({
                post: result.data
            })
        })
    }

    postDatatoAPI = () => {
        axios.post('http://localhost:3004/posts', this.state.formBlogPost).then((res)=>{
        this.getPostAPI()
        this.setState({
            formBlogPost: {
                id: 1,
                title: '',
                body: '',
                Id: 1
            },
            })
        })
    }

    putDatatoAPI = () => {
        axios.put(`http://localhost:3004/posts/${this.state.formBlogPost.id}`, this.state.formBlogPost).then((res)=>{
            this.getPostAPI()
        this.setState({
            isUpdate: false,
            formBlogPost: {
                id: 1,
                title: '',
                body: '',
                Id: 1
            },
            })
        })
    }


    handleDelete = (data) => {
        axios.delete(`http://localhost:3004/posts/${data}`).then((res)=>{
            this.getPostAPI();
        })
    }

    handleUpdate = (data) => {
        this.setState({
            formBlogPost: data,
            isUpdate: true
        })
    }

    handleFromChange = (event) => {
        let formBlogPostNew = {...this.state.formBlogPost};
        let timestamp = new Date().getTime();
        if(!this.state.isUpdate) {
        formBlogPostNew['id'] = timestamp;
        }
        formBlogPostNew[event.target.name] = event.target.value;
       this.setState ({
           formBlogPost: formBlogPostNew
       })
    }

    handleSubmit = () => {
       if(this.state.isUpdate){
            this.putDatatoAPI();
       }
       else{
           this.postDatatoAPI();
       }
        
    }

    componentDidMount(){
        this.getPostAPI();
    }

    render() {
        return(
            <Fragment>
                <p className="section-title">POST FEED</p>
                <div className="form-add-post">
                    <label htmlFor="title">Title</label>
                    <input type="text" value={this.state.formBlogPost.title} name="title" placeholder="add title" onChange={this.handleFromChange}/>
                    <label htmlFor="body"> Blog Post Content</label>
                    <textarea name="body" id="body" cols="30" rows="10" value={this.state.formBlogPost.body} placeholder="Add Post Content" onChange={this.handleFromChange}></textarea>
                    <button className="btn-submit" onClick={this.handleSubmit}>SAVE</button>
                </div>
                {
                this.state.post.map(post => {
                    return <Post key={post.id} data={post} delete={this.handleDelete} update={this.handleUpdate} />    
                })
                }
                
            </Fragment>
        ) 
    }
}

export default BlogPost;