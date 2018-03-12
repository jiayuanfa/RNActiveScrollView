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
  Alert
} from 'react-native';

var ImageData = require('./data.json');

// 获取屏幕宽度
var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;

var timer;

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

// 可变状态机
  state={
    currenge:0
  }

// 不可变状态机
  static defaultProps={

    // 间隔时间 单位是毫秒
    duration:3000

  }

  render() {
    return (
      <View style={styles.container}>
      <ScrollView
        ref="scrollView"

        // 水平方向滚动
        horizontal={true}

        // 不展示水平方向滚动条
        showsHorizontalScrollIndicator={false}

        // 不展示垂直方向滚动条
        showsVerticalScrollIndicator={false}

        // 分页展示 开
        pagingEnabled={true}

        // 滚动结束后调用
        onMomentumScrollEnd={(e)=>this.scrollEnd(e)}

        // 手动拖拽后清空定时器
        onScrollBeginDrag={()=>this.scrollBeginDrag()}

        // 手动拖拽结束后重启定时器
        onScrollEndDrag={()=>this.scrollEndDrag()}
      >
        {this.renderAllImage()}
      </ScrollView>

      <View style={styles.pageViewStyle}>
        {this.renderAllViewPage()}
      </View>
      </View>
    );
  }

  // 拖拽的时候清空定时器
  scrollBeginDrag(){
    // 拿到定时器
    clearInterval(this.timer);
  }

  // 拖拽结束 重启定时器
  scrollEndDrag(){
    this.startTimer();
  }

  // UI加载完毕之后 启动定时器
  componentDidMount(){

    // 启动定时器
    this.startTimer();

  }

  startTimer(){

    // 拿到ScrollView
    var scrollView = this.refs.scrollView;
    var imageCount = ImageData.data.length;

          // 这里下面的 this.state.currenge不能直接使用 所以在这里接收一下,但是这里获取没有用的，所以还要去里面获取，只不过换一种方式
    // var stateCurrentPage = this.state.currenge;

    // 这里真的是个坑，所以我们要转移坑
    var obj = this;

    // 设置定时器
    this.timer = setInterval(function(){
      // 设置当前显示哪一页
      var currengPage = 0; // 临时存放目标currengPage

      // 这里的this指的不是当前页对象。而是window，所以要转化 那么怎么搞？很简单在外面用一个对象接受this，而在这里面用this即可，就可以避免多出出现this指定对象不同造成的问题

      // 判断是不是最后一个 如果是最后一个 就要跳转到第一页
      if ((obj.state.currenge + 1) >= imageCount) {
          // 清零
          currengPage = 0;
      }else{
          // 让当前的currengPage等于状态机中的currengPage + 1 即向后面滚动一页
          currengPage = obj.state.currenge + 1;
      }

      // 更新状态机
      obj.setState({
        currenge:currengPage
      })

      // 滚起来
      var offsetX = currengPage * width;
      scrollView.scrollTo({x:offsetX,y:0,animated:true});

      console.log(currengPage);

    },this.props.duration);
  }

  // 滚动结束后调用即可
  scrollEnd(e){
    // 滚动结束 通过e来计算出偏移量
    var offserX = e.nativeEvent.contentOffset.x;
    console.log(offserX);
    // 求出当前页数 Math.floor是取整的意思
    var currentPage = Math.floor(offserX/width);
    // 更新状态机 就可以实现UI的自动刷新
    this.setState({
      currenge:currentPage
    })
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
