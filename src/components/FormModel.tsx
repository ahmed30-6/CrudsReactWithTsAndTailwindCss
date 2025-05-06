import {Field, Input, Label } from '@headlessui/react'
import clsx from 'clsx'
import { IForm } from '../interface';

interface IProps{
    form:IForm;
}

const FormModel = ({form}:IProps)=> {
    const {type , name , label } = form;
  return (
    <div className="w-full max-w-md px-4">
      <Field>
        <Label className="text-sm/6 font-medium text-black">{label}</Label>
        <Input
          className={clsx(
            'mt-3 block w-full rounded-lg border-none bg-gray-950 px-3 py-1.5 text-sm/6 text-white',
            'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25'
          )}
          type={type}
          name={name}
        />
      </Field>
    </div>
  )
}

export default FormModel;