/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
} from 'react-native';

var ImageData = require('./data.json');

// 获取屏幕宽度
var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};

// 主View为ScrollView
// horizontal 是否水平显示该ScrollView
export default class App extends Component<Props> {

  state={
    currenge:0
  }

  render() {
    return (
      <View style={styles.container}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        pagingEnabled={true}
      >
        {this.renderAllImage()}
      </ScrollView>

      <View style={styles.pageViewStyle}>
        {this.renderAllViewPage()}
      </View>
      </View>
    );
  }

// 小圆点数组
  renderAllViewPage() {
    var style;
    var pagePointArray = [];
    var imagesArray = ImageData.data;
    for (var i = 0; i < imagesArray.length; i++) {

      // 就是当前的已经选中的那个点 设置该Style
      style = (i==this.state.currenge)?{color:'orange'}:{color:'#ffffff'};

      pagePointArray.push(
        <Text 
        key={i} 

        // 这里使用数组来设置Style
        style={[{fontSize:25},style]}
        >&bull;   </Text>
      ) 
    }  
    return pagePointArray; 
  }

  // 加载所有的图片
  renderAllImage(){
    var allImageView = [];
    var allImageData = ImageData.data;
    for (var i = allImageData.length - 1; i >= 0; i--) {
      var imageItem = allImageData[i];
      allImageView.push(
              <Image key={i}
        style={{width:width,height:180}}
        source={{uri:imageItem.img}}
      />
      )
    }
    return allImageView;
  }

// 返回主View
  renderChildView(){
    var childView = [];
    var colors = ['red','blue','green','orange','yellow','purple'];
    for (var i = colors.length - 1; i >= 0; i--) {
        childView.push(
          <View key={i} style={{backgroundColor:colors[i],width:width,height:120}}>
            <Text>{i}</Text>
          </View>
          )
    }
    return childView;
  }
}



const styles = StyleSheet.create({
  container: {
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333', 
    marginBottom: 5,
  },
  pageViewStyle: {
    width:width,
    height:25,
    backgroundColor:'rgba(0,0,0,0.4)',
    // 覆盖到父视图
    position:'absolute',
    bottom:0,
    // 主轴横向
    flexDirection:'row',
    // 内容靠右
    justifyContent:'flex-end',
    // 侧轴居中
    alignItems:'center',
  }
});
