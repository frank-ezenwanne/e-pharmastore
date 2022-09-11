import React,{Component,Fragment} from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Alerts extends Component{
    static propTypes = {
       
        message: PropTypes.object.isRequired,
      }

    componentDidUpdate(prevProps){
        const {alert,message,...rest} = this.props
        if(message !== prevProps.message){
            if(message.email_sent){
                alert.success(message.email_sent)
            } 
        }
    }

    render(){

        return <Fragment/>
    }

}

const mapStateToProps = (state) =>({
    message:state.messages
})

export default connect(mapStateToProps)(withAlert()(Alerts))