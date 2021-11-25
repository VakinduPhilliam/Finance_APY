
# Opareta APY

## Opareta Financial Management tool to calculate APY

## Technologies used:

- Stack: _Node.js, JavaScript_.
- Database: _SQLite3_.
- Caching: _Redis/Memory-Cache_.
- Testing: _Jest/supertest_.

## Installations:

- Clone or download project.

- Enter project's command prompt folder.

- Run command below in terminal. 
   
   _npm install_

## Running the app:

_node index.js_

## API Endpoints:

> _API 1: Making an APY calculation request_.

- Endpoint: /apy

- Request Type: POST

- Request URL: http://localhost:4500/apy

- Request parameters: _deposit, customer_id, interest_rate, yearly_compound_times_ 

- Request Example: 

``` json

{
    "deposit": 100, 
    "customer_id": 1, 
    "interest_rate":0.5, 
    "yearly_compound_times": 12
}

```


> _API 2: Fetching APY Calculation History of a customer_.

- Endpoint: /apy/id

- Request Type: GET

- Request URL: http://localhost:4500/apy/1

- Request Parameters: id - customer_id


> _API 3: Delete entire APY History of a customer_:

- Endpoint: /apy/id

- Request Type: DELETE

- Request URL: http://localhost:4500/apy/1

- Request Parameters: id - customer_id


## POSTMAN API Screenshots:

(NOTE: Use 'x-www-form-urlencoded' format for making post Requests.)

_Customer made a successful APY calculation request:_
![Opareta Customer made successfully request](/docs/data_saved.png)


_Customer successfully fetched APY Calculations History:_

![Opareta Customer's APY data](/docs/get_apy_data.png)


_Customer has no APY Calculations History:_

![Opareta Customer's APY data](/docs/get_apy_data_no_data.png)


_Customer APY Calculations History successfully deleted:_

![Opareta Customer's APY data](/docs/apy_data_deleted.png)

