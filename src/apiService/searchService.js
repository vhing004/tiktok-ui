/* eslint-disable no-unused-vars */
import * as request from '~/utils/request';

export const search = async (q, type) => {
    try {
        const res = await request.get('users/search', {
            params: {
                q,
                type: 'less',
            },
        });
        // console.log(res);
        return res.data
    } catch (error) {
        console.log('Error');
    }
};
search();
// try catch này giống với then với catch bên promise
// try catch xử lý đồng bộ nó hoạt động tuần tự từ trên xuống dưới.