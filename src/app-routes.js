import { BannerPage, CategoriesPage, AdvertisingPage } from "./pages";
import { withNavigationWatcher } from "./contexts/navigation";

const routes = [
  {
    path: "/categories",
    element: CategoriesPage,
  },
  {
    path: "/advertising",
    element: AdvertisingPage,
  },
  {
    path: "/banner",
    element: BannerPage,
  },
];

export default routes.map((route) => {
  return {
    ...route,
    element: withNavigationWatcher(route.element, route.path),
  };
});
