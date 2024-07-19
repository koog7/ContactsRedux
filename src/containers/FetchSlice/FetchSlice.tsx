import {createSlice} from "@reduxjs/toolkit";

interface ContactProps{
    id: string;
    number: string;
    email: string;
    photo: string;
}

interface ContactState{
    contacts: ContactProps[];
    loading: boolean;
    error: boolean;
}

const initialState: ContactState = {
    contacts: [],
    loading: false,
    error: false,
}

export const ContactSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        setLog: (state) => {
            console.log(state)
        }
    }
})


export const ContactReducer = ContactSlice.reducer;