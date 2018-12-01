import React from 'react';
import { ActionSheet } from 'antd-mobile-rn';
import { View, Text, Platform } from 'react-native';
import { connect } from 'react-redux'
import {Button} from 'react-native-paper'

class BottomDrawer extends React.Component {
  componentWillReceiveProps(nextProps) {
    if(nextProps.count!==0&&nextProps.count>this.props.count){
      this.showActionSheet()
    }
  }
  constructor(props: any) {
    super(props);
    this.state = {
      clicked: 'none',
      text: '',
    };
  }
  render() {
    return (
      <View>
      </View>
    );
  }
  showActionSheet = () => {
    const BUTTONS = [
      _('确认收到'),
      _('已处理'),
      _('撤销'),
      _('取消')
    ];
    ActionSheet.showActionSheetWithOptions(
      {
        title: '',
        message: '',
        options: BUTTONS,
        cancelButtonIndex: 3,
      },
      (buttonIndex: any) => {
        this.setState({ clicked: BUTTONS[buttonIndex] });
      },
    );
  }
}

const mapStateToProps = state => {
    return {
        target: state.menu,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeMsg: (message)=>{dispatch({type:'CHANGE_MSG',newMsg:message})},
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(BottomDrawer)