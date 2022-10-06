import React, {useState} from 'react'
import MyButton from './UI/button/MyButton'
import MyInput from './UI/input/MyInput'

const SourceForm = ({create}) => {

	const [source, setSource] = useState({title:'', body:''})

	const addNewSource = (e) => {
    	e.preventDefault();
    	const newSource = {
    		...source, id: Date.now()
    	}
    	create(newSource)
    	setSource({title:'', body:''})
	}

	return(
	    <form>
	    	<h3>Create Source</h3>
	        <MyInput 
	          value={source.title}
	          onChange={ e => setSource({...source, title:e.target.value})}
	          type="text" 
	          placeholder="Name"
	        /> 
	        <MyInput 
	          value={source.body}
	          onChange={ e => setSource({...source, body:e.target.value})}
	          type="text" 
	          placeholder="Description"
	        /> 
	        <MyInput 
	          value={source.body}
	          onChange={ e => setSource({...source, body:e.target.value})}
	          type="text" 
	          placeholder="Login"
	        /> 
	        <MyInput 
	          value={source.body}
	          onChange={ e => setSource({...source, body:e.target.value})}
	          type="text" 
	          placeholder="Logs"
	        /> 
	        <MyButton onClick={addNewSource}>Create</MyButton>
		</form>
	)
}

export default SourceForm

