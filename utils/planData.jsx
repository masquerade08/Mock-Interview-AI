import { duration } from "moment";

export default [
    {
        id: 1,
        name: 'Free',
        const: 0,
        paymmentLink: '/dashboard/',
        offering: [
            {
                value: '✔ create 3 Free Mock Interview'
            },
            {
                value: '✔ Unlimited Retake Interview'
            },
            {
                value: '❌ Practice Question'
            },
            {
                value: '❌ Email Support'
            },

        ]

    },
    {
        id: 1,
        name: 'Monthly',
        const: 9.99,
        duration: 'month',
        paymmentLink: 'https://buy.stripe.com/test_00gdS50SS9e07iE28a',
        offering: [
            {
                value: '✔ create 3 Free Mock Interview'
            },
            {
                value: '✔ Unlimited Retake Interview'
            },
            {
                value: '✔ Practice Question'
            },
            {
                value: '✔ Email Support'
            },

        ]
    },
    {
        id: 1,
        name: 'Yearly',
        const: 79.00,
        duration: 'year',
        paymmentLink: 'https://buy.stripe.com/test_dR6eW9atsgGsauQ7ss',
        offering: [
            {
                value: '✔ create 3 Free Mock Interview'
            },
            {
                value: '✔ Unlimited Retake Interview'
            },
            {
                value: '✔ Practice Question'
            },
            {
                value: '✔ Email Support'
            },

        ]
    },
]