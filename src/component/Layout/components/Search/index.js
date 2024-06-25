import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadLessTippy from '@tippyjs/react/headless';

// nếu bên file kia export hàm const thì ta dùng import * as.
import * as searchService from '~/apiService/searchService';
import { Wrapper as PopperWrapper } from '~/component/Popper';
import AccountItem from '~/component/AccountItem/AccountItem';
import { SearchIcon } from '~/component/Icons';
import classNames from 'classnames/bind';
import css from './Search.module.scss';
import { useDebounce } from '~/hooks';
// import axios from 'axios';

const cx = classNames.bind(css);
function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const refValue = useRef();
    const handleFocus = () => {
        setSearchValue('');
        refValue.current.focus();
    };

    const handleShowTippy = () => {
        setShowResult(false);
    };

    const debounce = useDebounce(searchValue, 800);
    //Khi ta tạo biến debounce bằng hook ta tự custom thì ban đầu debounce sẽ nhận val = '', vì nó nhận val = value của searchValue.
    useEffect(() => {
        if (!debounce.trim()) {
            //Khi ko có value của input thì sẽ return để thoát hàm
            setSearchResult([]);
            return; // trim() ngăn chặn khoảng trắng là space
        }

        const fetchApi = async () => {
            setLoading(true);

            const result = await searchService.search(debounce);
            setSearchResult(result);

            setLoading(false);
        };
        fetchApi();

        // fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(debounce)}&type=less`)
        // chỗ q= kia sẽ là chỗ lưu kết quả tìm kiếm mà khi ta truyền searchValue vào thì value của input sẽ đẩy vào trên đấy
        // encodeURIComponent khi ta gõ nhưng kí tự gây hiểu lầm hay trùng vs api thì nó sẽ mã hóa .

        // axios
        //     .get('https://tiktok.fullstack.edu.vn/api/users/search', {
        //         params: {
        //             q: debounce,
        //             type: 'less',
        //         },
        //     })
        // const fetchApi = async () => {
        //     try {
        //         const res = await request.get('users/search', {
        //             params: {
        //                 q: debounce,
        //                 type: 'less',
        //             },
        //         });
        //         setSearchResult(res.data);
        //         setLoading(false);
        //     } catch (error) {
        //         setLoading(false);
        //     }
        // };
        // fetchApi();
        // .then((res) => res.json())
        // Khi dùng axios thì nó sẽ trả về chuỗi luôn nên ta ko cần bước này
        // .then((res) => {
        //     // console.log(res.data);
        //     setSearchResult(res.data);
        //     setLoading(false);
        // })
        // .catch(() => {
        //     setLoading(false);
        // });
    }, [debounce]);

    return (
        <HeadLessTippy
            interactive
            visible={showResult && searchResult.length > 0}
            render={(attrs) => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <h4 className={cx('account')}>Account</h4>
                        {searchResult.map((result) => (
                            <AccountItem key={result.id} data={result} /> //data ở đây sẽ nhận chuỗi.
                        ))}
                    </PopperWrapper>
                </div>
            )}
            onClickOutside={handleShowTippy} //khi click ra ngoài thì sẽ ẩn.
        >
            {/* // tạo ra 1 tooltip tìm kiếm khi hover vào    */}
            <div className={cx('search')}>
                <input
                    ref={refValue}
                    value={searchValue}
                    placeholder="Tìm kiếm"
                    spellCheck={false}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={() => setShowResult(true)}
                />
                {!!searchValue && !loading && (
                    <button className={cx('clear')} onClick={handleFocus}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}
                {loading && (
                    <button className={cx('loading')}>
                        <FontAwesomeIcon icon={faSpinner} />
                    </button>
                )}
                <button className={cx('search-btn')}>
                    <SearchIcon />
                </button>
            </div>
        </HeadLessTippy>
    );
}

export default Search;
