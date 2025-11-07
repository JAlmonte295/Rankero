const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/ranks`;

const index = async () => {
    try {
        const res = await fetch(BASE_URL, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return res.json();
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
};

const show = async (rankId) => {
    try {
        const res = await fetch(`${BASE_URL}/${rankId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return res.json();
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
};

const create = async (rankFormData) => {
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',  
        },
        body: JSON.stringify(rankFormData),
    });
    return res.json();
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
};

export {
    index,
    show,
    create
};