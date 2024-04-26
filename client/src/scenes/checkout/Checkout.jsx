import { useSelector } from "react-redux";
import { Box, Button, Stepper, Step, StepLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import Shipping from "./Shipping";
import Payment from "./Payment";
import { shades } from "../../theme";
import host  from "../../env.js";


const Checkout = () =>{
    const [activeStep, setActiveStep] = useState(0);
    const cart = useSelector((state) => state.cart.cart);
    const isFirstStep = activeStep === 0;
    const isSecondStep = activeStep === 1;
    const navigate = useNavigate();
    const user = useSelector((state) => state.cart.user);
    
    const handleFormSubmit = async (values, actions) => {
        setActiveStep(activeStep + 1);

        // this copies the billing address onto shipping address
        if (isFirstStep && values.shippingAddress.isSameAddress) {
          actions.setFieldValue("shippingAddress", {
            ...values.billingAddress,
            isSameAddress: true,
          });
        }

        if (isSecondStep) {
          makePayment(values);
        }

        actions.setTouched({});
    };

    const token = useSelector((state) => state.cart.token);

    const totalPrice = cart.reduce((total, item) => {
      return total + item.count * item.attributes.price;
    }, 0);

    async function makePayment(values) {
      // const stripe = await stripePromise;
    const requestBody = {
      costumerName: `${values.billingAddress.firstName} ${values.billingAddress.lastName}`, 
      // [values.firstName, values.lastName].join(" "),
      email: values.email,
      phoneNumber: values.phoneNumber,
      address: `${values.billingAddress.street1}, ${values.billingAddress.street2}, ${values.billingAddress.city} - ${values.billingAddress.zipCode}, ${values.billingAddress.state}, ${values.billingAddress.country}`,
      products: cart.map(({ _id, count }) => ({
        productId : _id,
        productCount : count,
      })),
      userId: user._id,
      totalAmount: totalPrice
    };

    console.log(requestBody);
    if(totalPrice > 0){
      const response = await fetch(`http://${host}:3002/orders/register`, {
      method: "POST",
      headers: { 
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody),
    });
    const session = await response.json();
    if(response.status === 201){
      console.log(session);
      navigate('/pay');
    }
    }else{
      navigate('/');
    }
    
    }

    return(
    <Box width="80%" m="100px auto">
          <Stepper activeStep={activeStep} sx={{ m: "20px 0" }}>
          <Step>
            <StepLabel>Billing</StepLabel>
          </Step>
          <Step>
            <StepLabel>Payment</StepLabel>
          </Step>
        </Stepper>
        <Box>
          <Formik
              onSubmit={handleFormSubmit}
              initialValues={initialValues}
              validationSchema={checkoutSchema[activeStep]}
          >
              {({
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  setFieldValue,
              }) => (
                  <form onSubmit={handleSubmit}>
                      {isFirstStep && (
                          <Shipping
                              values={values}
                              errors={errors}
                              touched={touched}
                              handleBlur={handleBlur}
                              handleChange={handleChange}
                              setFieldValue={setFieldValue}
                          />
                      )}

                    {isSecondStep && (
                      <Payment
                        values={values}
                        errors={errors}
                        touched={touched}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        setFieldValue={setFieldValue}
                      />
                    )}

                    <Box display="flex" justifyContent="space-between" gap="50px"> 
                        {!isFirstStep && (
                        <Button
                          fullWidth
                          color="primary"
                          variant="contained"
                          sx={{
                            backgroundColor: shades.primary[200],
                            boxShadow: "none",
                            color: "white",
                            borderRadius: 0,
                            padding: "15px 40px",
                          }}
                          onClick={() => setActiveStep(activeStep - 1)}
                        >
                          Back
                        </Button>
                      )}
                      <Button
                        fullWidth
                        type="submit"
                        color="primary"
                        variant="contained"
                        sx={{
                          backgroundColor: shades.primary[400],
                          boxShadow: "none",
                          color: "white",
                          borderRadius: 0,
                          padding: "15px 40px",
                        }}
                      >
                        {!isSecondStep ? "Next" : "Place Order"}
                      </Button>
                    </Box>
                  </form>
              )}
          </Formik>
        </Box>

    </Box>
    );
    
}


const initialValues = {
    billingAddress: {
      firstName: "",
      lastName: "",
      country: "",
      street1: "",
      street2: "",
      city: "",
      state: "",
      zipCode: "",
    },
    shippingAddress: {
      isSameAddress: true,
      firstName: "",
      lastName: "",
      country: "",
      street1: "",
      street2: "",
      city: "",
      state: "",
      zipCode: "",
    },
    email: "",
    phoneNumber: "",
  };
  
  const checkoutSchema = [
    yup.object().shape({
      billingAddress: yup.object().shape({
        firstName: yup.string().required("required"),
        lastName: yup.string().required("required"),
        country: yup.string().required("required"),
        street1: yup.string().required("required"),
        street2: yup.string(),
        city: yup.string().required("required"),
        state: yup.string().required("required"),
        zipCode: yup.string().required("required"),
      }),
      shippingAddress: yup.object().shape({
        isSameAddress: yup.boolean(),
        firstName: yup.string().when("isSameAddress", {
          is: false,
          then: yup.string().required("required"),
        }),
        lastName: yup.string().when("isSameAddress", {
          is: false,
          then: yup.string().required("required"),
        }),
        country: yup.string().when("isSameAddress", {
          is: false,
          then: yup.string().required("required"),
        }),
        street1: yup.string().when("isSameAddress", {
          is: false,
          then: yup.string().required("required"),
        }),
        street2: yup.string(),
        city: yup.string().when("isSameAddress", {
          is: false,
          then: yup.string().required("required"),
        }),
        state: yup.string().when("isSameAddress", {
          is: false,
          then: yup.string().required("required"),
        }),
        zipCode: yup.string().when("isSameAddress", {
          is: false,
          then: yup.string().required("required"),
        }),
      }),
    }),
    yup.object().shape({
      email: yup.string().required("required"),
      phoneNumber: yup.string().required("required"),
    }),
  ];
  
export default Checkout;