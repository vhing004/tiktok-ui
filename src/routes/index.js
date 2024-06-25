import routesConfig from '~/config/routes';

// Layout
import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import Search from '~/pages/Search';
import { HeaderOnly } from '~/component/Layout';

//  hiển thị những cái mà ko cần đăng nhập cx có thể xem đc
const publicRoutes = [
    { path: routesConfig.home, component: Home },
    { path: routesConfig.following, component: Following },
    { path: routesConfig.profile, component: Profile },
    { path: routesConfig.upload, component: Upload, layout: HeaderOnly },
    { path: routesConfig.search, component: Search, layout: null },
];

// những cái phải login ms xem đc
const privateRoutes = [];

export { publicRoutes, privateRoutes };
