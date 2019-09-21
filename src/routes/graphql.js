import fetch from 'isomorphic-unfetch';

export async function post(req, res, next) {
  const opts = { method: 'POST', headers: {} };

	if (req) {
		opts.headers['Content-Type'] = 'application/json';
		opts.body = JSON.stringify(req.body);
  }

  const token = req.session.token || req.headers.token
	if (token) {
    opts.headers['authorization'] = `Bearer ${token}`;
	}

	const result = await fetch(process.env.GRAPH_QL_URI || `http://localhost:9090/graphql/`, opts);

  const json = await result.json();

  if (json.data && json.data.signIn && json.data.signIn.token) {
    req.session.token = json.data.signIn.token;
  }

  if (json) {
    res.end(JSON.stringify(json));
  }
}
