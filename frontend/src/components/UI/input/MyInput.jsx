import React, {useState} from 'react'
import classes from './MyInput.module.css'

const MyInput = function ({children, ...props}) {
	return(
		<input {...props} className={classes.myInput}/>
	)
}

export default MyInput

