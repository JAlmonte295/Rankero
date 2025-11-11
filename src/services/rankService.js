import sendRequest from "../services/api";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/ranks`;

const index = async () => {
    return sendRequest(`${BASE_URL}?populate=choices`);
};

const show = async (rankId) => {
    return sendRequest(`${BASE_URL}/${rankId}`);
};

const create = async (rankFormData) => {
    return sendRequest(BASE_URL, 'POST', rankFormData);
};

const voteOnChoice = async (rankId, choiceId, vote) => {
    return sendRequest(`${BASE_URL}/${rankId}/choices/${choiceId}/vote`, 'POST', { vote });
};

const upvote = async (rankId) => {
    return sendRequest(`${BASE_URL}/${rankId}/upvote`, 'POST');
};

const downvote = async (rankId) => {
    return sendRequest(`${BASE_URL}/${rankId}/downvote`, 'POST');
};

const createComment = async (rankId, commentFormData) => {
    return sendRequest(`${BASE_URL}/${rankId}/comments`, 'POST', commentFormData);
};

const deleteComment = async (rankId, commentId) => {
    return sendRequest(`${BASE_URL}/${rankId}/comments/${commentId}`, 'DELETE');
};

const updateComment = async (rankId, commentId, commentFormData) => {
    return sendRequest(`${BASE_URL}/${rankId}/comments/${commentId}`, 'PUT', commentFormData);
};

const deleteRank = async (rankId) => {
    return sendRequest(`${BASE_URL}/${rankId}`, 'DELETE');
};

const updateRank = async (rankId, rankFormData) => {
    return sendRequest(`${BASE_URL}/${rankId}`, 'PUT', rankFormData);
};


export {
    index,
    show,
    create,
    voteOnChoice,
    upvote,
    downvote,
    createComment as addComment,
    deleteRank,
    deleteComment,
    updateRank,
    updateComment,
};