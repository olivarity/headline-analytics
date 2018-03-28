# Headline Analytics
## Spec
* Webpage with headline and button
* Dynamically load random text for these elements
* Log percentage of times clicked per headline/button set
* Enable analysis of data

## Endpoints
* `/api` - GET a random headline, POST a click event
* `/admin/timestamps` - GET a log of all click events with JS timestamp
* `/admin/headlines` - GET list of all headline/button combinations, along with send and click counts
