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
            if(message?.order_copied){
                alert.success(message.order_copied)
            }

            if(message?.msg){
                alert.success(message.msg)
            }
        }

        if(email_sent_status !== prevProps.email_sent_status){
            alert.success('Email Sent')
        }

        if(error !== prevProps.error){
            if(error.msg?.email_send_error){
                alert.error(error?.msg?.email_send_error)
            }

            if(error.msg?.non_field_errors){
                alert.error(error?.msg?.non_field_errors.join())
            }
            else{
                if(error.msg){
                   try{
                        for (let key of Object.keys(error.msg)){
                            if(typeof(error.msg[key]) === 'object'){
                                alert.error(`${key} : ${error?.msg[key].join()} `)
                            }else{
                                alert.error(error.msg[key])
                            }
                            
                        }
                   }catch(err){
                       alert.error(err)
                   }
            }

        }

            
        }
    }

    render(){

        return (<div style= {{fontSize:'50% !important'}}><Fragment/></div>)

    }

}

const mapStateToProps = (state) =>({
    message:state.messages,
    error:state.errors,
    email_sent_status:state.search.email_sent
})

export default connect(mapStateToProps)(withAlert()(Alerts))