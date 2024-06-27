import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEllipsisVertical,
    faEarthAsia,
    faCircleQuestion,
    faKeyboard,
    faCoins,
    faUser,
    faGear,
    faSignOut,
} from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss';
import images from '~/assets/images';
import Button from '~/component/Button';
import Menu from '~/component/Popper/Menu';
import Search from '../Search';
import { MessageIcon, UploadIcon, ShareIcon } from '~/component/Icons';
import Image from '~/component/Images';
import routesConfig from '~/config/routes';

const cx = classNames.bind(styles);

function Header() {
    const currentUser = true;
    
    const handleMenuChange = (menuItem) => {
        console.log(menuItem);
    };
    
    const MENU_ITEM = [
        {
            icon: <FontAwesomeIcon icon={faEarthAsia} />,
            title: 'English',
            children: {
                title: 'Language',
                data: [
                    {
                        code: 'en',
                        title: 'English',
                    },
                    {
                        code: 'vn',
                        title: 'Viet Nam',
                    },
                    {
                        code: 'en',
                        title: 'English',
                    },
                    {
                        code: 'vn',
                        title: 'Viet Nam',
                    },
                    {
                        code: 'en',
                        title: 'English',
                    },
                    {
                        code: 'vn',
                        title: 'Viet Nam',
                    },
                    {
                        code: 'en',
                        title: 'English',
                    },
                    {
                        code: 'vn',
                        title: 'Viet Nam',
                    },
                    {
                        code: 'en',
                        title: 'English',
                    },
                    {
                        code: 'vn',
                        title: 'Viet Nam',
                    },
                    {
                        code: 'en',
                        title: 'English',
                    },
                    {
                        code: 'vn',
                        title: 'Viet Nam',
                    },
                    {
                        code: 'en',
                        title: 'English',
                    },
                    {
                        code: 'vn',
                        title: 'Viet Nam',
                    },
                ],
            },
        },
        {
            icon: <FontAwesomeIcon icon={faCircleQuestion} />,
            title: 'Feedback and Help',
            to: '/feedback',
        },
        {
            icon: <FontAwesomeIcon icon={faKeyboard} />,
            title: 'Keyboard shortcuts',
        },
    ];
    
    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View profile',
            to: '/@hoaa',
        },
        {
            icon: <FontAwesomeIcon icon={faCoins} />,
            title: 'Get coin',
            to: '/coin',
        },
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Setting',
            to: '/setting',
        },
        ...MENU_ITEM,
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Log out',
            to: '/logout',
            separate: true,
        },
    ];
    console.log(userMenu);
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <Link to={routesConfig.home}>
                        <img src={images.logo} alt='' />
                    </Link>
                </div>
                <div>
                    <Search />
                </div>
                <div className={cx('action')}>
                    {currentUser ? (
                        <div className={cx('action_btn')}>
                            <Tippy delay={[0, 200]} content="Upload Video">
                                <button className={cx('icon', 'icon-mess')}>
                                    <UploadIcon />
                                </button>
                            </Tippy>
                            <button>
                                <ShareIcon />
                            </button>
                            <button className={cx('icon', 'icon-mess')}>
                                <MessageIcon />
                                <span>20</span>
                            </button>
                        </div>
                    ) : (
                        <>
                            <Button text>Upload</Button>
                            <Button primary>Log in</Button>
                        </>
                    )}
                    <Menu items={currentUser ? userMenu : MENU_ITEM} onChange={handleMenuChange}>
                        {/* nếu currentUser là đúng thì sẽ PROP "items" là userMenu và ngược lại.
                        MENU_ITEM ở đây là đại diện cho khi ở trạng thái logout còn userMenu là trạng thái login.
                        Và trong userMenu thì đã thêm MENU_ITEM vào trong.
                        */}
                        {currentUser ? (
                            <Image
                                className={cx('user-avatar')}
                                src="https://images.vexels.com/content/145908/preview/male-avatar-maker-2a7919.png"
                                alt="Nguyern Van A"
                            />
                        ) : (
                            <button className={cx('menu-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
