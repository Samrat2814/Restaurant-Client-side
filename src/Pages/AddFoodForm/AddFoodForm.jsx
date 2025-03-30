import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const AddFoodForm = () => {
    const {user} = useContext(AuthContext)
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        setLoading(true);
        const foodData = {
            ...data,
            addBy: { name: user?.name, email: user?.email },
        };
        
        try {
            const response = await axios.post('http://localhost:5000/foods', foodData);
            if (response.status === 201) {
                alert('Food item added successfully!');
                reset();
            }
        } catch (error) {
            console.error('Error adding food:', error);
            alert('Failed to add food item');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Add a New Food Item</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Food Name</label>
                    <input {...register('foodName', { required: true })} className="w-full p-2 border rounded" />
                    {errors.foodName && <span className="text-red-500">This field is required</span>}
                </div>
                
                <div>
                    <label className="block text-gray-700">Food Image URL</label>
                    <input {...register('foodImage', { required: true })} className="w-full p-2 border rounded" />
                    {errors.foodImage && <span className="text-red-500">This field is required</span>}
                </div>
                
                <div>
                    <label className="block text-gray-700">Food Category</label>
                    <input {...register('foodCategory', { required: true })} className="w-full p-2 border rounded" />
                    {errors.foodCategory && <span className="text-red-500">This field is required</span>}
                </div>
                
                <div>
                    <label className="block text-gray-700">Quantity</label>
                    <input type="number" {...register('quantity', { required: true, min: 1 })} className="w-full p-2 border rounded" />
                    {errors.quantity && <span className="text-red-500">Enter a valid quantity</span>}
                </div>
                
                <div>
                    <label className="block text-gray-700">Price</label>
                    <input type="number" {...register('price', { required: true, min: 1 })} className="w-full p-2 border rounded" />
                    {errors.price && <span className="text-red-500">Enter a valid price</span>}
                </div>
                
                <div>
                    <label className="block text-gray-700">Food Origin (Country)</label>
                    <input {...register('foodOrigin', { required: true })} className="w-full p-2 border rounded" />
                    {errors.foodOrigin && <span className="text-red-500">This field is required</span>}
                </div>
                
                <div>
                    <label className="block text-gray-700">Description</label>
                    <textarea {...register('description', { required: true })} className="w-full p-2 border rounded h-24" />
                    {errors.description && <span className="text-red-500">This field is required</span>}
                </div>
                
                <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700" disabled={loading}>
                    {loading ? 'Adding...' : 'Add Item'}
                </button>
            </form>
        </div>
    );
};

export default AddFoodForm;
