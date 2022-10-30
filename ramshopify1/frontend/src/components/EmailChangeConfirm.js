import React, { useEffect,Fragment } from 'react'
import {Link,useParams} from 'react-router-dom'
import {email_token_change} from "../actions/auth.js"

function EmailChangeConfirm(props){
    const {token} = useParams()
    useEffect (
        ()=>{
            props.email_token_change()
        },[]
    )

    const email_changed = <div>Email has been changed to {props.new_email_confirmed.new_email}</div>
    const email_not_changed = <div>Email is still {props.user.email}</div>
    const not_auth = <div>Link expired or current user is not authorized </div>
    return(
        <Fragment>
            <div>
                {props.new_email_confirmed.status === 'changed'?email_changed:
                props.new_email_confirmed.status === 'not_changed'?email_not_changed:
                props.new_email_confirmed.status === false?not_auth:null
                }
            </div>
            
        </Fragment>
    )
}