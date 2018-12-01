/**
 * 分区显示组件
 */

 import React,{ Component } from 'react'
 import {Text,View,StyleSheet } from "react-native"
 import { CardList } from  "./card"
import PropTypes from  "prop-types"

const styles=StyleSheet.create({
    areaHeader:{

    }
})
/**
 * 单个分区显示
 */
export  class Area extends Component{
    static proptypes={
        area:PropTypes.object,
        showHeader:PropTypes.bool
    }
    render(){
        return (
            <View>
                <Text style={styles.areaHeader} >{this.props.area.name}</Text>
                <CardList screenOrientation={this.props.screenOrientation} cards={this.props.area.cards}></CardList>
            </View>
        )
    }     
}
 /**
 * 分区列表显示
 */
export  class AreaList extends Component{
    static proptypes={
        areas:PropTypes.object,
        current:PropTypes.string
    }
    render(){
        let areas=this.areas
        let showSingleArea=this.props.current in this.areas
        if(showSingleArea){//显示所有分区
            areas={[this.props.current]:this.areas[this.props.current]}
        }
        return (
            <View>
                {
                    Object.keys(areas).map((areaId)=>{
                        return <Area screenOrientation={this.props.screenOrientation}   area={areas[areaId]} showHeader={!showSingleArea} ></Area>
                    }) 
                }
            </View>
        )
    }
}
 /**
 * 分区标签页显示
 */
export  class AreaTabs extends Component{
    static proptypes={
        areas:PropTypes.object
    }
    render(){
        return null
    }
}