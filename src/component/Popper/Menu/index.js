import Tippy from '@tippyjs/react/headless';
import MenuItem from './MenuItem';
import { Wrapper as PopperWrapper } from '~/component/Popper';
import classNames from 'classnames/bind';
import css from './Menu.module.scss';
import HeaderMenu from './HeaderMenu';
import { useState } from 'react';

const cx = classNames.bind(css);

function Menu({ children, items = [], onChange }) {
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];
    const renderItem = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;

            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
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
            offset={[12, 8]}
            placement="bottom-end"
            delay={[0, 500]}
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <PopperWrapper className={cx('menu-popper')}>
                        {history.length > 1 && (
                            <HeaderMenu
                                title="Language"
                                onBack={() => {
                                    setHistory((prev) => prev.slice(0, prev.length - 1));
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
