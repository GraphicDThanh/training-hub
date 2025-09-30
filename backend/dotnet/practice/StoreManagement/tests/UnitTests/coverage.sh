#!/bin/bash

# Define variables for reportgenerator arguments
reports=".coverage/**/*.cobertura.xml"
targetdir=".coveragereport/"
reporttypes="HTML"
assemblyfilters=""

# Navigate to the UnitTests directory
cd ../tests/StoreManagement.UnitTest

# Run tests and collect code coverage
dotnet test --collect:"XPlat Code Coverage" --settings .runsettings --results-directory:"./.coverage"

# Generate the coverage report using ReportGenerator
reportgenerator \
    "-reports:$reports" \
    "-targetdir:$targetdir" \
    "-reporttypes:$reporttypes" \
    # "-assemblyfilters:$assemblyfilters" \

read -p "Press Enter to close this window"
