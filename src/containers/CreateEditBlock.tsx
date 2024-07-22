import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import '../App.css'
import {AppDispatch, RootState} from "../app/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {postContact, putContact} from "./FetchSlice/FetchSlice.tsx";
import axiosAPI from "../../axios/AxiosAPI.ts";

interface ContactProps{
    name: string;
    number: string;
    email: string;
    photo: string;
}
const CreateEditBlock = () => {

    const [contactData, setContactData] = useState<ContactProps>({
        name: '',
        number: '',
        email: '',
        photo: '',
    });
    const {id} = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const {loading} = useSelector((state: RootState) => state.contacts);
    useEffect(  () => {
        if(id){
            const getData = async () => {
                const response = await axiosAPI.get<ContactProps>(`/contacts/${id}.json`);
                setContactData(response.data);
            }
            getData();
        }
    }, [id]);
    const formChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setContactData((prevData) => ({...prevData, [name]: value}));
        console.log(contactData)
    };

    const submitData = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (contactData.name.trim() !== '' && contactData.number.trim() !== '' && contactData.email.trim() !== '' && contactData.photo.trim() !== '') {
            if(id){
                await dispatch(putContact({ id, updatedContact: contactData }));
                console.log(loading)
                navigate('/')
            }else{
                await dispatch(postContact(contactData))
                navigate('/')
            }
        }
    }

    return (
        <div>
            <div id="loader-container" style={{display: loading ? 'block' : 'none'}}>
                <div className="loader"></div>
            </div>
            <div style={{width: '300px', display: 'flex', flexDirection: 'column', margin: '0 auto'}}>
                <form onSubmit={submitData}>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={contactData.name} onChange={formChange}/>

                    <label htmlFor="number">Number:</label>
                    <input type="number" id="number" name="number" value={contactData.number} onChange={formChange}/>

                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={contactData.email} onChange={formChange}/>

                    <label htmlFor="photo">Photo URL:</label>
                    <input type="text" id="photo" name="photo" value={contactData.photo} onChange={formChange}/>

                    <div>
                        <p>Photo preview</p>
                        <img style={{width: '200px'}}
                             src={contactData.photo || 'https://via.placeholder.com/210x295?text=No+Image'}
                             alt={'Photo preview contact'}/>
                    </div>

                    <div style={{width: '400px'}}>
                        <button className={'btn-create'} type={"submit"}>Save</button>
                        <button className={'btn-back'}><NavLink className={'btn-link'} to={'/'}>Back to
                            contacts</NavLink></button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateEditBlock;