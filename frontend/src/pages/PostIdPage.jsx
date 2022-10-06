import React from 'react'
import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useFetching} from '../hooks/useFetching'
import PostService from '../API/PostService'
import Loader from '../components/UI/loader/Loader'

const PostIdPage = () => {
  const params = useParams()
  const [post, setPost] = useState({})
  const [comments, setComments] = useState([])
  
  const [fetchPostById, isLoading, error] =  useFetching ( async (id) => {
    const response = await PostService.getById(params.id)
    setPost(response.data)
  })
  
  const [fetchComments, isComLoading, comError] =  useFetching ( async (id) => {
    const response = await PostService.getCommentsByPostId(params.id)
    console.log(response)
    setComments(response.data)
  })

  useEffect( () => {
    fetchPostById(params.id)
    fetchComments(params.id)
  }, [])
  
  return (
    <div>
      <h1>Страница поста</h1>
      {isLoading
        ? <Loader/>
        : <div> ID = {params.id} </div>
      }

      <h1>Комментарии</h1>
      {isComLoading
        ? <Loader/>
        : <div style={{marginTop:15}}> 
            {comments.map(comm => 
              <div key={comm.id} >
                <h5>{comm.email}</h5>
                <div>{comm.body}</div>
              </div>
            )}
          </div>
      }
    </div>
  );
}

export default PostIdPage;
