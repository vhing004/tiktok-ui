import classNames from "classnames/bind";
import Header from "~/component/Layout/components/Header";
import styles from './DefaultLayout.module.scss'
import Sidebar from "./Sidebar";

const cx = classNames.bind(styles);
function DefaultLayout({children}) {
    return ( 
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <Sidebar />
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
     );
}
// ta tạo ra 1 file DedaultLayout như này để mặc định những cái tĩnh của trang web khi route sang trang khác mà nó ko thay đổi mà nó chỉ thay đổi phần Content thôi.

export default DefaultLayout;