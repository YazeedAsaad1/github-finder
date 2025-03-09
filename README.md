# GitHub Finder

GitHub Finder is a React application that allows users to search for GitHub profiles and view relevant user information in a clean, responsive interface. 

you can find the .fig file inside github-user-search-app-figma 

## Features

- Search for GitHub users by username
- View detailed user information including:
  - Profile picture
  - Name and username
  - Join date
  - Bio
  - Repository count
  - Follower and following counts
  - Location
  - Website link
  - Twitter username
  - Company
- Toggle between dark and light mode
- Persistent theme preference using localStorage
- Responsive design for various screen sizes
- Navigation with back button to return to previous search results

## Technologies Used

- React.js
- React Router for navigation
- GitHub API for fetching user data
- CSS for styling
- Local storage for theme preference persistence

## Installation

1. Clone the repository
```bash
git clone https://github.com/yazeedasaad1/github-finder.git
cd github-finder
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

4. Open localhost:5173 in your browser

## Usage

1. Enter a GitHub username in the search bar
2. Press the "Search" button or hit Enter
3. View the user's profile information
4. Toggle between dark and light mode using the button in the top right
5. Use the back button to return to previous search results

## API

This application uses the GitHub API to fetch user data:
```
https://api.github.com/users/{username}
```

Note: GitHub API has rate limiting, so excessive use may result in temporary restrictions.

## Project Structure

- `GithubFinder.js` - Main component that handles the application logic
- `githubFinder.css` - Styling for the application
- `/images` - Contains SVG assets used in the interface

## Key Functionalities

- State management for user data and theme preferences
- API integration with GitHub
- Error handling for user not found
- Date formatting for join date
- Responsive design with adaptive layouts
- Theme toggle with persistent preferences

## License

[MIT](LICENSE)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request