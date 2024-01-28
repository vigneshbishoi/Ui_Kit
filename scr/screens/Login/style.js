// import React from 'react';
// import { Image,FlatList, Text, View,} from 'react-native';



// export default class Login extends React.Component {

//     constructor() {
//         super();
//         this.state = { DATA: [], page: 1 }
//     }

//     componentDidMount() {
//         this.StoreData()
//     }

//     StoreData = async () => {
//         const apiurl = "https://jsonplaceholder.typicode.com/photos?_limit=10&_page=" + this.state.page
//         fetch(apiurl).then((res) => res.json())
//             .then((resjson) => { this.setState({ DATA: this.state.DATA.concat(resjson) }) })
//     }

//     loadMore = () => {
//         this.setState({ page: this.state.page + 1 }, this.StoreData)
//     }
//     render() {
//         return (
//             <View style={{ flex: 1, backgroundColor: 'white' }}>
//                 <View>
//                     <FlatList
//                         showsVerticalScrollIndicator={false}
//                         data={this.state.DATA}
//                         renderItem={({ item, index }) => (
//                             <View style={{flex:1,alignItems:'center',justifyContent:'center'}} >
//                                 <Image style={{ width: 400, height: 200, }} source={{ uri: item.url }} resizeMode='cover'></Image>
//                                 <Text>{item.id}</Text>
//                                 <Text>{item.title}</Text>
//                             </View>
//                         )}
//                         keyExtractor={(item, index) => index.toString()}
//                         onEndReached={this.loadMore}
//                     />
//                 </View>

//             </View>
//         )
//     }
// }

// import React from 'react';
// import { View, ScrollView, FlatList, Text, TouchableOpacity, Modal, Image, StyleSheet, RefreshControl, TextInput, SafeAreaView, Alert, ImageBackground } from 'react-native';
// import Back from '../../components/BackTo/index'
// // import {Back} from '../../components/index'
// import Data from '../../../Array';
// import { MyRecipes, ListClickData, AddImg } from '../../components/index'
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import ImagePicker from 'react-native-image-crop-picker';

// export default class HomeItem extends React.Component {

//     constructor() {
//         super();
//         this.state = { recipename: '', showMe: false, StaticName: 'all type of Food', visibleValue: false, filelist: [],file :'' };
//     }

//     // onSelectImage = (image) => {
//     //     let newDataimg = this.state.filelist;
//     //     const source = { uri }
//     // };

//     onSelectImage = (image) => {
//         let newDataimg = this.state.filelist;
//         let item = {
//             id: Date.now(),
//             url: image.path,
//             content: image.data
//         };
//         newDataimg.push(item);
//         this.setState({filelist: item})
//         this.setState({ filelist: newDataimg }, () => {
//             console.log('hello', this.state.filelist);
//         })
//     }

//     OpenCamera = () => {
//         ImagePicker.openCamera({
//             width: 300,
//             height: 400,
//             cropping: true,
//         }).then(image => {
//             this.onSelectImage(image);
//             console.log(image);
            
//         });
//     };

//     OpenGallery = () => {
//         ImagePicker.openPicker({
//             width: 300,
//             height: 400,
//             cropping: true
//         }).then(image => {
//             console.log(image);
//             this.setState({file : image.path})
//             this.onSelectImage(image);
//         });
//     };

//     // renderItem = ({item, index}) => {
//     //     return(
//     //         <View>
//     //             <Image  source={item.url} style={{width:500,height:500}} resizeMode resizeMode='contain'/>
//     //         </View>
//     //     )
//     // };
//     render() {
//         return (
//             <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
//                 <View style={{ flex: 1, backgroundColor: 'white', }}  >
//                     <View style={{ marginLeft: wp('3%') }}>
//                         <Back color={'grey'} btnbacktext={'Back to My Profile'} btnback={() => this.props.navigation.navigate('homeitem')} />
//                     </View>

//                     <View style={{ marginLeft: wp('3%') }}>
//                         <Text style={{ fontSize: hp('3%'), marginLeft: wp('2%'), fontFamily: 'Nunito-Bold' }}>New Recipe</Text>
//                     </View>
//                     <View style={{ marginLeft: wp('5%'), marginTop: hp('1.3%'), marginBottom: hp('0.5%'), flexDirection: 'row' }}>
//                         <ImageBackground style={{ height: hp('7%'), width: wp('15%'), marginTop: hp('1%') }} resizeMode='cover' source={require('../../assets/image/click_img.png')}>
//                         <TouchableOpacity onPress={() => this.setState({ visibleValue: true })}>
//                             <Image style={{ height: hp('7%'), width: wp('15%') }} resizeMode='cover' source={{uri : this.state.file}} />
//                         </TouchableOpacity>
//                         </ImageBackground>
//                         <View style={{ marginTop: hp('1%'), marginLeft: wp('5%') }}>
//                             <Text style={{ fontSize: hp('1.6%'), color: '#454545', fontFamily: 'Nunito-Regular' }}>Recipe Name</Text>
//                             <TextInput keyboardType='default' style={{ height: hp('4.5%'), width: wp('68%'), borderBottomColor: 'silver', borderBottomWidth: 1 }} value={this.state.recipename} onChangeText={recipename => this.setState({ recipename: recipename })} placeholder={'Enter your Recipe'} ></TextInput>
//                         </View>
//                     </View>

//                     {/* <View style={{ width: wp('90%'), backgroundColor: 'red' }}>
//                         <Image source={{uri : this.state.file}} style={{ width: 500, height: 500, backgroundColor: 'red' }} resizeMode='cover' />
//                     </View> */}
//                     <View>
//                         <FlatList
//                             showsVerticalScrollIndicator={false}
//                             data={this.state.filelist}
//                             renderItem={({ item, index }) => (
//                                 <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
//                                     <Image style={{ width: 400, height: 200, }} source={{ uri: item.url }} resizeMode='cover'></Image>
//                                 </View>
//                             )}
//                             keyExtractor={(item, index) => index.toString()}
                            
//                         />
//                     </View>

//                     <Modal transparent={true} visible={this.state.visibleValue}>
//                         <View style={{ flex: 1, alignItems: 'center', flexDirection: 'column-reverse', backgroundColor: '#000000aa' }}>
//                             <View style={{ height: hp('38%'), width: wp('100%'), backgroundColor: 'white', borderRadius: 25, padding: ('8%') }}>
//                                 <View >
//                                     <Text style={{ fontFamily: 'Nunito-Regular', fontSize: hp('2.5%'), alignSelf: 'center' }}>Upload Photo</Text>
//                                     <Text style={{ fontSize: hp('1.6%'), color: '#454545', fontFamily: 'Nunito-Regular', alignSelf: 'center' }}>Choose your Option</Text>
//                                 </View>
//                                 <View style={{ marginTop: hp('2.5%') }}>
//                                     <TouchableOpacity style={s.modelclick} onPress={() => this.OpenCamera()} >
//                                         <Text style={{ fontSize: hp('2%'), color: 'green', fontFamily: 'Nunito-Bold' }}>Tack Photo</Text>
//                                     </TouchableOpacity>
//                                     <TouchableOpacity style={s.modelclick} onPress={() => this.OpenGallery()} >
//                                         <Text style={{ fontSize: hp('2%'), color: 'green', fontFamily: 'Nunito-Bold' }}>Open Gallery</Text>
//                                     </TouchableOpacity>
//                                     <TouchableOpacity style={s.modelclick} onPress={() => this.setState({ visibleValue: false })}  >
//                                         <Text style={{ fontSize: hp('2%'), color: 'green', fontFamily: 'Nunito-Bold' }}>Cancel</Text>
//                                     </TouchableOpacity>
//                                 </View>
//                             </View>

//                         </View>
//                     </Modal>
//                 </View>
//             </SafeAreaView>
//         )
//     }
// }

// const s = StyleSheet.create(
//     {
//         TO: {
//             backgroundColor: 'white',
//             shadowColor: 'silver',
//             shadowOffset: {
//                 width: 0,
//                 height: 3,
//             },
//             borderRadius: 10,
//             shadowRadius: 5,
//             shadowOpacity: 1.0,
//             elevation: 5,
//             width: wp('90%'),
//             flexDirection: 'row',
//             height: hp('5%'),
//             width: wp('50%'),
//             padding: ('2%'),
//             marginVertical: hp('0.5%'),
//             justifyContent: 'space-between',
//             alignItems: 'center'
//         },
//         TO1: {
//             backgroundColor: 'white',
//             borderRadius: 10,
//             borderWidth: 1, borderColor: 'green',
//             flexDirection: 'row',
//             height: hp('5%'),
//             width: wp('38.5%'),
//             padding: ('2%'),
//             marginLeft: hp('1%'),
//             marginVertical: hp('0.5%'),
//             justifyContent: 'center',
//             alignItems: 'center',
//         },
//         TO2: {
//             backgroundColor: 'white',
//             borderRadius: 10,
//             flexDirection: 'row',
//             height: hp('5%'),
//             width: wp('90.5%'),
//             padding: ('2%'), marginHorizontal: wp('5%'),
//             backgroundColor: 'grey',
//             marginVertical: hp('0.5%'),
//             justifyContent: 'center',
//             alignItems: 'center',
//         },
//         show: {
//             backgroundColor: 'white',
//             shadowColor: 'silver',
//             flexDirection: 'row',
//             width: wp('90%'),
//             alignItems: 'center',
//             borderRightWidth: 1, borderBottomWidth: 1, borderLeftWidth: 1,
//             marginLeft: wp('5%'),
//             padding: ('2%')
//         },
//         modelclick: {
//             backgroundColor: 'white',
//             borderRadius: 10,
//             borderWidth: 1, borderColor: 'green',
//             flexDirection: 'row',
//             height: hp('5%'),
//             width: wp('80%'),
//             padding: ('2%'),
//             marginLeft: hp('1%'),
//             marginVertical: hp('0.5%'),
//             justifyContent: 'center',
//             alignItems: 'center',
//         }
//     }
// )

import { Button } from 'native-base';
import React from 'react';
import { View,TextInput} from 'react-native';
import ButtonSet from '../../components/CustomButton/Index';


export default class CustomSlider extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email:''
        }
    }

    validate = () => {
        // console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(this.state.email) === false) {
          alert("Email is Not Correct");
          return false;
        }
        else {
          alert("Email is Correct");
        }
      }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <TextInput
                    placeholder="Email ID"
                    onChangeText={text => this.setState({email: text})}
                    value={this.state.email}
                />
                <ButtonSet ClickText={"click"} Press={() => this.validate()} /> 
            </View>
        );
    }
}