import React, {useState, useMemo} from 'react'
import MySelect from './UI/select/MySelect'
import MyInput from './UI/input/MyInput'
import { Form } from 'react-bootstrap';

const SourceFilter = function ({filter, setFilter}) {
	return(
      <div>
        <Form.Control 
          placeholder="Search" 
          value={filter.query}
          onChange={e => setFilter({...filter, query: e.target.value})}
        />
      </div>
	)
}

export default SourceFilter
