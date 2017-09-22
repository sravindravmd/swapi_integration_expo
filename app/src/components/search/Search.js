/**
 * Created by ravindras on 19/09/17.
 */
import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, Text, FlatList, ART, Dimensions, Image, Alert } from 'react-native';
import { connect } from 'react-redux';
import { CardSection, Card, TextView, Spinner } from '../common';
import { searchTextChanged, searchTextClear } from '../../actions'
import * as Animatable from 'react-native-animatable';
import Color from 'react-native-material-color';
Animatable.createAnimatableComponent(FlatList);


const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
function wp(percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}
function hp(percentage) {
    const value = (percentage * viewportHeight) / 100;
    return Math.round(value);
}

class Search extends Component {

    constructor() {
        super();

        this.state={
            searchCount: 0,
            isSearch: true,
            intervalOn: true
        }
    }

    onClear() {
        this.props.searchTextClear();
    }

    onSearch( text ) {

       if(this.state.intervalOn) {
            setInterval(()=> this.setState({ searchCount: 0, intervalOn : false }), 10000);
        }

        if(this.props.user == 'Luke Skywalker') {
            this.props.searchTextChanged(text);
        }
        else
        {
            if(this.state.searchCount < 15) {
                let count = this.state.searchCount;
                count++;
                this.setState({ searchCount: count });
                this.props.searchTextChanged(text);
            } else {
                Alert.alert(
                    'Search Limit',
                    'Your exceeded maximum searches per minute',
                    [
                        {text: 'Close'},
                    ]
                )
            }

        }

    }

    onRender({item}) {

        return (
            <Animatable.View animation="zoomInDown">

                <Card key={item.name}>
                    <View style={{flex:1, flexDirection:'row', flexWrap:'nowrap',}}>
                        <View style={{ flex:1, padding:5, justifyContent:'center', alignItems: 'flex-start'}}>
                            <Animatable.View  animation={item.largerPlanet === true ?"tada":""} easing="ease-out" iterationCount="infinite" style={{width:wp(33.7), height:wp(33.7),borderRadius:wp(25), backgroundColor:item.largerPlanet === true? Color.BROWN[200] :Color.BROWN[100], justifyContent: 'center'}}>
                                <Animatable.Text animation="zoomInUp" style={{backgroundColor:'transparent', alignSelf: 'center',color:'#FFF', fontSize: 15, fontWeight: '500'}}>{item.name}</Animatable.Text>
                            </Animatable.View>
                            <TextView style={{backgroundColor: 'transparent'}}>Diameter: {item.diameter}</TextView>
                        </View>
                        <View style={{flex:1,padding:5}}>
                            <View style={styles.imageViewStyle}>
                                <Image source={require('../../assets/images/saturn-planet-symbol-variant.png')} style={styles.imageContainerStle}/><TextView>{item.rotation_period}</TextView>
                            </View>
                            <View style={styles.imageViewStyle}>
                                <Image source={require('../../assets/images/rain-cloud.png')} style={styles.imageContainerStle}/><TextView>{item.climate}</TextView>
                            </View>
                            <View style={styles.imageViewStyle}>
                                <Image source={require('../../assets/images/gravity-theory.png')} style={styles.imageContainerStle}/><TextView>{item.gravity}</TextView>
                            </View>
                            <View style={styles.imageViewStyle}>
                                <Image source={require('../../assets/images/easter-egg-with-a-line-covering-almost-all-its-surface.png')} style={styles.imageContainerStle}/><TextView>{item.surface_water}</TextView>
                            </View>
                            <View style={styles.imageViewStyle}>
                                <Image source={require('../../assets/images/pregnancy.png')} style={styles.imageContainerStle} resizeMode={'contain'}/><TextView style={{alignSelf:'center'}}>{item.population}</TextView>
                            </View>
                            <View style={styles.imageViewStyle}>
                                <Image source={require('../../assets/images/man-standing-on-planet-surface-with-a-flag-with-one-star.png')} style={styles.imageContainerStle} resizeMode={'contain'}/><TextView style={{alignSelf:'center'}}>{item.residents.length}</TextView>
                            </View>
                            <View style={styles.imageViewStyle}>
                                <Image source={require('../../assets/images/flim-roll.png')} style={styles.imageContainerStle} resizeMode={'contain'}/><TextView style={{alignSelf:'center'}}> {item.films.length}</TextView>
                            </View>

                        </View>
                    </View>

                </Card>
            </Animatable.View>
        )
    }
    render() {

        return (
            <View style={ styles.searchViewStyle }>
                {this.props.loading ?( <View style={{position:'absolute', left:0, right: 0, bottom: 0, top: 0, zIndex:9999}}><Spinner/></View> ) : null }
                <Card>
                    <CardSection>
                        <TextInput placeholder={'Search'}
                                   autoFocus={true}
                                   autoCorrect={false}
                                   keyboardType={'web-search'}
                                   style={styles.searchTextInputStyle}
                                   onChangeText={this.onSearch.bind(this)}
                                   value={this.props.searchText}
                        />
                        <TouchableOpacity
                            style={styles.clearTextTouchableStyle}
                            onPress={this.onClear.bind(this)}>
                            <Text style={styles.clearTextStyle}>Clear</Text>
                        </TouchableOpacity>
                    </CardSection>
                </Card>


                {this.props.search_results.length === 0?  <View style={{flex:1,justifyContent:'center', alignItems:'center'}}>
                    <TextView fontSize={30} fontWeight={'bold'} color={Color.BLUEGREY[200]}>No Search Results</TextView>
                </View> :  <FlatList data={this.props.search_results} renderItem={this.onRender.bind(this)}/>
                }

            </View>
        );
    }
}

const styles = {
    searchViewStyle:{
        flex:1,
        position: 'relative',
      // backgroundColor:'#'
    },

    searchTextInputStyle:{
        color:'#000',
        paddingLeft: 5,
        paddingRight: 5,
        fontSize: 20,
        lineHeight: 23,
        flex:1
    },

    clearTextStyle:{
        color:'#cb4f30',
        lineHeight:23,
        paddingLeft: 5,
        paddingRight: 5,
        fontSize:15,
    },

    clearTextTouchableStyle:{
        position:'absolute',
        right:0,
        top:5,
        bottom:0,
        backgroundColor: 'transparent',
        zIndex:999
    },

    imageContainerStle: {
        width: wp(5),
        height: wp(5)
    },

    imageViewStyle: {
        flex:1,
        flexDirection: 'row',
        flexWrap:'wrap'
    }
};

const mapStateToProps = ({ search, auth }) => {
    const { searchText, search_results, loading } = search;
    return { searchText, user: auth.user.name, search_results, loading };
};

export default connect(mapStateToProps, { searchTextChanged, searchTextClear })(Search);