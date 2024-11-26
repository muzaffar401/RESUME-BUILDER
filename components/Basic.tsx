"use client";
import { useFormContext } from "@/context/FormContext";
import { useForm } from "react-hook-form";
import Input from "./Input";
interface FormValue {
    name: string;
    email: string;
    phone: string;
    career: string;
}
const Basic = () => {
    const context = useFormContext()
    const { register, handleSubmit } = useForm<FormValue>({
        defaultValues: context?.formData
    });
    const handleFormSubmit = (data: FormValue) => {
        context?.handleFormData(data)
        context?.handleNextStep()
    }
    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Input label="Name" {...register("name", { required: true })} />
            <Input label="Email" {...register("email", { required: true })} />
            <Input label="Phone" {...register("phone", { required: true })} />
            <div>
                <label htmlFor="career" className="block text-sm font-medium leading-6 text-gray-900">
                    Career Objectives
                </label>
                <div className="mt-2">
                    <textarea
                        rows={4}
                        id="career"
                        placeholder="Career Objectives"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 placeholder:pl-2"
                        {...register("career", { required: true })}
                    />
                </div>
                <button className="bg-emerald-400 text-white py-3 px-10 rounded-lg mt-4 hover:scale-105 transition-all ease-in-out">Next</button>
            </div>
        </form>
    );
};

export default Basic;