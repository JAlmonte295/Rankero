import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as rankService from '../../services/rankService';
import styles from './RankForm.module.css';


const RankForm = (props) => {
    const { rankId } = useParams();
    const [formData, setFormData] = useState({
        category: 'Games',
        title: '',
        description: '',
        list: [{ itemName: '', imageUrl: '' }], // Start with one empty item

    });
    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleListChange = (evt, index) => {
        const { name, value } = evt.target;
        const list = [...formData.list];
        list[index] = { ...list[index], [name]: value };
        setFormData({ ...formData, list });
    };

    const handleAddListItem = () => {
        setFormData({ ...formData, list: [...formData.list, { itemName: '', imageUrl: '' }] });
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
    };

    useEffect(() => {
        const fetchRank = async () => {
            const rankData = await rankService.show(rankId);
            setFormData(rankData);
        };
        if (rankId) fetchRank();
        return () => setFormData({ category: 'Games', title: '', description: '', list: [{ itemName: '', imageUrl: '' }] })
    }, [rankId]);

    return (
        <main className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h1>{rankId ? 'Edit Rank' : 'New Rank'}</h1>
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
                <div className={styles.listItemsContainer}>
                    <label>List Items</label>
                    {formData.list.map((item, index) => (
                        <div key={index} className={styles.listItem}>
                            <input
                                required
                                type='text'
                                name='itemName'
                                value={item.itemName}
                                onChange={(evt) => handleListChange(evt, index)}
                                placeholder={`Item ${index + 1}`}
                            />
                            <input
                                type='url'
                                name='imageUrl'
                                value={item.imageUrl || ''}
                                onChange={(evt) => handleListChange(evt, index)}
                                placeholder='Image URL (optional)'
                            />
                            {formData.list.length > 1 && (
                                <button type="button" onClick={() => handleRemoveListItem(index)} className={styles.removeButton}>-</button>
                            )}
                        </div>
                    ))}
                    <button type="button" onClick={handleAddListItem} className={styles.addButton}>+ Add Item</button>
                </div>
                <button type='submit' className={styles.submitButton}>Submit</button>
            </form>
        </main>
    );
};

export default RankForm;