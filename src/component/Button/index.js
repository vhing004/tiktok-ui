import classNames from 'classnames/bind';
import styles from './Button.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Button({
    to,
    href,
    primary,
    outline = false,
    text = false,
    small = false,
    large = false,
    disable = false,
    rounded = false,
    children,
    className,
    onClick,
    leftIcon,
    rightIcon,
    ...passProps
}) {
    let Comp = 'button';
    const props = {
        onClick,
        ...passProps,
    };


    if(disable){
        Object.keys(props).forEach(key => {
            if(key.startsWith('on') && typeof props[key] === 'function'){
                delete props[key];
            } // ta lấy tất cả các key của props r lặp qua nếu key đó bắt đầu bằng từ 'on' và nó là hàm thì ta sẽ xóa đi cái key đó.
        })
    }

    if (to) {
        props.to = to;
        Comp = Link;
        //nếu có "to" thì thẻ Comp = Link
    } else if (href) {
        props.href = href;
        Comp = 'a';
        // nếu có 'href' thì thẻ Comp = thẻ 'a'
    }
    const classes = cx('wrapper', {
        [className]: className,
        primary,
        outline,
        text,
        small,
        large,
        disable,
        rounded,
    });

    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

export default Button;
