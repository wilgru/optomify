import React, { useEffect, useState } from 'react';

// antd
import { Button } from 'antd';
import moment from 'moment';

// utils
import { dateWorker } from '../utils/date'

// grpahQL
import { UPDATE_BOOKING } from '../graphql/mutations';
import { GET_BOOK_SETUPS } from '../graphql/queries';
import { useMutation } from '@apollo/client';

const Refetcher = (props) => {

    const [updateBooking, { error }] = useMutation(UPDATE_BOOKING);


    const onFinish = () => {
        updateBooking({
            variables: {
                bookingToUpdateId: props.bookingToUpdateId,
                updateAction: props.action
            },
            refetchQueries: [
                {query: GET_BOOK_SETUPS},
                GET_BOOK_SETUPS
            ]
        })
        
        props.modalVis(false);
    };

    return (
        <Button onClick={onFinish}>CLIKC ME</Button>
    );
};

export default Refetcher;