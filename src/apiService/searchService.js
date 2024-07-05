/* eslint-disable no-unused-vars */
import * as request from '~/utils/request';

// import * as httpRequest from '~/utils/httpRequest';

export const search = async (q, type = 'less') => {
    try {
        const res = await request.get('users/search', {
            params: {
                q,
                type,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
// try catch này giống với then với catch bên promise
// try catch xử lý đồng bộ nó hoạt động tuần tự từ trên xuống dưới.