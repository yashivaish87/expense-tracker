import React from 'react'
import { useForm } from 'react-hook-form';
import List from './List';
import {default as api} from '../store/apiSlice';

export default function Form() {

    const {register, handleSubmit, resetField} = useForm();
    const [addTransaction] = api.useAddTransactionMutation();

    const onSubmit = async (data) => {
        if(!data) return {};
        await addTransaction(data).unwrap();
        resetField('name');
        resetField('amount')
    }

  return (
    <div className="form max-w-sm mx-auto w-96 py-4">
        
        <h1 className='font-bold pb-4 text-xl'>Transaction</h1>

        <form id='form' onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-3">
                <select className='form-input rounded-lg bg-[#38A89D] text-white' {...register('type')}>
                    <option value="Investment" defaultValue>Investment</option>
                    <option value="Expense">Expense</option>
                    <option value="Savings">Savings</option>
                </select>
                <div className="input-group rounded-lg bg-[#C2FBEF]">
                    <input type="text" {...register('name')} placeholder='Salary, House Rend, SIP' className='form-input' />
                </div> 
                <div className="input-group rounded-lg bg-[#C2FBEF]">
                    <input type="text" {...register('amount')} placeholder='Amount' className='form-input' />
                </div>
                <div className="submit-btn">
                    <button className='border py-2 px-6 text-white w-50 bg-[#38A89D] rounded-lg hover:bg-[#20504F] transition-colors duration-300' >Add Transaction</button>
                </div>
            </div>    
        </form>

        <List></List>
    </div>
  )
}