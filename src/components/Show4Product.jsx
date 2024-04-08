import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import ItemProduct from './ItemProduct';

const Show4Product = (props) => {
    const { data,
        navigation,
        title,
        style,
        showMore,
        onPressShowMore,
        txtShowMore,
        quantityShow,
    } = props;

    const [dataShow, setdataShow] = useState([])

    useEffect(() => {
        if (!!quantityShow) {
            setdataShow(data.slice(0, quantityShow));
        } else {
            setdataShow(data);
        }
    }, [data, quantityShow]);

    return (
        <View style={[styles.container, style]}>
            <Text style={styles.title}>{title}</Text>
            <ItemProduct
            navigation={navigation}
            data={dataShow} />
            {txtShowMore && <TouchableOpacity style={styles.showMore} onPress={onPressShowMore} >
                <Text style={styles.txtShowMore}>Xem thêm {title}</Text>
            </TouchableOpacity>}
        </View>
    )
}

export default Show4Product

const styles = StyleSheet.create({
    txtShowMore: {
        color: '#221F1F',
        textAlign: 'right',
        fontWeight: '500',
        fontFamily: 'Lato',
        fontSize: 16,
        lineHeight: 20,
        textDecorationLine: 'underline',

    },
    showMore: {
        width: '100%',
    },
    title: {
        color: '#221F1F',
        lineHeight: 34,
        fontWeight: '500',
        fontFamily: 'Lato',
        fontSize: 24,
    },
    container: {
        width: '100%',
        flexDirection: 'column',
    }
})