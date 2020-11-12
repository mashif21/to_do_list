import React, { Component } from 'react'
import {
    Button,
    Container,
    Grid,
    Header,
    Icon,
    Label,
    Loader,
    Modal,
    Popup,
    Segment,
    Tab,
    Table,
    TextArea
} from 'semantic-ui-react'

export const ModalComponent = ({heading='2222', description='hhhhhhh', onPressOk, onPressCancel, openStatus=false}) => {
    return (
        <Modal open={openStatus} basic size='small'>
            <Header icon='save' content={heading}></Header>
            <Modal.Content>
                <Container>
                    <label>{description}</label>
                </Container>
            </Modal.Content>
            <Modal.Actions>
                <Button
                    basic
                    color='red'
                    inverted
                    onClick={onPressCancel}
                >
                    <Icon name='remove' /> No
                </Button>
                <Button
                    color='green'
                    inverted
                    onClick={onPressOk}
                >
                    <Icon name='checkmark' /> Yes
                </Button>
            </Modal.Actions>
        </Modal>
    )
}