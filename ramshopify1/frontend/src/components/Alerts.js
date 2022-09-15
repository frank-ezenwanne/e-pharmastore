import React,{Component,Fragment} from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Alerts extends Component{
    static propTypes = {
       
        message: PropTypes.object.isRequired,
      }

    componentDidUpdate(prevProps){
        const {alert,message,error} = this.props
        if(message !== prevProps.message){
            if(message.email_sent){
                alert.success(message.email_sent)
            } 
        }

        if(error !== prevProps.error){
            if(error.msg.email_send_error){
                alert.error(error.msg.email_send_error)
            }
        }
    }

    render(){

        return <Fragment/>
    }

}

const mapStateToProps = (state) =>({
    message:state.messages,
    error:state.errors
})

export default connect(mapStateToProps)(withAlert()(Alerts))