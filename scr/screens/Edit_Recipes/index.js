import React, { useState } from 'react';
import { View, ScrollView, FlatList, Text, TouchableHighlight, TouchableOpacity, Modal, Image, StyleSheet, RefreshControl, TextInput, SafeAreaView, Alert, ImageBackground } from 'react-native';
import Back from '../../components/BackTo/index'
// import {Back} from '../../components/index'
import Data from '../../../Array';
import { MyRecipes, ListClickData, AddImg, ModalInput } from '../../components/index'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-community/async-storage'
import { request } from 'react-native-permissions';
import { color, timing } from 'react-native-reanimated';
import Ingrediends from '../../ArreyIngrediends';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import RadioButtonRN from 'radio-buttons-react-native';

const data = [
    {
        label: 'Set as Cover'
    }
];

var radio_props = [
    { label: 'param1', value: 0 },
    { label: 'param2', value: 1 }
];

const Type = [{ type: 'all type of food' }, { type: 'pizza' }, { type: 'eggs' }, { type: 'pasta' }, { type: 'cake' }]


export default class HomeItem extends React.Component {

    constructor() {
        super();
        this.state = {
            arrayImg: [], showme: true, showmecopy: false, showme1: false, showMe2: false, recipename: '', IArry: [], IngrediansImgArry: [], ingrediendsplusshow: false,
            ingrediendshow: true, ingrediendsfull: false, step1Data: '', step2Data: '', step3Data: '', StaticName: 'all type of Food',
            EditDrop: false, servicetimeData: '', nutritionData: '', tagsData: '', visibleValue: false, filelist: [], ingredientsshow: false, ingredients: '',
            cookshow: false, additioninfo: false, openGallery: false, storeclickimg: '', setGallerywallpeper: '', clickcolor: false, showMe3: false,
            showgreentick: false, inisialetick: false,

        };
    }

    componentDidMount() {
        this.ReadData();
    }
    componentDidUpdate() {
        this.state.arrayImg
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

    OpenCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            this.setState({ logoshow: image.path })
            this.onSelectImage(image);
            console.log(image);
        });
    };

    OpenGallery = () => {
        this.setState({ logoshow: '' })
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            this.setState({ logoshow: image.path })
            this.setState({ visibleValue: false })
        });
    };
    StoreData = async () => {

        try {
            await AsyncStorage.setItem('NewRecipeLogo', this.state.logoshow);
            await AsyncStorage.setItem('RecipeName', this.state.recipename);
            await AsyncStorage.setItem('@MySuperStore:key', JSON.stringify(this.state.arrayImg));
            await AsyncStorage.setItem('IngrediansArry', JSON.stringify(this.state.IArry));
            await AsyncStorage.setItem('IngrediansImgArry', JSON.stringify(this.state.IngrediansImgArry));
            await AsyncStorage.setItem('step1', this.state.step1Data);
            await AsyncStorage.setItem('step2', this.state.step2Data);
            await AsyncStorage.setItem('step3', this.state.step3Data);
            await AsyncStorage.setItem('time', this.state.servicetimeData);
            await AsyncStorage.setItem('nutrition', this.state.nutritionData);
            await AsyncStorage.setItem('tags', this.state.tagsData);
        } catch (err) {
            alert(err);
        }


    }

    ReadData = async () => {
        try {
            const GetEmail = await AsyncStorage.getItem('NewRecipeLogo');
            const GetName = await AsyncStorage.getItem('RecipeName');
            const GetArry = await AsyncStorage.getItem('@MySuperStore:key');
            const GetIArry = await AsyncStorage.getItem('IngrediansArry');
            const GetImgArry = await AsyncStorage.getItem('IngrediansImgArry');
            const Getstep1 = await AsyncStorage.getItem('step1');
            const Getstep2 = await AsyncStorage.getItem('step2');
            const Getstep3 = await AsyncStorage.getItem('step3');
            const Gettime = await AsyncStorage.getItem('time');
            const Getnutrtion = await AsyncStorage.getItem('nutrition');
            const Gettags = await AsyncStorage.getItem('tags');
            this.setState({
                logoshow: GetEmail, arrayImg: JSON.parse(GetArry), recipename: GetName, IArry: JSON.parse(GetIArry), IngrediansImgArry: JSON.parse(GetImgArry),
                step1Data: Getstep1, step2Data: Getstep2, step3Data: Getstep3, servicetimeData: Gettime, nutritionData: Getnutrtion,
                tagsData: Gettags
            })
            console.log("++", JSON.parse(GetIArry));
            console.log("++", this.state.IArry);
        } catch (err) {
            alert(err);
        }
        this.showplusGalleryImg();
        this.showplusibngrediendsImg();
        this.setState({ setGallerywallpeper: this.state.arrayImg[0] })

    }

    Remove = async () => {
        try {
            await AsyncStorage.removeItem('NewRecipeLogo')
            await AsyncStorage.removeItem('RecipeName')
            await AsyncStorage.removeItem('@MySuperStore:key')
            await AsyncStorage.removeItem('IngrediansArry')
            await AsyncStorage.removeItem('IngrediansImgArry')
            await AsyncStorage.removeItem('step1')
            await AsyncStorage.removeItem('step2')
            await AsyncStorage.removeItem('step3')
            await AsyncStorage.removeItem('time')
            await AsyncStorage.removeItem('nutrition')
            await AsyncStorage.removeItem('tags')
        } catch (error) {
            alert(err);
        }
    }

    showplusGalleryImg = () => {
        if (this.state.arrayImg.length >= 3) {
            this.setState({ showme1: true })
        } else {
            this.setState({ showme1: false })
        }
    }
    showplusibngrediendsImg = () => {
        if (this.state.IngrediansImgArry.length >= 4) {
            this.setState({ ingrediendsplusshow: true })
        }
        else {
            this.setState({ ingrediendsplusshow: false })
        }
    }

    Show = () => {
        // alert(this.state.recipename)
        if (this.state.EditDrop == false) {
            this.setState({ EditDrop: true })
        } else {
            this.setState({ EditDrop: false })
        }
    }

    pickMultiple = () => {
        this.setState({ arrayImg: '' })
        ImagePicker.openPicker({
            multiple: true,
            waitAnimationEnd: false,
            sortOrder: 'desc',
            includeExif: true,
            forceJpg: true,
        })
            .then((images) => {
                this.setState({
                    arrayImg: images.map((i) => {
                        console.log('received image', i);
                        return {
                            uri: i.path,
                            width: i.width,
                            height: i.height,

                        };
                    }),
                });
            })
            .catch((e) => alert(e));
    }

    addimageIngredriends = (item) => {
        let newdata = this.state.IngrediansImgArry;
        let itemadd = {
            id: Date.now(),
            ingredientname: item.name,
            ingredientimg: item.img,
        };
        newdata.push(itemadd);
        this.setState({ IngrediansImgArry: itemadd, })
        this.setState({ IngrediansImgArry: newdata }, () => {
            console.log('hello', this.state.IngrediansImgArry);
        })
    }

    onAddIngrediend = (image) => {
        this.setState({ IArry: '' })
        let newDataimg = this.state.IArry;
        let item = {
            id: Date.now(),
            ingredientname: image
        };
        newDataimg.push(item);
        this.setState({ IArry: item, ingredients: '' })
        this.setState({ IArry: newDataimg }, () => {
            console.log('hello', this.state.IArry);
        })
    }

    Cookstep2 = () => {
        if (this.state.step1Data == '' || this.state.step2Data == '' || this.state.step3Data == '') {
            alert('Please fill all step')
        } else {
            this.setState({ cookshow: false, })
        }
    }
    info = () => {
        if (this.state.servicetimeData == '' || this.state.nutritionData == '' || this.state.tagsData == '') {
            alert('Please fill all step')
        } else {
            this.setState({ additioninfo: false, })
        }
    }
    Deleteimg = () => {
        console.log('//', this.state.storeclickimg);
        console.log('//', this.state.arrayImg);

        if (this.state.storeclickimg == '') {
            alert('please select photo')
        } else {
            this.state.arrayImg = this.state.arrayImg.filter(item => item !== this.state.storeclickimg)
            this.setState({ arrayImg: this.state.arrayImg })
        }
    }
    setGallerywallpepers = async () => {
        console.log('arrayImg', this.state.arrayImg);
        this.setState({ setGallerywallpeper: '' }, () => {
            this.setState({ setGallerywallpeper: this.state.storeclickimg }, () => {
                // console.log('storeclickimg', this.state.setGallerywallpeper);
                // this.state.arrayImg = this.state.arrayImg.filter(item => item !== this.state.storeclickimg)
                // this.setState({ arrayImg: this.state.arrayImg })
                // this.setState({showme: false,showmecopy : true})
                if (this.state.storeclickimg == this.state.setGallerywallpeper) {
                    this.setState({ showgreentick: true })
                } else {
                    this.setState({ showgreentick: false })
                }

            })
        })
    }

    GO = (item) => {
        // if(this.state.storeclickimg == '')
        // {
        //     this.setState({inisialetick : true}) 
        // }else{this.setState({inisialetick : true})}
        this.setState({ storeclickimg: item })
        if (item == this.state.setGallerywallpeper) {
            this.setState({ showgreentick: true })
        } else {
            this.setState({ showgreentick: false })
        }
    }

    onSelectImage = (image) => {
        let newDataimg = this.state.arrayImg;
        let item = {
            uri: image.path,
            width: image.width,
            height: image.height,
            key: 'false',
        };
        newDataimg.push(item);
        this.setState({ arrayImg: newDataimg }, () => {
            console.log('hello', this.state.filelist);
        })
    }
    AddimgGallery = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            this.onSelectImage(image);
        });
    };
    render() {
        // console.warn(this.state.step1Data);
        console.log('this.state.arrayImg', this.state.arrayImg);

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ flex: 1, backgroundColor: 'white', }}  >
                    <View style={{ marginLeft: wp('3%') }}>
                        <Back color={'grey'} btnbacktext={'Back to My Profile'} btnback={() => this.props.navigation.navigate('homeitem')} />
                    </View>
                    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                        <View style={{ marginLeft: wp('3%') }}>
                            <Text style={{ fontSize: hp('3%'), marginLeft: wp('2%'), fontFamily: 'Nunito-Bold' }}>Edit Recipe</Text>
                        </View>
                        <View style={{ marginLeft: wp('5%'), marginTop: hp('1.3%'), marginBottom: hp('0.5%'), flexDirection: 'row' }}>
                            <ImageBackground style={{ height: hp('7%'), width: wp('15%'), marginTop: hp('1%') }} resizeMode='cover' source={require('../../assets/image/click_img.png')}>
                                <TouchableOpacity onPress={() => this.setState({ visibleValue: true })}>
                                    <Image style={{ height: hp('7%'), width: wp('15%'), }} resizeMode='cover' source={{ uri: this.state.logoshow }} />
                                </TouchableOpacity>
                            </ImageBackground>
                            <View style={{ marginTop: hp('1%'), marginLeft: wp('5%') }}>
                                <Text style={{ fontSize: hp('1.6%'), color: '#454545', fontFamily: 'Nunito-Regular' }}>Recipe Name</Text>
                                <TextInput keyboardType='default' style={{ height: hp('4.5%'), width: wp('68%'), borderBottomColor: 'silver', borderBottomWidth: 1 }} value={this.state.recipename} onChangeText={recipename => this.setState({ recipename: recipename })} placeholder={'Enter your Recipe'} ></TextInput>
                            </View>
                        </View>
                        {/* <Text>{this.state.arrayImg}</Text> */}

                        {/* {
                            this.state.setGallerywallpeper !== "" && this.state.setGallerywallpeper.uri !== undefined
                                ?
                                <Image
                                    style={{ width: wp('80.5%'), height: hp('13%'), resizeMode: 'contain' }}
                                    source={{ uri: this.state.setGallerywallpeper.uri }} />
                                :
                                <Text>Hellllo</Text>
                        } */}

                        {
                            this.state.arrayImg.length >= 0
                                ?
                                <View style={s.buttonContainer}>
                                    <View style={{ marginLeft: ('5%'), width: wp('82%'), marginTop: hp('1%'), height: hp('4%'), backgroundColor: 'white', justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={{ fontSize: hp('1.8%'), fontFamily: 'Nunito-Regular' }}>Gallery</Text>
                                        <TouchableOpacity style={{ height: hp('3.3%'), width: wp('10%'), justifyContent: 'center', alignItems: 'center' }} onPress={() => this.setState({ openGallery: true })}>
                                            <Image style={{ height: hp('2.5%'), width: wp('5%'), }} resizeMode='cover' source={require('../../assets/image/Edit.png')}></Image>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ width: wp('80.5%'), backgroundColor: 'silver', alignSelf: 'center' }}>
                                        {/* {
                                            this.state.setGallerywallpeper !== ''
                                                ?
                                                <FlatList
                                                    showsHorizontalScrollIndicator={false}
                                                    data={this.state.setGallerywallpeper}
                                                    renderItem={({ item, index }) => (
                                                        <View>
                                                            <Image
                                                                style={{ width: wp('80.5%'), height: hp('13%'), resizeMode: 'contain' }}
                                                                source={{ uri: item.uri }} />
                                                        </View>
                                                    )}
                                                    keyExtractor={(item, index) => index.toString()}
                                                />
                                                :
                                                null
                                        } */}
                                        {
                                            this.state.setGallerywallpeper !== "" && this.state.setGallerywallpeper.uri !== undefined
                                                ?
                                                <Image
                                                    style={{ width: wp('80.5%'), height: hp('13%'), resizeMode: 'contain' }}
                                                    source={{ uri: this.state.setGallerywallpeper.uri }} />
                                                :
                                                <Text>Hellllo</Text>
                                        }
                                    </View>
                                    <View style={{ height: hp('13%'), width: wp('80.5%'), alignSelf: 'center' }}>
                                        <View style={{ flexDirection: 'row', marginTop: hp('1%'), width: wp('55%'), backgroundColor: "white" }}>
                                            {this.state.showme ? (
                                                <View>
                                                    <FlatList
                                                        horizontal={true}
                                                        showsVerticalScrollIndicator={false}
                                                        data={this.state.arrayImg.filter(item => item !== this.state.setGallerywallpeper).slice(0, 2)}
                                                        renderItem={({ item, index }) => (
                                                            <View>
                                                                <Image
                                                                    style={{ width: wp('25%'), marginRight: hp('1%'), height: hp('10%'), resizeMode: 'contain' }}
                                                                    source={{ uri: item.uri }} />
                                                            </View>
                                                        )}
                                                        keyExtractor={(item, index) => index.toString()}
                                                    />

                                                </View>

                                            ) : null}
                                            {this.state.showmecopy ? (
                                                <View>
                                                    <FlatList
                                                        horizontal={true}
                                                        showsVerticalScrollIndicator={false}
                                                        data={this.state.arrayImg.slice(0, 2).filter(item => item !== this.state.storeclickimg)}
                                                        renderItem={({ item, index }) => (
                                                            <View>
                                                                <Image
                                                                    style={{ width: wp('25%'), marginRight: hp('1%'), height: hp('10%'), resizeMode: 'contain' }}
                                                                    source={{ uri: item.uri }} />
                                                            </View>
                                                        )}
                                                        keyExtractor={(item, index) => index.toString()}
                                                    />

                                                </View>

                                            ) : null}
                                            {this.state.showme1 ? (
                                                <TouchableOpacity onPress={() => this.setState({ showme: false, showMe2: true, showme1: false })}>
                                                    <ImageBackground style={{ justifyContent: 'center', alignItems: 'center', height: hp('10%'), width: wp('26%') }} source={require('../../assets/image/addimg.png')} resizeMode='cover'>
                                                        <Text style={{ fontSize: hp('2%'), fontFamily: 'Nunito-Bold', }}>{this.state.arrayImg.length - 3}+</Text>
                                                    </ImageBackground>
                                                </TouchableOpacity>
                                            ) : null}
                                        </View>
                                        {this.state.showMe2 ? (
                                            <View>
                                                <FlatList
                                                    horizontal={true}
                                                    showsHorizontalScrollIndicator={false}
                                                    data={this.state.arrayImg.filter(item => item !== this.state.setGallerywallpeper)}
                                                    renderItem={({ item, index }) => (
                                                        <View>
                                                            <Image
                                                                style={{ width: wp('25%'), marginRight: hp('1%'), height: hp('10%'), resizeMode: 'contain' }}
                                                                source={{ uri: item.uri }} />
                                                        </View>
                                                    )}
                                                    keyExtractor={(item, index) => index.toString()}
                                                />
                                            </View>
                                        ) : null}
                                        {/* {this.state.showMe3 ? (
                                            <View>
                                                <FlatList
                                                    horizontal={true}
                                                    showsHorizontalScrollIndicator={false}
                                                    data={this.state.arrayImg.filter(item => item !== this.state.storeclickimg)}
                                                    renderItem={({ item, index }) => (
                                                        <View>
                                                            <Image
                                                                style={{ width: wp('25%'), marginRight: hp('1%'), height: hp('10%'), resizeMode: 'contain' }}
                                                                source={{ uri: item.uri }} />
                                                        </View>
                                                    )}
                                                    keyExtractor={(item, index) => index.toString()}
                                                />
                                            </View>
                                        ) : null} */}
                                    </View>
                                </View>
                                :
                                null
                        }

                        <View style={s.Ingredients}>
                            <View style={{ marginLeft: ('5%'), width: wp('82%'), marginTop: hp('1%'), height: hp('4%'), backgroundColor: 'white', justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: hp('1.8%'), fontFamily: 'Nunito-Regular' }}>Ingredients</Text>
                                <TouchableOpacity onPress={() => this.setState({ ingredientsshow: true })} style={{ height: hp('3.3%'), width: wp('10%'), justifyContent: 'center', alignItems: 'center' }} >
                                    <Image style={{ height: hp('2.5%'), width: wp('5%'), }} resizeMode='cover' source={require('../../assets/image/Edit.png')}></Image>
                                </TouchableOpacity>
                            </View>
                            <View style={{ height: hp('8%'), width: wp('80%'), marginLeft: wp('6.5%') }}>
                                <View style={{ width: wp('75%'), flexDirection: 'row' }}>
                                    {this.state.ingrediendshow ? (
                                        <FlatList
                                            showsHorizontalScrollIndicator={false}
                                            data={this.state.IngrediansImgArry.slice(0, 4)}
                                            horizontal
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
                                    ) : null}
                                    {this.state.ingrediendsplusshow ? (
                                        <TouchableOpacity onPress={() => this.setState({ ingrediendshow: false, ingrediendsfull: true, ingrediendsplusshow: false })} style={{ height: hp('5%'), width: wp('11%'), marginTop: hp('1%'), marginLeft: hp('1%') }} >
                                            <ImageBackground style={{ justifyContent: 'center', alignItems: 'center', height: hp('5%'), width: wp('11%') }} source={require('../../assets/image/ingredintphoto/ingimg.png')} resizeMode='cover'>
                                                <Text style={{ fontSize: hp('2%'), fontFamily: 'Nunito-Bold', }}>{this.state.IngrediansImgArry.length - 4}+</Text>
                                            </ImageBackground>
                                        </TouchableOpacity>
                                    ) : null}
                                </View>
                                {this.state.ingrediendsfull ? (
                                    <View>
                                        <FlatList
                                            horizontal={true}
                                            showsHorizontalScrollIndicator={false}
                                            data={this.state.IngrediansImgArry}
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
                                    </View>
                                ) : null}
                            </View>
                            <View style={{ width: wp('80%'), marginLeft: wp('6.5%'), height: hp('6%') }}>
                                <Text style={{ fontSize: hp('1.6%'), marginBottom: hp('1%'), color: 'silver', fontFamily: 'Nunito-Regular' }}>External add ingredients</Text>
                                <FlatList
                                    showsHorizontalScrollIndicator={false}
                                    data={this.state.IArry}
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
                            </View>

                        </View>
                        <View style={s.cook}>
                            <View style={{ marginLeft: ('5%'), width: wp('82%'), marginTop: hp('1%'), height: hp('3%'), backgroundColor: 'white', justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: hp('1.8%'), fontFamily: 'Nunito-Regular' }}>How to cook</Text>
                                <TouchableOpacity style={{ height: hp('3.3%'), width: wp('10%'), justifyContent: 'center', alignItems: 'center' }} onPress={() => this.setState({ cookshow: true, step1Data: '', step2Data: '', step3Data: '' })} >
                                    <Image style={{ height: hp('2.5%'), width: wp('5%'), }} resizeMode='cover' source={require('../../assets/image/Edit.png')}></Image>
                                </TouchableOpacity>
                            </View>
                            <View style={{ backgroundColor: 'white' }}>
                                <View style={{ margin: wp('5%'), width: ('75%') }}>
                                    <TouchableOpacity onPress={() => Alert.alert("Step 1 Full Detail", this.state.step1Data)}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Image style={{ height: hp('2.5%'), width: wp('7%'), marginRight: wp('5%') }} resizeMode='contain' source={require('../../assets/image/Numbering1.png')}></Image>
                                            <Text numberOfLines={3} style={{ fontSize: hp('1.5%'), fontFamily: 'Nunito-regular', marginLeft: wp('1%') }}>{this.state.step1Data}</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => Alert.alert("Step 2 Full Detail", this.state.step2Data)}>
                                        <View style={{ flexDirection: 'row', marginTop: hp('3%') }}>
                                            <Image style={{ height: hp('2.5%'), width: wp('7%'), marginRight: wp('5%') }} resizeMode='contain' source={require('../../assets/image/Numbering.png')}></Image>
                                            <Text numberOfLines={3} style={{ fontSize: hp('1.5%'), marginBottom: wp('3%'), fontFamily: 'Nunito-regular', marginLeft: wp('1%') }}>{this.state.step2Data}</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => Alert.alert("Step 3 Full Detail", this.state.step3Data)}>
                                        <View style={{ flexDirection: 'row', marginTop: hp('3%') }}>
                                            <Image style={{ height: hp('2.5%'), width: wp('7%'), marginRight: wp('5%') }} resizeMode='contain' source={require('../../assets/image/Numbering2.png')}></Image>
                                            <Text numberOfLines={3} style={{ fontSize: hp('1.5%'), fontFamily: 'Nunito-regular', marginLeft: wp('1%') }}>{this.state.step3Data}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View style={s.info}>
                            <View style={{ marginLeft: ('5%'), width: wp('82%'), marginTop: hp('1%'), height: hp('3%'), backgroundColor: 'white', justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: hp('1.8%'), fontFamily: 'Nunito-Regular' }}>Additional Info</Text>
                                <TouchableOpacity style={{ height: hp('3.3%'), width: wp('10%'), justifyContent: 'center', alignItems: 'center' }} onPress={() => this.setState({ additioninfo: true, servicetimeData: '', nutritionData: '', tagsData: '' })} >
                                    <Image style={{ height: hp('2.5%'), width: wp('5%'), }} resizeMode='cover' source={require('../../assets/image/Edit.png')}></Image>
                                </TouchableOpacity>
                            </View>
                            <View style={{ backgroundColor: 'white' }}>
                                <View style={{ marginHorizontal: wp('5%'), marginTop: hp('3%'), width: ('75%'), }}>
                                    <View style={{ flexDirection: 'row', }}>
                                        <Text style={{ fontSize: hp('1.7%'), fontFamily: 'Nunito-regular', marginBottom: wp('3%'), width: wp('40%'), color: 'silver' }}>Serice Time</Text>
                                        <Text numberOfLines={1} style={{ fontSize: hp('1.7%'), marginBottom: wp('3%'), fontFamily: 'Nunito-regular', width: wp('40%'), }}>{this.state.servicetimeData}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontSize: hp('1.7%'), fontFamily: 'Nunito-regular', marginBottom: wp('3%'), width: wp('40%'), color: 'silver' }}>Nutrition Facts</Text>
                                        <Text numberOfLines={5} style={{ fontSize: hp('1.7%'), marginBottom: wp('3%'), fontFamily: 'Nunito-regular', width: wp('40%'), }}>{this.state.nutritionData}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontSize: hp('1.7%'), width: wp('40%'), fontFamily: 'Nunito-regular', color: 'silver' }}>Tags</Text>
                                        <Text numberOfLines={3} style={{ fontSize: hp('1.7%'), fontFamily: 'Nunito-regular', width: wp('40%'), }}>{this.state.tagsData}</Text>
                                    </View>

                                </View>
                            </View>
                        </View>

                        <Text style={{ fontSize: hp('1.6%'), marginLeft: wp('5%'), marginTop: hp('1%'), marginBottom: hp('1%'), color: 'silver', fontFamily: 'Nunito-Regular' }}>Save To</Text>
                        <View style={{ marginLeft: wp('5%'), flexDirection: 'row' }}>
                            <TouchableOpacity style={s.TO} onPress={() => this.Show()}>
                                <Text style={{ fontSize: hp('2%'), color: 'gray', fontFamily: 'Nunito-Bold', marginLeft: wp('1%') }}>{this.state.StaticName}</Text>
                                <Image style={{ height: hp('2%'), width: wp('5%'), }} resizeMode='contain' source={require('../../assets/image/DownArrow.png')}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity style={s.TO1}  >
                                <Text style={{ fontSize: hp('2%'), color: '#58D68D', fontFamily: 'Nunito-Bold' }}>Save Recipe</Text>
                            </TouchableOpacity>
                        </View>
                        {this.state.EditDrop ? (
                            <View>
                                <FlatList
                                    showsVerticalScrollIndicator={false}
                                    data={Type}
                                    renderItem={({ item, index }) => (
                                        // () => this.setState({count:index}),alert(this.state.count),
                                        <View style={{ width: wp('80%'), borderLeftWidth: 1, borderRightWidth: 1, borderColor: 'grey' }}>
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
                        <TouchableOpacity style={s.TO3} onPress={() => this.Remove()} >
                            <Image style={{ height: hp('2.5%'), width: wp('7%'), marginRight: wp('5%') }} resizeMode='contain' source={require('../../assets/image/Delete.png')}></Image>
                            <Text style={{ fontSize: hp('2%'), color: 'white', fontFamily: 'Nunito-Bold', color: '#58D68D' }}>Remove from Cookbook</Text>
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
                        <View style={{ flex: 1, flexDirection:'column-reverse', backgroundColor: '#000000aa' }}>
                            <View style={{ height: hp('55%'), width: wp('100%'), backgroundColor: 'white', borderRadius: 10, padding: ('7%'), }}>
                                <View >
                                    <Text style={{ fontFamily: 'Nunito-Regular', fontSize: hp('2.5%'), alignSelf: 'center' }}>Add Ingredients</Text>
                                    <Text style={{ fontSize: hp('1.6%'), color: '#454545', fontFamily: 'Nunito-Regular', alignSelf: 'center' }}>Only click on ingredients and it will added</Text>
                                    <View style={{ height: hp('8%'), marginTop: hp('3%') }}>
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
                                    <Text style={{ fontSize: hp('1.6%'), marginTop: hp('3.5%'), color: '#454545', fontFamily: 'Nunito-Regular', alignSelf: 'center' }}>External add ingredients</Text>
                                </View>
                                <View>
                                    <Text style={{ fontFamily: 'Nunito-Regular', fontSize: hp('1.5%'), color: 'grey' }}>Ingredients</Text>
                                    <TextInput style={{ height: hp('7%'), width: wp('85.5%'), borderBottomColor: 'silver', borderBottomWidth: 1 }}
                                        value={this.state.ingredients}
                                        onChangeText={ingredients => this.setState({ ingredients: ingredients })}
                                        placeholder='Enter Ingredients'
                                        keyboardType='default'
                                    >
                                    </TextInput>

                                </View>
                                <View style={{ marginTop: hp('2.5%') }}>
                                    <TouchableOpacity style={s.modelclick3} onPress={() => this.onAddIngrediend(this.state.ingredients)}>
                                        <Text style={{ fontSize: hp('2%'), color: 'green', fontFamily: 'Nunito-Bold' }}>Add More</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={s.modelclick3} onPress={() => this.setState({ ingredientsshow: false })} >
                                        <Text style={{ fontSize: hp('2%'), color: 'green', fontFamily: 'Nunito-Bold' }}>Submit</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>

                    <Modal transparent={true} visible={this.state.cookshow}>
                        <View style={{ flex: 1,flexDirection:"column-reverse", backgroundColor: '#000000aa' }}>
                            <View style={{ height: hp('55%'), width: wp('100%'), backgroundColor: 'white', borderRadius: 10, padding: ('5%') }}>
                                <View >
                                    <Text style={{ fontFamily: 'Nunito-Regular', fontSize: hp('2.5%'), alignSelf: 'center' }}>Step for Cook</Text>
                                    <Text style={{ fontSize: hp('1.6%'), color: '#454545', fontFamily: 'Nunito-Regular', alignSelf: 'center' }}>Make sure your step fit on all 3 Steps</Text>
                                    <Text style={{ fontSize: hp('1.6%'), color: '#454545', fontFamily: 'Nunito-Regular', alignSelf: 'center' }}>(Empty step is not allowed)</Text>
                                </View>
                                <ModalInput name={"Step 1:-"} onChangeText={step1Data => this.setState({ step1Data: step1Data })} value={this.state.step1Data} placeholder={'Enter Ingredients'} />
                                <ModalInput name={"Step 2:-"} onChangeText={step2Data => this.setState({ step2Data: step2Data })} value={this.state.step2Data} placeholder={'Enter Ingredients'} />
                                <ModalInput name={"Step 3:-"} onChangeText={step3Data => this.setState({ step3Data: step3Data })} value={this.state.step3Data} placeholder={'Enter Ingredients'} />
                                <View style={{ marginTop: hp('2.5%') }}>
                                    <TouchableOpacity style={s.modelclick2} onPress={() => this.Cookstep2()} >
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
                        <View style={{ flex: 1,flexDirection:"column-reverse", backgroundColor: '#000000aa' }}>
                            <View style={{ height: hp('55%'), width: wp('100%'), backgroundColor: 'white', borderRadius: 10, padding: ('5%') }}>
                                <View >
                                    <Text style={{ fontFamily: 'Nunito-Regular', fontSize: hp('2.5%'), alignSelf: 'center' }}>Additional Info</Text>
                                    <Text style={{ fontSize: hp('1.6%'), color: '#454545', fontFamily: 'Nunito-Regular', alignSelf: 'center' }}>Make sure all additional info full fill</Text>
                                    <Text style={{ fontSize: hp('1.6%'), color: '#454545', fontFamily: 'Nunito-Regular', alignSelf: 'center' }}>(Empty info is not allowed)</Text>
                                </View>
                                <ModalInput name={'Service TIme'} onChangeText={step1 => this.setState({ servicetimeData: step1 })} value={this.state.servicetimeData} placeholder={'Enter ServiceTime'} />
                                <ModalInput name={"Nutrition Facts"} onChangeText={step2 => this.setState({ nutritionData: step2 })} value={this.state.nutritionData} placeholder={'Enter Nutrition'} />
                                <ModalInput name={"Tags"} onChangeText={step3 => this.setState({ tagsData: step3 })} value={this.state.tagsData} placeholder={'Enter Tags'} />
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
                    <Modal transparent={true} visible={this.state.openGallery}>
                        <View style={{ flex: 1, alignItems: 'center', flexDirection: 'column-reverse', backgroundColor: '#000000aa' }}>
                            <View style={{ height: hp('60%'), width: wp('100%'), backgroundColor: 'white', borderTopLeftRadius: 25, borderTopRightRadius: 25, padding: ('5%') }}>
                                <View style={{ width: wp('90%'), marginTop: hp('1%'), height: hp('3%'), backgroundColor: 'white', justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: hp('2.2%'), fontFamily: 'Nunito-Bold' }}>Edit Gallery</Text>
                                    <TouchableOpacity style={{ height: hp('3.3%'), width: wp('8%'), justifyContent: 'center', alignItems: 'center' }} onPress={() => this.setState({ openGallery: false })} >
                                        <Image style={{ height: hp('2.5%'), width: wp('5%'), }} resizeMode='cover' source={require('../../assets/image/Close.png')}></Image>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: wp('85%'), marginTop: hp('3%'), marginBottom: hp('1%'), height: hp('3%'), backgroundColor: 'white', alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: hp('1.8%'), fontFamily: 'Nunito-Bold' }}>Image({this.state.arrayImg.length})</Text>
                                    <TouchableOpacity onPress={() => this.setState({})} >
                                        <Text style={{ fontSize: hp('1.8%'), color: "#58D68D", fontFamily: 'Nunito-Bold' }}>View All</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: wp('85%') }}>
                                    <FlatList
                                        showsHorizontalScrollIndicator={false}
                                        data={this.state.arrayImg}
                                        horizontal
                                        renderItem={({ item, index }) => (
                                            // this.state.arrayImg.item.kety,
                                            <View style={{ margin: hp('0.5%') }} >
                                                <TouchableOpacity onPress={() => this.GO(item)} >
                                                    {/* <View style={{ borderWidth: this.state.inisialetick == '' ? 1 : 0, borderColor: this.state.storeclickimg == '' ? 'green' : 'white'}}> */}
                                                    <View style={{ borderWidth: this.state.storeclickimg == item ? 1 : 0, borderColor: this.state.storeclickimg == item ? 'green' : 'white', padding: hp('0.5%') }}>
                                                        <Image style={{ padding: 10, backgroundColor: "silver", width: wp('30%'), height: hp('12%'), resizeMode: 'contain' }} source={item} />
                                                    </View>
                                                    {/* </View> */}

                                                    {/* <Text>{item.key}</Text> */}
                                                </TouchableOpacity>
                                            </View>
                                        )}
                                        keyExtractor={(item, index) => index.toString()}
                                        onEndReached={this.loadMore}
                                    />
                                    {/* <RadioButtonRN
                                        data={data}
                                        selectedBtn={(e) => console.log(e)}
                                        activeColor='green'
                                        box={false}

                                    /> */}
                                    {/* <RadioForm
                                        radio_props={radio_props}
                                        buttonContainer='red'
                                        buttonColor={'#50C900'}
                                        onPress={(value) => { this.setState({ value: value }) }}
                                        buttonInnerColor={'#e74c3c'}
                                        buttonOuterColor={'#2196f3'}
                                    /> */}
                                    {/* <RadioButton
                                        value="first"
                                        backgroundColor='red'
                                         /> */}
                                    <TouchableOpacity style={s.editgallerydelete} onPress={() => this.setGallerywallpepers()}>
                                        {this.state.showgreentick ? (
                                            <Image style={{ height: hp('3%'), width: wp('5%'), }} resizeMode='contain' source={require('../../assets/image/checkgreen.jpg')}></Image>
                                        ) : null}
                                        <Text style={{ color: this.state.showgreentick ? 'green' : 'black', fontSize: hp('1.6%'), marginLeft: wp('2.5%'), fontFamily: 'Nunito-Regular' }}>Set as Cover</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={s.editgallerydelete} onPress={() => this.Deleteimg()}>
                                        <Image style={{ height: hp('1.5%'), width: wp('5%'), }} resizeMode='cover' source={require('../../assets/image/Delete.png')}></Image>
                                        <Text style={{ fontSize: hp('1.6%'), marginLeft: wp('2.5%'), fontFamily: 'Nunito-Regular' }}>Remove</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={s.editgalleryclick} onPress={() => this.AddimgGallery()}>
                                        <Image style={{ marginLeft: wp('4%'), height: hp('1.5%'), width: wp('3%'), }} resizeMode='cover' source={require('../../assets/image/plus.png')}></Image>
                                        <Text style={{ fontSize: hp('1.6%'), marginLeft: wp('2.5%'), color: 'silver', fontFamily: 'Nunito-Regular' }}>Upload Images</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={s.donebtn}   >
                                        <Text style={{ fontSize: hp('2%'), color: 'white', fontFamily: 'Nunito-Regular' }}>Save Gallery</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>
                    </Modal>
                </View>
            </SafeAreaView >
        )
    }

}

const s = StyleSheet.create(
    {
        buttonContainer: {
            backgroundColor: 'white',
            shadowColor: 'silver',
            shadowOffset: {
                width: 0,
                height: 4,
            },

            borderRadius: 10,
            shadowRadius: 5,
            shadowOpacity: 1.0,
            width: wp('90%'),
            elevation: 5,
            height: hp('31%'), marginHorizontal: ('5%'), marginVertical: ('2.2%')
        },
        Ingredients: {
            backgroundColor: 'white',
            shadowColor: 'silver',
            shadowOffset: {
                width: 0,
                height: 4,
            },

            borderRadius: 10,
            shadowRadius: 5,
            shadowOpacity: 1.0,
            width: wp('90%'),
            elevation: 5,
            height: hp('21%'), marginHorizontal: ('5%'), marginVertical: ('2.2%')
        },
        cook: {
            backgroundColor: 'white',
            shadowColor: 'silver',
            shadowOffset: {
                width: 0,
                height: 4,
            },
            borderRadius: 10,
            borderBottomEndRadius: 10,
            borderBottomLeftRadius: 10,
            shadowRadius: 5,
            shadowOpacity: 1.0,
            width: wp('90%'),
            elevation: 5,
            height: hp('36.5%'), marginTop: ('2.2%'), marginHorizontal: ('5%'), marginBottom: hp('2%')
        },
        info: {
            backgroundColor: 'white',
            shadowColor: 'silver',
            shadowOffset: {
                width: 0,
                height: 4,
            },
            borderRadius: 10,
            borderBottomEndRadius: 10,
            borderBottomLeftRadius: 10,
            shadowRadius: 5,
            shadowOpacity: 1.0,
            width: wp('90%'),
            elevation: 5,
            height: hp('32%'), marginTop: ('2.2%'), marginHorizontal: ('5%'), marginBottom: hp('2%')
        },
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
            borderWidth: 1, borderColor: '#58D68D',
            flexDirection: 'row',
            height: hp('5%'),
            width: wp('38.5%'),
            padding: ('2%'),
            marginLeft: hp('1%'),
            marginVertical: hp('0.5%'),
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
        TO2: {
            backgroundColor: 'white',
            borderRadius: 10,
            flexDirection: 'row',
            height: hp('5%'),
            width: wp('90.5%'),
            padding: ('2%'), marginHorizontal: wp('5%'),
            backgroundColor: '#58D68D',
            marginVertical: hp('1%'),
            justifyContent: 'center',
            alignItems: 'center',
        },
        TO3: {
            backgroundColor: 'white',
            borderRadius: 10,
            flexDirection: 'row',
            height: hp('5%'),
            width: wp('90.5%'),
            padding: ('2%'), marginHorizontal: wp('5%'),
            marginBottom: hp('1%'),
            justifyContent: 'center',
            alignItems: 'center',
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
            width: wp('90%'),
            padding: ('2%'),
            marginVertical: hp('0.5%'),
            justifyContent: 'center',
            alignItems: 'center',
        },
        modelclick3: {
            backgroundColor: 'white',
            borderRadius: 10,
            borderWidth: 1, borderColor: 'green',
            flexDirection: 'row',
            height: hp('5%'),
            width: wp('85%'),
            padding: ('2%'),
            marginVertical: hp('0.5%'),
            justifyContent: 'center',
            alignItems: 'center',
        },
        donebtn: {
            backgroundColor: '#28B463',
            flexDirection: 'row',
            borderRadius: 10,
            height: hp('5%'),
            width: wp('85%'),
            padding: ('2%'),
            marginLeft: wp('3%'),
            marginVertical: hp('3%'),
            justifyContent: 'center',
            alignItems: 'center',
        },
        editgalleryclick: {
            flexDirection: 'row',
            borderStyle: 'dotted',
            borderRadius: 5,
            borderWidth: 1,
            height: hp('5%'),
            marginLeft: ('3%'),
            width: wp('85%'),
            alignItems: 'center',
            marginTop: wp('7%'),
            justifyContent: 'center'
        },
        editgallerydelete: {
            flexDirection: 'row',
            height: hp('4%'),
            marginLeft: ('3%'),
            width: wp('35%'),
            marginTop: wp('4%'),
            alignItems: 'center'
        },
        button: {
            alignItems: 'center',
            backgroundColor: '#4267b2',
            padding: 8
        }
    }
)