import { useState, useEffect } from 'react';

function useDebounce(val, delay) {
    const [debounceVal, setDebounceVal] = useState(val);

    useEffect(() => {
        const handler = setTimeout(() => setDebounceVal(val), delay);

        return () => clearTimeout(handler);
    }, [val]);

    return debounceVal;
}

export default useDebounce;
    //Khi ta tạo biến debounce bằng hook ta tự custom thì ban đầu debounce sẽ nhận val = '', vì nó nhận val = value của searchValue.
    //Khi searchValue thay đổi thì nó sẽ gọi lại callback của useEffect và cái value ta vừa nhận đc sẽ đc thực hiện sau "delay" ta truyền vào.