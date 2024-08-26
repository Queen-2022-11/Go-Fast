
// import { ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client';
// import { da } from 'date-fns/locale';

// export const client = new ApolloClient({
//   uri: "https://api-ap-south-1.hygraph.com/v2/clz6ijng003fx07ujhjbjc7qg/master",
//   cache: new InMemoryCache(),
// });
// const MASTERURL="https://api-ap-south-1.hygraph.com/v2/clz6ijng003fx07ujhjbjc7qg/master"
// // Define your GraphQL query
// export const GET_SLIDER = gql`
//   query GetSlider {
//     sliders {
//       id
//       name
//       image {
//         url
//       }
//     }
//   }
// `;

// // Function to use in your component
// export const getSliderData = async () => {
//   try {
//     const { data } = await client.query({
//       query: GET_SLIDER,
//     });
//     return data;
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     throw error;
//   }
// };
// export const GET_CATEGORIES = gql`
//   query GetCategories {
//   categories {
//     id
//     name
//     icon {
//       url
//     }
//   }
// }
// `;


// export const getCategories = async () => {
//   try {
//     const { data } = await client.query({
//       query: GET_CATEGORIES,
//     });
//     return data;
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     throw error;
//   }
// };
// export const GET_BUISNESS = gql`
//   query GetBusinessList {
//   businesslists {
//     about
//     address
//     category {
//       name
//     }
//     email
//     id
//     image {
//       url
//     }
//     name
//     contactPerson
//   }
// }
// `;


// export const getBuisnessList = async () => {
//   try {
//     const { data } = await client.query({
//       query: GET_BUISNESS,
//     });
//     return data;
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     throw error;
//   }
// };

// export const GET_BUSINESSES_BY_CATEGORY = gql`
// query GetBusinessList {
//       businesslists(where: {category: {name: "Cleaning"}}) {
//         about
//         address
//         category {
//           name
//         }
//         email
//         id
//         image {
//           url
//         }
//         name
//         contactPerson
//       }
//     }
// `;
// export const getBusinessListByCategory = async (category) => {
//   try {
//     const { data } = await client.query({
//       query: gql`
//         query GetBusinessList($category: String!) {
//           businesslists(where: { category: { name: $category } }) {
//             about
//             address
//             category {
//               name
//             }
//             email
//             id
//             image {
//               url
//             }
//             name
//             contactPerson
//           }
//         }
//       `,
//       variables: { category },
//     });
//     return data;
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     throw error;
//   }
// };

// export const getBusinessListById = async (name) => {
//   try {
//     const { data } = await client.query({
//       query: gql`
//         query GetBusinessList($name: String!) {
//           businesslists(where: { name: $name }) {
//             about
//             address
//             category {
//               name
//             }
//             email
//             id
//             image {
//               url
//             }
//             name
//             contactPerson
//           }
//         }
//       `,
//       variables: {  name },
//     });
//     return data;
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     throw error;
//   }
// };

// export const getBookingStatus= async (data) => {
//   const mutationquery=gql`
//   mutation createBooking {
//    createBooking(data: 
//    {bookingStatus: inProgress, 
//    businesslist: {connect: {id: "`+data.businessId+`"}}, 
//    date: "`+data.date+`",
//    time: "`+data.time+`", 
//    userEmail: "`+data.userEmail+`",
//    userName: "`+data.userName+`"}
// ) {
// id
// }
// publishManyBookings(to: PUBLISHED) {
// count
// }
// }`
// const result =await request(MASTERURL,mutationquery);
// return result;
// };
import { GraphQLClient, gql } from 'graphql-request';

const MASTERURL = "https://api-ap-south-1.hygraph.com/v2/clz6ijng003fx07ujhjbjc7qg/master";
const client = new GraphQLClient(MASTERURL);
 

// Define your GraphQL query
export const GET_SLIDER = gql`
  query GetSlider {
    sliders {
      id
      name
      image {
        url
      }
    }
  }
`;

export const getSliderData = async () => {
  try {
    const data = await client.request(GET_SLIDER);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      name
      icon {
        url
      }
    }
  }
`;

export const getCategories = async () => {
  try {
    const data = await client.request(GET_CATEGORIES);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const GET_BUSINESS = gql`
  query GetBusinessList {
    businesslists {
      about
      address
      category {
        name
      }
      email
      id
      image {
        url
      }
      name
      contactPerson
    }
  }
`;

export const getBusinessList = async () => {
  try {
    const data = await client.request(GET_BUSINESS);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
export const getUserBooking = async (userEmail) => {
const query=gql`query MyQuery {
  bookings(orderBy: updatedAt_DESC, where: {userEmail: "`+userEmail+`"}) {
    id
    time
    userEmail
    userName
    date
    bookingStatus
    businesslist {
      image {
        url
      }
      id
      contactPerson
      address
      name
      email
      about
    }
  }
}`;
try {
  const data = await client.request(query, { userEmail });
  return data;
} catch (error) {
  console.error('Error fetching data:', error);
  throw error;
}};
export const getBusinessListByCategory = async (category) => {
  const query = gql`
    query GetBusinessList($category: String!) {
      businesslists(where: { category: { name: $category } }) {
        about
        address
        category {
          name
        }
        email
        id
        image {
          url
        }
        name
        contactPerson
      }
    }
  `;
  
  try {
    const data = await client.request(query, { category });
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const getBusinessListById = async (name) => {
  const query = gql`
    query GetBusinessList($name: String!) {
      businesslists(where: { name: $name }) {
        about
        address
        category {
          name
        }
        email
        id
        image {
          url
        }
        name
        contactPerson
      }
    }
  `;
  
  try {
    const data = await client.request(query, { name });
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const getBookingStatus = async (data) => {
  const mutationquery = gql`
    mutation createBooking {
      createBooking(data: {
        bookingStatus: inProgress,
        businesslist: {connect: {id: "${data.businessId}"}},
        date: "${data.date}",
        time: "${data.time}",
        userEmail: "${data.userEmail}",
        userName: "${data.userName}"
      }) {
        id
      }
      publishManyBookings(to: PUBLISHED) {
        count
      }
    }
  `;
  
  try {
    const result = await client.request(mutationquery);
    return result;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

