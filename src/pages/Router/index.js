import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Upload from '../Upload';
import News from '../News';
import SplashScreen from '../SplashScreen';

const Router = createStackNavigator(
    {
        SplashScreen: {
            screen: SplashScreen
        },
        Upload: {
            screen: Upload
        },
        News: {
            screen: News
        },
    },
    {
        headerMode: 'none'
    }
);
export default createAppContainer(Router)