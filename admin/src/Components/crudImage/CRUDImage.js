import * as React from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { Container } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import PendingIcon from "@mui/icons-material/Pending";
import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
import "./CRUDImage.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CRUDImage() {
  // const dataImage = useSelector((state) => state.infoimage) || [];
  console.log("dữ liệu ảnh", dataImage);

  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = React.useState(null);

  const handleMouseEnter = (itemId) => {
    setHoveredItem(itemId);
  };
  const handleMouseLeave = () => {
    setHoveredItem(null);
  };
  const handleViewImage = (id) => {
    navigate(`/cruddetail/${id}`);
  };

  return (
    <Container id="wrap-cards">
      <Box sx={{ width: 1200, height: 450 }}>
        <ImageList variant="masonry" cols={5} gap={10}>
          {dataImage &&
            dataImage.map((item) => (
              <ImageListItem
                key={item.id}
                className="cl-image"
                onMouseEnter={() => handleMouseEnter(item.id)}
                onMouseLeave={handleMouseLeave}
                sx={{
                  filter:
                    hoveredItem === item.id
                      ? "brightness(80%)"
                      : "none",
                  transition: "filter 0.3s ease",
                  cursor: "zoom-in",
                }}
              >
                <img
                  src={`${item.urlImage}?w=248&fit=crop&auto=format`}
                  srcSet={`${item.urlImage}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.title}
                  loading="lazy"
                  id={item.id}
                  onClick={() => handleViewImage(item.id)}
                />
                {hoveredItem === item.id && (
                  <ImageListItemBar
                    title={item.title}
                    subtitle={item.author}
                    actionIcon={
                      <IconButton
                        sx={{ color: "white" }}
                        aria-label={`info about ${item.title}`}
                      >
                        <PendingIcon sx={{ fontSize: 30 }} />
                      </IconButton>
                    }
                  />
                )}
              </ImageListItem>
            ))}
        </ImageList>
      </Box>
    </Container>
  );
}

export default CRUDImage;
