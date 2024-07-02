import classNames from "classnames/bind";
import css from './Popper.module.scss'

const cx = classNames.bind(css)

// PopperWrapper chuyên để bọc tippy.
function PopperWrapper( {children, className} ) {
    return <div className={cx('wrapper', className)}>
        {children}
    </div>
}
export default PopperWrapper;