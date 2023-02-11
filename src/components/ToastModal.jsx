import { ToastAndroid } from "react-native";
const showToast = (alert) => {
    ToastAndroid.show(alert, ToastAndroid.SHORT);
};
export default showToast;