import { useState } from 'react';

const RankForm = (props) => {
    const [formData, setFormData] = useState({
        category: 'Games',
        title: '',
        description: '',
        list: [],

    });
    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        // Transform the comma-separated string into an array of objects
        const listAsArray = Array.isArray(formData.list) ? formData.list : formData.list.split(',').map(item => ({ itemName: item.trim() }));
        const newRankFormData = { ...formData, list: listAsArray };
        props.handleAddRank(newRankFormData);
        setFormData({
            category: '',
            title: '',
            description: '',
            list: [],
        });
    };


    return (
        <main>
            <form onSubmit={handleSubmit}>
                <label htmlFor='category-input'>Category</label>
                <select
                    required
                    id='category-input'
                    name='category'
                    value={formData.category}
                    onChange={handleChange}
                    defaultValue=""
                >
                    <option value='Games'>Games</option>
                    <option value='Movies'>Movies</option>
                    <option value='TV Shows'>TV Shows</option>
                    <option value='Music'>Music</option>
                    <option value='Books'>Books</option>
                    <option value='Food'>Food</option>
                    <option value='Sports'>Sports</option>
                    <option value='Travel'>Travel</option>
                    <option value='Other'>Other</option>
                </select>
                <label htmlFor='title-input'>Title</label>
                <input
                    required
                    type='text'
                    id='title-input'
                    name='title'
                    value={formData.title}
                    onChange={handleChange}
                />
                <label htmlFor='description-input'>Description</label>
                <input
                    type='text'
                    id='description-input'
                    name='description'
                    value={formData.description}
                    onChange={handleChange}
                />
                <label htmlFor='list-input'>List</label>
                <input
                    required
                    type='text'
                    id='list-input'
                    name='list'
                    value={Array.isArray(formData.list) ? formData.list.join(', ') : formData.list}
                    onChange={handleChange}
                />
                <button type='submit'>Submit</button>

            </form>
        </main>
    );
};

export default RankForm;