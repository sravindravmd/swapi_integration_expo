/**
 * Created by ravindras on 18/09/17.
 */

import React from 'react';
import {View, Text} from 'react-native';

const TextView = ({fontSize = 15, children, fontWeight = '500', color = '#2c64dd', style}) => {

    return (
        <View style={{ paddingLeft: 5, marginBottom: 7}}>
            <Text style={[{fontSize:fontSize, color: color, fontWeight:fontWeight}, style]}> {children}</Text>
        </View>
    )
 };

export {TextView}