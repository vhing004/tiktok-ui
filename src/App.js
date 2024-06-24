import { Fragment } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import { DefaultLayout } from '~/component/Layout';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;

                        let Layout = DefaultLayout // cho Layout mặc định là DefaultLayout

                        if(route.layout) { // nếu layout bằng null thì sẽ sinh ra thẻ Fragment
                            Layout = route.layout
                        } else if(route.layout === null){
                        // Fragment ở đây là 1 thẻ rỗng ko đc render ra DOM
                            Layout = Fragment 
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout> {/* Layout khi này ôm trọn cái Page nên cái Page bây h chính là children của Content bên DedaultLayout */}
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
