import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import '../App.css'
import {AppDispatch} from "../app/store.ts";
import {useDispatch} from "react-redux";
import {postContact} from "./FetchSlice/FetchSlice.tsx";
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
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const {id} = useParams();


    useEffect(  () => {
        if(id){
            const getData = async () => {
                const response = await axiosAPI.get<ContactProps>(`/contacts/${id}.json`);
                console.log(response.data)
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

    const submitData = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (contactData.name.trim() !== '' && contactData.number.trim() !== '' && contactData.email.trim() !== '' && contactData.photo.trim() !== '') {
            dispatch(postContact(contactData))
            navigate('/')
        }
    }
    return (
        <div>
            <div style={{width:'300px', display:'flex', flexDirection:'column', margin: '0 auto'}}>
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

                    <div style={{width:'400px'}}>
                        <button className={'btn-create'} type={"submit"}>Save</button>
                        <button className={'btn-back'}><NavLink className={'btn-link'} to={'/'}>Back to contacts</NavLink></button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateEditBlock;