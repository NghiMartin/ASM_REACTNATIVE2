import { TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";

const RowComponent = (props) => {
    const { justify, styles, children, onPress } = props;
    const localStyleRemember = [
        styles,
        localStyle.row,
        {
            justifyContent: justify
        }
    ];
    return onPress ? (
        <TouchableOpacity  activeOpacity={0.9} onPress={onPress} style={localStyleRemember}>
            {children}
        </TouchableOpacity>
    ) : (
        <View style={localStyleRemember}>
            {children}
        </View>
    );
}

export default RowComponent;        

const localStyle = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    }
})