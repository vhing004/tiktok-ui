import Tippy from '@tippyjs/react/headless';
import MenuItem from './MenuItem';
import { Wrapper as PopperWrapper } from '~/component/Popper';
import classNames from 'classnames/bind';
import css from './Menu.module.scss';
import HeaderMenu from './HeaderMenu';
import { useState } from 'react';

const cx = classNames.bind(css);
//Ý tưởng là state chứa 1 array, trong array đó có object(s): dạng như là: [{__},{__},...{__}].
//  Luật là: luôn dùng object cuối cùng để map ra UI. 
//  Ban đầu state có 1 object là {data: items} => items (level.1) sẽ được map ra UI. Trong các phần tử của items nếu users click vào phần tử cha a.k.a phần tử có "children" thì tiến hành set state để thêm mảng children này vào state, => lúc này "children"(level 2) sẽ là object cuối cùng trong mảng và theo luật thì sẽ được render ra, nếu users tiếp tục chọn vào option mà nó có "children" (level 3) thì sẽ tiếp tục có mảng mới và setState => render mảng mới ra UI. 
//  Khi ấn back thì tiến hành xoá phần tử cuối cùng để render ra phần tử trước đó.
function Menu({ children, items = [], onChange }) {
    const [history, setHistory] = useState([{ data: items }]);//data của history sẽ là cái mảng items.
    const current = history[history.length - 1];
    // console.log(current);
    const renderItem = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children; // 2 dấu ! này là để convert sang boolean.

            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            // console.log(item.children.data);
                            setHistory((prev) => [...prev, item.children]);
                        } else {
                            onChange(item)
                        }
                    }}
                />
            );
        });
    };

    return (
        <Tippy
            interactive
            // visible
            offset={[12, 8]}
            placement="bottom-end"
            hideOnClick="false"
            delay={[0, 500]}
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <PopperWrapper className={cx('menu-popper')}>
                        {history.length > 1 && (
                            <HeaderMenu
                                title="Language"
                                onBack={() => {
                                    setHistory((prev) => prev.slice(0, prev.length - 1));//xóa phần tử vừa đc add vào.
                                }}
                            />
                        )}
                        {renderItem()}
                    </PopperWrapper>
                </div>
            )}
            onHidden={() => {setHistory(prev => prev.slice(0, 1))}} // khi invisible thì nó sẽ xóa hết tất cả các phần tử sau chỉ giữ lại phân tử đầu.
        >
            {children}
        </Tippy>
    );
}

export default Menu;
