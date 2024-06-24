import { forwardRef, useState } from 'react'
import images from '~/assets/images';
import css from './Image.module.scss'
import classNames from 'classnames';

const Image = forwardRef(({src, alt,className, ...props}, ref) => {

    const [fallback, setFallback] = useState('')

    const handleImage = () => {
        setFallback(images.noImg)
    }
    return <img className={classNames(css.wrapper, className)} ref={ref} {...props} src={fallback || src} alt={alt} onError={handleImage} />
})

export default Image;