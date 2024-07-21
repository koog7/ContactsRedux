import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../app/store.ts";
import {useEffect, useState} from "react";
import {getContacts} from "./FetchSlice/FetchSlice.tsx";
import {NavLink, useNavigate, useParams} from "react-router-dom";

const Home = () => {
    const dispatch = useDispatch();
    const { contacts, loading, error } = useSelector((state: RootState) => state.contacts);
    const {id} = useParams()
    const [selectedContact, setSelectedContact] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getContacts());
    }, [dispatch]);

    useEffect(() => {
        if (id) {
            setSelectedContact(contacts.find(contact => contact.id === id));
            console.log(selectedContact)
        }
    }, [id]);

    const closeOverlay = async () => {
        await setSelectedContact(null)
        navigate('/')
    }
    return (
        <div>
            {contacts.map(contact => (
                <NavLink key={contact.id} to={`/info/${contact.id}`} className={'contact-block'}>
                    <div className={'contact'}>
                        <div className={'img-block'}>
                            <img src={contact.photo} alt={contact.name} style={{width: '75px', height: '75px'}}/>
                        </div>
                        <div className={'contact-info'}>
                        <strong>{contact.name}</strong><br/>
                            +{contact.number}<br/>
                            {contact.email}
                        </div>
                    </div>
                </NavLink>
            ))}

            {selectedContact && (
                <div className={"overlay"} onClick={closeOverlay}>
                    <div className={"content"} onClick={e => e.stopPropagation()}>
                        <div className={'contact'}>
                            <div className={'img-block'}>
                                <img src={selectedContact.photo} alt={selectedContact.name} style={{width: '100px', height: '100px', borderRadius: '50%'}}/>
                            </div>
                            <div className={'contact-info info-d'}>
                                <div>
                                    <strong>{selectedContact.name}</strong><br/>
                                    +{selectedContact.number}<br/>
                                    {selectedContact.email}
                                </div>
                                <div className={'card-btn'}>
                                    <NavLink style={{color:'white', textDecoration:'none'}} to={`/info/${id}/edit`} className={'edit'}>Edit</NavLink>
                                    <button className={'close'}><NavLink style={{color:'white', textDecoration:'none'}} to={'/'}>Delete</NavLink></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;