import React, {useState, useMemo, useEffect, useRef} from 'react'
import Counter from '../components/Counter'
import PostList from '../components/PostList'
import PostForm from '../components/PostForm'
import MySelect from '../components/UI/select/MySelect'
import MyInput from '../components/UI/input/MyInput'
import MyButton from '../components/UI/button/MyButton'
import MyModal from '../components/UI/modal/MyModal'
import PostFilter from '../components/PostFilter'
import {usePosts} from '../hooks/usePosts'
import {useFetching} from '../hooks/useFetching'
import PostService from '../API/PostService'
import Loader from '../components/UI/loader/Loader'
import Pagination from '../components/UI/pagination/Pagination'
import {getPageCount, getPagesArray} from '../utils/pages'
import '../styles/App.css'
import {useObserver} from '../hooks/useObserver'

function Posts() {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({sort:'', query:''})
  const [modal, setModal] = useState(false)
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const lastElement = useRef()

  const [fetchPosts, isPostsLoading, postError] = useFetching( async () => {
      const response = await PostService.getAll(limit, page)
      setPosts([...posts, ...response.data])
      const totalCount = response.headers['x-total-count']
      setTotalPages(getPageCount(totalCount, limit))
  })

  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page +1)
  })

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id != post.id))
  }

  useEffect( () => {
    fetchPosts()
  }, [page, limit])

  const changePage = (page) => {
    setPage(page)
  }

  return (
    <div className="App">

      <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
        Создать пост
      </MyButton>

      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </MyModal>

      <hr style={{ margin: '15px 0'}}/>

      <PostFilter 
        filter={filter}
        setFilter={setFilter}
      />
      
      <MySelect
        value={limit}
        onChange={value => setLimit(value)}
        defaultValue="Кол-во элементов на странице"
        options ={[
           {value:5, name:'5'},
           {value:15, name:'15'},
           {value:25, name:'25'},
           {value:-1, name:'Все'}
        ]}
      />

      {postError &&
        <h1>Произошла ошибка загрузки</h1>
      }
      
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Список постов 1"/>
      <div ref={lastElement} style={{height: 20, background: 'red'}}/>
      
      {isPostsLoading &&
        <div style={{display:'flex', justifyContent:'center', marginTop: 50}}> <Loader /> </div>
      }
      
      <Pagination 
        page={page}  
        changePage={changePage}
        totalPages={totalPages}
       />
    </div>
  );
}

export default Posts;
