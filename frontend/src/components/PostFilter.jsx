import React, {useState, useMemo} from 'react'
import MySelect from './UI/select/MySelect'
import MyInput from './UI/input/MyInput'

const PostFilter = function ({filter, setFilter}) {
	return(
      <div>
        <MyInput
          placeholder="Поиск"
          value={filter.query}
          onChange={e => setFilter({...filter, query: e.target.value})}
        />
        <MySelect
          value={filter.sort}
          onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
          defaultValue="Сортировка"
          options={[
            {value: 'title', name: 'По названию'},
            {value: 'body', name: 'По описанию'},
          ]}
        />
      </div>
	)
}

export default PostFilter
