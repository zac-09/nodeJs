import axios from 'axios';
 import {showAlert} from './alerts'
 const stripe = Stripe('pk_test_ZYdnEcSNEInn0dbYo0UsgJqX00Wq65T5uy');

export  const bookTour = async tourId =>{
    try{
    // get checkout session from api$

        const session =  await axios(`http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`)
        console.log(session.data);
        //create checkout form 
        await stripe.redirectToCheckout({
            session: session.data.session.id
        })

    }catch(err){
        showAlert('error',err)
    }
    
// console.log("hello from stripe")
    //create checkout form plus charge
}