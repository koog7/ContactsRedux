import {ChangeEvent, useState} from "react";
import {NavLink} from "react-router-dom";
import '../App.css'
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

    const formChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setContactData((prevData) => ({...prevData, [name]: value}));
        console.log(contactData)
    };

    return (
        <div>
            <div style={{width:'300px', display:'flex', flexDirection:'column', margin: '0 auto'}}>
                <form>
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
                        <button className={'btn-create'}>Save</button>
                        <button className={'btn-back'}><NavLink className={'btn-link'} to={'/'}>Back to contacts</NavLink></button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateEditBlock;