/* eslint-disable react/prop-types */
import { createDrawerNavigator, useDrawerProgress } from "@react-navigation/drawer";
import { NavigationContainer, useTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Notifications from "expo-notifications";
import React, { useEffect } from "react";
import { Text, useColorScheme } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";
import { TextDefault, LeftButton, Sidebar } from "../components";
import Menu from "../screens/Menu/Menu";
import MenuItems from "../screens/MenuItems/MenuItems";
import Addresses from "../screens/Addresses/Addresses";
import NewAddress from "../screens/NewAddress/NewAddress";
import EditAddress from "../screens/EditAddress/EditAddress";
import Cart from "../screens/Cart/Cart";
import Profile from "../screens/Profile/Profile";
import FullMap from "../screens/FullMap/FullMap";
import CartAddress from "../screens/CartAddress/CartAddress";
import SelectVoucher from "../screens/Coupon/Coupon";
import Help from "../screens/Help/Help";
import HelpBrowser from "../screens/HelpBrowser/HelpBrowser";
import Chat from "../screens/Chat/Chat";
import Settings from "../screens/Settings/Settings";
import Paypal from "../screens/Paypal/Paypal";
import ItemDetail from "../screens/ItemDetail/ItemDetail";
import MyOrders from "../screens/MyOrders/MyOrders";
import OrderDetail from "../screens/OrderDetail/OrderDetail";
import StripeCheckout from "../screens/Stripe/StripeCheckout";
import RateAndReview from "../screens/RateAndReview/RateAndReview";
import CreateAccount from "../screens/CreateAccount/CreateAccount";
import Login from "../screens/Login/Login";
import Register from "../screens/Register/Register";
import ForgotPassword from "../screens/ForgotPassword/ForgotPassword";

// import {
//   Addresses,
//   Cart,
//   CartAddress,
//   Chat,
//   CreateAccount,
//   EditAddress,
//   ForgotPassword,
//   FullMap,
//   Help,
//   HelpBrowser,
//   ItemDetail,
//   Login,
//   MenuItems,
//   MyOrders,
//   NewAddress,
//   OrderDetail,
//   Paypal,
//   Profile,
//   RateAndReview,
//   Register,
//   SelectVoucher,
//   Settings,
//   StripeCheckout,
//   Menu,
// } from "../screens";

import { THEME } from "../Theme";
import { ICONS_NAME, NAVIGATION_SCREEN } from "../utils/constant";
import navigationService from "./navigationService";
import screenOptions from "./screenOptions";
import styles from "./styles";

const NavigationStack = createStackNavigator();
const MainStack = createStackNavigator();
const SideDrawer = createDrawerNavigator();

function Drawer() {
  const { colors } = useTheme();
  const progress = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    borderRadius: progress.value === 0 ? 0 : withSpring(20),
    transform: [{ scale: progress.value === 0 ? 1 : withSpring(0.7) }],
  }));

  const opacity = useAnimatedStyle(() => ({
    opacity: progress.value === 0 ? 0 : withSpring(1),
  }));

  const OuterWindowSlide = useAnimatedStyle(() => ({
    marginLeft: withTiming(progress.value === 0 ? 0 : -35),
  }));

  const InnerWindowSlide = useAnimatedStyle(() => ({
    marginLeft: withTiming(progress.value === 0 ? 0 : -15),
  }));

  return (
    <SideDrawer.Navigator
      drawerType="slide"
      overlayColor="transparent"
      screenOptions={{
        drawerStyle: {
          flex: 1,
          backgroundColor: colors.drawerBackground,
          width: "60%",
          justifyContent: "space-between",
          borderRightWidth: 0,
          shadowOpacity: 0,
          elevation: 0,
        },
        sceneContainerStyle: { backgroundColor: colors.drawerBackground },
      }}

      drawerContent={(props) => {
        // progress.value = props.progress;
        return <Sidebar {...props} />;
      }}
    >
      <SideDrawer.Screen name="noDrawer" options={{ headerShown: false }}>
        {(props) => (
          <NoDrawer
            {...props}
            // style={animatedStyle}
            // opacity={opacity}
            // OuterWindowSlide={OuterWindowSlide}
            // InnerWindowSlide={InnerWindowSlide}
          />
        )}
      </SideDrawer.Screen>
    </SideDrawer.Navigator>
  );
}

function NoDrawer() {
  const { colors } = useTheme();

  // Get drawer progress using the hook
  const progress = useDrawerProgress();

  const animatedStyle = useAnimatedStyle(() => ({
    borderRadius: progress.value > 0 ? withSpring(20) : 0, // Only animate if progress > 0
    transform: [{ scale: progress.value > 0 ? withSpring(0.7) : 1 }], // Only animate if progress > 0
  }));

  const closeViewOpacity = useAnimatedStyle(() => ({
    opacity: progress.value > 0 ? withSpring(1) : 0, // Only animate if progress > 0
  }));

  const outerWindowSlideStyle = useAnimatedStyle(() => ({
    marginLeft: withTiming(progress.value * -35),
  }));

  const innerWindowSlideStyle = useAnimatedStyle(() => ({
    marginLeft: withTiming(progress.value * -15),
  }));

  return (
    <React.Fragment>
      <Animated.View style={[styles.outerView, outerWindowSlideStyle]} />
      <Animated.View style={[styles.innerView, innerWindowSlideStyle]} />
      <Animated.View style={[styles.animatedView, animatedStyle]}>
        <NavigationStack.Navigator
          presentation="modal"
          screenOptions={screenOptions({
            textColor: colors.headerTextColor,
          })}
        >
          <NavigationStack.Screen
            name={NAVIGATION_SCREEN.Menu}
            component={Menu}
            options={{
              headerLeft: () => <LeftButton icon={ICONS_NAME.Menu} />,
            }}
          />
          <NavigationStack.Screen
            name={NAVIGATION_SCREEN.MenuItems}
            component={MenuItems}
          />
          <NavigationStack.Screen
            name={NAVIGATION_SCREEN.Cart}
            component={Cart}
          />
          <NavigationStack.Screen
            name={NAVIGATION_SCREEN.Profile}
            component={Profile}
            options={{
              headerLeft: () => <LeftButton icon={ICONS_NAME.Menu} />,
            }}
          />
          <NavigationStack.Screen
            name={NAVIGATION_SCREEN.Addresses}
            component={Addresses}
            options={{
              headerLeft: () => <LeftButton icon={ICONS_NAME.Menu} />,
            }}
          />
          <NavigationStack.Screen
            name={NAVIGATION_SCREEN.NewAddress}
            component={NewAddress}
          />
          <NavigationStack.Screen
            name={NAVIGATION_SCREEN.EditAddress}
            component={EditAddress}
          />
          <NavigationStack.Screen
            name={NAVIGATION_SCREEN.FullMap}
            component={FullMap}
          />
          <NavigationStack.Screen
            name={NAVIGATION_SCREEN.CartAddress}
            component={CartAddress}
          />
          <NavigationStack.Screen
            name={NAVIGATION_SCREEN.Coupon}
            component={SelectVoucher}
          />
          <NavigationStack.Screen
            name={NAVIGATION_SCREEN.Help}
            component={Help}
            options={{
              headerLeft: () => <LeftButton icon={ICONS_NAME.Menu} />,
            }}
          />
          <NavigationStack.Screen
            name={NAVIGATION_SCREEN.Chat}
            component={Chat}
            options={{
              headerLeft: () => <LeftButton icon={ICONS_NAME.Menu} />,
            }}
          />
          <NavigationStack.Screen
            name={NAVIGATION_SCREEN.HelpBrowser}
            component={HelpBrowser}
          />
          <NavigationStack.Screen
            name={NAVIGATION_SCREEN.Settings}
            component={Settings}
            options={{
              headerLeft: () => <LeftButton icon={ICONS_NAME.Menu} />,
            }}
          />
          <NavigationStack.Screen
            name={NAVIGATION_SCREEN.Paypal}
            component={Paypal}
          />
          <NavigationStack.Screen
            name={NAVIGATION_SCREEN.ItemDetail}
            component={ItemDetail}
          />
          <NavigationStack.Screen
            name={NAVIGATION_SCREEN.MyOrders}
            component={MyOrders}
            options={{
              headerLeft: () => <LeftButton icon={ICONS_NAME.Menu} />,
            }}
          />
          <NavigationStack.Screen
            name={NAVIGATION_SCREEN.OrderDetail}
            component={OrderDetail}
          />
          <NavigationStack.Screen
            name={NAVIGATION_SCREEN.RateAndReview}
            component={RateAndReview}
          />
          <NavigationStack.Screen
            name={NAVIGATION_SCREEN.StripeCheckout}
            component={StripeCheckout}
          />
          <NavigationStack.Screen
            name={NAVIGATION_SCREEN.CreateAccount}
            options={{ headerShown: false }}
            component={CreateAccount}
          />
          <NavigationStack.Screen
            options={{ headerShown: false }}
            name={NAVIGATION_SCREEN.Login}
            component={Login}
          />
          <NavigationStack.Screen
            options={{ headerShown: false }}
            name={NAVIGATION_SCREEN.Register}
            component={Register}
          />
          <NavigationStack.Screen
            name={NAVIGATION_SCREEN.ForgotPassword}
            options={{ headerShown: false }}
            component={ForgotPassword}
          />
        </NavigationStack.Navigator>
      </Animated.View>
      <Animated.View style={[styles.closeView, closeViewOpacity]}>
        <TextDefault H4 medium>
          {"Close X"}
        </TextDefault>
      </Animated.View>
    </React.Fragment>
  );
}

function AppContainer() {
  console.log("AppContainer Working");
  const colorScheme = useColorScheme();
  function _handleNotification(notification) {
    try {
      if (notification.origin === "selected") {
        if (notification.data.order) {
          navigationService.navigate(NAVIGATION_SCREEN.OrderDetail, {
            _id: notification.data._id,
          });
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });
    const subscription =
      Notifications.addNotificationResponseReceivedListener(
        _handleNotification
      );
    return () => subscription.remove();
  }, []);
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <NavigationContainer
        theme={colorScheme === "dark" ? THEME.Dark : THEME.Light}
        ref={(ref) => {
          navigationService.setGlobalRef(ref);
          Notifications.addNotificationReceivedListener(_handleNotification);
        }}
      >
        <MainStack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={NAVIGATION_SCREEN.Drawer}
        >
          <MainStack.Screen
            name={NAVIGATION_SCREEN.Drawer}
            component={Drawer}
          />
        </MainStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default AppContainer;
