import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// var options = {
//     method: 'GET',
//     url: 'https://bing-news-search1.p.rapidapi.com/news',
//     params: {safeSearch: 'Off', textFormat: 'Raw'},
//     headers: {
//       'x-bingapis-sdk': 'true',
//       'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
//       'x-rapidapi-key': '91ca417007mshb381de2b445a137p18fff1jsn8d69c810af8d'
//     }
//   };

const cryptoNewsHeaders = {
    //! Bİng news search api will replace these
    'x-bingapis-sdk': 'true',
    'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
    'x-rapidapi-key': '91ca417007mshb381de2b445a137p18fff1jsn8d69c810af8d'

};

const baseUrl = 'https://bing-news-search1.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getNews: builder.query({
            query: ({ newsCategory, count }) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
        })
    })
})

export const { useGetNewsQuery } = cryptoNewsApi;