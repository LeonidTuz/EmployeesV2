FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["EmployeesV2.Api.csproj", "./"]
RUN dotnet restore "EmployeesV2.Api.csproj"
COPY . .
WORKDIR "/src/"
RUN dotnet build "EmployeesV2.Api.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
RUN dotnet publish "EmployeesV2.Api.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .

EXPOSE 80
EXPOSE 443
ENTRYPOINT ["dotnet", "EmployeesV2.Api.dll"]