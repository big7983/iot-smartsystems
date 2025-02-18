module.exports = {
    async rewrites() {
      return [
        {
          source: '/api/user_info',
          destination: 'https://grand-readily-werewolf.ngrok-free.app/api/user_info', // URL ของ API
        },
      ];
    },
  };
  