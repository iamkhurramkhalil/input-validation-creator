import * as Yup from 'yup';

 const camelCasetoNormal = word => {
  return word
    .split(/(?=[A-Z])/)
    .map(s => s[0].toUpperCase() + s.slice(1) + ' ')
    .join('');
};

module.exports =  function genrateSchema (param)  {
  const labels = Object.keys(param);
  const schema = {};
  labels.map(label => {
    if (label.indexOf('email') !== -1)
      schema[label] = Yup.string()
        .email()
        .required(`${camelCasetoNormal(label)} is required`);
    else if (label.indexOf('address2') !== -1) schema[label] = Yup.string();
    else if (label.indexOf('password') >= 0 || label.indexOf('Password') >= 0)
      schema[label] = Yup.string()
        .min(6)
        .required(`${camelCasetoNormal(label)} is required`);
    else if (label.indexOf('confirm') >= 0)
      schema[label] = Yup.string()
        .oneOf([
          Yup.ref('newPassword'),
          'Password is not match to confirm Password'
        ])
        .required();
    else
      schema[label] = Yup.string().required(
        `${camelCasetoNormal(label)} is required`
      );
  });
  return Yup.object().shape(schema);
};