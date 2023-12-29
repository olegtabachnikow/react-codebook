# React-Codebook

React-Codebook is an npm package that provides a versatile environment for writing and executing React.js code snippets. It includes a Markdown editor, a code editor, and serves the application via the command line interface (CLI). Users can specify options such as the filename and port number to tailor their development experience.

## Demo

[Link](https://react-codebook-preview.vercel.app/)

## Installation

```bash
npm install react-codebook
```

## Usage

To start React-Codebook, use the following command in your terminal:

```bash
serve <filename> --port <number>
```

### Options

- **filename**: Use the `<filename>` argument to specify the file to edit. (Default: "codebook.js")

  ```bash
  serve my-file.js
  ```

- **port**: Use the `--port <number>` flag to specify the port number to open the application. (Default: 4005)
  ```bash
  serve codebook.js --port 3000
  ```

## Features

- **Markdown Editor**: Write and edit markdown content.
- **Code Editor**: Compose React.js code snippets.
- **CLI Launch**: Start the application using the command line interface.
- **Customizable Options**: Tailor the experience with filename and port options.

## Technologies Used

- React
- Express
- Commander
- React-Redux
- ESBuild
