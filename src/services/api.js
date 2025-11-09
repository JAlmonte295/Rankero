const sendRequest = async (url, method = 'GET', payload = null) => {
  const options = { method };
  options.headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  if (payload) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(payload);
  }

  try {
    const res = await fetch(url, options);
    // If the request is successful and there's no content, return true
    if (res.ok && res.status === 204) return true;
    if (res.ok) return res.json();
    // If the server returns an error, throw it to be caught by the caller
    throw new Error(await res.text());
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export default sendRequest;
