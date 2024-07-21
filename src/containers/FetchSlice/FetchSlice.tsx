import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axiosAPI from "../../../axios/AxiosAPI.ts";

interface ContactProps{
    id: string;
    name: string;
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


export const postContact = createAsyncThunk<ContactProps, ContactProps>('contacts/postContact', async (newTodo) => {
    try{
        const response = await axiosAPI.post<ContactProps>('/contacts.json', newTodo);
        return { ...newTodo, id: response.data.name };
    }catch (error) {
        console.error('Error:', error);
    }
});
export const ContactSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        setLog: (state) => {
            console.log(state)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(postContact.pending, (state:ContactState) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(postContact.fulfilled, (state:ContactState, action: PayloadAction<ContactProps>) => {
                state.contacts.push(action.payload);
                state.loading = false;
                console.log(state.contacts)
            })
            .addCase(postContact.rejected, (state:ContactState) => {
                state.loading = false;
                state.error = true;
            });
    },
})


export const ContactReducer = ContactSlice.reducer;