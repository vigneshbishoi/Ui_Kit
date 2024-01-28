// import * as React from 'react';
// import {
//   Text, 
//   View,
//   SafeAreaView } from 'react-native';

// import Carousel from 'react-native-snap-carousel';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import Data from '../../../Array'
// import {Heder, ListData} from '../../components/index'

// export default class App extends React.Component {
//     _renderItem({item,index}){
//         return (
//           <View style={{
//             backgroundColor:'floralwhite',
//            height:hp('74%') }}>
//           <ListData profilename={item.name} time={item.time} Mainimage={item.img} titleName={item.hotelname} 
//                          discription={item.description} like={item.comment} comments={item.like}/>
//         </View>
//         )
//     }

//     render() {
//         return (
//           <SafeAreaView style={{flex: 1, backgroundColor:'rebeccapurple', }}>
//             <View style={{  flexDirection:'row', justifyContent: 'center', }}>
//                 <Carousel
//                   layout={"default"}
//                   ref={ref => this.carousel = ref}
//                   data={Data}
//                   sliderWidth={420}
//                   itemWidth={wp('83.5%')}
//                   renderItem={this._renderItem}
//                   onSnapToItem = { index => this.setState({activeIndex:index}) } />
//             </View>
//           </SafeAreaView>
//         );
//     }
// }


// import  React from 'react';
// import { Text, View, StyleSheet,Fragment,FlatList,TouchableOpacity,Icon } from 'react-native';




// export default class Hello extends React.Component {
//    state = {
//       shapes: [
//          { id: 1, icon: 'home', color: 'green', visible: false },
//          { id: 2, icon: 'creditcard', color: 'red', visible: false },
//          { id: 3, icon: 'star', color: 'purple', visible: true },
//          { id: 3, icon: 'notification', color: 'blue', visible: false },
//       ]
//    }

//    showShapes = () => {
//       for (let e of this.state.shapes) {
//          e.visible = true
//          console.log(e.visible)
//       }
//       this.setState({
//          // what to write here
//       })
//    }

//    renderItems = ({ item }) => {
//       return (
//          <TouchableOpacity
//             activeOpacity={0.6}
//             onPress={this.showShapes}
//             style={{ padding: 10, backgroundColor: '#ccc', margin: 15, width:  14 }}
//          >
//             {item.visible && <Icon
//                name={item.icon} color={item.color} size={50}
//             /> }
//          </TouchableOpacity>
//       )
//    }


//    render() {
//       return (
//             <FlatList
//                numColumns='2'
//                data={this.state.shapes}
//                renderItem={(item) => this.renderItems(item)}
//                keyExtractor={(item) => item.id.toString()}
//             />
//       )
//    }
// }


// import { Button, Text, View } from 'native-base';
// import React, { useState } from 'react';

// function Example() {
//   // Declare a new state variable, which we'll call "count"
//   const [count, setCount] = useState(0);

//   return (
//     <View>
//        <Text>{count}</Text>
//        <Button onPress={() => setCount(count + 1)} Text={'HEllo'}>HEllo</Button>
//     </View>
//   );
// }

// export default Example;