import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as rankService from '../../services/rankService';
import styles from './RankForm.module.css';
import PageHeader from '../PageHeader/PageHeader';


const RankForm = (props) => {
    const { rankId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        category: 'Games',
        title: '',
        description: '',
        list: [{ id: Date.now(), itemName: '', imageUrl: '' }], // Start with one empty item with a unique id

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
        setFormData({ ...formData, list: [...formData.list, { id: Date.now(), itemName: '', imageUrl: '' }] });
    };

    const handleRemoveListItem = (index) => {
        const list = [...formData.list];
        list.splice(index, 1);
        setFormData({ ...formData, list });
    };

    const handleMoveItemUp = (index) => {
        if (index === 0) return; // Can't move up if it's the first item
        const list = [...formData.list];
        const itemToMove = list[index];
        list[index] = list[index - 1];
        list[index - 1] = itemToMove;
        setFormData({ ...formData, list });
    };

    const handleMoveItemDown = (index) => {
        if (index === formData.list.length - 1) return; // Can't move down if it's the last item
        const list = [...formData.list];
        [list[index], list[index + 1]] = [list[index + 1], list[index]]; // Swap with item below
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
        document.title = rankId ? 'Edit Rank' : 'New Rank';
    }, [rankId]);

    useEffect(() => {
        const fetchRank = async () => {
            const rankData = await rankService.show(rankId);
            // Ensure all list items have a unique ID for React's key prop
            const listWithIds = rankData.list.map((item, index) => ({
                ...item,
                // Use existing _id or generate a temporary one
                id: item._id || Date.now() + index,
            }));
            setFormData({ ...rankData, list: listWithIds });
        };
        if (rankId) fetchRank();
    }, [rankId]);

    return (
        <div className={styles.container}>
            <button type="button" onClick={() => navigate(-1)} className={styles.backButton}>&larr; Back</button>
            <form onSubmit={handleSubmit} className={styles.form}>
                <PageHeader title={rankId ? 'Edit Rank' : 'New Rank'} />
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
                    placeholder="Write down the title of your ranking"
                />
                <label htmlFor='description-input'>Description</label>
                <input
                    type='text'
                    id='description-input'
                    name='description'
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Write down the description of your ranking"
                />
                <div className={styles.listItemsContainer}>
                    <label>List Items</label>
                    {formData.list.map((item, index) => (
                        <div key={item.id || index} className={styles.listItem}>
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
                            <div className={styles.itemActions}>
                                <button
                                    type="button"
                                    onClick={() => handleMoveItemUp(index)}
                                    disabled={index === 0}
                                    className={styles.moveButton}
                                >
                                    ▲
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleMoveItemDown(index)}
                                    disabled={index === formData.list.length - 1}
                                    className={styles.moveButton}
                                >
                                    ▼
                                </button>
                                {formData.list.length > 1 && (
                                    <button type="button" onClick={() => handleRemoveListItem(index)} className={styles.removeButton}>-</button>
                                )}
                            </div>
                        </div>
                    ))}
                    <button type="button" onClick={handleAddListItem} className={styles.addButton}>+ Add Item</button>
                </div>
                <div className={styles.buttonContainer}>
                    <button type='submit' className={styles.submitButton}>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default RankForm;