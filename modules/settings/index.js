import React  from 'react';
import PropTypes from 'prop-types'
import { Platform, StyleSheet, Text, View} from 'react-native';


class SettingsPage extends React.Component {
    static navigationOptions = {
        name:"settings",
        title: '设置',
        icon:"settings-outline",//图标
        actions:[
            {name:"email",icon:"search"}
        ]
    }
    constructor(props) {
        super(props)
    }
    exitabc(){

    }
    render() {
        return (
            <View>
                <Text>我的</Text>
            </View>
        )
    }
}

SettingsPage.propTypes = {
  title: PropTypes.string
}
SettingsPage.defaultProps = {
  title: "美一无线呼叫系统"
}

export default SettingsPage

