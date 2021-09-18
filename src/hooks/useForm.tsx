import {useState} from 'react';

//Se configura el useForm para que reciba los parámetros de tipo Generico
//La T es una convención, pero se puede utilizar otra letra
export const useForm = <T extends Object>(initState: T) => {
  const [form, setForm] = useState(initState);

  //El keyof T le dice que lo que se reciba en campo tiene que estar
  //en los campos enviados en el useForm()
  //El value lo declaramos como genérico para que pueda ser string, boolean o cualquier otro tipo
  const onChange = <K extends Object>(value: K, field: keyof T) => {
    setForm({
      //
      ...form,
      //Al estar entre parentesis recto estoy computando el atributo que está en el valor de 'field'
      //O sea, seteará el valor del campo que venga dentro de ese parámetro
      [field]: value,
    });
  };

  return {
    //Con esta línea desestructura todo el formulario
    ...form,
    form,
    onChange,
  };
};
