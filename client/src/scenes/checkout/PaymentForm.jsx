import React, { useState } from 'react';
import { Container, TextField, Button, Box, IconButton, Divider, Typography } from '@mui/material';
import { useSelector, useDispatch} from "react-redux";
import styled from "@emotion/styled";
// import { shades } from "../../theme";
import { setOrders } from "../../state";

import { useNavigate } from 'react-router-dom';
const PaymentForm = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.cart.orders);  
  const [cardNumber, setCardNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [cvv, setCvv] = useState('');

    const cart = useSelector((state) => state.cart.cart);

    const navigate = useNavigate();
    const totalPrice = cart.reduce((total, item) => {
      return total + item.count * item.attributes.price;
    }, 0);

    

    const  handleFormSubmit =  (event) => {
        // event.preventDefault();
        // Here you can handle form submission, such as sending data to a server
        console.log('Form submitted:', { cardNumber, expirationDate, cvv });
        // dispatch(setOrders({...orders,total: totalPrice}));
        // console.log(orders);
        navigate('/');
    };

    
    const FlexBox = styled(Box)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    `;
    return (
        <Box width="80%" m="100px auto" textAlign={"center"} display={'flex'} justifyContent="space-between"
        flexWrap="wrap">
            <Box flex="1" marginTop={4}>
                <Box>
                <Typography fontWeight="bold" fontSize={"20px"}>
                    Soft Bill
                </Typography>
                </Box>
            {cart.map((item) => (
              <Box key={`${item.attributes.name}-${item._id}`}>
                {/* <FlexBox p="15px 0"> */}
                    
                    <Box display={'flex'} justifyContent="space-between" flex="1"  m="10px 0">
                      <Typography fontWeight="bold">
                        {item.attributes.name}
                      </Typography>
                      <Typography fontWeight="bold" marginLeft={2}>
                        ${item.attributes.price}
                      </Typography>
                    
                    </Box>
                    <Box display={'flex'} justifyContent="space-between" mb={"10px"}>
                        <Box>
                            <Typography>QTY {item.count}</Typography>
                        </Box>
                        <Box>
                            <Typography>${item.count * item.attributes.price}</Typography>
                        </Box>
                    </Box>
                <Divider />
              </Box>
            ))}
            <FlexBox m="20px 0">
              <Typography fontWeight="bold">TOTAL</Typography>
              <Typography fontWeight="bold">${totalPrice}</Typography>
            </FlexBox>
            </Box>
          <Box>
            <Container maxWidth="sm" >
            <IconButton
            // className={classes.googlePayButton}
            onClick={handleFormSubmit}
            >
                <img
                src="https://1000logos.net/wp-content/uploads/2020/04/Google-Pay-Logo.jpg"
                alt="Google Pay"
                style={{ width: '15%' }}
                />
            </IconButton>
            <Divider sx={{ height: 28, mb: 1 }} />
            <Typography fontWeight="bold">Or pay with card</Typography>
                <form onSubmit={handleFormSubmit}>
                    <TextField
                        label="Card Number"
                        variant="outlined"
                        fullWidth
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        margin="normal"
                    />
                    <TextField
                        label="Expiration Date"
                        variant="outlined"
                        fullWidth
                        value={expirationDate}
                        onChange={(e) => setExpirationDate(e.target.value)}
                        margin="normal"
                    />
                    <TextField
                        label="CVV"
                        variant="outlined"
                        fullWidth
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        margin="normal"
                    />
                    <Box sx={{ marginTop: "2.8px" }}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Pay
                        </Button>
                    </Box>
                </form>
            </Container>
          </Box>
        </Box>
    );
};

export default PaymentForm;
