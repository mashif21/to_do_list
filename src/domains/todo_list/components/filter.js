import {
    Button,
    Icon,
    Select
  } from 'semantic-ui-react'
  import React, { useState } from 'react'

export const Filter = ({
    filterParams = [], handleFilterSearch
}) => {
    const [selectedValue, setSelectedValue] = useState(filterParams[1])
    return (
        <>
            <Select style={{float: 'left'}} options={filterParams} onChange={(event, data) => { 
                setSelectedValue(data.value)}}
                defaultValue={filterParams[0].value}
            >    
            </Select>
            <Button 
                style={{float: 'left', marginLeft: '1rem'}} 
                onClick={() => handleFilterSearch(selectedValue)}
                labelPosition='left'
                icon
            >
                <Icon name='search' />
                    {'Search'}
            </Button>
        </>
    )
}