import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { featured } from '../constants';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker} from 'react-native-maps';
import { themeColors } from '../theme';
import * as Icon from "react-native-feather"
import { useDispatch, useSelector } from 'react-redux';
import { selectRestaurant } from '../slices/restaurantSlice';
import { emptyCart } from '../slices/cartSlice';


export default function DeliveryScreen() {
    const restaurant = useSelector(selectRestaurant);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const cancelOrder = ()=>{
        navigation.navigate('Home');
        dispatch(emptyCart());

    }
 return (
   <View className="flex-1">
    
        {/* map view */}
    <MapView 
        initialRegion={{
            latitude: restaurant.lat,
            longitude: restaurant.lng,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
        }}
        className="flex-1"
        mapType='standard'
        >
        <Marker 
            coordinate={{
                latitude: restaurant.lat,
                longitude: restaurant.lng,
            }}
            title={restaurant.name}
            description={restaurant.description}
            pinColor={themeColors.bgColor(1)}
        />
    </MapView>
   
   
    <View className="rounded-t-3xl -mt-12 bg-white relative">
        <View className="flex-row justify-between px-5 pt-10">
            <View>
            <Text className="text-lg text-gray-700 font-semibold">Estimated Arrival</Text>
            <Text className="text-3xl font-extrabold text-gray-700">20-30 minutes</Text>
            <Text className="mt-2 text-gray-700 font-semibold">Your order is on its way!</Text>
            </View>
            <Image className="w-24 h-24" source={require('../assets/images/bikeGuy2.gif')}></Image>
        </View>
        <View
        style={{backgroundColor: themeColors.bgColor(0.8)}}
        className="p-2 flex-row justify-between items-center rounded-full my-5 mx-2">
            <View className="p-1 rounded-full"
            style={{backgroundColor: 'rgba(255,255,255,0.4'}}>
                <Image className="h-16 w-16 rounded-full"source={require('../assets/images/deliveryGuy.png')}/>
            </View>
            <View className="flex-1 ml-3">
            <Text className="text-lg font-bold text-white">Syed Noman</Text>
            <Text className="text-lg text-white">Your Rider</Text>
            </View>
            <View className="flex-row items-center space-x-3 mr-3">
                <TouchableOpacity className="bg-white p-2 rounded-full">
                    <Icon.Phone fill={themeColors.bgColor(1)} stroke={themeColors.bgColor(1)}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={cancelOrder} className="bg-white p-2 rounded-full">
                    <Icon.X stroke={'red'} strokeWidth={4}/>
                </TouchableOpacity>
            </View>
        </View>
    </View>
    </View>

);
}