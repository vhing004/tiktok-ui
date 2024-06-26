import Button from '~/component/Button';

import classNames from 'classnames/bind';
import css from './Menu.module.scss';

const cx = classNames.bind(css);

function MenuItem({ data, onClick }) {
    const classes = cx('menu-item', {
        separate: data.separate,
    });
    return (
        <Button className={classes} leftIcon={data.icon} to={data.to} onClick={onClick}>
            {data.title}
        </Button>
    );
}

export default MenuItem;
