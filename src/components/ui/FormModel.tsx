import {Field, Input, Label } from '@headlessui/react'
import clsx from 'clsx'
import { IForm } from '../../interface';

interface IProps{
    form:IForm;
}

const FormModel = ({form}:IProps)=> {
    const {type , name , label } = form;
  return (
    <div className="w-full max-w-md">
      <Field>
        <Label className="text-sm/6 font-medium text-black">{label}</Label>
        <Input
          className={clsx(
            ' block w-full rounded-lg border-[2px] border-gray-300 bg-slate-50 px-3 py-1.5 text-md text-black  shadow-lg',
            'focus:outline-none focus:ring-1 focus:ring-blue-700'
            // 'invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-pink-500 focus:invalid:outline-pink-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 '
          )}
          type={type}
          name={name}
        />
      </Field>
    </div>
  )
}

export default FormModel;