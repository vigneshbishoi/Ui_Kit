import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, TextInput, FlatList, ScrollView, Modal, } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Data from '../../../Array'
import Slider from '@react-native-community/slider';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const Type = [{ type: 'pizza' }, { type: 'eggs' }, { type: 'pasta' }, { type: 'cake' }]

export default class Main extends React.Component {

    constructor() {
        super();
        this.state = {
            search: '', showTrending: true, showTrending1: false, textflatclick: '', showfilter: false, showMetextclick: true,
            showMetextclick1: false, showMetextclick2: false, matchtextflat: '', Ingredientscount: '', single: '', multiSliderValue: [1, 40],
            first: 1, second: 40, changeBtncolor: false, changeBtncolor1: false, changeBtncolor2: false
        };
    }

    // componentDidMount() {
    //     this.Searchfun();
    // }

    Searchfun = () => {
        if (this.state.search != '') {
            this.setState({ showTrending: false, showTrending1: true, showMetextclick: false, showMetextclick1: false, showMetextclick2: true })
        } else {
            this.setState({ showTrending: true, showTrending1: false, showMetextclick: true, showMetextclick1: false, showMetextclick2: false })
        }
    }

    render() {
        return (
            <View style={{ backgroundColor: 'white', flex: 1 }}>
                <SafeAreaView style={{}}>
                    <View style={s.Mainview}>
                        <View style={s.buttonContainer}>
                            <TouchableOpacity style={s.TOsearch}>
                                <Image style={s.search} source={require('../../assets/image/search.png')}></Image>
                            </TouchableOpacity>
                            <TextInput style={s.textinputstyle} value={this.state.search} onChangeText={text => this.setState({ search: text }, () => this.Searchfun())} placeholder='Search recipe,people,or tags' keyboardType='default' />
                            <TouchableOpacity style={s.TOsearch} onPress={() => this.setState({ showfilter: true })}>
                                <Image style={s.search} source={require('../../assets/image/Filter.png')}></Image>
                            </TouchableOpacity>
                        </View>
                        <ScrollView>
                            <View>
                                <Text style={{ fontSize: hp('2%'), marginTop: hp('1.8%'), fontFamily: 'Nunito-Bold' }}>Trending Recipe</Text>
                                {this.state.showTrending ? (
                                    <FlatList
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                        data={Data}
                                        renderItem={({ item, index }) => (
                                            <View>
                                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Map')}>
                                                    <Image
                                                        style={{ width: wp('35%'), marginTop: hp('2%'), marginRight: wp('3%'), height: hp('22%'), resizeMode: 'cover' }}
                                                        source={item.img} />
                                                    <Text style={{ alignSelf: 'center', fontSize: hp('1.9%'), marginTop: hp('1.8%'), fontFamily: 'Nunito-Regular' }}>{item.name}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        )}
                                        keyExtractor={(item, index) => index.toString()}
                                    />
                                ) : null}
                                {this.state.showTrending1 ? (
                                    <FlatList
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                        data={Data.filter(item => item.name == this.state.search || item.foodtype == this.state.search)}
                                        renderItem={({ item, index }) => (
                                            <View>
                                                <Image
                                                    style={{ width: wp('35%'), marginTop: hp('2%'), marginRight: wp('3%'), height: hp('22%'), resizeMode: 'cover' }}
                                                    source={item.img} />
                                                <Text style={{ alignSelf: 'center', fontSize: hp('1.9%'), marginTop: hp('1.8%'), fontFamily: 'Nunito-Regular' }}>{item.name}</Text>
                                            </View>
                                        )}
                                        keyExtractor={(item, index) => index.toString()}
                                    />
                                ) : null}
                                <Image style={s.line} source={require('../../assets/image/SeparatorLine.png')}></Image>
                                <Text style={{ fontSize: hp('1.6%'), marginTop: hp('1.8%'), fontFamily: 'Nunito-Bold' }}>What can i make with...</Text>
                                <FlatList
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    data={Type}
                                    renderItem={({ item, index }) => (
                                        <TouchableOpacity style={s.textflat} onPress={() => this.setState({ matchtextflat: item.type, textflatclick: item, showMetextclick: false, showMetextclick1: true, showMetextclick2: false })}>
                                            <Text style={{ color: this.state.textflatclick == item ? 'black' : 'silver', alignSelf: 'center', fontSize: hp('2.4%'), fontFamily: 'Nunito-Bold' }}>{item.type}</Text>
                                        </TouchableOpacity>
                                    )}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                                {this.state.showMetextclick ? (
                                    <View>
                                        <FlatList
                                            horizontal={true}
                                            showsHorizontalScrollIndicator={false}
                                            data={Data}
                                            renderItem={({ item, index }) => (
                                                <View>
                                                    <Image
                                                        style={{ width: wp('35%'), marginTop: hp('1%'), marginRight: wp('3%'), height: hp('22%'), resizeMode: 'cover' }}
                                                        source={item.img} />
                                                    <Text style={{ alignSelf: 'center', fontSize: hp('1.9%'), marginTop: hp('1.8%'), fontFamily: 'Nunito-Regular' }}>{item.name}</Text>
                                                </View>
                                            )}
                                            keyExtractor={(item, index) => index.toString()}
                                        />
                                    </View>
                                ) : null}
                                {this.state.showMetextclick1 ? (
                                    <FlatList
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                        data={Data.filter(item => item.foodtype == this.state.matchtextflat)}
                                        renderItem={({ item, index }) => (
                                            <View>
                                                <Image
                                                    style={{ width: wp('35%'), marginTop: hp('1%'), marginRight: wp('3%'), height: hp('22%'), resizeMode: 'cover' }}
                                                    source={item.img} />
                                                <Text style={{ alignSelf: 'center', fontSize: hp('1.9%'), marginTop: hp('1.8%'), fontFamily: 'Nunito-Regular' }}>{item.name}</Text>
                                                <Text style={{ alignSelf: 'center', fontSize: hp('1.9%'), fontFamily: 'Nunito-Regular' }}>{item.foodtype}</Text>
                                            </View>
                                        )}
                                        keyExtractor={(item, index) => index.toString()}
                                    />
                                ) : null}
                                {this.state.showMetextclick2 ? (
                                    <FlatList
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                        data={Data.filter(item => item.name == this.state.search || item.foodtype == this.state.search)}
                                        renderItem={({ item, index }) => (
                                            <View>
                                                <Image
                                                    style={{ width: wp('35%'), marginTop: hp('2%'), marginRight: wp('3%'), height: hp('22%'), resizeMode: 'cover' }}
                                                    source={item.img} />
                                                <Text style={{ alignSelf: 'center', fontSize: hp('1.9%'), marginTop: hp('1.8%'), fontFamily: 'Nunito-Regular' }}>{item.name}</Text>
                                            </View>
                                        )}
                                        keyExtractor={(item, index) => index.toString()}
                                    />
                                ) : null}
                            </View>
                        </ScrollView>
                    </View>

                    <Modal transparent={true} visible={this.state.showfilter}>
                        <View style={{ flex: 1, backgroundColor: '#000000aa', alignItems: 'center' }}>
                            <View style={{ height: hp('63.5%'), width: wp('90%'), marginTop: hp('10%'), backgroundColor: "white", borderRadius: 10, alignItems: 'center' }}>
                                <View style={s.buttonContainer1}>
                                    <TouchableOpacity style={s.TOsearch}>
                                        <Image style={s.search} source={require('../../assets/image/search.png')}></Image>
                                    </TouchableOpacity>
                                    <TextInput style={s.textinputstyle1} placeholder='Sweets' keyboardType='default' />
                                    <TouchableOpacity style={s.TOsearch} >
                                        <Image style={s.search} source={require('../../assets/image/Filter.png')}></Image>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ padding: hp('3.5%') }}>
                                    <View style={{ backgroundColor: 'white' }}>
                                        <Text style={{ fontSize: hp('2%'), marginTop: hp('1.8%'), fontFamily: 'Nunito-Bold' }}>Search Filter</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: hp('2.2%'), }}>
                                            <Text style={{ fontSize: hp('1.6%'), fontFamily: 'Nunito-Regular' }}>Ingredients</Text>
                                            <Text style={{ fontSize: hp('1.6%'), fontFamily: 'Nunito-Regular', color: "silver" }}>{this.state.Ingredientscount}</Text>
                                        </View>
                                        <Slider
                                            style={{ width: wp('70%'), height: 40 }}
                                            minimumValue={1}
                                            maximumValue={15}
                                            step={1}
                                            minimumTrackTintColor="#28B463"
                                            maximumTrackTintColor="silver"
                                            onValueChange={text => this.setState({ Ingredientscount: text })}
                                        />
                                        <View style={{ flexDirection: 'row', marginTop: hp('3%'), justifyContent: 'space-between' }}>
                                            <Text style={{ fontSize: hp('1.6%'), fontFamily: 'Nunito-Regular' }}>Service Time</Text>
                                            <Text style={{ fontSize: hp('1.6%'), fontFamily: 'Nunito-Regular', color: "silver" }}>{this.state.first}-{this.state.second} mins</Text>
                                        </View>
                                        <MultiSlider
                                            trackStyle={{ backgroundColor: '#bdc3c7' }}
                                            selectedStyle={{ backgroundColor: "#5e5e5e" }}
                                            values={this.state.single ?
                                                [this.state.multiSliderValue[1]] :
                                                [this.state.multiSliderValue[0], this.state.multiSliderValue[1]]}
                                            // sliderLength={Dimensions.get('window').width-this.props.LRpadding*2}
                                            onValuesChange={this.multiSliderValuesChange}
                                            min={1}
                                            max={40}
                                            step={1}
                                            allowOverlap={false}
                                            minimumTrackTintColor="#28B463"
                                            maximumTrackTintColor="silver"
                                            // customMarker={CustomMarker}
                                            snapped={true}
                                        />
                                        <Text style={{ fontSize: hp('2%'), marginTop: hp('3%'), fontFamily: 'Nunito-Bold' }}>Search For</Text>
                                        <View style={{ flexDirection: 'row', marginTop: hp('3%') }}>
                                            <TouchableOpacity onPress={() => this.setState({ changeBtncolor: !this.state.changeBtncolor })}>
                                                <View style={[s.filterBtn1, { backgroundColor: this.state.changeBtncolor ? '#28B463' : 'white' }]} >
                                                    <Text style={{ fontSize: hp('1.6%'), color: this.state.changeBtncolor ? 'white' : '#28B463' }}>40 recipes</Text>
                                                </View>
                                            </TouchableOpacity >
                                            <TouchableOpacity style={{ marginLeft: hp('2.5%') }} onPress={() => this.setState({ changeBtncolor1: !this.state.changeBtncolor1 })} >
                                                <View style={[s.filterBtn2, { backgroundColor: this.state.changeBtncolor1 ? '#28B463' : 'white' }]}>
                                                    <Text style={{ fontSize: hp('1.6%'), color: this.state.changeBtncolor1 ? 'white' : '#28B463', fontFamily: 'Nunito-Regular' }}>4 prifile</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        <TouchableOpacity style={{ marginTop: hp('1.6%') }} onPress={() => this.setState({ changeBtncolor2: !this.state.changeBtncolor2 })}>
                                            <View style={[s.filterBtn3, { backgroundColor: this.state.changeBtncolor2 ? '#28B463' : 'white' }]}>
                                                <Text style={{ fontSize: hp('1.6%'), color: this.state.changeBtncolor2 ? 'white' : '#28B463', fontFamily: 'Nunito-Regular' }}>8 tags</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={s.modelclick2} onPress={() => this.setState({ showfilter: false })} >
                                            <Text style={{ fontSize: hp('2%'), color: 'white', fontFamily: 'Nunito-Bold' }}>Apply Filter</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Modal>

                </SafeAreaView>
            </View>
        )
    }
    multiSliderValuesChange = values => {
        if (this.state.single) {
            this.setState({
                second: values[0],
            })
        } else {
            this.setState({
                multiSliderValue: values,
                first: values[0],
                second: values[1],
            })
        }
        //  this.props.callback(values)
    }

}

const s = StyleSheet.create({
    Mainview: {
        marginLeft: wp('5%'),
    },
    TOsearch: {
        backgroundColor: 'white',
        height: hp('5.3%'),
        width: wp('10%'),
        alignItems: 'center',

    },
    search: {
        backgroundColor: 'white',
        height: hp('3%'),
        width: wp('6%'),
        marginTop: hp('1.2%')
    },
    line: {
        backgroundColor: 'white',
        height: hp('0.2%'),
        width: wp('90%'),
        marginTop: hp('2%')
    },
    buttonContainer: {
        flexDirection: 'row',
        marginVertical: hp('2%'),
        backgroundColor: 'white',
        shadowColor: 'silver',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        borderRadius: 5,
        shadowRadius: 5,
        shadowOpacity: 1.0,
        width: wp('90%'),
        height: hp('5.4%'),
        elevation: 5

    },
    buttonContainer1: {
        flexDirection: 'row',
        backgroundColor: 'white',
        shadowColor: 'silver',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        borderRadius: 10,
        shadowRadius: 5,
        shadowOpacity: 1.0,
        width: wp('89%'),
        height: hp('5.4%'),
        elevation: 5,
        marginTop: wp('0.5%')

    },
    textinputstyle: {
        backgroundColor: "white",
        height: hp('5.2%'),
        marginLeft: wp('2%'),
        width: wp('68%'),
        flex: 1, padding: 0, margin: 0
    },
    textinputstyle1: {
        backgroundColor: "white",
        height: hp('5.2%'),
        marginLeft: wp('2%'),
        width: wp('65%'),
    },
    textflat: {
        backgroundColor: 'white',
        height: hp('4%'),
        marginTop: wp('1.5%'),
        marginRight: wp('2.8%'),
        width: wp('20%'),
    },
    modelclick2: {
        backgroundColor: '#28B463',
        borderRadius: 10,
        height: hp('5%'),
        width: wp('75%'),
        padding: hp('1%'),
        marginVertical: hp('2%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    filterBtn1: {
        borderRadius: 30,
        borderWidth: 1, borderColor: '#28B463',
        height: hp('3.3%'),
        width: wp('30%'),
        justifyContent: 'center',
        alignItems: 'center',

    },
    filterBtn2: {
        backgroundColor: 'white',
        borderRadius: 30,
        borderWidth: 1, borderColor: '#28B463',
        height: hp('3.3%'),
        width: wp('30%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    filterBtn3: {
        backgroundColor: 'white',
        borderRadius: 30,
        borderWidth: 1, borderColor: '#28B463',
        height: hp('3.3%'),
        width: wp('30%'),
        justifyContent: 'center',
        alignItems: 'center',
    }
})