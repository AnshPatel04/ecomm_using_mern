import { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state/index.js";
// import FlexBetween from "components/FlexBetween";
import host from "../../env.js";
import Dropzone from "react-dropzone";
import { useParams } from "react-router-dom";

const registerSchema = yup.object().shape({
  name: yup.string().required("required"),
  price: yup.string().required("required"),
  sortDescription: yup.string().required("required"),
  longDescription: yup.string().required("required"),
  // category: yup.string().required("required"),
  picture: yup.string().required("required"),
});


// const initialValuesRegister = {
//   name: "",
//   price: "",
//   sortDescription: "",
//   longDescription: "",
//   // category: "",
//   picture: ""
// };


const EditForm = () => {
    const { itemId } = useParams();
    const [data,setData] = useState({});

    useEffect(()=>{
      if(itemId){
      fetch(`http://${host}:3002/items/${itemId}`)
      .then((res)=>{
          return res.json()
      })
      .then((res)=>{
        setData({...res,picture: ""})
        // values = {...values,
        //   'name': res['name'],
        //   'price': res['price'],
        //   'category': res['category'],
        //   'image': res.picture.name,
        //   'sortDescription': res['sortDescription'],
        //   'longDescription': res['longDescription'],
        // }
        // 'name': values['name'],
        //   'price': Number(values['price']),
        //   'category': values['category'],
        //   'picture': values.picture,
        //   'image': values.picture.name,
        //   'sortDescription': values['sortDescription'],
        //   'longDescription': values['longDescription'],

        // setData(res)
      })
    }},[])
    // name,
    //     sortDescription,
    //     longDescription,
    //     price,
    //     category,
    //     image
  const breakPoint = useMediaQuery("(min-width:600px)");
  const [valueOfTab, setValue] = useState("topRated");
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin =  "login";
  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };
  // const isRegister = pageType === "register";

  const register = async (values, onSubmitProps) => {
    // send form with image
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("category", valueOfTab);
    formData.append("image", values.picture.name);

    // let data = {
    //   'name': values['name'],
    //   'price': Number(values['price']),
    //   'category': values['category'],
    //   'picture': values.picture,
    //   'image': values.picture.name,
    //   'sortDescription': values['sortDescription'],
    //   'longDescription': values['longDescription'],
    // };

    console.log(formData);
    const savedUserResponse = await fetch(
      `http://${host}:3002/items/edit/${itemId}`,
      {
        method: "PATCH",
        // body: JSON.stringify(data),
        body: formData,
        // headers: {"Content-Type": "application/json"}
      }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      navigate(`/item/${itemId}`);
      // setPageType("login");
    }
  };

//   const login = async (values, onSubmitProps) => {
//     const loggedInResponse = await fetch(`http://${host}:3002/auth/login`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(values),
//     });
//     const loggedIn = await loggedInResponse.json();
//     onSubmitProps.resetForm();
//     if (loggedInResponse.status === 200) {
//         console.log(loggedIn);
//       dispatch(
//         setLogin({
//           user: loggedIn.user,
//           token: loggedIn.token,
//         })
//       );
//       console.log(loggedIn.user);
//       navigate("/");
//     }
//   };

  const handleFormSubmit = async (values, onSubmitProps) => {
    // if (isLogin) await login(values, onSubmitProps);
    // if (isRegister)
    await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={{...data}}
      validationSchema={registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
              <>
                <TextField
                  label="Item Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  name="name"
                  error={
                    Boolean(touched.name) && Boolean(errors.name)
                  }
                  helperText={touched.name && errors.name}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Price"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.price} 
                  name="price"
                  error={Boolean(touched.price) && Boolean(errors.price)}
                  helperText={touched.price && errors.price}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Sort Description"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.sortDescription} 
                  name="sortDescription"
                  error={Boolean(touched.sortDescription) && Boolean(errors.sortDescription)}
                  helperText={touched.sortDescription && errors.sortDescription}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Long Description"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.longDescription} 
                  name="longDescription"
                  error={Boolean(touched.longDescription) && Boolean(errors.longDescription)}
                  helperText={touched.longDescription && errors.longDescription}
                  sx={{ gridColumn: "span 4" }}
                />
                {/* <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: "span 4" }}
                /> */}
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <Box>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </Box>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            

            {/* <TextField
              label="Category"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.category} 
              name="category"
              error={Boolean(touched.category) && Boolean(errors.category)}
              helperText={touched.category && errors.category}
              sx={{ gridColumn: "span 4" }}
            /> */}

        <Typography fontWeight="300" variant="h5" sx={{ mb: "1.5rem" }}>
          Category :  
          {/* Welcome to Socipedia, the Social Media for Sociopaths! */}
        </Typography>
          <Box width="80%" margin="0 auto">
          <Tabs
                  textColor="primary"
                  indicatorColor="primary"
                  value={valueOfTab}
                  onChange={handleChangeTab}
                  centered
                  TabIndicatorProps={{ sx: { display: breakPoint ? "block" : "none" } }}
                  sx={{
                    m: "10px 0 0",
                    "& .MuiTabs-flexContainer": {
                      flexWrap: "wrap",
                    },
                  }}
                >
                  <Tab label="TOP RATED" value="topRated" />
                  <Tab label="NEW ARRIVALS" value="newArrivals" />
                  <Tab label="BEST SELLERS" value="bestSellers" />
                  
            </Tabs>
            </Box>
            {/* <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            /> */}
          </Box>

          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: "white",
                "&:hover": { color: palette.primary.main },
              }}
            >
               EDIT
            </Button>
            {/* <Typography
              onClick={() => {
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography> */}
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default EditForm;