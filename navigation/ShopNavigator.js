import React from "react";
import {
  createAppContainer,
  createDrawerNavigator,
  createSwitchNavigator,
  DrawerItems
} from "react-navigation";
import { useDispatch } from "react-redux";
import { createStackNavigator } from "react-navigation-stack";
import { Platform, SafeAreaView, Button, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ProductsOverViewScreen from "../screens/shop/ProductOverview";
import ProductDetailScreen from "../screens/shop/ProductDetail";
import CartScreen from "../screens/shop/CartScreen";
import Colors from "../constants/Colors";
import AuthScreen from "../screens/user/AuthScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import UserProductScreen from "../screens/user/UserProductScreen";
import StartUpScreen from "../screens/StartupScreen";
import * as authActions from "../store/actions/auth";

const defNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : ""
  },
  headerTitleStyle: {
    // fontFamily: "open-sans-bold"
  },
  headerBackTitleStyle: {
    //fontFamily: "open-sans"
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary
};
const ProducstNavigator = createStackNavigator(
  {
    ProductsOverView: ProductsOverViewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          size={23}
          color={drawerConfig.tintColor}
        />
      )
    },
    defaultNavigationOptions: defNavigationOptions
  }
);

const OrdersNavigator = createStackNavigator(
  {
    Orders: OrdersScreen
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === "android" ? "md-list" : "ios-list"}
          size={23}
          color={drawerConfig.tintColor}
        />
      )
    },
    defaultNavigationOptions: defNavigationOptions
  }
);

const AdminNavigator = createStackNavigator(
  {
    UserProducts: UserProductScreen,
    EditProduct: EditProductScreen
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === "android" ? "md-create" : "ios-create"}
          size={23}
          color={drawerConfig.tintColor}
        />
      )
    },
    defaultNavigationOptions: defNavigationOptions
  }
);

const ShopNavigator = createDrawerNavigator(
  {
    Products: ProducstNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary
    },
    contentComponent: props => {
      const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
            <DrawerItems {...props} />
            <Button
              title="Logout"
              color={Colors.primary}
              onPress={() => {
                dispatch(authActions.logout());
                // props.navigation.navigate('Auth');
              }}
            />
          </SafeAreaView>
        </View>
      );
    }
  }
);

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen
  },
  {
    defaultNavigationOptions: defNavigationOptions
  }
);

const MainNavigator = createSwitchNavigator({
  Startup: StartUpScreen,
  Auth: AuthNavigator,
  Shop: ShopNavigator
});
export default createAppContainer(MainNavigator);
