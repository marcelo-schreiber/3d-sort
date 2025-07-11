# CI/CD GitHub Actions for 3D Sort

## Workflows Overview

This repository includes comprehensive CI/CD workflows to ensure code quality and prevent regressions.

### Test Workflow (`test.yml`)
- **Triggers**: Push and Pull Request to master/main/develop
- **Matrix Testing**: Node.js 18.x and 20.x
- **Coverage**: Generates coverage reports and uploads to Codecov
- **TypeScript**: Validates compilation

### Build Workflow (`build.yml`)
- **Triggers**: Push and Pull Request to master/main
- **Build Validation**: Ensures application builds successfully
- **Lighthouse CI**: Performance testing (PR only)
- **Artifacts**: Saves build outputs

### CI Status Workflow (`ci.yml`)
- **Triggers**: Push and Pull Request to master/main
- **Dependencies**: Waits for test and build completion
- **Status Check**: Provides overall CI status

## Coverage Thresholds

The project maintains high code coverage standards:

- **Branches**: 80% minimum
- **Functions**: 80% minimum  
- **Lines**: 80% minimum
- **Statements**: 80% minimum

Current coverage for sorting algorithms: **100%**

## Quality Gates

All workflows must pass before merging:
- ✅ All tests pass (82+ tests)
- ✅ TypeScript compilation succeeds
- ✅ Application builds successfully
- ✅ Lighthouse performance thresholds met
- ✅ Coverage thresholds maintained

## Local Development

```bash
# Run all tests
npm run test:run

# Run tests with coverage
npm run test:coverage

# Run tests with UI
npm run test:ui

# Build application
npm run build
```

## Integration

The workflows integrate with:
- **Codecov**: Coverage reporting and tracking
- **Lighthouse CI**: Performance monitoring
- **GitHub**: Status checks and artifact storage
