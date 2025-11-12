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
    if (res.ok && res.status === 204) return true;
    if (res.ok) return res.json();
    throw new Error(await res.text());
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export default sendRequest;
