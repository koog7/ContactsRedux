import './App.css'
import {NavLink, Route, Routes} from "react-router-dom";
import Home from "./containers/Home.tsx";
import CreateEditBlock from "./containers/CreateEditBlock.tsx";
import NotFound from "./components/NotFound.tsx";

const App = () => {
    return (
        <>
            <div style={{backgroundColor: '#404040', width: '1000px', minHeight: '50px', padding: '2px', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                <h2 style={{marginLeft: '10px'}}><NavLink className="nav-link" to="/" style={{textDecoration: 'none', color: 'white'}}>Contacts</NavLink></h2>
                <NavLink to={'/create'} className={'add-btn'}>Add new contact</NavLink>
            </div>
            <hr/>
            <Routes>
                <Route path="/" element={(
                    <Home/>
                )}/>
                <Route path="/create" element={(
                    <CreateEditBlock/>
                )}/>
                <Route path="*" element={(
                    <NotFound/>
                )}/>
            </Routes>
        </>
    )

};

export default App
