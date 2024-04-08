import { removeToken } from "../../api/auth/KeyChain";
import CustomButton from "../../components/CustomButton";
import {useDispatch, useSelector} from 'react-redux';
import { removeUser } from "../../store/userSlice";
export default function UserScreen () {
  const dispatch = useDispatch();
    const handleSignOut =  async () => {
    await removeToken();
     dispatch(removeUser(null));
    }
    return(
        <>
        <CustomButton label={'Sign Out'} onPress={handleSignOut} />
        </>
    )
}