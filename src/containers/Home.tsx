import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../app/store.ts";
import {useEffect, useState} from "react";
import {deleteContact, getContacts} from "./FetchSlice/FetchSlice.tsx";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import ContactsOverlay from "../components/ContactsOverlay.tsx";

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
        }
    }, [id]);

    const closeOverlay = async () => {
        await setSelectedContact(null)
        navigate('/')
    }

    const DeleteContact = async () => {
        try {
            await dispatch(deleteContact(id));
            await setSelectedContact(null)
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <div id="loader-container" style={{display: loading ? 'block' : 'none'}}>
                <div className="loader"></div>
            </div>
            {contacts.map(contact => (
                <NavLink key={contact.id} to={`/info/${contact.id}`} className={'contact-block'}>
                    <div className={'contact'}>
                        <div className={'img-block'}>
                            <img src={contact.photo} alt={contact.name} style={{width: '75px', height: '75px'}}/>
                        </div>
                        <div className={'contact-info'}>
                            <strong>{contact.name}</strong><br/>
                        </div>
                    </div>
                </NavLink>
            ))}
            {error && <div className="error">Something gone wrong...</div>}
            {selectedContact && (
                <ContactsOverlay
                    selectedContact={selectedContact}
                    id={`${id}`}
                    closeOverlay={closeOverlay}
                    deleteContact={DeleteContact}
                />
            )}
        </div>
    );
};

export default Home;