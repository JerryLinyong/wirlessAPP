import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types'
import { Platform, StyleSheet, Text, View} from 'react-native';

class MessagePage extends React.Component {
    static navigationOptions = {
        name:"messages",
        title: '消息',
        icon:"comment-text-multiple-outline",//图标
        actions:[
            {name:"email",icon:"search"},
            {name:"home",icon:"home"}
        ]
    }
    constructor(props) {
        super(props)
        this.props.showRedDot(true)//显示/隐藏红点
    }
    render() {
        return (
            <View>
                <Text>消息</Text>
            </View>
        )
    }
}

MessagePage.propTypes = {
    title: PropTypes.string
}
MessagePage.defaultProps = {
    title: "美一无线呼叫系统"
}

export default MessagePage

