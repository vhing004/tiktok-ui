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
    //state lấy giá trị input
    const [searchValue, setSearchValue] = useState('');
    // state lưu trữ các result search
    const [searchResult, setSearchResult] = useState([]);
    //state show ra result
    const [showResult, setShowResult] = useState(true);
    // state loading
    const [loading, setLoading] = useState(false);

    const refValue = useRef();

    // xóa result search đồng thời focus vào input.
    const handleRemoveFocus = () => {
        setSearchValue('');
        refValue.current.focus();
    };

    // ẩn tippy search
    const handleShowTippy = () => {
        setShowResult(false);
    };

    // function không cho khoảng trắng ở đầu.
    const handleSearch = (e) => {
        const valueSearch = e.target.value;
        if (!valueSearch.startsWith(' ')) {
            // nếu giá trị của input không bắt đầu bằng khoảng trắng thì ta set lại searchValue.
            setSearchValue(valueSearch);
        }
    };
// hàm ngăn chặn focus
    const handleSubmit = (e) => {
        e.preventDefault();
    };//Bên css ta đã set cho nó là khi focus sẽ bị show border nên mặc định khi ấn vào thk con thì nó cx sẽ tự động focus nên ta xóa cái mặc định đấy đi.

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

        // fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(searchValue)}&type=less`)
        // .then((res) => res.json())
        // .then((res) => {
        //     setSearchResult(res.data);
        //     setLoading(false);
        // })
        // .catch(() => {
        //     setLoading(false);
        // });

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
                    onChange={handleSearch}
                    onFocus={() => setShowResult(true)}
                />
                {!!searchValue && !loading && (
                    <button className={cx('clear')} onClick={handleRemoveFocus}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}
                {loading && (
                    <button className={cx('loading')}>
                        <FontAwesomeIcon icon={faSpinner} />
                    </button>
                )}
                <button className={cx('search-btn')} onMouseDown={handleSubmit}>
                    <SearchIcon />
                </button>
            </div>
        </HeadLessTippy>
    );
}

export default Search;
