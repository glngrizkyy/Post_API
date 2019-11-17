import React,{Component} from 'react';
import BlogPost from '../BlogPost/BlogPost';
import '../BlogPost/BlogPost.css';
class Home extends Component{
    state = {
        showComponent: true
    }
    render(){
        return (
            <div>
               <p className="blog">BLOG POST</p>
               <hr/>
               <BlogPost/> 
            </div>
        )
    }
}

export default Home;
