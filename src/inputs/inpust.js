export default [
  {
    type: 'text',
    name: 'Ваше имя:',
    value: '',
    pattern: /^[a-zа-яА-ЯA-Z]{3,30}$/,
  },
  {
    type: 'phone',
    name: 'Телефон:',
    value: '',
    pattern: /^[0-9]{7,14}$/,
  },
  {
    type: 'email',
    name: 'Email',
    value: '',
    pattern: /[0-9a-z_-]+@[0-9a-z_-]+\.[a-z]{2,5}$/,
  },
  {
    type: 'message',
    name: 'Допольнительная информация',
    value: '',
    pattern: /.+/,
  },
];
