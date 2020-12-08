import React from 'react'
import {
    Button,
    Card,
    Container,
    Icon
} from 'semantic-ui-react'

export const TaskCards = ({taskList = [], onRemoveClick, closeModal}) => {
    return taskList.map(function (data, idx) {
        const spanColor = data.completed ? 'green' : 'red'
        return (
            <Card fluid color='red' href={`/task/update/${data._id}`}>
                    <Card.Description 
                        content={data.description}
                        style={{float: 'left', paddingLeft: '2rem', paddingTop: '5px'}} 
                    />
                    <Container>
                        <span 
                            style={{float: 'right', paddingRight: '2rem', marginBottom: '1rem', color: spanColor}}
                        >
                            {data.completed ? `Completed` : `Not Completed`}
                        </span>
                    </Container>
                    <Container>
                        <section>
                            <span style={{float: 'left', paddingLeft: '1rem', color: 'lightgrey'}}>
                                {`Created at: ${new Date(data.updatedAt).toDateString()}`}
                            </span>
                        </section>
                        <br></br>
                        <section>
                            <span style={{float: 'left', paddingLeft: '1rem', color: 'lightgrey'}}>
                                {`Expire at: ${new Date(data.updatedAt).toDateString()}`}
                            </span>
                        </section>
                        <Button 
                            icon
                            labelPosition='left'
                            color='red'
                            style={{float: 'right', marginBottom: '1rem'}}     
                            onClick={(e) => {
                                e.preventDefault()
                                onRemoveClick({taskId: data._id, closeModal})
                            }}         
                        >
                            <Icon name='delete' />
                            {'Delete'}
                        </Button>
                    </Container>
            </Card>
        )
    })
}