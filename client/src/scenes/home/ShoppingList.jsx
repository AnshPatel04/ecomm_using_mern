import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Item from "../../components/Item";
import { Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../state";
import host from "../../env.js";

const ShoppingList = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("all");
  const items = useSelector((state) => state.cart.items);
  const breakPoint = useMediaQuery("(min-width:600px)");

  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function getItems() {
    const items = await fetch(
      `http://${host}:3002/items`,
      { method: "GET" }
    );
    const itemsJson = await items.json();
    dispatch(setItems(itemsJson));
  }

  useEffect(() => {
    
    // dispatch(setItems([{_id: 1,attributes: {name: 'sda', sortDescription: 'GOD OF WAR ON PC. Kratos and Atreus', 
    // longDescription: 'God of War is a fantasy action-adventure game franchise created by David Jaffe and developed by Santa Monica Studio. It began in 2005 for the PlayStation 2 video game console and has become a flagship series for PlayStation, consisting of nine installments across multiple platforms.', 
    // price: 20, category: 'topRated',  image: 'https://static.dc.com/dc/files/default_images/Char_Profile_Batman_20190116_5c3fc4b40faec2.47318964.jpg',
    //  }},
    // {_id: 2,attributes: {name: 'sda', sortDescription: 'GOD OF WAR ON PC. Kratos and Atreus', 
    // longDescription: 'God of War is a fantasy action-adventure game franchise created by David Jaffe and developed by Santa Monica Studio. It began in 2005 for the PlayStation 2 video game console and has become a flagship series for PlayStation, consisting of nine installments across multiple platforms.', 
    // price: 20, category: 'topRated', image: 'https://static.dc.com/dc/files/default_images/Char_Profile_Batman_20190116_5c3fc4b40faec2.47318964.jpg',
    //  }},
    // {_id: 3,attributes: {name: 'sda', sortDescription: 'GOD OF WAR ON PC. Kratos and Atreus', 
    // longDescription: 'God of War is a fantasy action-adventure game franchise created by David Jaffe and developed by Santa Monica Studio. It began in 2005 for the PlayStation 2 video game console and has become a flagship series for PlayStation, consisting of nine installments across multiple platforms.', 
    // price: 20, category: 'topRated', image: 'https://static.dc.com/dc/files/default_images/Char_Profile_Batman_20190116_5c3fc4b40faec2.47318964.jpg',
    //  }},
    // {_id: 4,attributes: {name: 'sda', sortDescription: 'GOD OF WAR ON PC. Kratos and Atreus', 
    // longDescription: 'God of War is a fantasy action-adventure game franchise created by David Jaffe and developed by Santa Monica Studio. It began in 2005 for the PlayStation 2 video game console and has become a flagship series for PlayStation, consisting of nine installments across multiple platforms.', 
    // price: 40, category: 'newArrivals', image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BpZGVybWFufGVufDB8fDB8fHww',
    //  }},    
    // {_id: 5,attributes: {name: 'sda', sortDescription: 'GOD OF WAR ON PC. Kratos and Atreus', 
    // longDescription: 'God of War is a fantasy action-adventure game franchise created by David Jaffe and developed by Santa Monica Studio. It began in 2005 for the PlayStation 2 video game console and has become a flagship series for PlayStation, consisting of nine installments across multiple platforms.', 
    // price: 40, category: 'newArrivals', image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BpZGVybWFufGVufDB8fDB8fHww',
    //  }},
    // {_id: 6,attributes: {name: 'sda', sortDescription: 'GOD OF WAR ON PC. Kratos and Atreus', 
    // longDescription: 'God of War is a fantasy action-adventure game franchise created by David Jaffe and developed by Santa Monica Studio. It began in 2005 for the PlayStation 2 video game console and has become a flagship series for PlayStation, consisting of nine installments across multiple platforms.', 
    // price: 40, category: 'newArrivals', image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BpZGVybWFufGVufDB8fDB8fHww',
    //  }},
    // {_id: 7,attributes: {name: 'sda', sortDescription: 'GOD OF WAR ON PC. Kratos and Atreus', 
    // longDescription: 'God of War is a fantasy action-adventure game franchise created by David Jaffe and developed by Santa Monica Studio. It began in 2005 for the PlayStation 2 video game console and has become a flagship series for PlayStation, consisting of nine installments across multiple platforms.', 
    // price: 30, category: 'bestSellers', image: 'https://www.shutterstock.com/image-vector/venom-art-design-logo-sign-260nw-2337444245.jpg',
    //  }},
    // {_id: 8,attributes: {name: 'sda', sortDescription: 'GOD OF WAR ON PC. Kratos and Atreus', 
    // longDescription: 'God of War is a fantasy action-adventure game franchise created by David Jaffe and developed by Santa Monica Studio. It began in 2005 for the PlayStation 2 video game console and has become a flagship series for PlayStation, consisting of nine installments across multiple platforms.', 
    // price: 30, category: 'bestSellers', image: 'https://www.shutterstock.com/image-vector/venom-art-design-logo-sign-260nw-2337444245.jpg',
    //  }},
    // {_id: 9,attributes: {name: 'sda', sortDescription: 'GOD OF WAR ON PC. Kratos and Atreus', 
    // longDescription: 'God of War is a fantasy action-adventure game franchise created by David Jaffe and developed by Santa Monica Studio. It began in 2005 for the PlayStation 2 video game console and has become a flagship series for PlayStation, consisting of nine installments across multiple platforms.', 
    // price: 30, category: 'bestSellers', image: 'https://www.shutterstock.com/image-vector/venom-art-design-logo-sign-260nw-2337444245.jpg',
    //  }},

    // ]));
    getItems();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  const topRatedItems = items.filter(
    (item) => item.attributes.category === "topRated"
  );
  const newArrivalsItems = items.filter(
    (item) => item.attributes.category === "newArrivals"
  );
  const bestSellersItems = items.filter(
    (item) => item.attributes.category === "bestSellers"
  );

  return (
    <Box width="80%" margin="80px auto">
      <Typography variant="h3" textAlign="center">
        Our Featured <b>Products</b>
      </Typography>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        value={value}
        onChange={handleChange}
        centered
        // TabIndicatorProps={{ sx: { display: breakPoint ? "block" : "none" } }}
        TabIndicatorProps={{ sx: { display: breakPoint ? "block" : "none" } }}
        sx={{
          m: "25px",
          "& .MuiTabs-flexContainer": {
            flexWrap: "wrap",
          },
        }}
      >
        <Tab label="ALL" value="all" />
        <Tab label="NEW ARRIVALS" value="newArrivals" />
        <Tab label="BEST SELLERS" value="bestSellers" />
        <Tab label="TOP RATED" value="topRated" />
      </Tabs>
      <Box
        margin="0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.33%"
      >
        {value === "all" &&
        // 
        // 
          items.map((item) => (
            <Item item={item} key={`${item.name}-${item._id}`} />
          ))}
        {value === "newArrivals" &&
          newArrivalsItems.map((item) => (
            <Item item={item} key={`${item.name}-${item._id}`} />
          ))}
        {value === "bestSellers" &&
          bestSellersItems.map((item) => (
            <Item item={item} key={`${item.name}-${item._id}`} />
          ))}
        {value === "topRated" &&
          topRatedItems.map((item) => (
            <Item item={item} key={`${item.name}-${item._id}`} />
          ))}
      </Box>
    </Box>
  );
};

export default ShoppingList;