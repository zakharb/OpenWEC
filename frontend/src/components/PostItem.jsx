import  React, {useState} from 'react'
import MyButton from './UI/button/MyButton'
import { useNavigate } from 'react-router-dom';

const PostItem = function (props) {
	const navigate = useNavigate();
	return(
	  	<div className="post">
	  		<div className="post_content">
	  			<strong>{props.post.id}.{props.post.title}</strong>
	  			<div>
	  				{props.post.body}
	  			</div>
			</div>
	  		<div className="post_btns">
	    	  	<MyButton onClick={() => navigate(`${props.post.id}`)}>
	    	  		Открыть
	    	  	</MyButton>
			</div>
	  		<div className="post_btns">
	    	  	<MyButton onClick={() => props.remove(props.post)}>
	    	  		Удалить
	    	  	</MyButton>
			</div>
		</div>
	)
}


export default PostItem
