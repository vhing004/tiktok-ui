import Header from "~/component/Layout/components/Header";

function HeaderOnly({children}) {
    return ( 
        <div>
            <Header />
            <div className="container">
                <div className="content">{children}</div>
            </div>
        </div>
     );
}
// ta tạo ra 1 file DefaultLayout như này để mặc định những cái tĩnh của trang web khi route sang trang khác mà nó ko thay đổi mà nó chỉ thay đổi phần Content thôi.

export default HeaderOnly;