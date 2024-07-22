import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axiosAPI from "../../../axios/AxiosAPI.ts";
import {RootState} from "../../app/store.ts";

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

export const getContacts = createAsyncThunk<ContactProps[], void, { state: RootState }>('contacts/getMovies', async () => {
    try{
        const response = await axiosAPI.get<{ [key: string]: ContactProps }>(`/contacts.json`);
        return Object.keys(response.data).map(key => ({
            ...response.data[key],
            id: key
        }));
    }catch (error) {
        console.error('Error:', error);
    }
});
export const postContact = createAsyncThunk<ContactProps, ContactProps>('contacts/postContact', async (newContact) => {
    try{
        const response = await axiosAPI.post<ContactProps>('/contacts.json', newContact);
        return { ...newContact, id: response.data.name };
    }catch (error) {
        console.error('Error:', error);
    }
});
export const putContact = createAsyncThunk<ContactProps, { id: string, updatedContact: ContactProps }>('contacts/putContact', async ({id, updatedContact}) => {
    try {
        const response = await axiosAPI.put<ContactProps>(`/contacts/${id}.json`, updatedContact);
        return response.data;
    } catch (error) {
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
            }).addCase(getContacts.pending, (state:ContactState) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(getContacts.fulfilled, (state:ContactState, action: PayloadAction<ContactProps[]>) => {
                state.contacts = action.payload;
                state.loading = false;
            })
            .addCase(getContacts.rejected, (state:ContactState) => {
                state.loading = false;
                state.error = true;
            }).addCase(putContact.pending, (state:ContactState) => {
                state.loading = true;
                state.error = false;
            }).addCase(putContact.fulfilled, (state:ContactState, action: PayloadAction<ContactProps>) => {
                const index = state.contacts.findIndex(contact => contact.id === action.payload.id);
                if (index !== -1) {
                    state.contacts[index] = action.payload;
                }
                state.loading = false;
            })
            .addCase(putContact.rejected, (state:ContactState) => {
                state.loading = false;
                state.error = true;
            });
    },
})


export const ContactReducer = ContactSlice.reducer;