FROM microsoft/dotnet:2.1-aspnetcore-runtime-nanoserver-1709 AS base
WORKDIR /app
EXPOSE 80

FROM microsoft/dotnet:2.1-sdk-nanoserver-1709 AS build
WORKDIR /src
COPY TicketTrackerAPI/TicketTrackerAPI.csproj TicketTrackerAPI/
RUN dotnet restore TicketTrackerAPI/TicketTrackerAPI.csproj
COPY . .
WORKDIR /src/TicketTrackerAPI
RUN dotnet build TicketTrackerAPI.csproj -c Release -o /app

FROM build AS publish
RUN dotnet publish TicketTrackerAPI.csproj -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "TicketTrackerAPI.dll"]
