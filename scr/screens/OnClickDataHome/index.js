import React from 'react';
import { View, ScrollView, FlatList, Text, TouchableOpacity, Image, StyleSheet, RefreshControl } from 'react-native';
import Back from '../../components/BackTo/index'
// import {Back} from '../../components/index'
import Data from '../../../Array';
import { MyRecipes, ListClickData } from '../../components/index'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const Type = [{ type: 'all type of food' }, { type: 'pizza' }, { type: 'eggs' }, { type: 'pasta' }, { type: 'cake' }]

export default class HomeItem extends React.Component {

    constructor() {
        super();
        this.state = { fistNamelist: '', count: '', showMe: false, showMe2: true, StaticName: 'All type of Food', itemsCount: 5, refreshing: false };
    }

    componentDidMount() {
        var num = Data.length
        this.setState({ count: num })
    }
    Show() {
        if (this.state.showMe == false) {
            this.setState({ showMe: true })        
        } else {
            this.setState({ showMe: false })

        }
    }
    Show2 = (foodType) => {
        this.setState({ showMe: false, StaticName: foodType, showMe2: false });
        
        if (foodType == 'all type of food') {
            this.setState({ showMe2: true ,count:Data.length})
        } else {
            // this.setState({ count: '20'})
            this.setState({count:Data.filter(item => item.foodtype == foodType).length})
        }
    }

    onRefresh() {
        // setTimeout(() => this.setState({ refreshing: false }), 3000);
        setTimeout(() => alert("Refresing"), 2000);
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}  >
                <View style={{ marginLeft: wp('2.7%') }}>
                    <Back color={'grey'} btnbacktext={'Back to My Profile'} btnback={() => this.props.navigation.navigate('home')} />
                </View>
                <View style={{ paddingHorizontal: ('5%') }}>
                    <MyRecipes press={() => this.props.navigation.navigate('NewRecipes')}/>
                    <TouchableOpacity style={s.TO} onPress={() => this.Show()} >
                        <Text style={{ fontSize: hp('2%'), color: 'gray', fontFamily: 'Nunito-Bold', marginLeft: wp('1%') }}>{this.state.StaticName} ({this.state.count}) </Text>
                        <Image style={{ height: hp('2%'), width: wp('5%'), }} resizeMode='contain' source={require('../../assets/image/DownArrow.png')}></Image>
                    </TouchableOpacity>
                    
                    {/* {true ? (
                        <View>
                            <FlatList
                                data={Type}
                                renderItem={({ item, index }) => (
                                            <Text style={{ fontSize: hp('1.5%'), color: 'gray', fontFamily: 'Nunito-Bold' }}>{item.type}</Text>,
                                    () => this.setState({count:index}),alert(this.state.count)
                                )}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                    ) : null} */}
                    {this.state.showMe ? (
                        <View>
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                data={Type}
                                renderItem={({ item, index }) => (
                                    // () => this.setState({count:index}),alert(this.state.count),
                                    <View style={{ width: wp('90%'), borderLeftWidth: 1, borderRightWidth: 1, borderColor: 'grey' }}>
                                        <TouchableOpacity style={s.TO1} onPress={() => { this.Show2(item.type) }} >
                                            <Text style={{ fontSize: hp('1.5%'), color: 'gray', fontFamily: 'Nunito-Bold' }}>{item.type}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    // () => this.setState({count:Type.length}),alert(this.state.count)
                                )}

                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                    ) : null}
                </View>
                {/* <ScrollView  pagingEnabled={true} style={{  width: wp('100%'),}}>
                        {Data.map((source) => (
                            <ListClickData time={source.time} Mainimage={source.img} titleName={source.name}
                                 like={source.comment} comments={source.like} />
                        ))}
                    </ScrollView> */}
                {this.state.showMe2 ? (
                    <View>
                        <FlatList
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this.onRefresh.bind(this)}
                                />}
                            showsVerticalScrollIndicator={false}
                            data={Data.slice(0, this.state.itemsCount)}
                            renderItem={(item, index) => this.ShowFoodType(item, index)}
                            keyExtractor={(item, index) => index.toString()}
                            onEndReached={() => this.renderNewItem()}
                        />
                    </View>
                ) : null}
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh.bind(this)}
                        />}
                    showsVerticalScrollIndicator={false}
                    // initialNumToRender={5}
                    // maxToRenderPerBatch={5}
                    data={Data.filter(item => item.foodtype == this.state.StaticName)}
                    renderItem={(item, index) => this.ShowFoodType(item, index)}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        )
    }
    ShowFoodType({ item, index }) {

        return (
            <View style={{ width: wp('90%'), paddingHorizontal: ('5%'), marginVertical: hp('1%') }}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('foodtypeclick')}>

                    <ListClickData time={item.time} Mainimage={item.img} titleName={item.foodtype}
                        like={item.comment} comments={item.like} />

                </TouchableOpacity>
            </View>
        )
    }

    renderNewItem = () => {
        // alert('Add 5 more data')
        if (this.state.itemsCount < Data.length) {
            this.setState((prevState) => ({ itemsCount: (prevState.itemsCount + 5) }));
        }
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
            width: wp('90%'),
            padding: ('2%'),
            marginVertical: hp('0.5%'),
            justifyContent: 'space-between',
            alignItems: 'center'
        }, TO1: {
            backgroundColor: 'white',
            shadowColor: 'silver',
            flexDirection: 'row',

            width: wp('85%'),
            alignItems: 'center', borderBottomWidth: 1,
            borderBottomColor: '#C0C0C0',
            marginLeft: wp('2%'),
            padding: ('2%')
        }
    }
)