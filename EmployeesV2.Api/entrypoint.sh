#!/bin/bash
set -e

echo "Applying database migrations..."
dotnet ef database update

echo "Starting application..."
exec dotnet EmployeesV2.Api.dll