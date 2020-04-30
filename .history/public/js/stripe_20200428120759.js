// const stripe = Stripe('pk_test_ZYdnEcSNEInn0dbYo0UsgJqX00Wq65T5uy');
import axios from 'axios';
export  const bookTour = async tourId =>{
    // get checkout session from api$
    const session =  await axios(`http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`)

console.log("hello from stripe")
    //create checkout form plus charge
}