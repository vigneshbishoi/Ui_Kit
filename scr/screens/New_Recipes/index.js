import React, { useState } from 'react';
import { View, ScrollView, FlatList, Text, TouchableOpacity, Modal, Image, StyleSheet, RefreshControl, TextInput, SafeAreaView, Alert, ImageBackground } from 'react-native';
import Back from '../../components/BackTo/index'
// import {Back} from '../../components/index'
import Data from '../../../Array';
import { MyRecipes, ListClickData, AddImg, Input, ModalInput } from '../../components/index'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-community/async-storage';
import Ingrediends from '../../ArreyIngrediends';
import { step1 } from 'react-native/Libraries/Animated/src/Easing';


const Type = [{ type: 'all type of food' }, { type: 'pizza' }, { type: 'eggs' }, { type: 'pasta' }, { type: 'cake' }]

var myArray = ['one', 'two', 'three'];

export default class HomeItem extends React.Component {

    constructor() {
        super();
        this.state = {
            recipename: '', showMe: false, showMeImg: false, StaticName: 'all type of Food', visibleValue: false, filelist: [], image: 'http://www.tiptoncommunications.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png',
            images: null, ingredients: '', ingredientsshow: false, ingredientsarray: [], ingredientsImgarray: [],
            step1: '', step2: '', step3: '', cookshow: false, additioninfo: false, servicetime: '', nutrition: '', tags: '',
            ingrediendsfull: false, showCookDetail: false,showinfo: false
        };
    }


    Show = () => {
        // alert(this.state.recipename)
        if (this.state.showMe == false) {
            this.setState({ showMe: true })
        } else {
            this.setState({ showMe: false })
        }
    }

    onSelectImage = (image) => {
        let newDataimg = this.state.filelist;
        let item = {
            id: Date.now(),
            url: image.path,
            content: image.data
        };
        newDataimg.push(item);
        this.setState({ filelist: item })
        this.setState({ filelist: newDataimg }, () => {
            console.log('hello', this.state.filelist);
        })
    }
    onAddIngrediend = (image) => {

        let newDataimg = this.state.ingredientsarray;
        let item = {
            id: Date.now(),
            ingredientname: image
        };
        newDataimg.push(item);
        this.setState({ ingredientsarray: item, ingredients: '', ingrediendsfull: true })
        this.setState({ ingredientsarray: newDataimg }, () => {
            console.log('hello', this.state.ingredientsarray);
        })
    }

    addimageIngredriends = (item) => {

        let newDataimg = this.state.ingredientsImgarray;
        let item1 = {
            id: Date.now(),
            ingredientname: item.name,
            ingredientimg: item.img,
            
        };
        newDataimg.push(item1);
        this.setState({ ingredientsImgarray: item, ingredients: '', ingrediendsfull: true })
        this.setState({ ingredientsImgarray: newDataimg }, () => {
            console.log('hello', this.state.ingredientsImgarray);
        })

    }

    OpenCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            this.setState({ image: image.path })
            // this.onSelectImage(image);
            console.log(image);
        });
    };

    OpenGallery = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            console.log(image);
            this.setState({ image: image.path })
            // this.onSelectImage(image);
            this.setState({ visibleValue: false })
        });
    };

    Cookstep = () => {
        if (this.state.step1 == '' || this.state.step2 == '' || this.state.step3 == '') {
            alert('Please fill all step')
        } else {
            this.setState({ cookshow: false, showCookDetail: true })
        }
    }
    info = () => {
        if (this.state.servicetime == '' || this.state.nutrition == '' || this.state.tags == '') {
            alert('Please fill all step')
        } else {
            this.setState({ additioninfo: false,showinfo : true })
        }
    }

    pickMultiple = () => {
        this.setState({ showMeImg: true })
        ImagePicker.openPicker({
            multiple: true,
            waitAnimationEnd: false,
            sortOrder: 'desc',
            includeExif: true,
            forceJpg: true,
        })
            .then((images) => {
                this.setState({
                    images: images.map((i) => {
                        console.log('received image', i);
                        return {
                            uri: i.path,
                            width: i.width,
                            height: i.height,
                            key : 'false',
                        };
                    }),
                });
            })
            .catch((e) => alert(e));
    }

    StoreData = async () => {

        // if(this.state.images){

        // }
        this.props.navigation.navigate('EditRecipes')
        try {
            await AsyncStorage.setItem('NewRecipeLogo', this.state.image);
            await AsyncStorage.setItem('RecipeName', this.state.recipename);
            await AsyncStorage.setItem('@MySuperStore:key', JSON.stringify(this.state.images));
            await AsyncStorage.setItem('IngrediansArry', JSON.stringify(this.state.ingredientsarray));
            await AsyncStorage.setItem('IngrediansImgArry', JSON.stringify(this.state.ingredientsImgarray));
            await AsyncStorage.setItem('step1', this.state.step1);
            await AsyncStorage.setItem('step2', this.state.step2);
            await AsyncStorage.setItem('step3', this.state.step3);
            await AsyncStorage.setItem('time', this.state.servicetime);
            await AsyncStorage.setItem('nutrition', this.state.nutrition);
            await AsyncStorage.setItem('tags', this.state.tags);
        } catch (err) {
            alert(err);
        }

    }


    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ flex: 1, backgroundColor: 'white', }}  >
                    <View style={{ marginLeft: wp('3%') }}>
                        <Back color={'grey'} btnbacktext={'Back to My Profile'} btnback={() => this.props.navigation.navigate('homeitem')} />
                    </View>
                    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                        <View style={{ marginLeft: wp('3%') }}>
                            <Text style={{ fontSize: hp('3%'), marginLeft: wp('2%'), fontFamily: 'Nunito-Bold' }}>New Recipe</Text>
                        </View>
                        <View style={{ marginLeft: wp('5%'), marginTop: hp('1.3%'), marginBottom: hp('0.5%'), flexDirection: 'row' }}>
                            <ImageBackground style={{ height: hp('7%'), width: wp('15%'), marginTop: hp('1%'),padding:0 }} resizeMode='contain' source={require('../../assets/image/click_img.png')}>
                                <TouchableOpacity onPress={() => this.setState({ visibleValue: true })}>
                                    <Image style={{ height: hp('7%'), width: wp('15%') }} resizeMode='cover' source={{ uri: this.state.image }} />
                                </TouchableOpacity>
                            </ImageBackground>
                            <View style={{ marginTop: hp('1%'), marginLeft: wp('5%')}}>
                                <Text style={{ fontSize: hp('1.6%'), color: '#454545',fontFamily: 'Nunito-Regular' }}>Recipe Name</Text>
                                <TextInput placeholdertexts keyboardType='default' style={{fontSize: hp('1.6%'),padding:0, height: hp('4.2%'), width: wp('68%'), borderBottomColor: 'silver', borderBottomWidth: hp('0.1%') }} value={this.state.recipename} onChangeText={recipename => this.setState({ recipename: recipename })} placeholder={'Enter your Recipe'} ></TextInput>
                            </View>
                        </View>
                        <View>
                            <AddImg name={'Gallery'} btnname={'Upload images or Open Camera'} addimg={() => this.pickMultiple()} />
                            {this.state.showMeImg ? (
                                <View style={{ width: wp('90%'), marginLeft: wp('5%'), borderColor: 'silver', borderLeftWidth: 1, borderRightWidth: 1, borderBottomWidth: 1 }}>
                                    <FlatList
                                        showsHorizontalScrollIndicator={false}
                                        data={this.state.images}
                                        horizontal
                                        renderItem={({ item, index }) => (
                                            <View ><Image
                                                style={{ width: wp('30%'), height: hp('20%'), resizeMode: 'contain' }}
                                                source={item}
                                            /></View>
                                        )}
                                        keyExtractor={(item, index) => index.toString()}
                                        onEndReached={this.loadMore}
                                    />
                                    <TouchableOpacity style={s.donebtn} onPress={() => this.setState({ showMeImg: false })}  >
                                        <Text style={{ fontSize: hp('2%'), color: 'green', fontFamily: 'Nunito-Bold' }}>Done</Text>
                                    </TouchableOpacity>
                                </View>
                            ) : null}
                            <AddImg name={'Ingredients'} btnname={'Add Ingredients'} addimg={() => this.setState({ ingredientsshow: true })} />
                            {this.state.ingrediendsfull ? (
                                <View style={{ width: wp('90%'), marginLeft: wp('5%'), padding: ('2%'), borderColor: 'silver', borderLeftWidth: 1, borderRightWidth: 1, borderBottomWidth: 1 }}>
                                    <View>
                                        <FlatList
                                            horizontal={true}
                                            showsHorizontalScrollIndicator={false}
                                            data={this.state.ingredientsImgarray}
                                            renderItem={({ item, index }) => (
                                                <View style={{ backgroundColor: 'white', justifyContent: "center", alignItems: 'center' }}>
                                                    <TouchableOpacity >
                                                        <Image style={{ height: 40, width: 40, borderRadius: 20, marginHorizontal: hp('1%') }} source={item.ingredientimg} />
                                                        <Text style={{ fontSize: hp('1.6%'), color: '#454545', fontFamily: 'Nunito-Regular', alignSelf: 'center' }}>{item.ingredientname}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            )}
                                            keyExtractor={(item, index) => index.toString()}
                                        />

                                        {/* <View style={{ width: wp('80%'), marginLeft: wp('6.5%'), height: hp('9.3%') }}> */}
                                        <Text style={{ fontSize: hp('1.6%'), marginBottom: hp('1%'), color: 'silver', fontFamily: 'Nunito-Regular' }}>External add ingredients</Text>
                                        <FlatList
                                            showsHorizontalScrollIndicator={false}
                                            data={this.state.ingredientsarray}
                                            horizontal
                                            renderItem={({ item, index }) => (
                                                <View style={{ backgroundColor: 'white', justifyContent: "center", alignItems: 'center' }}>
                                                    <TouchableOpacity >
                                                        <Text style={{ fontSize: hp('1.6%'), margin: 1, color: '#454545', fontFamily: 'Nunito-Regular', alignSelf: 'center', marginLeft: hp('1%') }}>{item.ingredientname}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            )}

                                            keyExtractor={(item, index) => index.toString()}
                                        />
                                        <TouchableOpacity style={s.donebtning} onPress={() => this.setState({ ingrediendsfull: false })}  >
                                            <Text style={{ fontSize: hp('2%'), color: 'green', fontFamily: 'Nunito-Bold' }}>Done</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ) : null}
                            <AddImg name={'How to Cook'} btnname={'Add Directions'} addimg={() => this.setState({ cookshow: true })} />
                            {this.state.showCookDetail ? (
                                <View style={{ backgroundColor: 'white', width: wp('90%'), marginLeft: wp('5%'), padding: ('2%'), borderColor: 'silver', borderLeftWidth: 1, borderRightWidth: 1, borderBottomWidth: 1 }}>
                                    <View style={{ margin: wp('5%'), width: ('75%') }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Image style={{ height: hp('2.5%'), width: wp('7%'), marginRight: wp('5%') }} resizeMode='contain' source={require('../../assets/image/Numbering1.png')}></Image>
                                            <Text numberOfLines={3} style={{ fontSize: hp('1.5%'), fontFamily: 'Nunito-regular', marginLeft: wp('1%') }}>{this.state.step1}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginTop: hp('3%') }}>
                                            <Image style={{ height: hp('2.5%'), width: wp('7%'), marginRight: wp('5%') }} resizeMode='contain' source={require('../../assets/image/Numbering.png')}></Image>
                                            <Text numberOfLines={3} style={{ fontSize: hp('1.5%'), marginBottom: wp('3%'), fontFamily: 'Nunito-regular', marginLeft: wp('1%') }}>{this.state.step2}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginTop: hp('3%') }}>
                                            <Image style={{ height: hp('2.5%'), width: wp('7%'), marginRight: wp('5%') }} resizeMode='contain' source={require('../../assets/image/Numbering2.png')}></Image>
                                            <Text numberOfLines={3} style={{ fontSize: hp('1.5%'), fontFamily: 'Nunito-regular', marginLeft: wp('1%') }}>{this.state.step3}</Text>
                                        </View>

                                    </View>
                                    <TouchableOpacity style={s.donebtning} onPress={() => this.setState({ showCookDetail: false })}  >
                                        <Text style={{ fontSize: hp('2%'), color: 'green', fontFamily: 'Nunito-Bold' }}>Done</Text>
                                    </TouchableOpacity>
                                </View>
                            ) : null}
                            <AddImg name={'Additional Info'} btnname={'Add Info'} addimg={() => this.setState({ additioninfo: true })} />
                            {this.state.showinfo ? (
                                <View style={{ backgroundColor: 'white', width: wp('90%'), marginLeft: wp('5%'), padding: ('2%'), borderColor: 'silver', borderLeftWidth: 1, borderRightWidth: 1, borderBottomWidth: 1 }}>
                                    <View style={{ backgroundColor: 'white' }}>
                                        <View style={{ marginHorizontal: wp('5%'), marginTop: hp('3%'), width: ('75%'), }}>
                                            <View style={{ flexDirection: 'row', }}>
                                                <Text style={{ fontSize: hp('1.7%'), fontFamily: 'Nunito-regular', marginBottom: wp('3%'), width: wp('40%'), color: 'silver' }}>Serice Time</Text>
                                                <Text numberOfLines={1} style={{ fontSize: hp('1.7%'), marginBottom: wp('3%'), fontFamily: 'Nunito-regular', width: wp('40%'), }}>{this.state.servicetime}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={{ fontSize: hp('1.7%'), fontFamily: 'Nunito-regular', marginBottom: wp('3%'), width: wp('40%'), color: 'silver' }}>Nutrition Facts</Text>
                                                <Text numberOfLines={5} style={{ fontSize: hp('1.7%'), marginBottom: wp('3%'), fontFamily: 'Nunito-regular', width: wp('40%'), }}>{this.state.nutrition}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={{ fontSize: hp('1.7%'), width: wp('40%'), fontFamily: 'Nunito-regular', color: 'silver' }}>Tags</Text>
                                                <Text numberOfLines={3} style={{ fontSize: hp('1.7%'), fontFamily: 'Nunito-regular', width: wp('40%'), }}>{this.state.tags}</Text>
                                            </View>

                                        </View>
                                    </View>
                                    <TouchableOpacity style={s.donebtning} onPress={() => this.setState({ showinfo: false })}  >
                                        <Text style={{ fontSize: hp('2%'), color: 'green', fontFamily: 'Nunito-Bold' }}>Done</Text>
                                    </TouchableOpacity>
                                </View>
                            ) : null}
                        </View>
                        <Text style={{ fontSize: hp('1.6%'), marginLeft: wp('5%'), marginTop: hp('1%'), marginBottom: hp('1%'), color: 'silver', fontFamily: 'Nunito-Regular' }}>Save To</Text>
                        <View style={{ marginLeft: wp('5%'), flexDirection: 'row' }}>
                            <TouchableOpacity style={s.TO} onPress={() => this.Show()}>
                                <Text style={{ fontSize: hp('2%'), color: 'gray', fontFamily: 'Nunito-Bold', marginLeft: wp('1%') }}>{this.state.StaticName}</Text>
                                <Image style={{ height: hp('2%'), width: wp('5%'), }} resizeMode='contain' source={require('../../assets/image/DownArrow.png')}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity style={s.TO1}  >
                                <Text style={{ fontSize: hp('2%'), color: 'green', fontFamily: 'Nunito-Bold' }}>Save Recipe</Text>
                            </TouchableOpacity>
                        </View>
                        {this.state.showMe ? (
                            <View>
                                <FlatList
                                    showsVerticalScrollIndicator={false}
                                    data={Type}
                                    renderItem={({ item, index }) => (
                                        // () => this.setState({count:index}),alert(this.state.count),
                                        <View style={{ width: wp('90%'), borderLeftWidth: 1, borderRightWidth: 1, borderColor: 'grey' }}>
                                            <TouchableOpacity style={s.show} onPress={() => this.setState({ showMe: false, StaticName: item.type })}>
                                                <Text style={{ fontSize: hp('1.5%'), color: 'gray', fontFamily: 'Nunito-Bold' }}>{item.type}</Text>
                                            </TouchableOpacity>
                                        </View>
                                        // () => this.setState({count:Type.length}),alert(this.state.count)
                                    )}

                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </View>
                        ) : null}
                        <TouchableOpacity style={s.TO2} onPress={() => this.StoreData()} >
                            <Text style={{ fontSize: hp('2%'), color: 'white', fontFamily: 'Nunito-Bold' }}>Post to Feed</Text>
                        </TouchableOpacity>
                    </ScrollView>

                    <Modal transparent={true} visible={this.state.visibleValue}>
                        <View style={{ flex: 1, alignItems: 'center', flexDirection: 'column-reverse', backgroundColor: '#000000aa' }}>
                            <View style={{ height: hp('38%'), width: wp('100%'), backgroundColor: 'white', borderTopLeftRadius: 25, borderTopRightRadius: 25, padding: ('8%') }}>
                                <View >
                                    <Text style={{ fontFamily: 'Nunito-Regular', fontSize: hp('2.5%'), alignSelf: 'center' }}>Upload Photo</Text>
                                    <Text style={{ fontSize: hp('1.6%'), color: '#454545', fontFamily: 'Nunito-Regular', alignSelf: 'center' }}>Choose your Option</Text>
                                </View>
                                <View style={{ marginTop: hp('2.5%') }}>
                                    <TouchableOpacity style={s.modelclick} onPress={() => this.OpenCamera()} >
                                        <Text style={{ fontSize: hp('2%'), color: 'green', fontFamily: 'Nunito-Bold' }}>Tack Photo</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={s.modelclick} onPress={() => this.OpenGallery()} >
                                        <Text style={{ fontSize: hp('2%'), color: 'green', fontFamily: 'Nunito-Bold' }}>Open Gallery</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={s.modelclick} onPress={() => this.setState({ visibleValue: false })}  >
                                        <Text style={{ fontSize: hp('2%'), color: 'green', fontFamily: 'Nunito-Bold' }}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>
                    </Modal>

                    <Modal transparent={true} visible={this.state.ingredientsshow}>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#000000aa' }}>
                            <View style={{ height: hp('48%'), width: wp('90%'), backgroundColor: 'white', borderRadius: 10, padding: ('5%') }}>
                                <View >
                                    <Text style={{ fontFamily: 'Nunito-Regular', fontSize: hp('2.5%'), alignSelf: 'center' }}>Add Ingredients</Text>
                                    <Text style={{ fontSize: hp('1.6%'), color: '#454545', fontFamily: 'Nunito-Regular', alignSelf: 'center' }}>Only click on ingredients and it will added</Text>
                                    <View style={{ height: hp('8%'), marginTop: hp('2%') }}>
                                        <FlatList
                                            showsHorizontalScrollIndicator={false}
                                            data={Ingrediends}
                                            horizontal
                                            renderItem={({ item, index }) => (
                                                <View style={{ backgroundColor: 'white', justifyContent: "center", alignItems: 'center' }}>
                                                    <TouchableOpacity onPress={() => this.addimageIngredriends(item)}>
                                                        <Image style={{ height: 40, width: 40, borderRadius: 20, marginHorizontal: hp('1%') }} source={item.img} />
                                                        <Text style={{ fontSize: hp('1.6%'), color: '#454545', fontFamily: 'Nunito-Regular', alignSelf: 'center' }}>{item.name}</Text>
                                                    </TouchableOpacity>
                                                </View>

                                            )}

                                            keyExtractor={(item, index) => index.toString()}
                                        />
                                    </View>
                                    <Text style={{ fontSize: hp('1.6%'), marginTop: hp('1.6%'), color: '#454545', fontFamily: 'Nunito-Regular', alignSelf: 'center' }}>External add ingredients</Text>
                                </View>
                                <View>
                                    <Text style={{ fontFamily: 'Nunito-Regular', fontSize: hp('1.5%'), color: 'grey' }}>Ingredients</Text>
                                    <TextInput style={{ height: hp('7%'), width: wp('80.5%'), borderBottomColor: 'silver', borderBottomWidth: 1 }}
                                        value={this.state.ingredients}
                                        onChangeText={ingredients => this.setState({ ingredients: ingredients })}
                                        placeholder='Enter Ingredients'
                                        keyboardType='default'
                                    >
                                    </TextInput>

                                </View>
                                <View style={{ marginTop: hp('2.5%') }}>
                                    <TouchableOpacity style={s.modelclick2} onPress={() => this.onAddIngrediend(this.state.ingredients)}>
                                        <Text style={{ fontSize: hp('2%'), color: 'green', fontFamily: 'Nunito-Bold' }}>Add More</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={s.modelclick2} onPress={() => this.setState({ ingredientsshow: false })} >
                                        <Text style={{ fontSize: hp('2%'), color: 'green', fontFamily: 'Nunito-Bold' }}>Submit</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>

                    <Modal transparent={true} visible={this.state.cookshow}>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#000000aa' }}>
                            <View style={{ height: hp('50%'), width: wp('90%'), backgroundColor: 'white', borderRadius: 10, padding: ('5%') }}>
                                <View >
                                    <Text style={{ fontFamily: 'Nunito-Regular', fontSize: hp('2.5%'), alignSelf: 'center' }}>Step for Cook</Text>
                                    <Text style={{ fontSize: hp('1.6%'), color: '#454545', fontFamily: 'Nunito-Regular', alignSelf: 'center' }}>Make sure your step fit on all 3 Steps</Text>
                                    <Text style={{ fontSize: hp('1.6%'), color: '#454545', fontFamily: 'Nunito-Regular', alignSelf: 'center' }}>(Empty step is not allowed)</Text>
                                </View>
                                <ModalInput name={"Step 1:-"} onChangeText={step1 => this.setState({ step1: step1 })} value={this.state.step1} placeholder={'Enter Ingredients'} />
                                <ModalInput name={"Step 2:-"} onChangeText={step2 => this.setState({ step2: step2 })} value={this.state.step2} placeholder={'Enter Ingredients'} />
                                <ModalInput name={"Step 3:-"} onChangeText={step3 => this.setState({ step3: step3 })} value={this.state.step3} placeholder={'Enter Ingredients'} />
                                <View style={{ marginTop: hp('2.5%') }}>
                                    <TouchableOpacity style={s.modelclick2} onPress={() => this.Cookstep()} >
                                        <Text style={{ fontSize: hp('2%'), color: 'green', fontFamily: 'Nunito-Bold' }}>Submit</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={s.modelclick2} onPress={() => this.setState({ cookshow: false })} >
                                        <Text style={{ fontSize: hp('2%'), color: 'green', fontFamily: 'Nunito-Bold' }}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>

                    <Modal transparent={true} visible={this.state.additioninfo}>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#000000aa' }}>
                            <View style={{ height: hp('50%'), width: wp('90%'), backgroundColor: 'white', borderRadius: 10, padding: ('5%') }}>
                                <View >
                                    <Text style={{ fontFamily: 'Nunito-Regular', fontSize: hp('2.5%'), alignSelf: 'center' }}>Additional Info</Text>
                                    <Text style={{ fontSize: hp('1.6%'), color: '#454545', fontFamily: 'Nunito-Regular', alignSelf: 'center' }}>Make sure all additional info full fill</Text>
                                    <Text style={{ fontSize: hp('1.6%'), color: '#454545', fontFamily: 'Nunito-Regular', alignSelf: 'center' }}>(Empty info is not allowed)</Text>
                                </View>
                                <ModalInput name={'Service TIme'} onChangeText={step1 => this.setState({ servicetime: step1 })} value={this.state.servicetime} placeholder={'Enter ServiceTime'} />
                                <ModalInput name={"Nutrition Facts"} onChangeText={step2 => this.setState({ nutrition: step2 })} value={this.state.nutrition} placeholder={'Enter Nutrition'} />
                                <ModalInput name={"Tags"} onChangeText={step3 => this.setState({ tags: step3 })} value={this.state.tags} placeholder={'Enter Tags'} />
                                <View style={{ marginTop: hp('2.5%') }}>
                                    <TouchableOpacity style={s.modelclick2} onPress={() => this.info()} >
                                        <Text style={{ fontSize: hp('2%'), color: 'green', fontFamily: 'Nunito-Bold' }}>Submit</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={s.modelclick2} onPress={() => this.setState({ additioninfo: false })} >
                                        <Text style={{ fontSize: hp('2%'), color: 'green', fontFamily: 'Nunito-Bold' }}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>

                </View>
            </SafeAreaView>
        )
    }
}

const s = StyleSheet.create(
    {
        TO: {
            backgroundColor: 'white',
            shadowColor: 'silver',
            shadowOffset: {
                width: 0,
                height: 3,
            },
            borderRadius: 10,
            shadowRadius: 5,
            shadowOpacity: 1.0,
            elevation: 5,
            width: wp('90%'),
            flexDirection: 'row',
            height: hp('5%'),
            width: wp('50%'),
            padding: ('2%'),
            marginVertical: hp('0.5%'),
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        TO1: {
            backgroundColor: 'white',
            borderRadius: 10,
            borderWidth: 1, borderColor: 'green',
            flexDirection: 'row',
            height: hp('5%'),
            width: wp('38.5%'),
            padding: ('2%'),
            marginLeft: hp('1%'),
            marginVertical: hp('0.5%'),
            justifyContent: 'center',
            alignItems: 'center',
        },
        TO2: {
            backgroundColor: 'white',
            borderRadius: 10,
            flexDirection: 'row',
            height: hp('5%'),
            width: wp('90.5%'),
            padding: ('2%'), marginHorizontal: wp('5%'),
            backgroundColor: 'grey',
            marginVertical: hp('1%'),
            justifyContent: 'center',
            alignItems: 'center',
        },
        show: {
            backgroundColor: 'white',
            shadowColor: 'silver',
            flexDirection: 'row',
            width: wp('90%'),
            alignItems: 'center',
            borderRightWidth: 1, borderBottomWidth: 1, borderLeftWidth: 1,
            marginLeft: wp('5%'),
            padding: ('2%')
        },
        modelclick: {
            backgroundColor: 'white',
            borderRadius: 10,
            borderWidth: 1, borderColor: 'green',
            flexDirection: 'row',
            height: hp('5%'),
            width: wp('80%'),
            padding: ('2%'),
            marginLeft: hp('1%'),
            marginVertical: hp('0.5%'),
            justifyContent: 'center',
            alignItems: 'center',
        },
        modelclick2: {
            backgroundColor: 'white',
            borderRadius: 10,
            borderWidth: 1, borderColor: 'green',
            flexDirection: 'row',
            height: hp('5%'),
            width: wp('80%'),
            padding: ('2%'),
            marginVertical: hp('0.5%'),
            justifyContent: 'center',
            alignItems: 'center',
        },
        donebtn: {
            backgroundColor: 'white',
            flexDirection: 'row',
            height: hp('5%'),
            width: wp('88%'),
            padding: ('2%'),
            marginVertical: hp('0.5%'),
            justifyContent: 'center',
            alignItems: 'center',
        },
        donebtning: {
            backgroundColor: 'white',
            flexDirection: 'row',
            height: hp('5%'),
            width: wp('87%'),
            marginVertical: hp('0.5%'),
            justifyContent: 'center',
            alignItems: 'center',
        },
    }
)