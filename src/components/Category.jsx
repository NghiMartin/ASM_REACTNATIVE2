import { StyleSheet, Text, View, FlatList, TouchableOpacity, useColorScheme } from 'react-native'
import React, { useState, } from 'react'
import { FONTSIZE } from '../assets';

const Category = ({ data, style, selectedAll, styleItem }) => {
    const [selected, setSetselected] = useState(0);
    return (
        // <View style={[styles.container, style]}>
        <FlatList
            data={data || dataTest}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={[styles.container, style]}
            renderItem={({ item, index }) => (
                <ItemCategory
                    item={item}
                    selected={selectedAll || index === selected}
                    onPress={() => setSetselected(index)}
                    styleItem={styleItem}
                />
            )}
            keyExtractor={(item, index) => index.toString()}
        />
        // </View>
    )
}

export default Category;

const ItemCategory = ({ item, selected, styleItem, onPress }) => {
    const colorScheme = useColorScheme();
    // console.log(item);
    return (
        <TouchableOpacity
            style={[styles.item, selected && styles.selected, styleItem]}
            onPress={onPress}>
            <Text style={[styles.txt, colorScheme === 'dark' && { color: 'black' }, !selected && {color: 'black'}]}>{item.name}</Text>
        </TouchableOpacity>
    )

};

const styles = StyleSheet.create({
    txt: {
        color: '#fff',
        fontSize: FONTSIZE.size_14,
        fontWeight: 'bold',
        textTransform: 'lowercase',
        
    },
    selected: {
        backgroundColor: '#009245'
    },
    item: {
        height: 28,
        borderRadius: 4,
        paddingHorizontal: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flexDirection: 'row',
    }
})


const dataTest = [
    {
        id: 1,
        name: 'Tất cả',
    },
    {
        id: 2,
        name: 'Hàng mới về',
    },
    {
        id: 3,
        name: 'Ưa sáng',
    },
    {
        id: 4,
        name: 'Ưa bóng',
    },
    {
        id: 5,
        name: 'Hàng giảm giá',
    }
];