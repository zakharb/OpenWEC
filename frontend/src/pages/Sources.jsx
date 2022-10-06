import React, {useState, useMemo, useEffect, useRef} from 'react'
import Counter from '../components/Counter'
import SourceList from '../components/SourceList'
import SourceForm from '../components/SourceForm'
import MySelect from '../components/UI/select/MySelect'
import MyInput from '../components/UI/input/MyInput'
import MyButton from '../components/UI/button/MyButton'
import MyModal from '../components/UI/modal/MyModal'
import SourceFilter from '../components/SourceFilter'
import {useSources} from '../hooks/useSources'
import {useFetching} from '../hooks/useFetching'
import SourceService from '../API/SourceService'
import Loader from '../components/UI/loader/Loader'
import Pagination from '../components/UI/pagination/Pagination'
import {getPageCount, getPagesArray} from '../utils/pages'
import '../styles/App.css'
import {useObserver} from '../hooks/useObserver'
import { Button, Container, Row, Col } from 'react-bootstrap';

function Sources() {
  const [sources, setSources] = useState([])
  const [filter, setFilter] = useState({sort:'', query:''})
  const [modal, setModal] = useState(false)
  const sortedAndSearchedSources = useSources(sources, filter.sort, filter.query)
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const lastElement = useRef()

  const [fetchSources, isSourcesLoading, postError] = useFetching( async () => {
      const response = await SourceService.getAll(limit, page)
      setSources([...sources, ...response.data])
      const totalCount = response.headers['x-total-count']
      setTotalPages(getPageCount(totalCount, limit))
  })

  useObserver(lastElement, page < totalPages, isSourcesLoading, () => {
    setPage(page +1)
  })

  const createSource = (newSource) => {
    setSources([...sources, newSource])
    setModal(false)
  }

  const removeSource = (post) => {
    setSources(sources.filter(p => p.id != post.id))
  }

  useEffect( () => {
    fetchSources()
  }, [page, limit])

  const changePage = (page) => {
    setPage(page)
  }

  return (
    <div className="App">

      <Container >
        <Row className="my-3">
          <Col md={6}>
            <Button onClick={() => setModal(true)}>
              Create
            </Button>
          </Col>
          <Col md={6}>
            <SourceFilter 
              filter={filter}
              setFilter={setFilter}
            />
          </Col>
        </Row>

        <MyModal visible={modal} setVisible={setModal}>
          <SourceForm create={createSource}/>
        </MyModal>

        <hr style={{ margin: '15px 0'}}/>

        {postError &&
          <h1>Data loading failed</h1>
        }
        
        <SourceList 
          remove={removeSource} 
          sources={sortedAndSearchedSources} 
          title="Sources List"
        />
        <div ref={lastElement} />
        
        {isSourcesLoading &&
          <div style={{display:'flex', justifyContent:'center', marginTop: 50}}> 
            <Loader /> 
          </div>
        }
      
      </Container>
    </div>
  );
}

export default Sources;
