import React,{Component,Fragment} from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Alerts extends Component{
    static propTypes = {
       
        message: PropTypes.object.isRequired,
      }

    componentDidUpdate(prevProps){
        const {alert,message,error,email_sent_status} = this.props
        if(message !== prevProps.message){
            if(message.email_sent){
                alert.success(message.email_sent)
            } 
            if(message.order_copied){
                alert.success(message.order_copied)
            }

            if(message.msg){
                alert.success(message.msg)
            }
        }

        if(email_sent_status !== prevProps.email_sent_status){
            alert.success('Email Sent')
        }

        if(error !== prevProps.error){
            if(Array.isArray(error.msg)  === 'false'){ //checks if error.msg is a direct array...if not 
                const name = Object.keys(error.msg)[0]
                alert.error(error.msg[name].join())
            }
             else{
                    alert.error(error.msg.join())
                }
         }
    }


    render(){

        return <Fragment/>
    }

}

const mapStateToProps = (state) =>({
    message:state.messages,
    error:state.errors,
    email_sent_status:state.search.email_sent
})

export default connect(mapStateToProps)(withAlert()(Alerts))