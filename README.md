# 3D Sort

<div align="center">

![Demonstration](.github/assets/demo.gif)

A 3D sorting algorithm Progressive Web App (PWA).

[**Try it out »**](https://3dsort.marcelo-schreiber.com/)

[Getting Started](#getting-started) · [Report Bug](https://github.com/marcelo-schreiber/3d-sort/issues) · [Request Feature](https://github.com/marcelo-schreiber/3d-sort/issues)

</div>

## Table of Contents

1. [About The Project](#about-the-project)
   - [Built With](#built-with)
2. [Getting Started](#getting-started)
3. [How to Test](#how-to-test)
   - [Running Tests](#running-tests)
   - [Test Coverage](#test-coverage)
4. [CI/CD Pipeline](#cicd-pipeline)
   - [Automated Testing](#automated-testing)
   - [Build Validation](#build-validation)
   - [Quality Gates](#quality-gates)
5. [Contributing](#contributing)
6. [Contact](#contact)

## About The Project

[![GitHub license](https://img.shields.io/github/license/marcelo-schreiber/3d-sort)](https://github.com/marcelo-schreiber/3d-sort/blob/main/LICENSE)

[![Netlify Status](https://api.netlify.com/api/v1/badges/0df0640d-32b2-47e8-b9be-015a8818b9d6/deploy-status)](https://app.netlify.com/projects/3dsort/deploys)

This project helps users understand how sorting algorithms work in a visual and interactive way. It supports offline usage thanks to PWA technology and lets users control the speed of animations to match their learning pace.

## Features

- Offline and app support (PWA)
- Choose from multiple sorting algorithms
- Adjustable animation speed
- Mobile responsive

## Algorithms Implemented

- Bubble Sort
- Selection Sort
- Insertion Sort
- Merge Sort
- Quick Sort
- Heap Sort

### Built With

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Three.js](https://threejs.org/)
- [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) by [Poimandres](https://github.com/pmndrs)
- [Vite](https://vitejs.dev/)
- [Vite PWA Plugin](https://vite-pwa-org.netlify.app/)
- [React Icons](https://react-icons.github.io/react-icons/)

## Getting Started

### `npm install`

Installs all necessary dependencies.

### `npm run dev`

Starts the app in development mode.

The page will automatically reload if you make edits.

## How to Test

This project includes a comprehensive test suite with 82+ tests covering sorting algorithm correctness, edge cases, and visualization data validation.

### Running Tests

```bash
# Run tests in watch mode (interactive)
npm run test

# Run tests once and exit
npm run test:run

# Run tests with UI (browser-based test runner)
npm run test:ui
```


## CI/CD Pipeline

This project uses GitHub Actions for continuous integration and deployment with comprehensive testing and quality assurance:

### Automated Testing

- **Test Workflow** (`test.yml`): Runs on every push and pull request
  - **Multi-Node Testing**: Tests against Node.js 18.x and 20.x
  - **Comprehensive Test Suite**: Runs the full test suite with 82+ tests
  - **Coverage Reports**: Generates and uploads test coverage to Codecov
  - **TypeScript Validation**: Ensures code compiles without errors
  - **Separate Jobs**: `test`, `lint`, and `test-coverage` for parallel execution


### Workflows

```text
.github/workflows/
├── test.yml        # Comprehensive test suite with multi-node testing
└── build.yml       # Build validation and Lighthouse performance testing
```

## Contributing

Contributions make the open source community amazing. Any contributions you make are **greatly appreciated**.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature`)
5. Open a Pull Request

## Contact

- Email: <marcelorissette15@gmail.com>
- Project Link: [https://github.com/marcelo-schreiber/3d-sort](https://github.com/marcelo-schreiber/3d-sort)

