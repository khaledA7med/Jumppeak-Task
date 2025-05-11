export const registrationFormConfig = [
  { name: 'name', label: 'Name', type: 'text', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'password', label: 'Password', type: 'password', required: true },
  { name: 'phone', label: 'Phone', type: 'number', required: false },
  { name: 'address', label: 'Address', type: 'text', required: false },
  { name: 'birthdate', label: 'Date of Birth', type: 'text', required: false },
];

export const loginFormConfig = [
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'password', label: 'Password', type: 'password', required: true },
];
