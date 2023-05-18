// import { createClient, Entry } from 'contentful';

// interface EntryFields {
//   articletitle: string;
//   articlecontent: string;
//   author: string;
//   media?: { fields: { file: { url: string } } } | null;
//   date: string;
// }

// interface BlogPost {
//   sys: {
//     id: string;
//     contentType: {
//       sys: {
//         id: string;
//       };
//     };
//   };
//   fields: EntryFields;
// }

// const client = createClient({
//   space: 'rtn0gjkma2wp',
//   accessToken: 'BeEW54hkSBEVU8oX84bggbMZUlmXUhF8w8AktvD8_yo',
// });

// async function fetchBlogPosts() {
//   try {
//     const entries: Entry = await client.getEntries({
//       content_type: 'artykuPublic',
//     });

//     entries.forEach((entry) => {
//       const { articletitle, articlecontent, author, media, date } =
//         entry.fields;

//       console.log('Tytuł:', articletitle);
//       console.log('Treść:', articlecontent);
//       console.log('Autor:', author);
//       console.log('Data publikacji:', date);

//       if (media) {
//         console.log('Obrazek:', media.fields.file.url);
//       }

//       console.log('---');
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }

// fetchBlogPosts();
