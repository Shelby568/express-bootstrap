const mockJokesResponse = {
  type: 'success',
  value: [
    {
      id: 1,
      joke: 'i am a joke',
      categories: [],
    },
    {
      id: 2,
      joke: 'i am another joke',
      categories: [],
    },
  ],
};

const mockRandomResponse = {
  type: 'success',
  value: {
    id: 115,
    joke: 'i am a random joke',
    categories: [],
  },
};

const mockPersonalResponse = {
  type: 'success',
  value: {
    id: 141,
    joke: 'random joke about manchester codes',
    categories: [],
  },
};

module.exports = {
  mockJokesResponse,
  mockRandomResponse,
  mockPersonalResponse,
};
