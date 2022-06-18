import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";

function CustomCarousel(props) {
  var items = [
    {
      name: "Random Name #1",
      description: "Probably the most random thing you have ever seen!",
      img: "https://source.unsplash.com/random/400x400",
    },
    {
      name: "Random Name #2",
      description: "Hello World!",
      img: "https://source.unsplash.com/random/400x400",
    },
  ];

  return (
    <Carousel>
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
}

function Item(props) {
  return (
    <Paper sx={{
      backgroundImage: `url(${props.item.img})`,
      height: "85vh",
      mt: "-3vh",
     
    }}>
      <h2>{props.item.name}</h2>
      <p>{props.item.description}</p>

      <Button className="CheckButton">Check it out!</Button>
    </Paper>
  );
}

export default CustomCarousel;