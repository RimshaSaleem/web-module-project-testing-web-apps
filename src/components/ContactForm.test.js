import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />);

});

test('renders the contact form header', ()=> {
    render(<ContactForm />);
    const header = screen.queryByText('Contact Form')
    expect(header).toBeTruthy()
    expect(header).toBeInTheDocument()
    expect(header).toHaveTextContent('Contact Form')
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);
    const firstName = screen.getByLabelText(/first name*/i)
    userEvent.type(firstName, "abcd");
     await waitFor(()=>{
         const errorMessage = screen.getByText(/firstName must have at least 5 characters./i)
         expect(errorMessage).toBeInTheDocument();
     })
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render (<ContactForm />);
    const submit = screen.getByRole('button');
    userEvent.click(submit);
    await waitFor(() => {
        const firstNameErrors = screen.getByText(/firstName must have at least 5 characters./i);
        const lastNameErrors = screen.getByText(/lastName is a required field./i);
        const emailErrors = screen.getByText(/email must be a valid email address./i)
        expect (firstNameErrors).toBeInTheDocument();
        expect(lastNameErrors).toBeInTheDocument();
        expect(emailErrors).toBeInTheDocument();
    })
    
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render (<ContactForm />);
    const firstNameInputField = screen.getByLabelText(/first name*/i);
    userEvent.type(firstNameInputField, "Rimsha");

    const lastNameInputField = screen.getByLabelText(/last name*/i);
    userEvent.type(lastNameInputField, "Saleem");

    const submit = screen.getByRole("button");
    userEvent.click(submit);

    await waitFor(() => {
        const emailErrors = screen.getByText(/email must be a valid email address./i);
        expect(emailErrors).toBeInTheDocument();
    })
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />)

    const emailInput = screen.getByLabelText(/email*/i);
    userEvent.type(emailInput, 'abcd')
    await waitFor(() => {
        const emailErrors = screen.getByText(/email must be a valid email address./i);
        expect(emailErrors).toBeInTheDocument();
    })

    
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />)
    
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    
});

test('renders all fields text when all fields are submitted.', async () => {
    
});