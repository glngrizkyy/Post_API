import React from 'react';

const Post = (props) => {
    return (
        <div className="post">
            <div className="img-thumb">
                <img src="http://placeimg.com/200/150/tech" alt="dummy"/>
            </div>
            <div className="content">
                <p className="title">{props.data.title}</p>
                <p className="desc">{props.data.body}</p>
                <button className="update" onClick={() => props.update(props.data)}>EDIT</button>   
                <button className="delete" onClick={() => props.delete(props.data.id)}>DELETE</button>    
            </div>
         </div>
    )
}

export default Post;

