import {NavLink} from "react-router-dom";
import {ContactProps} from "../containers/FetchSlice/FetchSlice.tsx";
interface ContactOverlayProps {
    selectedContact: ContactProps;
    id: string;
    closeOverlay: () => void;
    deleteContact: () => void;
}
const ContactsOverlay: React.FC<ContactOverlayProps> = ({ selectedContact, id, closeOverlay, deleteContact }) => {

    return (
        <div>
            <div className={"overlay"} onClick={closeOverlay}>
                <div className={"content"} onClick={e => e.stopPropagation()}>
                    <div className={'contact'}>
                        <div className={'img-block'}>
                            <img src={selectedContact.photo} alt={selectedContact.name}
                                 style={{width: '100px', height: '100px', borderRadius: '50%'}}/>
                        </div>
                        <div className={'contact-info info-d'}>
                            <div>
                                <strong>{selectedContact.name}</strong><br/>
                                +{selectedContact.number}<br/>
                                {selectedContact.email}
                            </div>
                            <div className={'card-btn'}>
                                <NavLink style={{color: 'white', textDecoration: 'none'}} to={`/info/${id}/edit`}
                                         className={'edit'}>Edit</NavLink>
                                <button className={'close'} onClick={deleteContact}><NavLink
                                    style={{color: 'white', textDecoration: 'none'}} to={'/'}>Delete</NavLink>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactsOverlay;