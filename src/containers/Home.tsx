import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../app/store.ts";
import {useEffect} from "react";
import {getContacts} from "./FetchSlice/FetchSlice.tsx";

const Home = () => {
    const dispatch = useDispatch();
    const { contacts, loading, error } = useSelector((state: RootState) => state.contacts);

    useEffect(() => {
        dispatch(getContacts());
    }, [dispatch]);

    return (
        <div>
            {contacts.map(contact => (
                <a key={contact.id}>
                    <img src={contact.photo} alt={contact.name} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                    <div>
                        <strong>{contact.name}</strong><br />
                        {contact.number}<br />
                        {contact.email}
                    </div>
                </a>
            ))}
        </div>
    );
};

export default Home;