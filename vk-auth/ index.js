const { buildQueryString, callApi } = require('./helpers');
const creds = require('./credentials')
const scopes = ['email'];
exports.vKAuthFirstStep = (res) => {
    const url = `https://oauth.vk.com/authorize${buildQueryString([
        { client_id: creds.cliendId },
        { redirect_uri: 'http://localhost:3001/login/vk/complete' },
        { response_type: 'code' },
        { scope: scopes.join('+') },
        { state: '{}' },
    ])}`;
    res.redirect(url);
};
exports.vkLoginComplete = async (req, res) => {
    const code = req.query['code'] || '';
    if (!code) {
        console.debug('Cannot authorize no code')
        return res.send('Cannot authorize no code');
    };
    const data = await getAccessToken(String(code));
    if (!data.access_token) {
        console.debug('Unable to get access token')
        return res.send('Unable to get access token');
    }
    const userInfo = await getUserInfo(data.access_token);
    console.debug('Successfully got information about authorized user');
    return res.send(`Successfully got information about authorized user
${JSON.stringify(userInfo)}`)
};
const getAccessToken = async (code) => {
    const { email, access_token, user_id } = await callApi(
        'post',
        `https://oauth.vk.com/access_token${buildQueryString([
            { code: code },
            { client_id: creds.cliendId },
            { client_secret: creds.secretKey },
            { redirect_uri: 'http://localhost:3001/login/vk/complete' },
        ])}`
    );
    return {
        email,
        access_token,
        user_id,
    };
};
const getUserInfo = async (accessToken) => {
    const data = await callApi(
        'post',
        `https://api.vk.com/method/users.get${buildQueryString([
            { access_token: accessToken },
            { fields: ['screen_name', 'nickname', 'name'].join(',') },
        ])}&v=5.103`
    );
    const { id, first_name, last_name, screen_name, nickname, email } = data.response[0];
    console.log(data.response)
    return {
        id: id,
        name: nickname || screen_name || first_name + ' ' + last_name,
        nickname: nickname,
        screen_name: screen_name,
        first_name: first_name,
        last_name: last_name,
        email: email
    };
};
