# Rabbit MQ

docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management

# FinanceTracker

Testing:

# Run all tests

dotnet test YourSolution.sln

# Run specific test project

dotnet test tests/YourApi.UnitTests/YourApi.UnitTests.csproj

# Run tests with specific tag

dotnet test --filter Category=Integration

Start flows:

# .github/workflows/main.yml

name: Test and Build Docker

on:
push:
branches: [ main ]
pull_request:
branches: [ main ]

jobs:
test-and-build:
runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Setup .NET
      uses: actions/setup-dotnet@v3
      with:
        dotnet-version: '8.0.x'

    - name: Restore dependencies
      run: dotnet restore

    - name: Build
      run: dotnet build --no-restore --configuration Release

    - name: Run Tests
      run: dotnet test --no-build --verbosity normal
      # If tests fail, the workflow will stop here

    - name: Docker Build
      # This step only runs if tests pass
      run: docker build -t yourapi:latest .
