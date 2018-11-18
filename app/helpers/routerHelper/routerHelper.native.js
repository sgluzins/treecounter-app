import { getLocalRoute } from '../../actions/apiRouting';

export function updateRoute(routeName, navigation, id) {
  let route = routeName;
  try {
    route = getLocalRoute(routeName);
  } catch (err) {
    console.log('routing error', err);
  }

  if (id === 0) {
    navigation.closeDrawer();
  }
  navigation.navigate(route);
}

export function updateStaticRoute(routeName, navigation, id) {
  let route = routeName;
  navigation.navigate(route);
}
