import React, {useState} from 'react'
import PostItem from './PostItem'
import {TransitionGroup, CSSTransition} from 'react-transition-group'

const PostList = function ({posts, title, remove}) {

	if(!posts.length){
		return(
	      <h1 style={{textAlign: 'center'}}> 
	        Посты не найдены 
	      </h1>
		)
	}

	return(
		<div>
      		<h1 style={{textAlign: 'center'}}> 
      			{title} 
      		</h1>
      		<TransitionGroup>
	      		{posts.map(post =>
			        <CSSTransition
				        key={post.id}
				        timeout={300}
				        classNames="post"
				    >
	        			<PostItem remove={remove} post={post}/>
	      				</CSSTransition>
	      		)}
      		</TransitionGroup>
      </div>
	)
}

export default PostList

