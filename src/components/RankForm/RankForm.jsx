import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as rankService from '../../services/rankService';

const RankForm = (props) => {
    const { rankId } = useParams();
    console.log(rankId);
    const [formData, setFormData] = useState({
        category: 'Games',
        title: '',
        description: '',
        list: [{ itemName: '' }], // Start with one empty item

    });
    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleListChange = (evt, index) => {
        const { value } = evt.target;
        const list = [...formData.list];
        list[index] = { itemName: value };
        setFormData({ ...formData, list });
    };

    const handleAddListItem = () => {
        setFormData({ ...formData, list: [...formData.list, { itemName: '' }] });
    };

    const handleRemoveListItem = (index) => {
        const list = [...formData.list];
        list.splice(index, 1);
        setFormData({ ...formData, list });
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (rankId) {
            props.handleUpdateRank(rankId, formData);
        } else {
            const rankData = { ...formData, list: formData.list.filter(item => item.itemName.trim() !== '') };
            props.handleAddRank(rankData);
        }
        setFormData({
            category: 'Games',
            title: '',
            description: '',
            list: [{ itemName: '' }],
        });
    };

    useEffect(() => {
        const fetchRank = async () => {
            const rankData = await rankService.show(rankId);
            setFormData(rankData);
        };
        if (rankId) fetchRank();
        return () => setFormData({ category: 'Games', title: '', description: '', list: [{ itemName: '' }] })
    }, [rankId]);

    return (
        <main>
            <h1>{rankId ? 'Edit Rank' : 'New Rank'}</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='category-input'>Category</label>
                <select
                    required
                    id='category-input'
                    name='category'
                    value={formData.category}
                    onChange={handleChange}
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
                <label>List Items</label>
                {formData.list.map((item, index) => (
                    <div key={index}>
                        <input
                            required
                            type='text'
                            name='list-item'
                            value={item.itemName}
                            onChange={(evt) => handleListChange(evt, index)}
                            placeholder={`Item ${index + 1}`}
                        />
                        {formData.list.length > 1 && (
                            <button type="button" onClick={() => handleRemoveListItem(index)}>-</button>
                        )}
                    </div>
                ))}
                <button type="button" onClick={handleAddListItem}>+ Add Item</button>
                <button type='submit'>Submit</button>

            </form>
        </main>
    );
};

export default RankForm;