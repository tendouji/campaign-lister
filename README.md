This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) without ejecting.

## CR8 Campaign

This project is to create a simple application to campaign list, and allow user to filter the list via campaign name search or date range selection.

### Campaign record type
A single Campaign data has the following properties:
```
{
    name: string,
    startDate: string (format: "MM/DD/YYYY"),
    endDate: string (format: "MM/DD/YYYY"),
    budget: number
}
```
NOTE: Kindly take note the property keys to be in `lowerCamelCase` format.

### `AddCampaigns([campaignData])`
To add Campaign record, this app exposes a global method for your convenience.
You can input the method in the browser's Developer Tools Console tab.

#### Arguments
```
[campaignData]: (required) An array of CampaignData to add / prepend to current data.

campaignData:
{
    name: string,
    startDate: string (format: "MM/DD/YYYY"),
    endDate: string (format: "MM/DD/YYYY"),
    budget: number
}
```

#### Samples
```
AddCampaigns([
    {name: "Campaign AAA 1", startDate: "01/15/2018"), endDate: "06/30/2018"), budget: 39780},
    {name: "Campaign AAA 2", startDate: "03/28/2018"), endDate: "02/28/2019"), budget: 39780},
    {name: "Campaign CCC", startDate: "09/01/2019"), endDate: "04/30/2020"), budget: 39780}
]);
```

NOTE: For simplicity sake, there is no `id` property as the app will make use of Array index key as record `id` for auto increment.

NOTE: For each call of the method, the array data will be appended to the existing list.

### Demo URL
Visit [http://localhost:3000](http://localhost:3000) to view it in the browser.