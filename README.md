# Trello Copy
![Screenshot 2025-03-01 at 00-53-03 Trello Copy](https://github.com/user-attachments/assets/496ef7ca-1384-4238-99c1-6029e138ffec)


This is a Trello-like application built with React and TypeScript, featuring drag-and-drop functionality using the `@dnd-kit` library. The app allows users to manage tasks across different statuses, such as "Pending", "In Progress", and "Completed".

## Features

- **Drag and Drop**: Rearrange tasks within and across sections using drag-and-drop.
- **Task Management**: Add, update, and delete tasks.
- **Responsive Design**: Built with Tailwind CSS for responsive and modern UI.
- **State Management**: Utilizes Redux for state management.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/developerbrm/trello-copy.git
   cd trello-copy
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173/trello-copy/`.

## Deployment

To deploy the application, build it and deploy the `dist` directory:

1. Build for production:

   ```bash
   npm run build
   ```

2. Deploy the `dist` directory to your preferred hosting service.

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run lint`: Lints the codebase using ESLint.
- `npm run preview`: Previews the production build.
- `npm run deploy`: Deploys the app to GitHub Pages.

## Dependencies

- React 19.0.0
- Redux 5.0.0
- @dnd-kit/core 6.3.1
- Tailwind CSS 4.0.8
- TypeScript 5.7.2

## Development

The project uses Vite for development and build processes. It supports hot module replacement for a fast development experience.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any feature requests or bug fixes.

## License

This project is licensed under the MIT License.
