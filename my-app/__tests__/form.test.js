const React = require('react');
const { render, fireEvent, screen } = require('@testing-library/react');
require('@testing-library/jest-dom');
const emailjs = require('emailjs-com'); // Import emailjs for mocking
const Form = require('../pages/form').default; // Import the default form component

global.alert = jest.fn();

jest.mock('emailjs-com', () => ({
  send: jest.fn(() => Promise.resolve({ status: 200 })),
}));

describe('Form Component', () => {
  test('displays validation errors when fields are empty', () => {
    render(<Form />);

    // Simulate clicking the submit button
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    // Check for validation error messages
    expect(screen.getByText('Fornavn er nødvendigt')).toBeInTheDocument();
    expect(screen.getByText('Efternavn er nødvendigt')).toBeInTheDocument();
  });

  test('sends email when fields are valid', async () => {
    render(<Form />);

    // Fill in the form fields
    const firstNameInput = screen.getByPlaceholderText('John');
    const lastNameInput = screen.getByPlaceholderText('Doe');
    const submitButton = screen.getByText('Submit');

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });

    // Simulate clicking the submit button
    fireEvent.click(submitButton);

    // Ensure emailjs.send was called with the correct parameters
    expect(emailjs.send).toHaveBeenCalledWith(
      'service_or79l6j',
      'template_ox1o0c6',
      {
        firstName: 'John',
        lastName: 'Doe',
        startDate: undefined, // No date selected in this test
        endDate: undefined,
      },
      'eNLGD-6jaeg6HuZRm'
    );
    
  });
});