import axios from 'axios';

type I_FetchParams = { url: string; req: any };

async function fetchAPI({ url, req }: I_FetchParams) {
    try {
        const { data } = await axios.post(url, req);
        return data;
    } catch (ex) {
        console.log(`${url} Exception =>`, ex);
    }
}

export default fetchAPI;
